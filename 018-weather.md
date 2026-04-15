# 100 Skills #18: Weather - 无需 API Key 的天气查询技能

**发布日期**: 2026-04-15  
**技能名称**: weather  
**安全等级**: 🟢 LOW  
**进度**: 18/100 (18%)

---

## 📋 概述

`weather` 技能让你无需任何 API Key 即可快速获取全球任意城市的天气信息和预报。它基于两个免费的天气服务：wttr.in（主要）和 Open-Meteo（备用），完全免费且无需注册。

**适用场景**:
- 快速查询当前天气
- 获取多日天气预报
- 在自动化脚本中集成天气数据
- 心流检查时获取天气提醒

---

## 🛠️ 核心技能

### 1. 快速查询（单行输出）

```bash
curl -s "wttr.in/London?format=3"
# 输出：London: ⛅️ +8°C
```

### 2. 详细格式（自定义字段）

```bash
curl -s "wttr.in/London?format=%l:+%c+%t+%h+%w"
# 输出：London: ⛅️ +8°C 71% ↙5km/h
```

**格式代码**:
- `%c` - 天气状况图标
- `%t` - 温度
- `%h` - 湿度
- `%w` - 风速和风向
- `%l` - 位置
- `%m` - 月相

### 3. 完整预报

```bash
curl -s "wttr.in/London?T"
```

显示 ASCII 艺术风格的 3 天预报，包含温度曲线、降水概率、风速等详细信息。

### 4. 实用技巧

```bash
# 城市名含空格（URL 编码）
curl -s "wttr.in/New+York?format=3"

# 使用机场代码
curl -s "wttr.in/JFK?format=3"

# 指定单位：m (公制) / u (英制)
curl -s "wttr.in/Beijing?format=3&m"

# 仅今天 / 仅当前
curl -s "wttr.in/Shanghai?1"  # 今天
curl -s "wttr.in/Shanghai?0"  # 当前

# 下载 PNG 图片
curl -s "wttr.in/Berlin.png" -o /tmp/weather.png
```

### 5. 备用服务：Open-Meteo（JSON 格式）

适合程序化使用：

```bash
curl -s "https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=-0.12&current_weather=true"
```

返回结构化 JSON 数据，包含温度、风速、天气代码等。

---

## 🔒 安全评估

**风险等级**: 🟢 LOW

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 权限范围 | ✅ 只读 | 仅发起 HTTP GET 请求 |
| 代码执行 | ✅ 无 | 纯 curl 命令，无脚本执行 |
| 数据外传 | ✅ 无 | 不收集或发送用户数据 |
| API Key | ✅ 无需 | 完全免费，无需认证 |
| 依赖服务 | ✅ 可靠 | wttr.in 和 Open-Meteo 均为知名免费服务 |

**结论**: 安全，可直接使用。

---

## 💡 实战案例

### 案例 1: 每日天气提醒（配合 Heartbeat）

在 Heartbeat 检查中加入天气：

```bash
# 添加到 HEARTBEAT.md 或 cron 任务
curl -s "wttr.in/Shanghai?format=3"
```

### 案例 2: 自动化脚本中的天气判断

```bash
#!/bin/bash
WEATHER=$(curl -s "wttr.in/Shanghai?format=%c")
if [[ "$WEATHER" == *"🌧"* ]] || [[ "$WEATHER" == *"⛈"* ]]; then
    echo "今天有雨，记得带伞！"
fi
```

### 案例 3: 在 Obsidian 笔记中嵌入天气

使用 Templater 插件：

```javascript
<%*
const weather = await tp.system.exec('curl -s "wttr.in/Shanghai?format=3"');
%>
**当前天气**: <%= weather %>
```

### 案例 4: 终端美化（.zshrc）

在欢迎语中加入天气：

```bash
# ~/.zshrc
echo "🌤️  $(curl -s wttr.in/Shanghai?format=3)"
```

---

## 📦 安装与使用

**安装**:
```bash
# OpenClaw 内置技能，无需安装
# 或手动安装到 agent skills
```

**使用**:
```bash
# 通过 OpenClaw 调用
openclaw skill weather --location Shanghai

# 或直接使用 curl
curl -s "wttr.in/Shanghai?format=3"
```

---

## 🔗 相关资源

- **wttr.in 帮助**: https://wttr.in/:help
- **Open-Meteo 文档**: https://open-meteo.com/en/docs
- **系列上一篇**: [#17 coding-agent](./017-coding-agent.md)
- **系列下一篇**: #19 (敬请期待)

---

**100 Skills 系列** - 每天一个实用技能，让你的 AI 助手更强大 🚀
