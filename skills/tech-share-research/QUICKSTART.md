# Tech Share Research - 快速上手

## 🎯 使用场景

参加技术分享会时，快速记录灵感，后续系统化调研。

## 📝 快速记录

**直接对我说：**

> "帮我记录一个想法：XXX 工具看起来不错，后续研究一下"

我会自动记录到 `~/.openclaw/workspace/skills/tech-share-research/data/ideas.json`

**手动记录：**

```bash
python3 ~/.openclaw/workspace/skills/tech-share-research/scripts/record_idea.py \
  --content "想法内容" \
  --tags "标签 1，标签 2" \
  --source "分享会名称" \
  --priority high|medium|low
```

## 🔍 深度调研

**直接对我说：**

> "研究一下我之前记录的 QoderWork"

我会：
1. 搜索相关信息
2. 整理成结构化笔记
3. 保存到 Learning Tracker
4. 更新想法状态为 `documented`

## 📊 每周回顾

**直接对我说：**

> "这周记录了哪些想法？"

我会运行 `weekly_review.py` 生成回顾报告。

## 📁 数据结构

```
tech-share-research/
├── SKILL.md              # 技能说明
├── scripts/
│   ├── record_idea.py    # 记录想法
│   ├── research_topic.py # 深度调研
│   └── weekly_review.py  # 每周回顾
├── references/
│   └── tags.md           # 标签分类体系
└── data/
    └── ideas.json        # 想法数据库
```

## 🔄 与 Learning Tracker 集成

- **想法** → `tech-share-research/data/ideas.json`
- **调研笔记** → `~/dev/projects/learning-tracker/data/notes.json`
- 通过 `idea-id` 关联
