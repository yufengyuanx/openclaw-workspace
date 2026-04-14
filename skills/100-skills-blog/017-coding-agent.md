# 100 个 OpenClaw Skills 系列 #17：编码代理技能

> **发布日期：** 2026-04-14  
> **安全等级：** 🟡 MEDIUM  
> **关键词：** 编码代理，Codex，Claude Code，自动化编程，代码审查

---

## 🎯 技能概述

编码代理技能 (coding-agent) 让 AI 助手能够委托编码任务给专业的编码代理工具，如 Codex、Claude Code、Pi 等。这是一个强大的自动化编程工具，支持代码生成、PR 审查、代码重构和批量问题修复。技能通过后台进程管理编码代理，支持并行执行和进度追踪。

## 📦 核心技能

### 1. coding-agent

**功能：** 通过 bash 调用 Codex、Claude Code、Pi 等编码代理执行编程任务

**核心能力：**
- 一键生成代码（单文件或完整项目）
- 自动化 PR 审查（支持并行审查多个 PR）
- 代码重构和优化
- 批量问题修复（使用 git worktrees 并行处理）
- 后台任务监控和进度追踪
- 支持多种编码代理（Codex/Claude Code/Pi/OpenCode）

**安装命令：**
```bash
# 安装 Claude Code CLI
npm install -g @anthropic-ai/claude-code

# 安装 Codex CLI
npm install -g @openai/codex

# 安装 Pi Coding Agent
npm install -g @mariozechner/pi-coding-agent
```

**依赖：**
- `claude` 或 `codex` 或 `pi` CLI（至少安装一个）
- Git（Codex 需要 git 仓库环境）
- Node.js（用于安装 CLI 工具）

**使用示例：**
```bash
# 快速单次任务（Codex）
SCRATCH=$(mktemp -d) && cd $SCRATCH && git init && codex exec "创建一个待办事项 API"

# 在项目目录中执行（Codex 需要 PTY）
bash pty:true workdir:~/project command:"codex exec '为 API 调用添加错误处理'"

# Claude Code（不需要 PTY）
bash workdir:~/project command:"claude --permission-mode bypassPermissions --print '重构认证模块'"

# 后台执行长时间任务
bash pty:true workdir:~/project background:true command:"codex exec --full-auto '构建一个贪吃蛇游戏'"

# 监控后台任务进度
process action:log sessionId:XXX

# 检查任务是否完成
process action:poll sessionId:XXX

# 发送输入（如果代理需要确认）
process action:submit sessionId:XXX data:"yes"

# 终止任务
process action:kill sessionId:XXX
```

**Codex 常用模式：**
```bash
# --full-auto：自动批准工作区内的更改（推荐用于构建）
codex exec --full-auto '构建深色模式切换功能'

# --yolo：无沙盒、无批准（最快但最危险）
codex --yolo '重构认证模块'

# review 模式：用于代码审查（不需要特殊标志）
codex review --base origin/main
```

**PR 审查最佳实践：**
```bash
# ⚠️ 永远不要在 OpenClaw 项目目录内审查 PR！
# 方法 1：克隆到临时目录
REVIEW_DIR=$(mktemp -d)
git clone https://github.com/user/repo.git $REVIEW_DIR
cd $REVIEW_DIR && gh pr checkout 130
bash pty:true workdir:$REVIEW_DIR command:"codex review --base origin/main"
trash $REVIEW_DIR  # 清理

# 方法 2：使用 git worktree（保持主分支完整）
git worktree add /tmp/pr-130-review pr-130-branch
bash pty:true workdir:/tmp/pr-130-review command:"codex review --base main"
```

**并行 PR 审查：**
```bash
# 获取所有 PR 引用
git fetch origin '+refs/pull/*/head:refs/remotes/origin/pr/*'

# 并行启动多个 Codex（每个 PR 一个）
bash pty:true workdir:~/project background:true command:"codex exec '审查 PR #86. git diff origin/main...origin/pr/86'"
bash pty:true workdir:~/project background:true command:"codex exec '审查 PR #87. git diff origin/main...origin/pr/87'"

# 监控所有任务
process action:list

# 发布审查结果到 GitHub
gh pr comment <PR#> --body "<审查内容>"
```

