# Plugin DSH 使用手册

这份文档讲四件事：怎么把站点部署到 Cloudflare Pages、每天怎么更新内容、文章该按什么格式写，以及怎么用采集审批台自动找新插件。

## 一、部署到 Cloudflare Pages

### 0. 部署前先改配置

`site.config.json` 里这两项已经填好，换域名或邮箱时改这里：

```json
"siteUrl": "https://www.plugin-dsh.com",
"contactEmail": "3618850359@qq.com",
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


## 四、采集审批台：每天自动找新插件

手动收录之外，还有一个管理页面（采集审批台）：它按你设的时间去 GitHub 搜 DSH 插件，用模型把介绍改写成中英文文案，
放进待审批列表。你逐条检查、通过之后，一次性推送到站点仓库，Cloudflare 随即自动重建。

```bash
npm run admin
```

打开 `http://127.0.0.1:4500`，输入口令登录。本地这样启动时只监听本机，别的电脑访问不到。端口被占用时换一个：

```bash
npm run admin -- --port 4501
```

### 用 Docker 部署到服务器

审批台要一直开着才会定时扫描，所以适合放在服务器上。仓库里带了 `Dockerfile`、`docker-compose.yml` 和镜像构建的 GitHub Action，
流程是：推送代码 → GitHub Action 构建镜像推到 Docker Hub → 服务器拉镜像运行。

**1. 在 GitHub 仓库里配好 Docker Hub 账号**（只做一次）

仓库 → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**，加两个：

| 名称 | 值 |
| --- | --- |
| `DOCKER_USERNAME` | Docker Hub 用户名 |
| `DOCKER_PASSWORD` | Docker Hub 的 Access Token（Docker Hub → Account settings → Personal access tokens 生成） |

镜像名默认是 `plugin-dsh-admin`，想换就在同一页的 **Variables** 里加 `DOCKER_IMAGE_NAME`。

审批台相关的文件（`scripts/admin*`、`Dockerfile`、分类表、`package.json` 等）有改动并推送到 main 时，会自动构建
`用户名/plugin-dsh-admin:latest`；也可以在 **Actions** 页手动运行。审批台推送插件产生的提交只改文案，不会触发构建。

**镜像里带着登录口令，Docker Hub 上的镜像仓库必须设成 Private**，否则任何人拉下镜像都能看到口令。
第一次构建前先在 Docker Hub 点 **Create repository**，名字填 `plugin-dsh-admin`、Visibility 选 **Private**；
服务器拉取前要先 `docker login`。

**2. 服务器上运行**

把仓库里的 `docker-compose.yml` 放到服务器任意目录，镜像名和你的 Docker Hub 用户名不一致时改第一行的 `image`，然后：

```bash
docker compose up -d
```

- 配置、令牌、队列和日志存在名为 `admin-data` 的卷里，升级镜像、重建容器都不会丢
- 容器时区默认北京时间，定时扫描按它算；要改就改 `docker-compose.yml` 里的 `TZ`
- 默认对外开放 4500 端口

**3. 打开管理页面**

浏览器打开 `http://服务器IP:4500`，输入口令进入。登录后这台浏览器 7 天内不用再输，右上角「退出」可以手动退出。
服务器有防火墙或云厂商安全组的话，要放行 4500 端口。

口令写死在 `scripts/admin/auth.js` 开头。万一泄露，不用改代码：在 `docker-compose.yml` 里打开 `ADMIN_PASSWORD` 那一行，
填一个新口令，再 `docker compose up -d`，旧口令和所有已登录的浏览器都会立即失效。

**建议：配域名和 HTTPS**

直接用 `http://IP:4500` 时口令是明文传输的，在公共网络上可能被截获。服务器上已经有 nginx（或宝塔、1Panel）的话，
给审批台配一个子域名和 HTTPS 证书，再把 `docker-compose.yml` 的端口改成 `"127.0.0.1:4500:4500"`，只让 nginx 访问。
nginx 的配置核心是这几行：

```nginx
location / {
    proxy_pass http://127.0.0.1:4500;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

`Host` 和 `X-Forwarded-Proto` 两行要带上：前者让「保存」「推送」这些按钮通过来源校验（少了会报「Origin 不匹配」），
后者让登录 Cookie 只在 HTTPS 下发送。用 Caddy 的话一行就够：`admin.你的域名 { reverse_proxy 127.0.0.1:4500 }`，证书自动申请。

**升级到最新镜像：**

```bash
docker compose pull && docker compose up -d
```

**看日志：**

```bash
docker compose logs -f
```

### 第一次使用：填三样东西

进「设置」页：

**1. GitHub 令牌**（必填）。站点仓库是私有的，平台靠这个令牌读写它，同时用它搜索公开仓库。

1. 打开 GitHub → 右上角头像 → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**
2. **Repository access** 选 **Only select repositories**，只勾站点仓库（例如 `jx009/plugins-dsh`）
3. **Permissions → Repository permissions** 里把 **Contents** 设为 **Read and write**（**Metadata** 会自动带上只读）
4. 生成后复制 `github_pat_` 开头的那串，粘到设置页的「GitHub 令牌」里

用经典令牌也可以，勾 `repo` 权限即可，但它能访问你名下所有仓库，范围比上面大。
令牌到期后扫描和推送都会失败，到时重新生成一个填进来。

**2. 目标仓库和分支**（必填）。写 `owner/repo`，直接贴仓库网址也行；分支填 Cloudflare Pages 的生产分支。

**3. 模型密钥**（建议填）。任何兼容 OpenAI 接口的服务都能用，默认是 DeepSeek（`https://api.deepseek.com/v1`、`deepseek-chat`）。
不填的话扫描照常进行，但候选只带仓库数据和空白骨架，文案要自己写完才能通过。

