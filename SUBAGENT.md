# skill-blogger-100 子智能体配置

## 启动命令

```bash
openclaw sessions spawn \
  --runtime subagent \
  --mode session \
  --label skill-blogger-100 \
  --task "负责 100 Skills 博客系列的完整生命周期" \
  --cleanup keep
```

## Cron 配置

- **Job ID**: `dc33dbb0-b556-4980-9d55-49098f73ccb1`
- **Schedule**: 每天 08:00 (Asia/Shanghai)
- **Next Run**: 2026-04-16 08:00

## 子智能体任务

```
你负责 100 Skills 博客系列的完整生命周期：

1. 每日 9:00 AM 前完成博客发布
2. 从 agent-config.json 读取当前进度
3. 自主选择下一篇技能主题
4. 执行 workflow.md 中的 10 步流程
5. 更新 agent-config.json 进度
6. 写入 logs/YYYY-MM-DD.md 执行日志
7. 发送微信通知（成功/失败）

当前进度：17/100 (17%)
下一篇：#18 (待确定)
```

## 状态检查

```bash
# 查看 cron 状态
openclaw cron list

# 查看子智能体状态
openclaw subagents list

# 查看最新日志
cat ~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/logs/2026-04-*.md | tail -50
```

## 手动触发

```bash
openclaw cron run dc33dbb0-b556-4980-9d55-49098f73ccb1
```

## 故障排除

| 问题 | 解决方案 |
|------|---------|
| Cron 未执行 | 检查 `openclaw cron status` |
| 子智能体失败 | 查看 `logs/` 目录错误日志 |
| 进度不同步 | 手动更新 `agent-config.json` |

---
_创建于：2026-04-15_
