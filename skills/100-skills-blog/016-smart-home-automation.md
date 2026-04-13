# 100 个 OpenClaw Skills 系列 #16：智能家居自动化技能

> **发布日期：** 2026-04-13  
> **安全等级：** 🟢 LOW  
> **关键词：** 智能家居，Philips Hue，灯光控制，场景自动化

---

## 🎯 技能概述

智能家居自动化技能让 AI 助手能够控制 Philips Hue 灯光系统，包括开关、亮度调节、颜色变换和场景激活。这是一个安全、本地化的智能家居控制方案，所有命令都通过本地网络执行，不涉及云端 API 调用。

## 📦 核心技能

### 1. openhue

**功能：** 通过 OpenHue CLI 控制 Philips Hue 灯光和场景

**核心能力：**
- 控制单个灯光或整个房间
- 调节亮度（0-100%）
- 调节色温（153-500 mirek，暖色到冷色）
- 设置颜色（按名称或十六进制）
- 激活预设场景（如"Relax"、"Concentrate"、"Movie"）
- 支持房间和区域批量控制

**安装命令：**
```bash
# 安装 OpenHue CLI
brew install openhue/cli/openhue-cli
```

**依赖：**
- `openhue` CLI (通过 Homebrew 安装)
- Philips Hue Bridge (必须在本地网络)
- 首次运行需要在 Hue Bridge 上按下配对按钮

**使用示例：**
```bash
# 列出所有资源
openhue get light       # 列出所有灯光
openhue get room        # 列出所有房间
openhue get scene       # 列出所有场景

# 开关控制
openhue set light "Bedroom Lamp" --on
openhue set light "Bedroom Lamp" --off

# 亮度调节
openhue set light "Bedroom Lamp" --on --brightness 50

# 色温调节（暖色到冷色）
openhue set light "Bedroom Lamp" --on --temperature 300

# 颜色设置
openhue set light "Bedroom Lamp" --on --color red
openhue set light "Bedroom Lamp" --on --rgb "#FF5500"

# 房间控制
openhue set room "Bedroom" --off
openhue set room "Bedroom" --on --brightness 30

# 场景激活
openhue set scene "Relax" --room "Bedroom"
openhue set scene "Concentrate" --room "Office"
```

**快速预设：**
```bash
# 睡前模式（暖色低亮度）
openhue set room "Bedroom" --on --brightness 20 --temperature 450

# 工作模式（高亮度冷色）
openhue set room "Office" --on --brightness 100 --temperature 250

# 电影模式（低亮度）
openhue set room "Living Room" --on --brightness 10
```

---

## 🔒 安全评估

### 权限范围
| 权限类型 | 范围 | 风险等级 |
|---------|------|---------|
| 网络访问 | 本地网络 (LAN) | 🟢 LOW |
| 设备控制 | Philips Hue Bridge  only | 🟢 LOW |
| 数据外传 | 无 | 🟢 LOW |
| 系统访问 | 无 | 🟢 LOW |

### 安全分析

**🟢 低风险原因：**

1. **本地网络限制**：所有命令仅在本地网络执行，不涉及互联网
2. **单一设备范围**：只能控制 Philips Hue 设备，无法访问其他智能家居设备
3. **无数据外传**：不收集或发送任何用户数据到外部服务器
4. **物理配对要求**：首次使用需要在 Hue Bridge 上按下物理按钮，防止远程未授权访问
5. **只读资源发现**：`get` 命令仅读取设备状态，不执行控制

**⚠️ 注意事项：**

- Hue Bridge 必须与运行 OpenClaw 的设备在同一局域网
- 首次配对需要物理接触 Hue Bridge（按下按钮）
- 颜色功能仅支持彩色灯泡（白色灯泡不支持）
- 不支持非 Philips Hue 品牌的智能设备

---

## 🛠️ 实战案例

### 案例 1：晨间唤醒自动化

**场景：** 每天早上 7:00 自动打开卧室灯光，模拟日出效果

```bash
# 7:00 AM - 低亮度暖色唤醒
openhue set room "Bedroom" --on --brightness 10 --temperature 450

# 7:05 AM - 逐渐增亮
openhue set room "Bedroom" --on --brightness 50 --temperature 350

# 7:10 AM - 完全唤醒
openhue set room "Bedroom" --on --brightness 100 --temperature 300
```

**Cron 配置：**
```cron
0 7 * * * openhue set room "Bedroom" --on --brightness 10 --temperature 450
5 7 * * * openhue set room "Bedroom" --on --brightness 50 --temperature 350
10 7 * * * openhue set room "Bedroom" --on --brightness 100 --temperature 300
```

