# 文件索引

**说明**: 记录 AI 助手创建的所有文件，包括位置、用途、创建时间  
**更新**: 每次创建新文件时自动更新  
**最后更新**: 2026-03-24 03:10

---

## 📁 文件列表

| 文件路径 | 说明 | 创建时间 | 类别 |
|----------|------|----------|------|
| `memory/news-feedback.md` | 新闻反馈记录，记录用户对推送新闻的不感兴趣内容，用于优化推送策略 | 2026-03-24 | 反馈系统 |
| `memory/2026-03-24.md` | 日常记忆，记录 2026-03-24 的重要事件和用户信息更新 | 2026-03-24 | 日常记忆 |
| `skills/tech-share-research/SKILL.md` | 技术分享想法记录技能说明文档 | 2026-03-22 | 技能定义 |
| `skills/tech-share-research/scripts/record_idea.py` | 快速记录技术分享想法的脚本 | 2026-03-22 | 技能脚本 |
| `skills/tech-share-research/scripts/research_topic.py` | 深度调研技术主题的脚本 | 2026-03-22 | 技能脚本 |
| `skills/tech-share-research/scripts/weekly_review.py` | 每周想法回顾脚本 | 2026-03-22 | 技能脚本 |
| `skills/tech-share-research/references/tags.md` | 标签分类体系参考文档 | 2026-03-22 | 技能参考 |
| `skills/tech-share-research/data/ideas.json` | 技术分享想法数据库 | 2026-03-22 | 技能数据 |
| `skills/tech-share-research/QUICKSTART.md` | 技能快速上手指南 | 2026-03-22 | 技能文档 |

---

## 📊 分类统计

| 类别 | 文件数 | 说明 |
|------|--------|------|
| 反馈系统 | 1 | 新闻反馈收集和优化 |
| 日常记忆 | 1 | 日常事件记录 |
| 技能定义 | 1 | OpenClaw 技能说明 |
| 技能脚本 | 3 | Python 执行脚本 |
| 技能参考 | 1 | 标签体系参考 |
| 技能数据 | 1 | JSON 数据文件 |
| 技能文档 | 1 | 使用指南 |
| **总计** | **9** | - |

---

## 🗂️ 目录结构

```
~/.openclaw/workspace/
├── FILE_INDEX.md                    # 本文件索引
├── USER.md                          # 用户信息
├── MEMORY.md                        # 长期记忆
├── memory/
│   ├── news-feedback.md            # 新闻反馈记录
│   └── 2026-03-24.md               # 日常记忆
└── skills/
    └── tech-share-research/
        ├── SKILL.md                # 技能说明
        ├── QUICKSTART.md           # 快速上手
        ├── scripts/
        │   ├── record_idea.py      # 记录想法
        │   ├── research_topic.py   # 调研主题
        │   └── weekly_review.py    # 每周回顾
        ├── references/
        │   └── tags.md             # 标签体系
        └── data/
            └── ideas.json          # 想法数据库
```

---

## 📝 更新日志

### 2026-03-24
- ✅ 创建 `FILE_INDEX.md` - 文件索引系统
- ✅ 创建 `memory/news-feedback.md` - 新闻反馈记录
- ✅ 创建 `memory/2026-03-24.md` - 用户信息更新记忆

### 2026-03-22
- ✅ 创建 `skills/tech-share-research/` - 技术分享想法记录技能
  - SKILL.md, 脚本，参考文档，数据文件等

---

## 💡 使用说明

**查看我创建了哪些文件**:
```bash
cat ~/.openclaw/workspace/FILE_INDEX.md
```

**按类别查找**:
- 反馈系统 → `memory/news-feedback.md`
- 技能相关 → `skills/tech-share-research/`
- 日常记忆 → `memory/YYYY-MM-DD.md`

**需要删除文件时**:
1. 先查看此索引找到文件位置
2. 确认后删除
3. 我会更新此索引
