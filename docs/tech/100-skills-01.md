# 100 Skills 系列 #01: OpenCLI - 让 AI 访问 30+ 网站和桌面应用

> **系列说明：** 这是「100 Skills 系列」的第一篇，每日推荐一个 ClawHub 热门 Skill，包含功能介绍、安装指南、使用场景和安全审查报告。

---

## 📊 基本信息

| 项目 | 值 |
|------|-----|
| **Skill 名称** | opencli |
| **版本** | 1.0.0 |
| **来源** | ClawHub |
| **作者 ID** | kn7e5kebnb52tmmtdg374ace6580444c |
| **下载量** | 已安装于多个 OpenClaw 实例 |
| **最后更新** | 2026 年 3 月 |
| **文章编号** | 100-skills-01 |

---

## 🎯 功能介绍

**OpenCLI Skill** 是一个强大的「桥梁型」Skill，它让 AI Agent 能够访问和操作 **30+ 网站**、**桌面应用** 和**外部 CLI 工具**。

### 核心能力

#### 1. 网站数据获取 🌐
通过复用 Chrome 浏览器登录状态，从以下平台获取数据：

| 类别 | 支持平台 |
|------|----------|
| **社交媒体** | Twitter/X, Reddit, 微博，即刻 |
| **视频平台** | Bilibili, YouTube, 小红书 |
| **问答社区** | 知乎，V2EX, StackOverflow, Linux-Do |
| **新闻资讯** | BBC, Bloomberg, Reuters, HackerNews, Dev.to |
| **求职招聘** | Boss 直聘，LinkedIn |
| **电商购物** | Coupang, 什么值得买 |
| **金融财经** | 雪球，Yahoo Finance, Barchart |
| **其他** | 微信读书，携程，Wikipedia, arXiv, Steam |

#### 2. 桌面应用控制 💻
控制本地安装的桌面应用（需要应用正在运行）：

- **Cursor**: 控制 Composer、提取代码、历史记录
- **Codex**: 驱动 OpenAI Codex CLI
- **ChatGPT**: 自动化 ChatGPT macOS 应用
- **ChatWise**: 多 LLM 客户端控制
- **Notion**: 搜索、读取、写入 Notion 页面
- **Discord**: 消息、频道、服务器操作
- **Antigravity**: 从终端控制 Antigravity Ultra
- **Grok**: Grok 桌面应用

#### 3. 外部 CLI Hub 🛠️
发现、自动安装和传递命令到外部 CLI：

- `gh` - GitHub CLI
- `docker` - Docker 命令行
- `kubectl` - Kubernetes 工具
- `obsidian` - Obsidian vault 管理
- `readwise` - Readwise & Reader CLI

#### 4. 媒体下载 📥
下载图片、视频和文章：

- **小红书**: 图片、视频
- **Bilibili**: 视频（需要 yt-dlp）
- **Twitter**: 图片、视频
- **知乎**: 文章（Markdown 格式）

---

## 📦 安装指南

### 前置要求

1. **Node.js >= 20.0.0**
2. **Chrome 浏览器**（用于网站命令）
3. **Browser Bridge 扩展**（用于浏览器自动化）

### 步骤 1: 安装 OpenCLI

```bash
npm install -g @jackwener/opencli
```

### 步骤 2: 安装 Browser Bridge 扩展

