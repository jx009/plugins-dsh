# Plugin DSH 使用手册

这份文档讲三件事：怎么把站点部署到 Cloudflare Pages、每天怎么更新内容、文章该按什么格式写。

## 一、部署到 Cloudflare Pages

### 0. 部署前先改配置

打开 `site.config.json`，把这两项改成真实值（现在还是占位）：

```json
"siteUrl": "https://你的完整域名",
"contactEmail": "你的邮箱",
```

`siteUrl` 要带 `https://` 和域名后缀，结尾不带斜杠。canonical、hreflang、sitemap、RSS 全都用它，
填错了搜索引擎收录的就是错的地址。只要它还是 `example.com`，每次构建都会提醒。

改完在本地确认能构建：

```bash
npm install
```

```bash
npm run build
```

### 方式 A：连接 GitHub 自动部署（推荐）

以后每次 `git push`，Cloudflare 自动构建并上线，不用再手动上传。

1. 在 GitHub 新建一个空仓库（公开私有都行），把本项目推上去。`.gitignore` 已经排除了 `node_modules/` 和 `dist/`。
2. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)，进入 **Workers & Pages** → **Create**，选 **Pages** → **Connect to Git**
   （新版界面默认显示 Workers，Pages 入口可能是页面下方的一行 "Looking to deploy Pages?" 链接）。
3. 授权 GitHub，选中刚才的仓库。
4. 构建设置这样填：

   | 项 | 值 |
   | --- | --- |
   | Project name | `plugin-dsh` |
   | Production branch | 你推送的那个分支 |
   | Framework preset | None |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | 环境变量 `NODE_VERSION` | `22` |

5. 点 **Save and Deploy**。一两分钟后会得到一个 `plugin-dsh.pages.dev` 的地址，先在这个地址上检查页面。

### 方式 B：不用 GitHub，本地构建后直接上传

```bash
npm run build
```

```bash
npx wrangler pages deploy dist --project-name plugin-dsh
```

第一次运行会打开浏览器让你登录 Cloudflare，并询问是否创建项目。以后每次更新重复这两条命令。

### 绑定自己的域名

1. 进入 Pages 项目 → **Custom domains** → **Set up a custom domain**，输入域名。
2. 根域名（不带 `www`）要求这个域名的 DNS 托管在 Cloudflare；已经托管的话 Cloudflare 会自动加好记录。
3. 等状态变成 Active，HTTPS 证书是自动签发的。
4. `www` 和根域名只留一个做主域名，另一个在 Cloudflare 的 **Rules → Redirect Rules** 里做 301 跳转到主域名。
   主域名必须和 `site.config.json` 的 `siteUrl` 一致。

### 这个项目依赖的 Pages 行为

都是 Pages 的默认行为，不需要额外配置：

- `/plugins/owner/repo` 自动对应 `plugins/owner/repo.html`，访问带 `.html` 的地址会跳到不带的
- 找不到页面时返回根目录的 `404.html`
- `dist/_headers` 里的缓存和安全响应头自动生效

### 上线后做一次

