# 采集审批台镜像：只装运行审批台需要的文件，网站本体由 Cloudflare Pages 构建，不在这里。
FROM node:22-alpine

WORKDIR /app

# 定时扫描按容器时间算，默认北京时间；需要别的时区在 docker-compose.yml 里改 TZ
RUN apk add --no-cache tzdata

ENV NODE_ENV=production \
    TZ=Asia/Shanghai \
    ADMIN_DIR=/data \
    ADMIN_HOST=0.0.0.0 \
    ADMIN_PORT=4500

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY scripts/admin.js scripts/
COPY scripts/admin scripts/admin
COPY scripts/lib/paths.js scripts/lib/
COPY site.config.json ./
# 分类表：改写和校验要用
COPY content/categories.yml content/
# 构建镜像时已收录的插件，只用来去重；之后新推送的由运行时读取目标仓库补上
COPY content/plugins content/plugins

# 配置、令牌、队列和日志都写在 /data，挂卷保存，升级镜像不会丢
RUN mkdir -p /data && chown node:node /data
USER node
VOLUME /data

EXPOSE 4500

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1:4500/api/state || exit 1

CMD ["node", "scripts/admin.js"]