1. 访问 [GitHub Releases](https://github.com/jackwener/opencli/releases) 下载最新扩展
2. 在 Chrome 打开 `chrome://extensions`
3. 启用**开发者模式**
4. 拖放 `.crx` 文件或解压后的文件夹

### 步骤 3: 验证安装

```bash
opencli list          # 查看所有可用命令
opencli doctor        # 检查扩展和守护进程连接
opencli doctor --live # 测试实时浏览器命令
```

### 步骤 4: （可选）安装视频下载工具

```bash
# 使用 pip
pip install yt-dlp

# 或使用 Homebrew (macOS)
brew install yt-dlp
```

---

## 💡 使用场景

### 场景 1: 获取热门内容

```bash
# Bilibili 热门视频
opencli bilibili hot --limit 10

# 知乎热榜
opencli zhihu hot

# Hacker News 热门
opencli hackernews top --limit 5

# 微博热搜
opencli weibo hot

# Reddit 热门
opencli reddit hot --limit 10
```

### 场景 2: 搜索信息

```bash
# Bilibili 搜索教程
opencli bilibili search --keyword "AI 教程" --limit 10

# 知乎搜索技术文章
opencli zhihu search --keyword "机器学习"

# YouTube 搜索视频
opencli youtube search --keyword "OpenAI"

# arXiv 论文搜索
opencli arxiv search --keyword "transformer"

# 小红书搜索攻略
opencli xiaohongshu search --keyword "美食"
```

### 场景 3: 下载媒体内容

```bash
# 下载 Bilibili 视频
opencli bilibili download --bvid BV1xxx --output ./videos

# 下载小红书笔记媒体
opencli xiaohongshu download --note-id abc123 --output ./xhs

# 下载 Twitter 媒体
opencli twitter download elonmusk --limit 20 --output ./twitter

# 导出知乎文章为 Markdown
opencli zhihu download "https://zhuanlan.zhihu.com/p/xxx" --output ./zhihu
```

### 场景 4: 控制桌面应用

```bash
# 检查 Cursor 状态
opencli cursor status

# Notion 搜索
opencli notion search --query "项目"

# ChatGPT 发送消息
opencli chatgpt send --message "Hello"

# Discord 读取消息
opencli discord-app read
```

### 场景 5: 使用外部 CLI

```bash
# GitHub PR 列表
opencli gh pr list --limit 5

# Docker 容器列表
opencli docker ps

# Kubernetes Pod 状态
opencli kubectl get pods
```

---

## 📝 使用例子

### 例子 1: 获取 Bilibili 热门视频（JSON 格式）

```bash
opencli bilibili hot --limit 5 -f json
```

**输出示例：**
```json
[
  {
    "title": "2026 年 AI 发展趋势",
    "bvid": "BV1xxx",
    "views": 1234567,
    "url": "https://www.bilibili.com/video/BV1xxx"
  },
  ...
]
```

### 例子 2: 搜索知乎并导出文章

```bash
# 搜索
opencli zhihu search --keyword "OpenClaw" --limit 3

# 下载特定文章
opencli zhihu download "https://zhuanlan.zhihu.com/p/123456" --output ./articles
```

### 例子 3: 多平台热门内容聚合

```bash
# 创建一个脚本获取多个平台热门内容
opencli bilibili hot --limit 5 -f md > /tmp/hot.md
opencli zhihu hot --limit 5 -f md >> /tmp/hot.md
opencli hackernews top --limit 5 -f md >> /tmp/hot.md
```

### 例子 4: 探索新网站

```bash
# 深度探索网站 API
opencli explore https://example.com --site mysite

# 生成 YAML 适配器
opencli synthesize mysite

# 一键生成 CLI
opencli generate https://example.com --goal "hot"
```

---

## 🔒 Skill-Vetter 安全审查报告

### 审查信息

| 项目 | 值 |
|------|-----|
| **审查日期** | 2026-03-30 |
| **审查工具** | skill-vetter v1.0.0 |
| **审查者** | OpenClaw Security Protocol |

### 来源检查 ✅

- [x] 来源：ClawHub (https://clawhub.ai)
- [x] 作者 ID: kn7e5kebnb52tmmtdg374ace6580444c
- [x] 版本：1.0.0
- [x] 已安装并验证

### 代码审查 ✅

**审查结果：**

| 检查项 | 状态 | 说明 |
|--------|------|------|
| `exec` 调用用户输入 | ✅ 通过 | SKILL.md 仅包含文档，无可执行代码 |
| 未知域名网络调用 | ✅ 通过 | 无内置网络调用，依赖外部 opencli 工具 |
| 凭证收集模式 | ✅ 通过 | 未发现 |
| 工作区外文件访问 | ✅ 通过 | 仅文档，无文件操作 |
| 依赖版本固定 | ✅ 通过 | 依赖外部 NPM 包 @jackwener/opencli |
| 混淆/压缩代码 | ✅ 通过 | 无 |

**红标检测：** 🚩 **无红标**

### 权限分析

| 权限类型 | 需求 | 说明 |
|----------|------|------|
| **文件** | 工作区读写 | 用于保存下载的媒体内容 |
| **网络** | 多个网站 | 通过 opencli 工具访问 30+ 平台 |
| **命令** | opencli, yt-dlp | 需要安装外部工具 |

### 风险评估

**风险等级：** 🟡 **MEDIUM（中等）**

**评估理由：**

1. **Skill 本身安全**：SKILL.md 仅包含文档和使用说明，无恶意代码
2. **依赖外部工具**：实际功能由 `@jackwener/opencli` NPM 包提供
3. **浏览器自动化**：需要 Chrome 扩展，复用登录状态（用户需自行判断信任度）
4. **网络访问广泛**：可访问 30+ 网站，但均为公开 API 或用户已登录的会话

### 审查结论

** verdict：** ✅ **SAFE TO INSTALL（安全可安装）**

**建议：**

1. ✅ 可以安全安装此 Skill
2. ⚠️ 使用前请确保理解 opencli 工具的权限范围
3. ⚠️ 浏览器命令会复用 Chrome 登录状态，请确保在可信环境中使用
4. ℹ️ 建议定期运行 `opencli doctor` 检查连接状态

---

## ⚖️ 优缺点分析

### 优点 ✅

| 优点 | 说明 |
|------|------|
| **功能强大** | 支持 30+ 网站和多个桌面应用，覆盖面广 |
| **易于扩展** | 支持自定义网站适配器和 CLI 集成 |
| **输出灵活** | 支持 table/json/yaml/md/csv 多种格式 |
| **复用登录状态** | 无需单独配置 API 密钥，使用 Chrome 会话 |
| **开源透明** | GitHub 公开源码，可审查 |
| **活跃维护** | 持续更新，支持新平台 |

### 缺点 ❌

| 缺点 | 说明 |
|------|------|
| **依赖 Chrome** | 浏览器命令需要 Chrome 运行并登录 |
| **需要扩展** | 必须安装 Browser Bridge 扩展 |
| **学习曲线** | 需要熟悉各平台命令和参数 |
| **隐私考虑** | 复用登录状态可能带来隐私风险 |
| **视频下载依赖** | 需要额外安装 yt-dlp |

---

## 📚 相关资源

- **GitHub**: https://github.com/jackwener/opencli
- **NPM**: https://www.npmjs.com/package/@jackwener/opencli
- **许可证**: Apache-2.0
- **Node.js 要求**: >= 20.0.0

---

## 📌 总结

**OpenCLI** 是一个功能强大的「桥梁型」Skill，它让 AI Agent 能够访问互联网上的丰富资源。通过复用 Chrome 浏览器登录状态，它可以安全地获取用户已授权平台的数据，而无需配置复杂的 API 密钥。

**适用人群：**

- 需要从多个平台获取信息的用户
- 希望自动化桌面应用操作的用户
- 需要下载社交媒体媒体内容的用户
- 想要扩展 AI Agent 能力的开发者

**安全建议：**

- 仅在可信环境中使用浏览器自动化功能
- 定期审查 opencli 工具的更新和权限变更
- 不要在共享或公共计算机上使用此 Skill

---

*本文是「100 Skills 系列」的第 1 篇。明日将继续推荐下一个热门 Skill。*

**系列索引：** [100-skills-01](./100-skills-01.md) | 下一篇：待发布
