# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

---

## 💎 Obsidian Vaults

### 主记忆 Vault
**Vault Name:** `OpenClaw-Memory`  
**Path:** `/Users/frankyuan/Documents/ObsidianVaults/OpenClaw-Memory`

**Structure:**
```
OpenClaw-Memory/
├── 02-Knowledge-Base/
│   └── MEMORY.md          # Long-term memory
├── 04-Daily-Notes/
│   └── YYYY-MM-DD.md      # Daily logs
├── 01-Session-Logs/
├── 03-Projects/
├── 05-People/
└── 06-Archive/
```

### 调研记忆 Vault
**Vault Name:** `OpenClaw-Research-Memory`  
**Path:** `/Users/frankyuan/Documents/ObsidianVaults/OpenClaw-Research-Memory`

**Structure:**
```
OpenClaw-Research-Memory/
├── 00-INDEX.md              # 索引和模板
├── README.md                # 使用说明
├── 01-AI-Frameworks/        # AI 框架调研（Hermes, LangChain...）
├── 02-Skills-Research/      # OpenClaw Skills 调研
├── 03-Tools-Analysis/       # 工具对比分析
├── 04-Technical-Reports/    # 技术深度报告
├── 05-Market-Research/      # 市场和竞品调研
└── 06-Archive/              # 已归档内容
```

**用途**: Researcher 智能体专用，存储所有调研报告和分析结果

**CLI:** `obsidian-cli` (installed via Homebrew)

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
