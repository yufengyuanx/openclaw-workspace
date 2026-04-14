# Skill Blog 工作流

**项目位置**: `~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/`

---

## 10 步执行流程

| Step | 操作 | 验证 |
|------|------|------|
| 1 | 确认下一篇编号 | 编号连续 |
| 2 | 搜索 ClawHub 热门技能 | 找到相关技能 |
| 3 | 读取技能 SKILL.md | 理解核心功能 |
| 4 | 撰写博客草稿 | 格式完整 |
| 5 | 安全审查 (skill-vetter) | 🟢 LOW 或 🟡 MEDIUM |
| 6 | 最终审核 | 技术准确性 |
| 7 | Git Commit & Push | push 成功 |
| 8 | 更新进度追踪 | agent-config.json 已更新 |
| 9 | 部署验证 | 文件存在且可读 |
| 10 | 发送总结 | 用户收到通知 |

---

## Step 1: 确认下一篇编号

**操作：**
- 读取 `~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/agent-config.json`
- 确认 `progress.nextNumber`
- 验证编号连续

**验证：**
- ✅ 编号连续 (last→next)
- ✅ 主题明确

---

## Step 2: 搜索 ClawHub 热门技能

**操作：**
- 搜索 ClawHub 热门技能
- 选择与 `nextSkill` 相关的技能
- 确认技能受欢迎程度

**验证：**
- ✅ 找到相关技能
- ✅ 安装方式明确

---

## Step 3: 读取技能 SKILL.md

**操作：**
- 读取技能 `SKILL.md` (系统路径：`~/.local/lib/node_modules/openclaw/skills/*/SKILL.md`)
- 理解核心功能
- 确认安装方式

**验证：**
- ✅ 理解技能用途
- ✅ 命令示例完整

---

## Step 4: 撰写博客草稿

**操作：**
- 按照模板格式撰写
- 包含：概述、核心技能、安全评估、实战案例
- **文件路径**: `~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/{number}-{skill}.md`

**验证：**
- ✅ 草稿完整
- ✅ 格式正确

---

## Step 5: 安全审查

**操作：**
- 使用 `skill-vetter` 审查
- 评估权限范围
- 检查代码执行风险

**通过标准：**
- 🟢 LOW: 直接通过
- 🟡 MEDIUM: 需要最终审核确认
- 🔴 HIGH: 跳过，选择其他技能

---

## Step 6: 最终审核

**操作：**
- 检查技术准确性
- 验证命令和示例
- 确认格式正确

**验证：**
- ✅ 无错误
- ✅ 命令可执行

---

## Step 7: Git Commit & Push

**操作：**
```bash
cd ~/Documents/ObsidianVaults/OpenClaw-Skills-Blog
git add {number}-{skill}.md
git commit -m "[100-skills] #{number}: {skill}"
git push origin main
```

**验证：**
- ✅ Commit 成功
- ✅ Push 成功

---

## Step 8: 更新进度追踪

**操作：**
- 更新 `~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/agent-config.json`:
  - `progress.published++`
  - `progress.lastPublished = number`
  - `progress.lastDate = today`
  - `progress.lastSkill = skill`
  - `progress.nextNumber++`
- 添加文件到 `retainedFiles`

**验证：**
- ✅ agent-config.json 已更新

---

## Step 9: 部署验证

**操作：**
- 检查博客文件可访问
- 验证格式正确

**验证：**
- ✅ 文件存在
- ✅ 格式正确

---

## Step 10: 发送总结

**操作：**
- 生成 10 步执行结果表格
- 发送微信通知

**验证：**
- ✅ 用户收到通知
- ✅ 日志已记录

---

## Step 11: 更新主记忆 Vault（新增）

**操作：**
- 更新 `~/Documents/ObsidianVaults/OpenClaw-Memory/03-Projects/Skill-Blog-100/index.md`
- 更新进度为 `#{number}/100`
- 记录发布日期

**验证：**
- ✅ 主记忆 Vault 已更新

---

## 日志格式

记录到 `~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/logs/YYYY-MM-DD.md`：

```markdown
# Skill Blog Log - YYYY-MM-DD

**任务：** 【每日 Skill 推荐博客 - 100 Skills 系列】#XX

| Step | 操作 | 结果 | 验证 | 备注 |
|------|------|------|------|------|
| 1 | 确认下一篇编号 | ✅ | ✅ | #XX - skill-name |
| 2 | 搜索 ClawHub 热门技能 | ✅ | ✅ | 技能热门 |
| 3 | 读取技能 SKILL.md | ✅ | ✅ | 草稿已存在 |
| 4 | 撰写博客草稿 | ✅ | ✅ | 格式完整 |
| 5 | 安全审查 | ✅ | ✅ | 🟢 LOW / 🟡 MEDIUM |
| 6 | 最终审核 | ✅ | ✅ | 技术准确性确认 |
| 7 | Git Commit & Push | ✅ | ✅ | commit xxx, push 成功 |
| 8 | 更新进度追踪 | ✅ | ✅ | agent-config.json 已更新 |
| 9 | 部署验证 | ✅ | ✅ | 文件存在且可读 |
| 10 | 发送总结 | ✅ | ✅ | 微信通知已发送 |
| 11 | 更新主记忆 Vault | ✅ | ✅ | 项目索引已更新 |

## 发布详情
- **编号：** #XX
- **技能：** skill-name
- **安全等级：** 🟢 LOW / 🟡 MEDIUM
- **发布日期：** YYYY-MM-DD
- **Git Commit:** abc123
- **文件路径：** ~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/{number}-{skill}.md

**状态：** ✅ 全部成功
```

---

## 失败处理

| 失败点 | 处理方式 |
|--------|---------|
| Step 1-3 | 重试 3 次，失败则告警 |
| Step 4-6 | 跳过，选择其他技能 |
| Step 7-9 | 重试 3 次，失败则告警 |
| Step 10 | 记录日志，下次补发 |
| Step 11 | 记录日志，不影响发布 |

---

## 通知配置

**渠道**: 微信 (WeChat)

**发送方式**:
```bash
openclaw message send \
  --channel openclaw-weixin \
  --target "o9cq80wSi_GdWvGFFwx5cQD_AUIo@im.wechat" \
  --message "Skill Blog #XX 发布成功..."
```

**成功消息模板**:
```
✅ Skill Blog #XX 发布成功

技能：{skill-name}
安全等级：🟢 LOW / 🟡 MEDIUM
Git Commit: {commit-hash}
文件：{number}-{skill}.md

进度：{published}/100 ({percentage}%)
```

**失败消息模板**:
```
❌ Skill Blog #XX 发布失败

步骤：Step {N} - {step-name}
错误：{error-message}
请检查日志：~/Documents/ObsidianVaults/OpenClaw-Skills-Blog/logs/{date}.md
```

---

_最后更新：2026-04-15_
