// GitHub 元数据拉取：new-plugin 和 sync 共用。
// 未登录限额 60 次/小时，设置环境变量 GITHUB_TOKEN 后为 5000 次/小时。

const API = "https://api.github.com";

function headers() {
  const h = { "User-Agent": "dsh-plugin-site", Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function gh(path) {
  const res = await fetch(API + path, { headers: headers() });
  if (res.status === 404) return null;
  if (res.status === 403 || res.status === 429) {
    const reset = Number(res.headers.get("x-ratelimit-reset")) * 1000;
    const when = reset ? new Date(reset).toLocaleTimeString() : "稍后";
    throw new Error(`GitHub API 限流，${when} 后恢复。设置 GITHUB_TOKEN 可把限额提高到 5000 次/小时。`);
  }
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${path}`);
  return res.json();
}

async function raw(owner, repo, branch, file) {
  const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`);
  return res.ok ? res.text() : null;
}

const day = (iso) => (iso ? iso.slice(0, 10) : "");

/** 拉取一个仓库的展示数据；仓库不存在时抛错。 */
async function fetchRepo(owner, repo) {
  const r = await gh(`/repos/${owner}/${repo}`);
  if (!r) throw new Error(`仓库不存在或不可见：${owner}/${repo}`);
  const release = await gh(`/repos/${r.full_name}/releases/latest`);

  let pkg = null;
  const pkgText = await raw(r.owner.login, r.name, r.default_branch, "package.json");
  if (pkgText) {
    try {
      pkg = JSON.parse(pkgText);
    } catch {
      pkg = null;
    }
  }

  return {
    owner: r.owner.login,
    repo: r.name,
    package: pkg && pkg.name && !pkg.private ? pkg.name : "",
    github: {
      description: r.description || "",
      stars: r.stargazers_count,
      forks: r.forks_count,
      watchers: r.subscribers_count || 0,
      openIssues: r.open_issues_count,
      language: r.language || "",
      license: r.license && r.license.spdx_id !== "NOASSERTION" ? r.license.spdx_id : "",
      version: (release && release.tag_name) || (pkg && pkg.version ? `v${pkg.version}` : ""),
      homepage: r.homepage || "",
      topics: r.topics || [],
      defaultBranch: r.default_branch,
      createdAt: day(r.created_at),
      pushedAt: day(r.pushed_at),
      archived: !!r.archived,
    },
  };
}

async function fetchReadme(owner, repo, branch) {
  for (const f of ["README.md", "readme.md", "README.zh.md", "README_CN.md"]) {
    const text = await raw(owner, repo, branch, f);
    if (text) return text;
  }
  return "";
}

module.exports = { fetchRepo, fetchReadme };
