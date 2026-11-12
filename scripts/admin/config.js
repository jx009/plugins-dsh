// 管理平台的本地配置。配置里有令牌，全部存在 .admin/（已加入 .gitignore，不会提交）。
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { ROOT, CONTENT, readJson, writeJson } = require("../lib/paths");

// 默认放在项目根的 .admin/；ADMIN_DIR 可以换地方（比如想让多台机器共用一份队列，或者跑测试）
const ADMIN = process.env.ADMIN_DIR ? path.resolve(process.env.ADMIN_DIR) : path.join(ROOT, ".admin");
const CONFIG_FILE = path.join(ADMIN, "config.json");
const STATE_FILE = path.join(ADMIN, "state.json");
const QUEUE_FILE = path.join(ADMIN, "queue.json");
const REJECTED_FILE = path.join(ADMIN, "rejected.json");
const LOG_FILE = path.join(ADMIN, "admin.log");

const defaults = () => ({
  // 内容推送到哪个仓库的哪个分支，形如 owner/repo；私有仓库靠下面的令牌访问
  repo: "",
  branch: "main",
  // GitHub 令牌：搜索公开仓库 + 读写上面的目标仓库
  token: "",
  // 每条是一个 GitHub 仓库搜索语句，按顺序执行，靠前的优先入选。可以用 user: org: repo: 等限定词指定范围
  queries: ["topic:dsh-plugin", "topic:dsh-plugins", "topic:deepseek-harness", '"dsh plugin" in:name,description,readme'],
  // 每次扫描要多少个新候选
  perScan: 10,
  // 星标低于该值的仓库直接跳过
  minStars: 0,
  // 定时任务：每天 time（本机时间 HH:MM）自动扫描一次
  schedule: { enabled: false, time: "03:00" },
  // 改写文案用的 OpenAI 兼容接口。不填密钥时候选只带仓库数据，文案要自己写
  model: { baseUrl: "https://api.deepseek.com/v1", apiKey: "", model: "deepseek-chat" },
});

const readOr = (file, fallback) => {
  if (!fs.existsSync(file)) return fallback;
  try {
    return readJson(file);
  } catch {
    return fallback;
  }
};

function loadConfig() {
  const d = defaults();
  const saved = readOr(CONFIG_FILE, {});
  return {
    ...d,
    ...saved,
    schedule: { ...d.schedule, ...saved.schedule },
    model: { ...d.model, ...saved.model },
  };
}

function saveConfig(cfg) {
  writeJson(CONFIG_FILE, cfg);
  return cfg;
}

const loadState = () => readOr(STATE_FILE, { lastScan: null, lastScheduledDay: "" });
const saveState = (patch) => writeJson(STATE_FILE, { ...loadState(), ...patch });

/** 分类列表（slug + 中英文名称和一句话说明），界面和改写提示词共用 */
function categories() {
  return yaml.load(fs.readFileSync(path.join(CONTENT, "categories.yml"), "utf8")).map((c) => ({
    slug: c.slug,
    name: c.zh.name,
    nameEn: c.en.name,
    tagline: c.en.tagline,
  }));
}

const siteConfig = () => readJson(path.join(ROOT, "site.config.json"));

function log(line) {
  fs.mkdirSync(ADMIN, { recursive: true });
  fs.appendFileSync(LOG_FILE, `${new Date().toLocaleString()} ${line}\n`);
  console.log(line);
}

module.exports = {
  ADMIN,
  QUEUE_FILE,
  REJECTED_FILE,
  defaults,
  readOr,
  loadConfig,
  saveConfig,
  loadState,
  saveState,
  categories,
  siteConfig,
  log,
};
