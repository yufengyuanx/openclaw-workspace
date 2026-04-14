# 100 个 OpenClaw Skills 系列 #12：GitHub 自动化技能

> **发布日期：** 2026-04-09  
> **安全等级：** 🟡 MEDIUM  
> **关键词：** GitHub, 自动化，PR, Issue, CI/CD

---

## 🎯 技能概述

GitHub 自动化技能是开发者必备的效率工具，让 AI 助手帮你处理代码审查、Issue 管理、CI 监控等重复性工作。本次介绍两个核心技能：**gh-issues** 和 **github**。

## 📦 技能介绍

### 1. gh-issues

**功能：** 自动处理 GitHub Issues，孵化修复方案并开启 PR

**核心能力：**
- 搜索并获取 Issues（支持 label、milestone、assignee 过滤）
- 孵化子代理实现修复方案
- 自动开启 PR 并监控评审意见
- 支持 watch 模式持续跟踪
- 可配置定时任务（cron 模式）

**安装命令：**
```bash
openclaw skills install gh-issues
```

**使用示例：**
```bash
/gh-issues owner/repo --label bug --limit 5
/gh-issues owner/repo --watch --interval 5
/gh-issues owner/repo --reviews-only --dry-run
```

**适用场景：**
- 自动修复 bug 类 Issues
- 批量处理带特定 label 的问题
- 持续监控 PR 评审并自动回复
- 团队协作中的 Issue 分派与跟踪

---

### 2. github

**功能：** 通过 `gh` CLI 与 GitHub 深度交互

**核心能力：**
- `gh issue` - Issue 管理
- `gh pr` - PR 创建与审查
- `gh run` - CI/CD 运行监控
- `gh api` - 高级 API 查询
- 支持国内加速（githubproxy.cc）

**安装命令：**
```bash
openclaw skills install github
```

**使用示例：**
```bash
# 创建 Issue
gh issue create --title "Bug: ..." --body "Description..."

# 查看 PR
gh pr list --state open

# 监控 CI
gh run watch

# 高级查询
gh api /repos/owner/repo/pulls
```

**适用场景：**
- 日常 GitHub 操作自动化
- CI/CD 状态监控与通知
- 批量查询与数据导出
- 国内网络环境下的加速访问

---

## 🔒 安全评估

| 维度 | 评级 | 说明 |
|------|------|------|
| 权限范围 | 🟡 MEDIUM | 需要 GitHub token，可读写 Issues/PRs |
| 代码执行 | 🟢 LOW | 不执行用户代码，仅调用 GitHub API |
| 数据外传 | 🟢 LOW | 仅与 GitHub API 通信 |
| 依赖风险 | 🟢 LOW | 依赖官方 gh CLI，可信 |

**建议：**
1. 使用最小权限的 GitHub token
2. 在生产环境启用 `--dry-run` 先测试
3. 定期审查 token 权限范围

---

## 💡 实战案例

### 案例 1：自动 Bug 修复工作流

```yaml
# 每天 9 AM 检查 bug 类 Issues
cron: "0 9 * * *"
command: |
  /gh-issues myorg/myrepo --label bug --limit 3 --fork my-fix-bot
```

### 案例 2：PR 评审自动回复

```bash
# 监控新 PR 评审意见并自动回复
/gh-issues myorg/myrepo --reviews-only --watch --interval 2
```

### 案例 3：CI 失败通知

```bash
# 检查最近 CI 运行状态
gh run list --limit 5 --json conclusion,status
# 失败时发送通知到聊天频道
```

---

## 📊 技能对比

| 特性 | gh-issues | github |
|------|-----------|--------|
| 自动化程度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 学习曲线 | 低 | 中（需了解 gh CLI） |
| 灵活性 | 中 | 高 |
| 适合人群 | 想全自动处理 Issues | 需要精细控制 |

---

## 🚀 进阶技巧

1. **组合使用：** gh-issues 处理自动化，github 处理精细操作
2. **子代理孵化：** 复杂修复任务可 spawn 子代理独立完成
3. **定时任务：** 结合 cron 技能实现定期巡检
4. **通知集成：** 与消息技能联动，实时推送状态

---

## 📚 相关资源

- [OpenClaw GitHub 文档](https://docs.openclaw.ai)
- [gh CLI 官方文档](https://cli.github.com/)
- [ClawHub 技能市场](https://clawhub.ai/skills)
- [GitHub API 文档](https://docs.github.com/en/rest)

---

## ✅ 总结

GitHub 自动化技能是开发者效率的倍增器：
- **gh-issues** 适合全自动处理 Issues 和 PR
- **github** 适合需要精细控制的场景
- 两者结合可覆盖 90% 的 GitHub 工作流

**推荐指数：** ⭐⭐⭐⭐⭐（开发者必备）

---

*下一篇预告：#13 - 数据分析与可视化技能*
