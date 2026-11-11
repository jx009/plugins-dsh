#!/usr/bin/env node
// 刷新全部插件的 GitHub 数据。只改 github 字段和 updatedAt，手工填写的字段原样保留。
// 用法：npm run sync            全部插件
//       npm run sync -- owner/repo   只刷新一个

const fs = require("fs");
const path = require("path");
const { CONTENT, readJson, writeJson, today, parseArgs } = require("./lib/paths");
const { fetchRepo } = require("./lib/github");

function pluginFiles() {
  const root = path.join(CONTENT, "plugins");
  const out = [];
  for (const owner of fs.readdirSync(root)) {
    const ownerDir = path.join(root, owner);
    if (!fs.statSync(ownerDir).isDirectory()) continue;
    for (const repo of fs.readdirSync(ownerDir)) {
      const file = path.join(ownerDir, repo, "plugin.json");
      if (fs.existsSync(file)) out.push(file);
    }
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const only = String(args._[0] || "").toLowerCase();
  let changed = 0;
  let failed = 0;

  for (const file of pluginFiles()) {
    const meta = readJson(file);
    const id = `${meta.owner}/${meta.repo}`;
    if (only && id.toLowerCase() !== only) continue;
    try {
      const fresh = await fetchRepo(meta.owner, meta.repo);
      if (JSON.stringify(fresh.github) === JSON.stringify(meta.github)) {
        console.log(`  =  ${id}`);
        continue;
      }
      const stars = fresh.github.stars - meta.github.stars;
      // 仓库改名或转移后 API 会返回新名字，这里只提示，目录和 URL 由人决定要不要动
      if (`${fresh.owner}/${fresh.repo}`.toLowerCase() !== id.toLowerCase()) console.log(`  !  ${id} 已改名为 ${fresh.owner}/${fresh.repo}`);
      if (fresh.github.archived && !meta.github.archived) console.log(`  !  ${id} 已被归档`);
      writeJson(file, { ...meta, updatedAt: today(), github: fresh.github });
      changed++;
      console.log(`  ↑  ${id}  stars ${stars >= 0 ? "+" : ""}${stars}  ${fresh.github.version || ""}`);
    } catch (e) {
      failed++;
      console.error(`  ×  ${id}: ${e.message}`);
      if (/限流/.test(e.message)) break;
    }
  }

  console.log(`更新 ${changed} 个，失败 ${failed} 个。${changed ? "运行 npm run build 重新生成页面。" : ""}`);
  if (failed) process.exit(1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
