// 生成品牌位图：分享图、结构化数据用的 logo、苹果触摸图标。改了品牌名后重新跑一次 `npm run brand`。
const path = require("path");
const sharp = require("sharp");
const { SRC, config } = require("./lib/paths");
const { esc } = require("./lib/html");

const cfg = config();
const OUT = path.join(SRC, "assets/img");
const INK = "#17181A";
const FACE = "#F7F7F3";
const PANEL = "#E9E9E4";
const RULE = "#C9C9C1";
const DIM = "#5C5F64";
// 与 content/categories.yml 的分类色无关，这里只取几种做装饰性的"已插线"插孔
const JACKS = ["#D4472B", "#2E7BD6", "#1E9E6A", "#C78A12", "#8A4FD3"];

/** 站点标记：两枚插孔和一条跳线，画在 32×32 的坐标系里。 */
const mark = (fg, hole) =>
  `<path d="M9 18.5C9 7 23 7 23 18.5" fill="none" stroke="${fg}" stroke-width="2.4" stroke-linecap="round"/>
<circle cx="9" cy="21" r="4.2" fill="${fg}"/><circle cx="23" cy="21" r="4.2" fill="${fg}"/>
<circle cx="9" cy="21" r="1.6" fill="${hole}"/><circle cx="23" cy="21" r="1.6" fill="${hole}"/>`;

const square = (size, radius) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><rect width="32" height="32" rx="${radius}" fill="${INK}"/>${mark(FACE, INK)}</svg>`;

function og() {
  // 右侧一块 6×4 的插孔面板，其中几枚亮起
  const lit = { 2: 0, 9: 1, 13: 2, 16: 3, 19: 0, 22: 4 };
  let jacks = "";
  for (let i = 0; i < 24; i++) {
    const x = 800 + (i % 6) * 60;
    const y = 190 + Math.floor(i / 6) * 64;
    jacks += i in lit ? `<circle cx="${x}" cy="${y}" r="15" fill="${JACKS[lit[i]]}"/><circle cx="${x}" cy="${y}" r="5" fill="${FACE}"/>` : `<circle cx="${x}" cy="${y}" r="13.5" fill="none" stroke="${RULE}" stroke-width="3"/>`;
  }
  const font = `font-family="Arial, Helvetica, sans-serif"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${PANEL}"/>
<rect x="40" y="40" width="1120" height="550" rx="28" fill="${FACE}" stroke="${RULE}" stroke-width="2"/>
<g transform="translate(96 104) scale(2.6)"><rect width="32" height="32" rx="7" fill="${INK}"/>${mark(FACE, INK)}</g>
<text x="200" y="160" ${font} font-size="40" font-weight="700" fill="${INK}">${esc(cfg.brand)}</text>
<text x="96" y="318" ${font} font-size="68" font-weight="700" fill="${INK}" letter-spacing="-2">Plugins for</text>
<text x="96" y="396" ${font} font-size="68" font-weight="700" fill="${INK}" letter-spacing="-2">DeepSeek Harness</text>
<text x="96" y="478" ${font} font-size="30" fill="${DIM}">Find one, copy the install command, get back to work.</text>
${jacks}
<path d="M920 190C920 330 860 250 860 382" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
</svg>`;
}

async function main() {
  const jobs = [
    ["og.png", og()],
    ["logo-512.png", square(512, 7)],
    ["apple-touch-icon.png", square(180, 0)], // iOS 自己裁圆角
  ];
  for (const [name, svg] of jobs) {
    const file = path.join(OUT, name);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file);
    console.log("wrote", path.relative(process.cwd(), file));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
