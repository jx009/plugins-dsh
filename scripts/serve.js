// 本地预览服务器。规则与 Cloudflare Pages 一致：/a/b 对应 dist/a/b.html，找不到返回 404.html。
const http = require("http");
const fs = require("fs");
const path = require("path");
const { DIST, parseArgs } = require("./lib/paths");

const args = parseArgs(process.argv.slice(2));
const port = Number(args.port || process.env.PORT || 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".xsl": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const isFile = (f) => fs.existsSync(f) && fs.statSync(f).isFile();

function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, "");
  const base = path.join(DIST, clean);
  if (!base.startsWith(DIST)) return null; // 不允许跳出 dist
  return [base, base + ".html", path.join(base, "index.html")].find(isFile) || null;
}

http
  .createServer((req, res) => {
    const urlPath = new URL(req.url, "http://localhost").pathname.replace(/\/+$/, "") || "/";
    let file = resolve(urlPath === "/" ? "/index.html" : urlPath);
    let status = 200;
    if (!file) {
      file = path.join(DIST, "404.html");
      status = 404;
      if (!isFile(file)) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("404 - run `npm run build` first");
      }
    }
    res.writeHead(status, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`Preview: http://localhost:${port}`));
