// 登录：页面只有一个口令输入框，输对下面这串就登录，登录状态用 Cookie 保持 7 天。
// 口令写死在代码里；万一泄露，可以不改代码、用环境变量 ADMIN_PASSWORD 临时换一个。
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { ADMIN } = require("./config");

const PASSWORD = process.env.ADMIN_PASSWORD || "GHrpYYEKRbWqv7LKjedeAqsaJx5dMYVCG7EM6fzz";

const COOKIE = "dsh_admin";
const SESSION_DAYS = 7;

/**
 * 签名密钥：首次启动随机生成，存在数据目录里，重启后已登录的会话不失效。
 * 再和口令一起派生，换了口令之后旧会话全部作废。
 */
let key = null;
function signingKey() {
  if (key) return key;
  const file = path.join(ADMIN, "session.key");
  let secret = "";
  try {
    secret = fs.readFileSync(file, "utf8").trim();
  } catch {
    secret = "";
  }
  if (!/^[a-f0-9]{64}$/.test(secret)) {
    secret = crypto.randomBytes(32).toString("hex");
    fs.mkdirSync(ADMIN, { recursive: true });
    fs.writeFileSync(file, secret + "\n", { mode: 0o600 });
  }
  key = crypto.createHmac("sha256", secret).update(PASSWORD).digest();
  return key;
}

const sign = (payload) => crypto.createHmac("sha256", signingKey()).update(payload).digest("base64url");

/** 定长比较，不让比较耗时泄露口令内容 */
function passwordMatches(input) {
  const h = (s) => crypto.createHash("sha256").update(String(s)).digest();
  return crypto.timingSafeEqual(h(input), h(PASSWORD));
}

function readCookie(req) {
  for (const part of String(req.headers.cookie || "").split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === COOKIE) return part.slice(i + 1).trim();
  }
  return "";
}

function loggedIn(req) {
  const [exp, mac] = readCookie(req).split(".");
  if (!exp || !mac || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const a = Buffer.from(mac);
  const b = Buffer.from(sign(exp));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// 经过 HTTPS 反向代理时带上 Secure，Cookie 只走加密连接
const isHttps = (req) => !!req.socket.encrypted || /^https\b/i.test(String(req.headers["x-forwarded-proto"] || ""));

const cookie = (req, value, maxAge) =>
  `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${isHttps(req) ? "; Secure" : ""}`;

function sessionCookie(req) {
  const exp = String(Date.now() + SESSION_DAYS * 86400000);
  return cookie(req, `${exp}.${sign(exp)}`, SESSION_DAYS * 86400);
}

const clearCookie = (req) => cookie(req, "", 0);

module.exports = { passwordMatches, loggedIn, sessionCookie, clearCookie };
