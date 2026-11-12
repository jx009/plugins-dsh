# DSH 插件目录站

DeepSeek Harness（DSH）插件目录 + 教程站。纯静态 HTML，英文为默认语言，中文在 `/zh` 下。
内容写在 `content/`，运行一次构建后把 `dist/` 整个目录部署出去即可。

Cloudflare 部署步骤、日常发文流程和文章格式的完整说明见 [docs/GUIDE.md](docs/GUIDE.md)。

## 上线前要改的东西

全部在 `site.config.json`：

| 字段 | 现在的值 | 说明 |
| --- | --- | --- |
| `siteUrl` | `https://example.com` | 真实域名，不带结尾斜杠。canonical、hreflang、sitemap、RSS 都用它 |
| `brand` | `Plugin DSH` | 站点名称，改完运行 `npm run brand` 重新生成分享图和图标 |
| `contactEmail` | `3618850359@qq.com` | 出现在联系页、隐私页、条款页 |
| `submitUrl` | 空 | 接收插件提交的地址（如 GitHub issue 表单）。填了以后提交页才会出现提交按钮 |
| `analytics.ga4` / `analytics.baidu` | 空 | 填统计 ID 后才会输出统计脚本 |
| `verification.*` | 空 | Google / Bing / 百度站长平台的验证码 |

站内文案（导航、首页、分类介绍、FAQ）在 `content/copy/en.yml` 和 `content/copy/zh.yml`，
固定页在 `content/pages/`。

## 常用命令

```bash
npm install          # 第一次
npm run build        # 生成 dist/
npm run dev          # 构建并在 http://localhost:4173 预览
npm run build -- --drafts   # 连同 draft: true 的稿件一起构建，只用于本地预览
```

## 采集审批台

```bash
npm run admin        # 打开 http://127.0.0.1:4500
```

本机运行的管理页面：定时去 GitHub 搜新的 DSH 插件、去重、用模型改写中英文文案，放进待审批列表；
逐条审批后一次性推送到站点仓库（私有仓库靠 GitHub 令牌访问），Cloudflare 随即自动重建。
扫描结果不会自动上线，令牌和队列都存在不入库的 `.admin/` 里。
服务器上用 Docker 跑：`docker compose up -d`，镜像由 `.github/workflows/docker-build-push.yml` 构建推到 Docker Hub。
令牌怎么生成、Docker 怎么部署、定时怎么设、审批和推送的细节见 [docs/GUIDE.md](docs/GUIDE.md) 第四部分。

下面是不用审批台、手动收录的做法。

## 每天收录插件

```bash
npm run new:plugin -- owner/repo --category tools
```

脚本从 GitHub 拉取星标、许可证、版本等数据，在 `content/plugins/owner/repo/` 下生成：

- `plugin.json`：元数据。`github` 一段由脚本维护，其余字段可以手改
- `en.md`、`zh.md`：文案骨架，带 `draft: true`

然后：

1. 读一遍对方的 README，用自己的话写 `en.md` 和 `zh.md`（不要照搬 README，重复内容对收录没好处）
2. 删掉两份文件里的 `draft: true`
3. `npm run build`，预览没问题后部署

`plugin.json` 里值得手动确认的字段：

- `package`：npm 包名。安装命令按 `site.config.json` 的 `installCommand` 模板生成
- `install`：包名规则套不上时，直接写完整的安装命令，优先级高于 `package`
- `verified`：你亲自装过、确认能用后改成 `true`，页面上的"未实测"提示会随之变化
- `category`：必须是 `content/categories.yml` 里的 slug

可选分类见 `content/categories.yml`。没有文案（或全是草稿）的插件不会上线。
未登录的 GitHub API 每小时 60 次，设置环境变量 `GITHUB_TOKEN` 后是 5000 次。

## 每天发文章

教程（`/tutorials/{slug}`）：

```bash
npm run new:post -- install-first-plugin --category install
```

某个插件名下的文章（`/plugins/owner/repo/{slug}`）：

```bash
npm run new:post -- v2-migration --plugin owner/repo
```

都会生成 `{slug}.en.md` 和 `{slug}.zh.md` 两份草稿。front matter 说明：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 页面标题和 H1 |
| `description` | 是 | 搜索摘要，英文约 150 字符、中文约 75 字 |
| `category` | 教程必填 | `content/tutorial-categories.yml` 里的 slug |
| `date` | 是 | 发布日期 |
| `updated` | 否 | 实质修改后填，会更新 sitemap 的 lastmod 和页面上的"更新于" |
| `plugins` | 否 | 相关插件列表（`owner/repo`），教程页和插件页会互相链接 |
| `faq` | 否 | `q` / `a` 列表，输出为页面问答和 FAQPage 结构化数据 |
| `terms` | 否 | `name` / `desc` 列表，输出为术语表 |
| `draft` | 否 | 为 `true` 时不上线 |

只写了一种语言时，另一种语言下不会生成这个页面，构建会给出提醒。

## 刷新星标等数据

```bash
npm run sync                 # 全部插件
npm run sync -- owner/repo   # 只刷新一个
```

只有数据真的变了才会改 `plugin.json` 和 `updatedAt`，手填字段不动。跑完再 `npm run build`。

## 构建会生成什么

- 每个页面一份 `.html`，URL 不带扩展名、不带结尾斜杠（`/plugins/owner/repo` 对应 `dist/plugins/owner/repo.html`）
- 每页都有：唯一的 title / description、自指 canonical、`en-US` / `zh-CN` / `x-default` 三条 hreflang、
  Open Graph / Twitter 卡片、一段 `@graph` JSON-LD（按页面类型含 WebSite、Organization、BreadcrumbList、
  CollectionPage、SoftwareApplication、Article、FAQPage、DefinedTermSet）
- `sitemap.xml`（索引）+ `sitemaps/*.xml`（分片，带 hreflang 和 lastmod）、`robots.txt`、`feed.xml`、`llms.txt`
- `data/search.{lang}.json`：站内搜索和列表筛选用的索引
- `_headers`：Cloudflare Pages / Netlify 的缓存和安全响应头

构建会校验内容：缺必填字段、未知分类、slug 冲突都会报错并中止。

## 部署

任何静态托管都行，要求是能把 `/a/b` 解析到 `a/b.html`，找不到时返回 `404.html`。

- **Cloudflare Pages**：构建命令 `npm run build`，输出目录 `dist`。默认就按上面的规则解析，`_headers` 直接生效
- **Netlify / Vercel**：同样的构建命令和输出目录，开启 clean URLs（Netlify 的 Pretty URLs、Vercel 的 `cleanUrls: true`）
- **Nginx**：`try_files $uri $uri.html $uri/ =404;`，并设置 `error_page 404 /404.html;`

上线后到 Google Search Console 和 Bing Webmaster Tools 提交 `https://你的域名/sitemap.xml`。

## 目录

```
content/            所有内容：copy 文案、分类、插件、教程、固定页
scripts/            构建、预览和内容脚手架脚本；admin.js 与 admin/ 是采集审批台
.admin/             采集审批台的配置、队列和日志，不入库
src/templates/      页面模板（纯 JS 模板字符串）
src/assets/         css、js、字体、图片；css 和 js 按文件名顺序合并
src/static/         原样复制到站点根目录的文件
dist/               构建输出，不入库
```