**并行问题修复（git worktrees）：**
```bash
# 为每个问题创建 worktree
git worktree add -b fix/issue-78 /tmp/issue-78 main
git worktree add -b fix/issue-99 /tmp/issue-99 main

# 在每个 worktree 中并行修复
bash pty:true workdir:/tmp/issue-78 background:true command:"pnpm install && codex --yolo '修复问题 #78: <描述>. 提交并推送.'"
bash pty:true workdir:/tmp/issue-99 background:true command:"pnpm install && codex --yolo '修复问题 #99. 实现范围内的修改并提交.'"

# 监控进度
process action:list
process action:log sessionId:XXX

# 完成后创建 PR
cd /tmp/issue-78 && git push -u origin fix/issue-78
gh pr create --repo user/repo --head fix/issue-78 --title "fix: ..." --body "..."

# 清理
git worktree remove /tmp/issue-78
git worktree remove /tmp/issue-99
```

---

## 🔒 安全评估

### 权限范围
| 权限类型 | 范围 | 风险等级 |
|---------|------|---------|
| 文件系统 | 工作目录内读写 | 🟡 MEDIUM |
| 代码执行 | 可执行任意 shell 命令 | 🟡 MEDIUM |
| Git 操作 | 提交、推送、创建分支 | 🟡 MEDIUM |
| 网络访问 | 可访问远程仓库 | 🟡 MEDIUM |
| 数据外传 | 取决于代理配置 | 🟡 MEDIUM |

### 安全分析

**🟡 中风险原因：**

1. **代码执行权限**：编码代理可以执行任意 shell 命令，可能修改系统文件
2. **Git 操作风险**：代理可以提交代码、创建分支、推送到远程仓库
3. **工作目录限制**：虽然限制在工作目录，但仍有潜在破坏风险
4. **依赖外部服务**：Codex/Claude Code 等需要访问外部 API
5. **自动批准风险**：`--full-auto` 和 `--yolo` 模式会跳过人工审查

**✅ 安全缓解措施：**

1. **工作目录隔离**：使用 `workdir` 参数限制代理只能访问指定目录
2. **临时目录审查**：PR 审查使用临时目录或 worktree，不影响主项目
3. **沙盒模式**：Codex 默认使用沙盒，`--full-auto` 仅在工作区内自动批准
4. **进度监控**：通过 `process:log` 实时监控代理行为
5. **可终止性**：随时可以使用 `process:kill` 终止异常任务
6. **禁止目录**：明确禁止在 `~/.openclaw` 状态目录内运行（防止读取敏感配置）

**⚠️ 重要规则：**

1. **PTY 要求**：Codex/Pi/OpenCode 必须使用 `pty:true`，Claude Code 不需要
2. **Git 仓库必需**：Codex 拒绝在非 git 目录运行（临时目录需 `git init`）
3. **禁止目录**：永远不要在 `~/.openclaw` 或 `~/clawd` 内运行编码代理
4. **PR 审查隔离**：使用临时目录或 worktree，不要直接在主项目审查
5. **模式选择**：
   - 构建/创建：使用 `--full-auto`
   - 审查：使用默认模式（不需要特殊标志）
   - 快速实验：使用 `--yolo`（但需谨慎）

---

## 🛠️ 实战案例

### 案例 1：快速原型开发

**场景：** 快速创建一个待办事项 REST API

```bash
# 创建临时目录并初始化 git
SCRATCH=$(mktemp -d) && cd $SCRATCH && git init

# 使用 Codex 构建 API
bash pty:true workdir:$SCRATCH command:"codex exec --full-auto '用 Node.js 和 Express 创建一个待办事项 REST API，包含 CRUD 端点、MongoDB 连接、错误处理'"

# 查看生成的代码
ls -la $SCRATCH
cat $SCRATCH/server.js

# 清理（或保留）
trash $SCRATCH
```

### 案例 2：自动化 PR 审查工作流

**场景：** 每天自动审查所有待处理 PR

```bash
# 1. 获取所有 PR
cd ~/Projects/myproject
git fetch origin '+refs/pull/*/head:refs/remotes/origin/pr/*'

# 2. 获取 PR 列表
PR_LIST=$(gh pr list --json number,title --jq '.[].number')

# 3. 并行审查每个 PR
for pr in $PR_LIST; do
  bash pty:true workdir:~/Projects/myproject background:true \
    command:"codex exec '审查 PR #$pr. git diff origin/main...origin/pr/$pr. 输出审查意见.'"
done

# 4. 监控进度
process action:list

# 5. 收集结果并发布评论
# （需要从每个 session 日志中提取审查意见）
```

