// 候选队列与拒绝名单。全是本地文件，放在 .admin/ 下，不参与构建。
const fs = require("fs");
const path = require("path");
const { CONTENT, readJson, writeJson } = require("../lib/paths");
const { QUEUE_FILE, REJECTED_FILE, readOr } = require("./config");

const key = (owner, repo) => `${owner}/${repo}`.toLowerCase();

const readQueue = () => readOr(QUEUE_FILE, []);
const writeQueue = (items) => writeJson(QUEUE_FILE, items);
const readRejected = () => readOr(REJECTED_FILE, []);
const writeRejected = (items) => writeJson(REJECTED_FILE, items);

/** 本地 content/plugins 里已有的插件，返回 owner/repo（小写）的集合 */
function localPlugins() {
  const out = new Set();
  const dir = path.join(CONTENT, "plugins");
  if (!fs.existsSync(dir)) return out;
  for (const owner of fs.readdirSync(dir)) {
    const ownerDir = path.join(dir, owner);
    if (!fs.statSync(ownerDir).isDirectory()) continue;
    for (const repo of fs.readdirSync(ownerDir)) {
      const file = path.join(ownerDir, repo, "plugin.json");
      if (!fs.existsSync(file)) continue;
      out.add(key(owner, repo));
      try {
        const meta = readJson(file);
        if (meta.owner && meta.repo) out.add(key(meta.owner, meta.repo));
      } catch {
        // 目录名已经记下了，json 坏掉不影响去重
      }
    }
  }
  return out;
}

/** 去重依据：本地已有 + 队列里的（待审、已通过、已发布）+ 拒绝名单。远端仓库里已有的由调用方并进来 */
function takenSet() {
  const s = localPlugins();
  for (const item of readQueue()) s.add(key(item.owner, item.repo));
  for (const r of readRejected()) s.add(key(r.owner, r.repo));
  return s;
}

/** 说明一个仓库为什么算"已有"；没出现过返回空字符串。手动添加时用来给出明确原因 */
function whereTaken(owner, repo) {
  const k = key(owner, repo);
  if (localPlugins().has(k)) return "站点里已经收录了";
  const queued = readQueue().find((x) => key(x.owner, x.repo) === k);
  if (queued) return { pending: "已经在待审批里", approved: "已经在已通过里", published: "已经发布过了" }[queued.status] || "已经在队列里";
  if (readRejected().some((r) => key(r.owner, r.repo) === k)) return "在拒绝名单里，先到拒绝名单恢复它";
  return "";
}

/** 候选入队；已经出现过的不会重复加，返回新记录或 null */
function addCandidate(item) {
  const k = key(item.owner, item.repo);
  if (takenSet().has(k)) return null;
  const rec = {
    id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    owner: item.owner,
    repo: item.repo,
    status: "pending", // pending 待审 | approved 已通过 | published 已发布
    foundAt: new Date().toISOString(),
    query: item.query || "",
    draft: item.draft,
    error: "",
  };
  writeQueue([...readQueue(), rec]);
  return rec;
}

function updateItem(id, patch) {
  const queue = readQueue();
  const item = queue.find((x) => x.id === id);
  if (!item) return null;
  Object.assign(item, typeof patch === "function" ? patch(item) : patch);
  writeQueue(queue);
  return item;
}

/** 加入拒绝名单，以后扫描不会再出现。auto 表示是改写时判定不相关而自动跳过的 */
function addRejected(owner, repo, reason = "", auto = false) {
  const k = key(owner, repo);
  const list = readRejected().filter((r) => key(r.owner, r.repo) !== k);
  list.push({ owner, repo, reason, auto, at: new Date().toISOString() });
  writeRejected(list);
}

/** 拒绝队列里的一条：移出队列并记入拒绝名单 */
function rejectItem(id) {
  const queue = readQueue();
  const item = queue.find((x) => x.id === id);
  if (!item || item.status === "published") return null;
  writeQueue(queue.filter((x) => x.id !== id));
  addRejected(item.owner, item.repo, "人工拒绝");
  return item;
}

/** 从拒绝名单里移除，下次扫描可以重新出现 */
function restoreRejected(owner, repo) {
  const k = key(owner, repo);
  writeRejected(readRejected().filter((r) => key(r.owner, r.repo) !== k));
}

module.exports = {
  key,
  readQueue,
  writeQueue,
  readRejected,
  localPlugins,
  takenSet,
  whereTaken,
  addCandidate,
  updateItem,
  addRejected,
  rejectItem,
  restoreRejected,
};