1. [Google Search Console](https://search.google.com/search-console) 添加站点，把验证码填到 `site.config.json` 的 `verification.google`，重新部署后提交 `https://你的域名/sitemap.xml`
2. [Bing Webmaster Tools](https://www.bing.com/webmasters) 同样操作（`verification.bing`），可以直接从 Search Console 导入
3. 要看流量就把 GA4 的衡量 ID（`G-XXXXXXX`）填到 `analytics.ga4`

### 免费版限额

Pages 免费版对每月构建次数、单站文件数、单文件大小有上限（我记得是每月 500 次构建、单站 2 万个文件、单文件 25 MiB，
以[官方限额页](https://developers.cloudflare.com/pages/platform/limits/)为准）。
这个站每个页面是一个文件、中英文各一份，所以**插件数 × 2 接近文件上限时**要升级套餐。

## 二、怎么更新文章

站里有两种文章，写法一样，放的位置不同：

| 类型 | 网址 | 文件位置 |
| --- | --- | --- |
| 教程 | `/tutorials/{slug}` | `content/tutorials/{slug}.en.md` 和 `{slug}.zh.md` |
| 插件文章（挂在某个插件名下） | `/plugins/owner/repo/{slug}` | `content/plugins/owner/repo/articles/{slug}.en.md` 和 `{slug}.zh.md` |

### 发一篇新文章

**1. 生成骨架**

教程（`--category` 必填，可选值见第三部分）：

```bash
npm run new:post -- how-to-install-a-plugin --category install
```

插件文章（插件必须已经收录）：

```bash
npm run new:post -- v2-migration --plugin owner/repo
```

`how-to-install-a-plugin` 这一段就是 slug，会成为网址的一部分，发布后不要再改。
命令会生成英文、中文两个文件，都带 `draft: true`。不想用命令的话，照第三部分的格式手动建文件也一样。

**2. 写内容**

把两个文件里的占位文字换成正文。英文版是默认语言，中文版出现在 `/zh` 下；
只写一种语言也能上线，另一种语言下就没有这一页，构建时会提醒。

**3. 本地预览**

```bash
npm run build -- --drafts
```

```bash
npm run serve
```

打开 `http://localhost:4173` 检查。`--drafts` 会把草稿也构建出来，只用于预览。

**4. 发布**

删掉两个文件里的 `draft: true` 这一行，然后按你的部署方式上线：

- 方式 A（GitHub 自动部署）：提交并推送，Cloudflare 自己构建。草稿不会上线，因为线上构建不带 `--drafts`。

  ```bash
  git add -A
  ```

  ```bash
  git commit -m "post: how-to-install-a-plugin"
  ```

  ```bash
  git push
  ```

- 方式 B（直接上传）：**重新运行一次不带 `--drafts` 的构建**再上传，否则会把草稿一起传上去。

  ```bash
  npm run build
  ```

  ```bash
  npx wrangler pages deploy dist --project-name plugin-dsh
  ```

新文章会自动出现在教程列表、对应分类页、首页的最新教程、`sitemap.xml`、`feed.xml` 和站内搜索里，不用手动加链接。

### 修改已发布的文章

直接改文件。内容有实质变化时在 front matter 加一行 `updated: 2026-11-20`（当天日期），
页面会显示"更新于"，sitemap 的 `lastmod` 也会跟着变，搜索引擎据此判断要不要重新抓取。
只改错别字不用加。

### 撤下一篇文章

加回 `draft: true`（文件保留）或删除文件，重新部署后这个网址返回 404。
已经被搜索引擎收录的文章尽量改内容而不是撤下或改 slug，改了网址，原来的排名就没了。

### 顺带：收录插件和刷新数据

```bash
npm run new:plugin -- owner/repo --category tools
```

生成 `content/plugins/owner/repo/` 下的 `plugin.json`、`en.md`、`zh.md`，写完文案、删掉 `draft: true` 后发布，流程同上。

```bash
npm run sync
```

刷新所有插件的星标、版本等 GitHub 数据，建议每周跑一次再部署。字段说明见根目录的 `README.md`。

## 三、文章格式

### 文件名

`{slug}.{语言}.md`，语言是 `en` 或 `zh`，同一篇文章的两个文件 slug 必须相同：

```
content/tutorials/how-to-install-a-plugin.en.md
content/tutorials/how-to-install-a-plugin.zh.md
```

slug 只用小写英文字母、数字和连字符（中文版的 slug 也用英文），建议直接用英文搜索词，比如 `fix-plugin-not-loading`。
教程的 slug 不能和分类同名（`install`、`configure` 等），也不能叫 `page`；插件文章的 slug 不能叫 `articles`。
文件编码用 UTF-8。

### 文件结构

文件开头两行 `---` 之间是 front matter（YAML 格式的文章信息），后面是 Markdown 正文。
下面是一篇教程的完整样子，正文部分是占位说明：

````markdown
---
title: "标题写成读者会搜索的那个问题"
description: "给搜索结果看的摘要，写清读完这页能做成什么。"
category: install
date: 2026-11-12
updated: 2026-11-20
plugins:
  - tt-a1i/archify
faq:
  - q: "读者做这件事时常问的一个问题？"
    a: "用一两句话回答，可以用 `行内代码` 和 [链接](/tutorials)。"
terms:
  - name: "profile"
    desc: "一句话解释这个术语。"
---

## 先说结论

先用两三句话直接回答标题，再讲背景。

## 操作步骤

1. 第一步

   ```bash
   dsh --profile web --dump-config
   ```

2. 第二步

## 不生效怎么办

最常见的失败情况，以及怎么判断是不是它。
````

### front matter 字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 页面标题，同时是 `<title>` 和 H1。英文 47 个字符以内、中文 23 个字以内时，标题后面会自动加 ` \| Plugin DSH`；上限是英文 60 字符、中文 30 字 |
| `description` | 是 | 搜索结果里显示的摘要。英文 50–160 字符，中文 25–80 字 |
| `category` | 教程必填 | 教程分类，见下表。插件文章不写这一项 |
| `date` | 是 | 发布日期，格式 `2026-11-12`。决定列表里的排序 |
| `updated` | 否 | 最后一次实质修改的日期 |
| `plugins` | 否 | 相关插件，写 `owner/repo`。教程页底部会列出这些插件；没收录的插件会被忽略。仅教程有效 |
| `faq` | 否 | 问答列表，每项有 `q` 和 `a`。显示在正文后面，并输出 FAQPage 结构化数据。仅教程有效 |
| `terms` | 否 | 术语表，每项有 `name` 和 `desc`。仅教程有效 |
| `draft` | 否 | `true` 时不上线 |

中英文两个文件的 `category` 和 `date` 要保持一致。
值里有冒号、引号、`#` 这类符号时，用双引号把整个值包起来（像上面示例那样全部加引号最省事）。

教程分类（`category` 的可选值）：

| 值 | 分类 | 放什么 |
| --- | --- | --- |
| `concept` | 概念 | 插件、profile、bundle 是什么 |
| `install` | 安装 | 启动 Harness、安装插件 |
| `configure` | 配置 | profile、patch 文件、插件设置 |
| `update` | 更新 | 升级本体和插件 |
| `uninstall` | 卸载 | 移除插件、清理残留 |
| `troubleshooting` | 排错 | 报错和不生效的处理 |
| `develop` | 开发 | 自己写插件 |

分类定义在 `content/tutorial-categories.yml`，要加新分类就在那里加一段。

### 正文写法

- **标题层级**：正文从 `##` 开始，不要写 `#`（H1 由 `title` 生成，一页只能有一个）。
  `##` 会进入页面右侧的"本页目录"并带锚点，小节用 `###`。
- **开头直接给答案**：第一个小节用两三句话回答标题里的问题。搜索引擎和 AI 摘要优先引用这种段落。
- **代码块**：用三个反引号并标明语言（`bash`、`json`、`yaml` 等）。命令要能整段复制执行，不要带 `$` 提示符。
- **站内链接**：一律写英文路径，例如 `[Archify](/plugins/tt-a1i/archify)`、`[安装教程](/tutorials/how-to-install-a-plugin)`。
  中文版里也这样写，构建时会自动补上 `/zh`。
- **站外链接**：正常写 `[文字](https://...)`，会自动在新窗口打开。
- **表格**：标准 Markdown 表格，手机上会自动横向滚动。
- **图片**：把图片放到 `src/assets/img/`，正文里写 `![图片说明](/assets/img/文件名.png)`。
  图片说明（alt）要写，对图片搜索有用。图片建议压到 200 KB 以内，文件名用英文。
- **不要用的东西**：原始 HTML 的 `<script>`、`<style>`，以及整段复制别人的 README。照搬的内容对收录没有帮助。

### 构建时的检查

`npm run build` 会校验所有文章：

- **报错并中止**：缺 `title` / `description` / `date` / `category`、分类不存在、slug 冲突、front matter 语法写错
- **只提醒不中止**：标题或摘要超长、摘要过短、缺某一种语言的版本

报错信息会带文件路径，照着改完再构建。方式 A 下如果线上构建失败，Cloudflare 会保留上一个成功的版本，网站不会挂。