### 案例 3：批量问题修复

**场景：** 一次性修复 5 个已批准的 bug

```bash
# 1. 为每个问题创建 worktree
git worktree add -b fix/issue-101 /tmp/issue-101 main
git worktree add -b fix/issue-102 /tmp/issue-102 main
git worktree add -b fix/issue-103 /tmp/issue-103 main
git worktree add -b fix/issue-104 /tmp/issue-104 main
git worktree add -b fix/issue-105 /tmp/issue-105 main

# 2. 并行启动修复（每个 worktree 一个 Codex）
bash pty:true workdir:/tmp/issue-101 background:true \
  command:"pnpm install && codex --yolo '修复 issue #101: 空指针异常。提交更改.'"
bash pty:true workdir:/tmp/issue-102 background:true \
  command:"pnpm install && codex --yolo '修复 issue #102: 边界条件错误。提交更改.'"
bash pty:true workdir:/tmp/issue-103 background:true \
  command:"pnpm install && codex --yolo '修复 issue #103: 内存泄漏。提交更改.'"
bash pty:true workdir:/tmp/issue-104 background:true \
  command:"pnpm install && codex --yolo '修复 issue #104: 竞态条件。提交更改.'"
bash pty:true workdir:/tmp/issue-105 background:true \
  command:"pnpm install && codex --yolo '修复 issue #105: 输入验证缺失。提交更改.'"

# 3. 监控所有任务
process action:list

# 4. 等待完成后推送并创建 PR
cd /tmp/issue-101 && git push -u origin fix/issue-101
gh pr create --repo user/repo --head fix/issue-101 --title "fix: 空指针异常 (#101)" --body "Fixes #101"

# 重复步骤 4 对其他问题...

# 5. 清理 worktrees
git worktree remove /tmp/issue-101
# ... 对其他 worktree 重复
```

### 案例 4：代码重构

**场景：** 重构认证模块，添加 JWT 支持

```bash
# 在项目目录中执行
cd ~/Projects/myproject

# 使用 Claude Code 进行重构（不需要 PTY）
bash workdir:~/Projects/myproject background:true \
  command:"claude --permission-mode bypassPermissions --print '重构 auth 模块：
1. 将 session-based 认证改为 JWT
2. 添加 token 刷新机制
3. 更新所有认证中间件
4. 添加单元测试
5. 更新文档

完成后运行：openclaw system event --text \"Done: Auth 模块重构完成\" --mode now'"

# 监控进度
process action:log sessionId:XXX

# 检查完成状态
process action:poll sessionId:XXX
```

### 案例 5：带通知的长时间任务

**场景：** 构建完整功能，完成后自动通知

```bash
bash pty:true workdir:~/project background:true \
  command:"codex --yolo exec '构建一个完整的用户认证系统，包括：
- 注册/登录端点
- JWT token 生成和验证
- 密码加密（bcrypt）
- 邮箱验证
- 密码重置流程

当完全完成后，运行此命令通知我：
openclaw system event --text \"Done: 用户认证系统构建完成，包含注册/登录/JWT/邮箱验证/密码重置\" --mode now'"

# 这样 OpenClaw 会在几秒钟内收到完成通知，而不是等待下次心跳
```

---

## 📋 完整参数参考

### Bash 工具参数

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `command` | string | 要执行的 shell 命令 | `codex exec '任务'` |
| `pty` | boolean | 分配伪终端（Codex/Pi/OpenCode 必需） | `pty:true` |
| `workdir` | string | 工作目录（代理只能访问此目录） | `workdir:~/project` |
| `background` | boolean | 后台运行，返回 sessionId | `background:true` |
| `timeout` | number | 超时时间（秒） | `timeout:300` |
| `elevated` | boolean | 在主机而非沙盒中运行 | `elevated:true` |

### Process 工具动作

| 动作 | 说明 | 示例 |
|------|------|------|
| `list` | 列出所有运行中的会话 | `process action:list` |
| `poll` | 检查会话是否仍在运行 | `process action:poll sessionId:XXX` |
| `log` | 获取会话输出 | `process action:log sessionId:XXX` |
| `write` | 发送原始数据到 stdin | `process action:write sessionId:XXX data:"y"` |
| `submit` | 发送数据 + 换行（如输入后按 Enter） | `process action:submit sessionId:XXX data:"yes"` |
| `send-keys` | 发送键令牌或十六进制字节 | `process action:send-keys sessionId:XXX keys:["Enter"]` |
| `paste` | 粘贴文本 | `process action:paste sessionId:XXX text:"代码"` |
| `kill` | 终止会话 | `process action:kill sessionId:XXX` |

