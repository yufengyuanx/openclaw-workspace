# 100 个 OpenClaw Skills 系列 #15：测试自动化技能

> **发布日期：** 2026-04-12  
> **安全等级：** 🟡 MEDIUM  
> **关键词：** 测试自动化，GitHub Issues, CI/CD, 并行代理

---

## 🎯 技能概述

测试自动化技能让 AI 助手能够自动发现 GitHub Issues、分析代码库、生成修复方案、创建 PR 并处理代码审查。这是一个完整的自动化测试与修复工作流，适合需要持续集成和快速问题响应的开发团队。

## 📦 核心技能

### 1. gh-issues

**功能：** 自动修复 GitHub Issues 并创建 Pull Requests

**核心能力：**
- 自动抓取和过滤 GitHub Issues
- 并行启动多个 sub-agents 同时修复多个问题
- 自动创建分支、提交代码、推送 PR
- 监控 PR 审查评论并自动修复
- 支持 Fork 模式（为开源项目贡献）
- Watch 模式持续监控新 Issues
- Cron 模式定时批量处理

**安装命令：**
```bash
openclaw skills install gh-issues
```

**依赖：**
- `gh` CLI (GitHub 命令行工具)
- `curl` (API 调用)
- `git` (版本控制)
- `GH_TOKEN` 环境变量 (GitHub API 认证)

**使用示例：**
```bash
# 修复指定 repo 的所有 bug 标签 issues
/gh-issues owner/repo --label bug --limit 5

# 仅处理分配给我的 issues
/gh-issues owner/repo --assignee @me

# 为你的 fork 创建 PRs（开源贡献）
/gh-issues owner/repo --fork yourname/repo --label "good first issue"

# 持续监控模式（每 5 分钟检查新 issues）
/gh-issues owner/repo --watch --interval 5

# Cron 安全模式（启动后有子代理立即退出）
/gh-issues owner/repo --cron --limit 10

# 仅处理 PR 审查评论（跳过 issue 处理）
/gh-issues owner/repo --reviews-only
```

**完整参数：**
| 参数 | 默认值 | 说明 |
|------|--------|------|
| `owner/repo` | _(自动检测)_ | 源仓库（issues 所在） |
| `--label` | _(无)_ | 按标签过滤（如 `bug`, `enhancement`） |
| `--limit` | 10 | 每次获取的最大 issues 数 |
| `--milestone` | _(无)_ | 按里程碑标题过滤 |
| `--assignee` | _(无)_ | 按分配人过滤（`@me` 为自己） |
| `--state` | open | Issue 状态：open, closed, all |
| `--fork` | _(无)_ | 你的 fork 仓库（用于推送分支和创建 PRs） |
| `--watch` | false | 持续轮询新 issues 和 PR 审查 |
| `--interval` | 5 | 轮询间隔（分钟，仅 watch 模式） |
| `--reviews-only` | false | 仅处理 PR 审查评论，跳过 issue 处理 |
| `--cron` | false | Cron 安全模式：启动子代理后立即退出 |
| `--dry-run` | false | 仅获取并显示，不执行修复 |
| `--yes` | false | 跳过确认，自动处理所有过滤后的 issues |
| `--model` | _(默认)_ | 子代理使用的模型（如 `glm-5`） |
| `--notify-channel` | _(无)_ | Telegram 频道 ID，发送最终 PR 摘要 |

---

### 2. coding-agent

**功能：** 委托编码任务给 Codex、Claude Code 或 Pi 代理

**核心能力：**
- 后台运行编码代理（不阻塞主会话）
- 支持多种编码代理（Codex, Claude Code, Pi, OpenCode）
- PTY 模式支持交互式 CLI
- 并行运行多个代理（最多 8 个并发）
- 监控代理进度和日志
- 自动通知完成状态

**安装命令：**
```bash
# 安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 安装 Codex
npm install -g @openai/codex

# 安装 Pi
npm install -g @mariozechner/pi-coding-agent
```

