# 每日 Skill 推荐博客 - 完整工作流

**目标**：每天 9:00 自动发布一篇 100 Skills 系列文章，全流程自动化 + 验证

---

## 📋 执行流程（10 步）

### Step 1: 读取已有文章列表
```bash
ls blog/docs/tech/100-skills-*.md
```
**验证**：获取最大编号 XX，下一篇为 XX+1
**失败处理**：如无文章，从 #01 开始

---

### Step 2: 搜索 ClawHub 热门 Skills
```bash
# 方式 1: 读取本地 clawhub 仓库
# 方式 2: 调用 ClawHub API
# 方式 3: web_search 搜索 ClawHub 热门
```
**验证**：获取至少 10 个候选 skills
**失败处理**：尝试备用方案

---

### Step 3: 过滤已写过的 Skills
```bash
# 读取已发布文章标题/内容，提取 skill 名称
# 对比候选列表，排除已写过的
```
**验证**：剩余候选 ≥ 3 个
**失败处理**：扩大搜索范围

---

### Step 4: 选择下一个 Skill
**规则**：
1. 优先下载量高的
2. 优先功能不同的（避免重复类型）
3. 优先有完整文档的

**输出**：选定的 skill 名称、作者、下载量

---

### Step 5: 安全审查 (skill-vetter)
```bash
# 读取 skill 的 SKILL.md 和脚本
# 检查：
#   - 是否有可疑命令执行
#   - 是否有网络请求
#   - 是否有文件写入
#   - 权限是否合理
```
**验证**：风险等级 ≤ MEDIUM
**失败处理**：如 HIGH/EXTREME，换下一个候选

---

### Step 6: 创建博客文章
**文件**：`blog/docs/tech/100-skills-XX.md`

**结构**：
```markdown
---
title: "100 个 Skills 第 XX 期：Skill 名称"
date: YYYY-MM-DD
description: 描述
tags: [OpenClaw, Skill, 分类]
readingTime: 估算
---

# 标题

## 基本信息（表格）
## 功能介绍
## 安装指南
## 使用场景
## 使用例子（代码块）
## 安全审查报告
## 优缺点分析
```

**验证**：文件创建成功，字数 ≥ 1500

---

### Step 7: 更新系列页面表格
**文件**：`blog/docs/tech/series/100-skills.md`

**操作**：
1. 在对应月份表格中添加新文章（第 1 行）
2. 如当前是新月，添加新的月份表格
3. 更新"热门推荐"为最新 skill
4. 更新统计信息（已发布期数 +1）

**验证**：
- 表格包含最新文章（第 1 行）
- 月份正确（如 3 月/4 月）
- 统计数字正确

---

### Step 8: Git 提交
```bash
git add blog/docs/tech/series/100-skills.md
git add blog/docs/tech/index.md
git commit -m "chore: 更新 100-skills 系列页面添加 #XX"
git push
```
**验证**：push 成功，返回 commit hash
**失败处理**：重试 3 次，失败则报警

---

### Step 9: 等待部署（可选）
```bash
# 如配置了 GitHub Actions / Vercel 等
# 等待 30-60 秒
# 检查部署状态
```
**验证**：部署成功或跳过

---

### Step 10: 验证发布结果
```bash
# 方式 1: curl 检查文章 URL 是否可访问
# 方式 2: 检查 GitHub Pages 状态
# 方式 3: 检查部署日志
```
**验证**：HTTP 200 或部署状态 success
**失败处理**：记录错误，通知用户

---

### Step 11: 发送总结给用户
**内容**：
```
✅ 每日 Skill 推荐博客 #XX 发布成功

| 项目 | 内容 |
|------|------|
| Skill 名称 | xxx |
| 作者 | @xxx |
| 下载量 | xxx |
| 安全等级 | 🟢/🟡/🔴 |
| 文章链接 | https://... |
| Commit | abc123 |
| 部署状态 | ✅ 成功 |

进度：XX/100
```

---

## 📝 执行记录模板

保存到 `memory/skill-blog-log-YYYY-MM-DD.md`：

```markdown
# Skill Blog 执行记录 - 2026-03-31

**开始时间**: 09:00:00
**结束时间**: 09:07:32
**总耗时**: 7m32s

## Step 执行结果

| Step | 名称 | 状态 | 输出/错误 |
|------|------|------|-----------|
| 1 | 读取已有文章 | ✅ | 最大编号：03 |
| 2 | 搜索热门 Skills | ✅ | 候选 15 个 |
| 3 | 过滤已写过 | ✅ | 剩余 12 个 |
| 4 | 选择 Skill | ✅ | opencli-tool (89k+) |
| 5 | 安全审查 | ✅ | MEDIUM |
| 6 | 创建文章 | ✅ | 2340 字 |
| 7 | 更新系列页面 | ✅ | 表格已更新 |
| 8 | Git 提交 | ✅ | commit: abc123 |
| 9 | 等待部署 | ✅ | 45s |
| 10 | 验证发布 | ✅ | HTTP 200 |
| 11 | 发送总结 | ✅ | 已推送 |

## 最终状态
- 系列进度：4/100
- 累计成功：4
- 累计失败：0
- 下次执行：2026-04-01 09:00
```

---

## ⚠️ 错误处理

| 错误类型 | 处理方式 |
|----------|----------|
| API 失败 | 重试 3 次，换备用方案 |
| Git 失败 | 检查认证，重试 3 次 |
| 部署失败 | 记录错误，通知用户 |
| 安全审查不通过 | 换下一个候选 |
| 超时 | 记录部分结果，通知用户 |

---

## 🔧 Cron 配置

```json
{
  "name": "每日 Skill 推荐博客",
  "schedule": "0 9 * * *",
  "timezone": "Asia/Shanghai",
  "timeoutSeconds": 600,
  "payload": {
    "kind": "agentTurn",
    "message": "【每日 Skill 推荐博客 - 100 Skills 系列】\n\n按照 memory/cron-skill-blog-workflow.md 的 11 步流程执行。\n\n每一步都要：\n1. 执行操作\n2. 验证结果（必须通过验证才继续）\n3. 记录到 memory/skill-blog-log-YYYY-MM-DD.md\n\n**关键检查点**：\n- Step 7: 必须更新系列页面表格（添加新月或更新当前月）\n- Step 10: 必须验证文章和系列页面都可访问\n\n全部成功后发送总结给用户。\n\n开始执行。"
  },
  "delivery": {
    "mode": "announce",
    "channel": "openclaw-weixin",
    "to": "<user_id>",
    "accountId": "<account_id>"
  }
}
```
