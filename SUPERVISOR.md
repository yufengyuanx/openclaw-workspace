# 主智能体监督机制

## 职责

主智能体负责监督子智能体的执行情况，确保 Skill Blog 发布任务正常完成。

---

## 监督流程

### 每日 09:30 检查（子智能体执行后 30 分钟）

**检查内容：**

1. **检查 agent-config.json**
   ```bash
   cat ~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/agent-config.json | jq .progress
   ```
   - `progress.lastDate` 是否为今天？
   - `progress.lastPublished` 是否递增？

2. **检查新博客文件**
   ```bash
   ls -la ~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/018-*.md
   ```
   - 文件是否存在？
   - 文件大小是否合理（>1KB）？

3. **检查日志**
   ```bash
   tail -30 ~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/logs/2026-04-16.md
   ```
   - 日志是否完整？
   - 所有步骤是否成功？

4. **检查 Git 提交**
   ```bash
   cd ~/Documents/ObsidianVaults/OpenClaw-Skills-Blog && git log --oneline -1
   ```
   - 是否有新的 commit？

---

## 异常处理

### 场景 1: 子智能体未完成（09:30 检查失败）

**检测条件：**
- `progress.lastDate` 不是今天
- 没有新的日志文件

**处理方式：**
1. 检查子智能体状态：`openclaw subagents list`
2. 查看 cron 任务状态：`openclaw cron list`
3. 手动触发：`openclaw cron run dc33dbb0-b556-4980-9d55-49098f73ccb1`
4. 发送告警通知

---

### 场景 2: 子智能体执行失败

**检测条件：**
- 日志中有 `❌` 标记
- `lastStatus` 为 `failed`

**处理方式：**
1. 读取错误日志
2. 分析失败原因
3. 根据失败步骤处理：
   - Step 1-3 失败 → 检查网络和 ClawHub
   - Step 4-6 失败 → 选择其他技能
   - Step 7-9 失败 → 检查 Git 配置
4. 重新触发或手动执行

---

### 场景 3: Git Push 失败

**检测条件：**
- Step 7 标记为 `❌`
- Git 远程仓库不可达

**处理方式：**
1. 检查网络连接
2. 检查 Git 凭证
3. 本地 commit 先保存
4. 网络恢复后 push

---

## Cron 配置

### 监督任务（新增）

```json
{
  "name": "skill-blog-监督",
  "schedule": {
    "kind": "cron",
    "expr": "30 9 * * *",
    "tz": "Asia/Shanghai"
  },
  "payload": {
    "kind": "systemEvent",
    "text": "检查 Skill Blog 子智能体执行情况"
  },
  "sessionTarget": "main"
}
```

---

## 通知配置

### 成功通知
- **时间**: 子智能体发送（Step 10）
- **渠道**: 微信
- **内容**: 发布成功摘要

### 失败告警
- **时间**: 09:30 检查发现失败
- **渠道**: 微信
- **内容**: 失败步骤 + 错误信息 + 处理建议

### 超时告警
- **时间**: 09:30 未检测到完成
- **渠道**: 微信
- **内容**: 子智能体可能卡住，建议检查

---

## 每周检查（周日 10:00）

结合"知识库每周 Lint 检查"任务：

1. 检查本周发布了几篇
2. 检查 agent-config.json 是否一致
3. 检查日志是否完整
4. 检查 Git 历史记录

---

## 状态追踪

### skill-blog-state.json

**位置**: `~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/skill-blog-state.json`

**内容**:
```json
{
  "lastCheck": "2026-04-15T09:30:00+08:00",
  "lastStatus": "success",
  "lastPublished": 17,
  "consecutiveSuccess": 5,
  "consecutiveFailures": 0,
  "lastError": null
}
```

---

_创建日期：2026-04-15_
