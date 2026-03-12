# Learnings Log

Track corrections, knowledge gaps, and best practices.

## Format

```markdown
## [LRN-YYYYMMDD-XXX] category

**Logged**: ISO-8601 timestamp
**Priority**: low | medium | high | critical
**Status**: pending
**Area**: frontend | backend | infra | tests | docs | config

### Summary
One-line description

### Details
Full context

### Suggested Action
Specific fix or improvement

### Metadata
- Source: conversation | error | user_feedback
- Related Files: path/to/file.ext
- Tags: tag1, tag2

---
```

## Entries

### [LRN-20260310-001] 定时任务超时优化

**Logged**: 2026-03-10T09:30:00+08:00
**Priority**: high
**Status**: resolved
**Area**: infra

### Summary
小红书发布任务因 MCP 服务启动超时，导致每日 AI 新闻发布失败

### Details
- Cron 任务每天 9:00 执行，但 MCP 服务未预热
- 首次启动需下载 headless 浏览器 (~150MB) + 初始化，耗时>5 分钟
- 原 timeout 设置 300 秒，导致任务失败

### Suggested Action
✅ 已完成：
1. 增加预启动任务（8:55 AM 启动 MCP 服务）
2. 发布任务 timeout 从 5 分钟 → 10 分钟
3. 简化流程：用新闻原图 URL，不生成新图片

### Metadata
- Source: error
- Related Files: ~/.openclaw/cron/jobs.json
- Tags: cron, timeout, xiaohongshu, mcp

---

### [LRN-20260310-002] 搜索 API 密钥配置

**Logged**: 2026-03-10T09:15:00+08:00
**Priority**: high
**Status**: resolved
**Area**: config

### Summary
web_search 和 tavily 搜索工具缺少 API 密钥，导致无法执行每日 AI 新闻任务

### Details
- Brave Search API 未配置：`BRAVE_API_KEY`
- Tavily API 已提供但未存入配置：`TAVILY_API_KEY=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`
- 导致 HEARTBEAT.md 的每日 AI 新闻任务无法执行

### Suggested Action
✅ 临时方案：在命令中直接传入 TAVILY_API_KEY 环境变量
📋 待办：运行 `openclaw configure --section web` 永久配置

### Metadata
- Source: error
- Related Files: /Users/frankyuan/.openclaw/workspace/HEARTBEAT.md
- Tags: api-key, search, tavily, config

---

### [LRN-20260310-003] 技能优化清理

**Logged**: 2026-03-10T23:24:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: config

### Summary
删除冗余技能，从 21 个减少到 16 个 (-24%)

### Details
删除的技能：
1. `memory-recall` - 与 `openviking-memory` 功能重复
2. `ov-add-data` - 合并到 `ov-search-context`
3. `github-proxy` - 合并到 `github` 技能
4. `opencode` - 不使用
5. `stock-photo-finder` - 不使用

### Suggested Action
✅ 已完成删除
✅ 已更新 `github` 技能，合并加速功能

### Metadata
- Source: conversation
- Related Files: ~/.agents/skills/
- Tags: skills, optimization, cleanup

---

<!-- Append new entries above this line -->
