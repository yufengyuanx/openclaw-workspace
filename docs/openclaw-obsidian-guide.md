# OpenClaw + Obsidian 集成指南

> **版本：** 2026-04-10  
> **用途：** 使用 Obsidian 作为 OpenClaw 的记忆和知识库管理系统

---

## 🎯 核心概念

**Obsidian Vault = 普通文件夹**
- 笔记：`*.md` 文件（纯文本 Markdown）
- 配置：`.obsidian/`（工作区和插件设置）
- 画布：`*.canvas`（JSON 格式）
- 附件：图片/PDF 等

**OpenClaw 角色：**
- 读取/搜索笔记
- 自动创建新笔记
- 移动/重命名（自动更新 wikilinks）
- 编辑现有笔记
- 生成每日摘要和记忆导出

---

## 📦 安装步骤

### 方案 1：使用官方 obsidian 技能

```bash
# 安装 obsidian 技能
openclaw skills install obsidian
```

**功能：**
- 模糊/语音搜索
- 自动文件夹检测
- 创建/读取/编辑带 frontmatter 的笔记
- 管理标签和 wikilinks
- 使用 `obsidian-cli` 安全移动/重命名

### 方案 2：使用 openclaw-mem（推荐）

```bash
# 安装 openclaw-mem
git clone https://github.com/phenomenoner/openclaw-mem.git
cd openclaw-mem && pip install -e .
```

**功能：**
- SQLite 持久化记忆
- 每日笔记自动生成
- 渐进式回忆导出
- 可追溯的源引用

### 方案 3：使用 remember.md（第二大脑）

```bash
# 安装 remember.md
openclaw skills install remember
```

**功能：**
- 组织决策、人物、项目、洞察
- Obsidian 兼容格式
- 跨工具知识同步

---

## 🔧 配置示例

### 1. 基础配置（config.yaml）

```yaml
obsidian:
  vault_path: ~/ObsidianVault
  daily_notes_folder: Daily Notes
  knowledge_base_folder: Knowledge Base
  projects_folder: Projects
  
memory:
  export_format: markdown
  auto_summarize: true
  session_logs: true
```

### 2. 目录结构建议

```
ObsidianVault/
├── 01-Session-Logs/      # 会话摘要和关键决策
├── 02-Knowledge-Base/    # 双向链接组织的知识
├── 03-Projects/          # 按项目组织的笔记
├── 04-Daily-Notes/       # 每日笔记
├── 05-People/            # 人物记录
└── 06-Archive/           # 归档
```

---

## 💡 使用场景

### 1. 会话记忆持久化

```bash
# 让 OpenClaw 自动记录会话摘要
"把今天的对话摘要保存到 Obsidian Daily Notes"
```

**输出示例：**
```markdown
# 2026-04-10 会话摘要

## 关键决策
- 决定采用方案 B 进行数据分析
- 确定下周发布 v1.0

## 待办事项
- [ ] 完成 API 文档
- [ ] 审查 PR #42

## 相关链接
[[项目 A]] [[技术方案 B]]
```

### 2. 知识库检索

```bash
# 搜索相关知识
"查找所有关于 Python 异步编程的笔记"

# 跨笔记问答
"根据我的知识库，解释一下我对 React Hooks 的理解"
```

### 3. 自动链接和关联

```bash
# 创建新笔记时自动添加相关链接
"创建一个关于'微服务架构'的笔记，关联现有内容"
```

### 4. 每日/每周回顾

```bash
# 生成每日回顾
"总结我今天的所有笔记和决策"

# 周回顾
"生成本周项目进展报告"
```

---

## 🛠️ 核心命令

### obsidian-cli 用法

```bash
# 搜索笔记
obsidian-cli search "keyword"

# 创建笔记
obsidian-cli create "path/to/note" --content "..."

# 移动笔记（自动更新 links）
obsidian-cli move "old/path" "new/path"

# 删除笔记
obsidian-cli delete "path/to/note"

# 列出笔记
obsidian-cli list [--folder "path"]
```

### OpenClaw 自然语言指令

```bash
# 读取笔记
"读取我的项目计划笔记"

# 搜索
"搜索所有提到性能优化的内容"

# 创建
"创建一个会议记录，标题是'产品评审会'"

# 编辑
"更新技术栈笔记，添加 Rust 相关内容"

# 关联
"找到所有和项目 A 相关的笔记"
```

---

## 🔒 安全最佳实践

### 1. 备份策略

```bash
# 使用 Git 版本控制
cd ~/ObsidianVault
git init
git add .
git commit -m "Initial commit"

# 定期推送
git push origin main
```

### 2. 权限控制

```yaml
# 限制写入权限
permissions:
  read: ["**/*.md"]
  write: ["Daily Notes/**", "Session-Logs/**"]
  deny: [".obsidian/**", "Archive/**"]
```

### 3. 敏感信息处理

- 不要在笔记中存储密码/密钥
- 使用 Obsidian 加密插件保护敏感笔记
- 定期审查导出的记忆内容

---

## 📊 进阶配置

### 1. MCP Server 集成

```bash
# 安装 MCP 文件系统服务器
npm install -g @modelcontextprotocol/server-filesystem

# 配置 OpenClaw 访问 Obsidian
mcp_config:
  filesystem:
    allowed_paths:
      - ~/ObsidianVault
```

### 2. RAG 检索增强

```python
# 使用 QMD 进行本地语义搜索
# QMD 是 S 级插件，只提取相关内容注入上下文

qmd search "query" --vault ~/ObsidianVault
```

### 3. 自动化工作流

```yaml
# cron 定时任务
- name: 每日回顾
  schedule: "0 22 * * *"
  action: |
    生成今日笔记摘要
    更新项目进度
    发送到 Slack
```

---

## 🎓 推荐技能组合

| 技能 | 用途 | 安全等级 |
|------|------|----------|
| `obsidian` | 基础笔记操作 | 🟢 LOW |
| `openclaw-mem` | 记忆持久化 | 🟢 LOW |
| `remember` | 第二大脑组织 | 🟢 LOW |
| `second-brain-ai` | 知识检索 | 🟡 MEDIUM |
| `filesystem-mcp` | 文件访问 | 🟡 MEDIUM |

---

## 📚 学习资源

- [openclaw-mem 文档](https://phenomenoner.github.io/openclaw-mem/obsidian/)
- [remember.md](https://remember.md/)
- [OpenClaw Playbook](https://www.openclawplaybook.ai/guides/how-to-use-openclaw-with-obsidian/)
- [Obsidian 官方文档](https://help.obsidian.md/)

---

## ✅ 快速开始清单

- [ ] 安装 obsidian 技能或 openclaw-mem
- [ ] 配置 Vault 路径
- [ ] 创建目录结构
- [ ] 设置 Git 备份
- [ ] 测试读取/写入功能
- [ ] 配置每日摘要自动化
- [ ] 审查权限设置

---

**最后更新：** 2026-04-10  
**维护者：** OpenClaw 社区