**使用示例：**
```bash
# 快速一次性任务（Codex 需要 git 仓库）
SCRATCH=$(mktemp -d) && cd $SCRATCH && git init && codex exec "为这个函数添加错误处理"

# 在项目中运行（后台模式）
bash pty:true workdir:~/project background:true command:"codex exec --full-auto '为 API 端点添加单元测试'"

# Claude Code（不需要 PTY）
bash workdir:~/project background:true command:"claude --permission-mode bypassPermissions --print '重构认证模块'"

# 监控后台代理进度
process action:log sessionId:XXX

# 并行审查多个 PR
bash pty:true workdir:~/project background:true command:"codex exec 'Review PR #86. git diff origin/main...origin/pr/86'"
bash pty:true workdir:~/project background:true command:"codex exec 'Review PR #87. git diff origin/main...origin/pr/87'"
```

**适用场景：**
- 自动化单元测试生成
- 代码审查和 PR 分析
- 大规模重构
- 并行处理多个 issues/PRs

---

## 🔒 安全评估

| 维度 | 评级 | 说明 |
|------|------|------|
| 权限范围 | 🟡 MEDIUM | 需要 GitHub API 写权限和 git 推送权限 |
| 代码执行 | 🟡 MEDIUM | 子代理自动执行代码修改和测试 |
| 数据外传 | 🟢 LOW | 代码推送到 GitHub，不上传敏感数据 |
| 依赖风险 | 🟢 LOW | 依赖成熟的 GitHub API 和 git 工具 |

**建议：**
1. 使用最小权限的 GitHub Token（仅 repo 范围）
2. 在 fork 模式下为开源项目贡献，避免直接修改主仓库
3. 审查子代理生成的代码再合并 PR
4. 使用 `--dry-run` 预览将要处理的问题
5. 大项目先用 `--limit 1` 测试工作流

---

## 💡 实战案例

### 案例 1：Bug 自动修复流水线

```bash
# 每天凌晨 2 点自动修复 bug 标签 issues
cron: "0 2 * * *"
command: |
  /gh-issues myorg/myproject \
    --label bug \
    --limit 3 \
    --cron \
    --notify-channel -1002381931352
```

**工作流：**
1. 获取最多 3 个带 `bug` 标签的 open issues
2. 为每个 issue 启动一个 sub-agent
3. 子代理分析代码、生成修复、创建 PR
4. 完成后发送 Telegram 通知（包含 PR 链接）
5. 立即退出（不等待子代理完成）

---

### 案例 2：开源项目贡献机器人

```bash
# 为多个开源项目自动贡献"good first issue"
/gh-issues facebook/react --fork yourname/react --label "good first issue" --limit 2 --yes
/gh-issues vercel/next.js --fork yourname/next.js --label "good first issue" --limit 2 --yes
```

**优势：**
- 自动 fork 并创建修复分支
- PR 指向原仓库
- 无需手动切换目录
- 并行处理多个项目

---

### 案例 3：持续监控与修复

```bash
# Watch 模式：持续监控并自动修复
/gh-issues myorg/myproject \
  --label bug \
  --watch \
  --interval 10 \
  --yes
```

**行为：**
- 首次轮询时获取 issues 并确认
- 之后每 10 分钟自动检查新 issues
- 自动处理无需再次确认
- 同时监控已创建 PR 的审查评论
- 说 "stop" 退出 watch 模式

---

### 案例 4：PR 审查自动响应

```bash
# 仅处理 PR 审查评论（适合代码审查后自动修复）
/gh-issues myorg/myproject --reviews-only --yes
```

**场景：**
- PR 已创建，等待审查反馈
- 审查者提出修改意见
- 自动读取评论、修改代码、推送更新、回复评论
- 减少人工往返时间

---

## 📊 技能对比

| 技能 | 优势 | 局限 |
|------|------|------|
| gh-issues | 完整 Issue→PR 工作流 | 需要 GitHub API 权限 |
| coding-agent | 灵活支持多种代理 | 需手动管理工作流 |
| 传统 CI | 稳定可靠 | 缺乏智能分析能力 |

**推荐组合：** gh-issues（内部已使用 coding-agent 作为子代理）