### Codex CLI 标志

| 标志 | 效果 | 适用场景 |
|------|------|---------|
| `exec "prompt"` | 单次执行，完成后退出 | 快速任务 |
| `--full-auto` | 沙盒内自动批准工作区更改 | 构建/创建 |
| `--yolo` | 无沙盒、无批准 | 快速实验（谨慎使用） |

### Claude Code 标志

| 标志 | 效果 |
|------|------|
| `--permission-mode bypassPermissions` | 绕过权限确认（推荐） |
| `--print` | 打印输出（保持完整工具访问） |

---

## 🔧 故障排查

### 问题 1：Codex 拒绝在非 git 目录运行

**症状：** `Error: Codex requires a git repository`

**解决方案：**
```bash
# 初始化临时 git 仓库
SCRATCH=$(mktemp -d) && cd $SCRATCH && git init && codex exec "任务"
```

### 问题 2：输出乱码或代理挂起

**症状：** 输出混乱或代理无响应

**解决方案：**
```bash
# Codex/Pi/OpenCode 必须使用 pty:true
bash pty:true workdir:~/project command:"codex exec '任务'"

# Claude Code 不需要 pty，使用 --print 模式
bash workdir:~/project command:"claude --permission-mode bypassPermissions --print '任务'"
```

### 问题 3：后台任务无法监控

**症状：** 无法获取 sessionId 或日志

**解决方案：**
```bash
# 确保使用 background:true
bash pty:true workdir:~/project background:true command:"codex exec '任务'"

# 列出所有会话获取 sessionId
process action:list

# 获取日志
process action:log sessionId:XXX limit:50
```

### 问题 4：代理修改了错误的文件

**症状：** 代理修改了工作目录外的文件

**解决方案：**
```bash
# 始终使用 workdir 限制访问范围
bash pty:true workdir:~/specific/project command:"codex exec '任务'"

# 永远不要在 ~ 或 / 等根目录运行
# ❌ 错误：workdir:~
# ✅ 正确：workdir:~/Projects/myproject
```

### 问题 5：PR 审查污染主项目

**症状：** 审查 PR 时修改了主分支代码

**解决方案：**
```bash
# 使用临时目录
REVIEW_DIR=$(mktemp -d)
git clone https://github.com/user/repo.git $REVIEW_DIR
cd $REVIEW_DIR && gh pr checkout 130
bash pty:true workdir:$REVIEW_DIR command:"codex review --base origin/main"
trash $REVIEW_DIR

# 或使用 git worktree
git worktree add /tmp/pr-review pr-branch
bash pty:true workdir:/tmp/pr-review command:"codex review --base main"
git worktree remove /tmp/pr-review
```

---

## 📊 技能对比

| 技能 | 代理支持 | 安装难度 | 安全等级 | 适用场景 |
|------|---------|---------|---------|---------|
| coding-agent | Codex/Claude Code/Pi | 🟡 中等 (npm) | 🟡 MEDIUM | 专业编码任务 |
| github | GitHub CLI | 🟢 简单 (brew) | 🟢 LOW | GitHub 操作 |
| gh-issues | GitHub 问题自动化 | 🟢 内置 | 🟢 LOW | 问题追踪 |
| smart-explore | 代码搜索 | 🟢 内置 | 🟢 LOW | 代码探索 |

---

## 🚀 下一步

**下一篇预告：** #18 - 音乐控制技能（spotify-player, sonoscli）

**建议主题：**
- 音乐播放控制
- 笔记管理增强
- 通讯工具集成

---

## 📚 相关资源

- [Codex CLI 官方文档](https://github.com/openai/codex)
- [Claude Code 官方文档](https://docs.anthropic.com/claude-code)
- [Pi Coding Agent](https://github.com/mariozechner/pi-coding-agent)
- [100 Skills 系列 #01: skill-vetter](./001-skill-vetter.md)
- [100 Skills 系列 #16: smart-home-automation](./016-smart-home-automation.md)

---

_本系列每日更新，追踪 OpenClaw 生态系统中最实用的 100 个技能。_
