// 平台专用的 GitHub 客户端：令牌由配置传入，既用来搜索公开仓库，也用来读写私有的目标仓库。
const API = "https://api.github.com";

const day = (iso) => (iso ? iso.slice(0, 10) : "");

/** 把 GitHub 的仓库对象整理成 plugin.json 里 github 字段的形状，外加几个扫描时要用的属性 */
function slim(r) {
  return {
    owner: r.owner.login,
    repo: r.name,
    private: !!r.private,
    fork: !!r.fork,
    github: {
      description: r.description || "",
      stars: r.stargazers_count,
      forks: r.forks_count,
      watchers: r.subscribers_count || 0,
      openIssues: r.open_issues_count,
      language: r.language || "",
      license: r.license && r.license.spdx_id !== "NOASSERTION" ? r.license.spdx_id : "",
      version: "",
      homepage: r.homepage || "",
      topics: r.topics || [],
      defaultBranch: r.default_branch,
      createdAt: day(r.created_at),
      pushedAt: day(r.pushed_at),
      archived: !!r.archived,
    },
  };
}

function makeClient(token) {
  const base = { "User-Agent": "plugin-dsh-admin", Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
  if (token) base.Authorization = `Bearer ${token}`;

  /** 发请求；opts: {method, body, accept, allow404}。allow404 时 404 返回 null，其余错误一律抛出中文说明 */
  async function request(path, opts = {}) {
    const headers = { ...base };
    if (opts.accept) headers.Accept = opts.accept;
    if (opts.body) headers["Content-Type"] = "application/json";
    let res;
    try {
      res = await fetch(API + path, { method: opts.method || "GET", headers, body: opts.body ? JSON.stringify(opts.body) : undefined });
    } catch (e) {
      throw new Error(`连不上 GitHub（${e.cause ? e.cause.code || e.cause.message : e.message}）。检查网络或代理。`);
    }
    if (res.status === 404 && opts.allow404) return null;
    if (res.ok) return res;

    let msg = "";
    try {
      msg = (await res.json()).message || "";
    } catch {
      msg = "";
    }
    if (res.status === 401) throw new Error("GitHub 令牌无效或已过期。");
    if ((res.status === 403 || res.status === 429) && (res.headers.get("x-ratelimit-remaining") === "0" || /rate limit/i.test(msg))) {
      const reset = Number(res.headers.get("x-ratelimit-reset")) * 1000;
      throw new Error(`GitHub API 限流，${reset ? new Date(reset).toLocaleTimeString() : "稍后"} 后恢复。${token ? "" : "填写令牌可以大幅提高限额。"}`);
    }
    if (res.status === 403) throw new Error(`GitHub 拒绝了这次操作（403）：${msg || "令牌权限不够"}`);
    if (res.status === 404) throw new Error(`GitHub 上找不到 ${path.split("?")[0]}。仓库名写错了，或者令牌没有这个仓库的权限。`);
    const err = new Error(`GitHub API ${res.status}：${msg || path}`);
    err.status = res.status;
    throw err;
  }

  const json = async (path, opts) => {
    const res = await request(path, opts);
    return res ? res.json() : null;
  };

  return {
    json,

    /** 令牌所属账号 */
    me: () => json("/user"),

    /** 搜索仓库，按星标从高到低。GitHub 每个搜索语句最多给 1000 条 */
    async search(q, page = 1, perPage = 50) {
      const data = await json(`/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=${perPage}&page=${page}`);
      return { total: data.total_count, items: data.items.map(slim) };
    },

    /** 单个仓库；不存在或不可见时返回 null */
    async repo(owner, name) {
      const r = await json(`/repos/${owner}/${name}`, { allow404: true });
      return r ? { ...slim(r), permissions: r.permissions || {} } : null;
    },

    async readme(owner, name) {
      const res = await request(`/repos/${owner}/${name}/readme`, { accept: "application/vnd.github.raw+json", allow404: true });
      return res ? res.text() : "";
    },

    /** 仓库根目录的 package.json，解析失败或没有时返回 null */
    async packageJson(owner, name) {
      const res = await request(`/repos/${owner}/${name}/contents/package.json`, { accept: "application/vnd.github.raw+json", allow404: true });
      if (!res) return null;
      try {
        return JSON.parse(await res.text());
      } catch {
        return null;
      }
    },

    async latestRelease(owner, name) {
      const r = await json(`/repos/${owner}/${name}/releases/latest`, { allow404: true });
      return r ? r.tag_name || "" : "";
    },

    /** 目标仓库某个分支里已有的插件（owner/repo 小写）。分支不存在时抛错 */
    async remotePlugins(repo, branch) {
      const tree = await json(`/repos/${repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`);
      const out = new Set();
      for (const t of tree.tree) {
        const m = t.path.match(/^content\/plugins\/([^/]+)\/([^/]+)\/plugin\.json$/);
        if (m) out.add(`${m[1]}/${m[2]}`.toLowerCase());
      }
      return out;
    },

    /**
     * 把一组文件作为一次提交推到分支上（Git Data API，不经过本地 git，所以不依赖本机的 git 凭据）。
     * files: [{path, content}]。返回新提交的 sha。
     */
    async commitFiles(repo, branch, files, message) {
      const ref = `heads/${encodeURIComponent(branch)}`;
      for (let attempt = 0; ; attempt++) {
        const head = (await json(`/repos/${repo}/git/ref/${ref}`)).object.sha;
        const baseTree = (await json(`/repos/${repo}/git/commits/${head}`)).tree.sha;
        const tree = await json(`/repos/${repo}/git/trees`, {
          method: "POST",
          body: { base_tree: baseTree, tree: files.map((f) => ({ path: f.path, mode: "100644", type: "blob", content: f.content })) },
        });
        const commit = await json(`/repos/${repo}/git/commits`, { method: "POST", body: { message, tree: tree.sha, parents: [head] } });
        try {
          await json(`/repos/${repo}/git/refs/${ref}`, { method: "PATCH", body: { sha: commit.sha, force: false } });
          return commit.sha;
        } catch (e) {
          // 提交期间分支被别人推进了：基于新的分支头重做一次
          if (e.status !== 422 || attempt >= 2) throw e;
        }
      }
    },
  };
}

module.exports = { makeClient };