---

## 🛠️ 技术栈

**核心工具：**
- `curl` - GitHub REST API 调用
- `git` - 版本控制和分支管理
- `jq` - JSON 解析和处理
- `gh` CLI - GitHub 命令行（可选，用于辅助操作）

**GitHub API 端点：**
- `GET /repos/{owner}/{repo}/issues` - 获取 issues
- `POST /repos/{owner}/{repo}/pulls` - 创建 PRs
- `GET /repos/{owner}/{repo}/pulls/{number}/reviews` - 获取审查
- `POST /repos/{owner}/{repo}/issues/{number}/comments` - 回复评论

**子代理架构：**
- 主代理：协调工作流、API 调用、状态跟踪
- 子代理：并行执行代码分析、修复、测试、提交
- Claims 文件：防止重复处理（`/data/.clawdbot/gh-issues-claims.json`）
- Cursor 文件：Cron 模式进度跟踪（`/data/.clawdbot/gh-issues-cursor-{repo}.json`）

---

## 🚀 进阶技巧

1. **Fork 模式贡献开源：**
   ```bash
   # 为多个项目批量贡献
   for repo in react next.js tailwind; do
     /gh-issues vercel/$repo --fork yourname/$repo --label "good first issue" --limit 1 --yes
   done
   ```

2. **Cron + Watch 组合：**
   ```bash
   # 每小时检查一次，每次处理最多 5 个 issues
   cron: "0 * * * *"
   command: /gh-issues myorg/myproject --label bug --limit 5 --cron
   ```

3. **模型选择优化：**
   ```bash
   # 复杂 issue 用更强模型
   /gh-issues myorg/myproject --label "critical" --model glm-5 --limit 2
   
   # 简单 issue 用默认模型
   /gh-issues myorg/myproject --label "documentation" --limit 5
   ```

4. **Telegram 通知集成：**
   ```bash
   # 所有 PR 摘要发送到频道
   /gh-issues myorg/myproject --notify-channel -1002381931352 --cron
   ```

5. **自信度检查：**
   子代理在实施前会评估自信度（1-10 分），低于 7 分会跳过并报告原因，避免盲目修改。

---

## ⚠️ 注意事项

1. **Token 安全：**
   - GH_TOKEN 存储在 `~/.openclaw/openclaw.json` 或 `/data/.clawdbot/openclaw.json`
   - 使用最小权限（仅 repo 范围）
   - 定期轮换 token

2. **分支命名：**
   - 所有修复分支命名为 `fix/issue-{N}`
   - 避免与现有分支冲突

3. **Claims 机制：**
   - 防止多个代理同时处理同一个 issue
   - Claim 超时 2 小时后自动过期
   - 手动清理：`rm /data/.clawdbot/gh-issues-claims.json`

4. **测试要求：**
   - 子代理会尝试发现并运行现有测试
   - 测试失败会报告并尝试修复一次
   - 仍失败则标记为需要人工审查

5. **超时处理：**
   - 子代理限时 60 分钟
   - 超时后标记为 "Timed out"
   - 需要人工介入

---

## 📚 相关资源

- [GitHub REST API 文档](https://docs.github.com/en/rest)
- [GitHub CLI 文档](https://cli.github.com/manual/)
- [OpenClaw gh-issues Skill](~/.local/lib/node_modules/openclaw/skills/gh-issues/SKILL.md)
- [GitHub Actions 自动化](https://github.com/features/actions)

---

## ✅ 总结

测试自动化技能是持续集成和快速问题响应的核心：
- **gh-issues** 实现 Issue→PR 全自动化
- **coding-agent** 提供灵活的编码代理支持
- **并行架构** 同时处理多个问题
- **安全机制** 防止重复处理和权限滥用

**推荐指数：** ⭐⭐⭐⭐⭐（开源维护者/团队必备）

**下一步：** 结合 cron 技能实现定时自动修复，结合 Telegram 通知实现实时状态跟踪

---

*下一篇预告：#16 - 智能家居自动化技能 (Home Assistant/米家集成)*