### 案例 2：家庭影院模式

**场景：** 一键设置观影环境

```bash
# 客厅灯光调暗
openhue set room "Living Room" --on --brightness 10

# 关闭主灯，开启氛围灯
openhue set light "Main Light" --off
openhue set light "Ambient Strip" --on --rgb "#4A00E0" --brightness 30

# 激活"Movie"场景（如有预设）
openhue set scene "Movie" --room "Living Room"
```

### 案例 3：离家安全模式

**场景：** 出门时自动关闭所有灯光

```bash
# 关闭所有房间
openhue set room "Bedroom" --off
openhue set room "Living Room" --off
openhue set room "Kitchen" --off
openhue set room "Office" --off

# 或者使用全局关闭（如果支持）
# openhue set all --off
```

### 案例 4：专注工作模式

**场景：** 进入深度工作状态

```bash
# 办公室高亮度冷色光
openhue set room "Office" --on --brightness 100 --temperature 250

# 激活"Concentrate"场景
openhue set scene "Concentrate" --room "Office"
```

---

## 📋 完整参数参考

| 命令 | 参数 | 说明 | 示例 |
|------|------|------|------|
| `get light` | _(无)_ | 列出所有灯光 | `openhue get light` |
| `get room` | _(无)_ | 列出所有房间 | `openhue get room` |
| `get scene` | _(无)_ | 列出所有场景 | `openhue get scene` |
| `set light` | `--on`/`--off` | 开关控制 | `--on` |
| `set light` | `--brightness 0-100` | 亮度调节 | `--brightness 50` |
| `set light` | `--temperature 153-500` | 色温 (mirek) | `--temperature 300` |
| `set light` | `--color <name>` | 颜色 (名称) | `--color red` |
| `set light` | `--rgb "#RRGGBB"` | 颜色 (十六进制) | `--rgb "#FF5500"` |
| `set room` | `--on`/`--off` | 房间开关 | `--off` |
| `set room` | `--brightness 0-100` | 房间亮度 | `--brightness 30` |
| `set scene` | `--room <name>` | 激活场景 | `--room "Bedroom"` |

---

## 🔧 故障排查

### 问题 1：无法连接到 Hue Bridge

**症状：** `Error: Unable to connect to bridge`

**解决方案：**
```bash
# 1. 确认 Bridge 在同一网络
ping 192.168.x.x  # Bridge IP

# 2. 检查 Bridge 是否在线
openhue get light

# 3. 重新配对（按下 Bridge 按钮后重试）
openhue set light "Test" --on
```

### 问题 2：灯光名称不匹配

**症状：** `Error: Light not found`

**解决方案：**
```bash
# 1. 列出所有灯光确认名称
openhue get light

# 2. 使用精确名称（包括大小写和空格）
openhue set light "Bedroom Lamp" --on  # 不是 "bedroom lamp"
```

### 问题 3：颜色不支持

**症状：** 颜色命令无效果

**解决方案：**
```bash
# 确认灯泡支持彩色
openhue get light | grep -A5 "Bedroom Lamp"

# 只有限色灯泡支持颜色，白色灯泡仅支持亮度和色温
```

---

## 📊 技能对比

| 技能 | 设备支持 | 安装难度 | 安全等级 | 适用场景 |
|------|---------|---------|---------|---------|
| openhue | Philips Hue only | 🟢 简单 (brew) | 🟢 LOW | Hue 用户首选 |
| homebrew | macOS 包管理 | 🟢 简单 | 🟢 LOW | 系统级工具 |
| smart-explore | 代码搜索 | 🟢 内置 | 🟢 LOW | 代码探索 |

---

## 🚀 下一步

**下一篇预告：** #17 - 待确定

**建议主题：**
- 音乐控制技能 (spotify-player, sonoscli)
- 笔记管理技能 (obsidian, notion, bear-notes)
- 通讯工具技能 (discord, slack, wacli)

---

## 📚 相关资源

- [OpenHue CLI 官方文档](https://www.openhue.io/cli)
- [Philips Hue Developer API](https://developers.meethue.com/)
- [Homebrew 公式](https://github.com/openhue/homebrew-cli)
- [100 Skills 系列 #01: skill-vetter](./001-skill-vetter.md)
- [100 Skills 系列 #15: test-automation](./015-test-automation.md)

---

_本系列每日更新，追踪 OpenClaw 生态系统中最实用的 100 个技能。_