保存后点「测试连接」，应该看到令牌有效、目标仓库「私有，有写权限」、分支里已有多少个插件。
这三条有任何一条不对，先解决再往下走。

令牌和密钥只保存在本机的 `.admin/config.json`，这个目录不会提交到仓库；页面上只显示首尾几位，日志里不会出现。

### 定时扫描

设置页勾上「每天」并选时间，再填「每次扫描数量」（1–50）。到点后自动扫一次，凑够这个数量的**新**候选就停。

- **管理服务要一直开着才会触发。** 终端窗口关了、电脑睡眠了都不会扫。服务在设定时间之后才启动的话，启动后会补扫当天这一次
- 每天只自动扫一次；想多扫，点右上角「立即扫描」
- 扫描只把候选放进待审批，**不会推送任何东西**

「搜索语句」每行一条，就是 GitHub 仓库搜索的写法，按从上到下的顺序执行，靠前的优先入选。几个例子：

```
topic:dsh-plugin
"dsh plugin" in:name,description,readme
user:某个作者 dsh
org:某个组织 topic:deepseek-harness
```

### 去重

下面这些仓库扫描时自动跳过，不会重复出现：

- 站点里已经收录的（本地 `content/plugins/`）
- 目标仓库分支里已经有的（包括你推送过、但本地还没 `git pull` 的）
- 还在待审批、已通过、已发布列表里的
- 拒绝名单里的
- fork、已归档的仓库，以及星标低于「星标下限」的

判断时不区分大小写。手动添加仓库走的是同一套检查。

### 审批

「待审批」里点开一条，能看到仓库原始描述和改写后的中英文文案，每个字段都可以直接改：

| 按钮 | 作用 |
| --- | --- |
| 保存修改 | 只保存，状态不变 |
| 保存并通过 | 保存并移到「已通过」。有必填项没写、正文里还有「待补 / TODO」时不会通过，页面会列出缺什么，已改的内容照样保存 |
| 重新改写 | 重新拉仓库数据、重新调模型。你手改过的内容会被覆盖 |
| 拒绝 | 移进拒绝名单，以后不再扫到。误拒了可以在「拒绝名单」里恢复 |
| 全部通过 | 把待审批的一次全部通过；只要有一条没写完，就一条都不通过 |

每条候选展开后，顶部有一块「SEO 检查」，保存后会重新检查：

- **必须改**（红色，改好才能通过）：标题里没有插件名；标题太长会被截断；标题和描述里都没有「DSH」或「DeepSeek Harness」；
  描述太短或太长；正文少于 3 个二级标题；常见问题少于 3 条
- **建议改**（不挡通过）：标题或描述没覆盖核心关键词、描述没写满、缺少「报错怎么排查」小节、问答里的问题不带插件名、正文偏短等

标题和描述旁边有实时的宽度计数（中文一个字算 2）。标题宽度不超过 47 时，站点会自动在后面加「| Plugin DSH」；
描述在 100–160 之间最能占满搜索结果的摘要位置。「核心关键词」填用户会直接搜的短语，比如「xxx DSH 插件」，只用于检查，不会显示在网站上。

模型改写时已经按这套规则写：标题带插件名和 DSH，描述第一句定义插件、第二句写读者能学到什么，
正文固定为「是做什么的 / 核心功能 / 怎么安装和使用 / 报错怎么排查」四节，问答 4–6 条且问题都带插件名。

模型判断与 DSH 无关的仓库，以及没有 README 的仓库，会被自动放进拒绝名单并标注「自动」，同样可以恢复。

通过之前建议核对两处：**安装命令**（模型只在 README 里写了 DSH 安装命令时才会填，留空则按 npm 包名套模板生成）
和**分类**。文案是模型根据 README 改写的，功能描述有没有说过头，也值得看一眼。

### 推送

「已通过」页点「推送 N 个到仓库」。平台会先把这批逐条校验一遍，再合成**一次提交**直接写进目标仓库的分支，
每个插件三个文件：`content/plugins/owner/repo/` 下的 `plugin.json`、`en.md`、`zh.md`。
任何一条校验不过，整批都不推。推送成功后这些条目移到「已发布」，并显示提交号。

推送之后：

- Cloudflare Pages（方式 A）检测到新提交，自动构建上线，一两分钟后生效
- **本地仓库记得拉一次**，否则下次本地改内容再推送时会被拒绝：

  ```bash
  git pull
  ```

平台推送不经过本地的 git，所以不会和你本地未提交的修改打架，但也因此本地要靠 `git pull` 才能看到新插件。

### 数据放在哪

全部在项目根目录的 `.admin/` 下，已被 `.gitignore` 排除：

| 文件 | 内容 |
| --- | --- |
| `config.json` | 设置，含令牌和密钥 |
| `queue.json` | 待审批、已通过、已发布的候选 |
| `rejected.json` | 拒绝名单 |
| `state.json` | 上次扫描的结果、当天是否已定时扫过 |
| `admin.log` | 运行日志，页面的「运行日志」显示的就是它 |

换电脑时把整个 `.admin/` 目录拷过去即可。想把数据放到别处，启动前设置环境变量 `ADMIN_DIR` 指向那个目录。
