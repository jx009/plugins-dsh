// 路径常量与零散的文件工具，供所有脚本共用。
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const CONTENT = path.join(ROOT, "content");
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

function writeFile(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

const writeJson = (file, data) => writeFile(file, JSON.stringify(data, null, 2) + "\n");

/** 本地日期 YYYY-MM-DD */
function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** 解析 `--key value` 与位置参数 */
function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) args[a.slice(2)] = true;
      else args[a.slice(2)] = argv[++i];
    } else args._.push(a);
  }
  return args;
}

const config = () => readJson(path.join(ROOT, "site.config.json"));

module.exports = { ROOT, CONTENT, SRC, DIST, readJson, writeFile, writeJson, today, parseArgs, config };
