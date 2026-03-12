# OpenClaw 学习资料库 🦞

这个文件夹包含 OpenClaw 的完整学习资料，帮助你从入门到精通。

## 📁 目录结构

```
openclaw-learning/
├── openclaw-guide.html    # 主学习页面（在浏览器中打开）
├── README.md              # 本文件
├── docs/                  # 补充文档（可扩展）
└── assets/                # 图片/资源文件（可扩展）
```

## 🚀 快速开始

1. **打开学习页面**
   ```bash
   # macOS
   open ~/.openclaw/workspace/openclaw-learning/openclaw-guide.html
   
   # Linux
   xdg-open ~/.openclaw/workspace/openclaw-learning/openclaw-guide.html
   
   # 或直接在浏览器中打开文件
   ```

2. **按照学习路径逐步学习**
   - 安装部署 → 基础配置 → 技能系统 → 高级功能

## 📚 学习内容

| 章节 | 内容 | 预计时间 |
|------|------|----------|
| 简介 | OpenClaw 是什么 | 5 分钟 |
| 安装 | macOS/Linux/Docker 安装 | 15 分钟 |
| 启动 | Gateway 服务管理 | 10 分钟 |
| 配置 | 模型/通道/文件配置 | 20 分钟 |
| 目录 | 工作区结构解读 | 15 分钟 |
| 通道 | Telegram/Discord 等配置 | 20 分钟 |
| 工具 | 内置工具使用 | 30 分钟 |
| 技能 | 安装/创建技能 | 45 分钟 |
| 子 Agent | 多 Agent 协作 | 30 分钟 |
| 资源 | 社区/文档/FAQ | 10 分钟 |

## 🎯 学习建议

### 初学者路线
1. 先完成安装和基础配置
2. 使用 WebChat 熟悉基本交互
3. 安装 2-3 个热门技能（weather, tavily-search）
4. 配置 Telegram 通道
5. 尝试使用子 Agent 处理任务

### 进阶路线
1. 深入理解 SOUL.md 和记忆系统
2. 创建自定义技能
3. 配置多通道（Discord + 飞书）
4. 使用子 Agent 实现自动化工作流
5. 参与社区贡献

## 📝 笔记模板

在 `docs/` 目录下创建你的学习笔记：

```markdown
# 我的 OpenClaw 笔记

## 安装记录
- 日期：2026-03-08
- 系统：macOS 14.x
- 遇到的问题：...
- 解决方案：...

## 配置记录
- 模型：Claude Sonnet
- 通道：Telegram
- 技能：weather, tavily-search

## 心得技巧
...
```

## 🔗 外部资源

- **官方文档**: https://docs.openclaw.ai
- **GitHub**: https://github.com/openclaw/openclaw
- **ClawHub**: https://clawhub.com (技能市场)
- **Discord**: https://discord.com/invite/clawd
- **ClawHub 技能列表**: https://clawhub.ai/skills

## 🛠️ 常用命令速查

```bash
# 服务管理
openclaw gateway start|stop|restart|status

# 配置
openclaw configure

# 技能
openclaw skills list
npx clawhub@latest install <skill-name>

# 会话
sessions_spawn task="..."
subagents action="list|kill"

# 状态
openclaw status
```

## 📅 更新日志

- **2026-03-08**: 创建学习资料库，完成 HTML 学习指南

---

**🦞 Happy Learning!**

有问题？访问 [Discord 社区](https://discord.com/invite/clawd) 或提交 GitHub Issue。
