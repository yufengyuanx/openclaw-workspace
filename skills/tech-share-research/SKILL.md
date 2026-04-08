---
name: tech-share-research
description: 技术分享/会议想法记录与后续调研工作流。Use when: (1) 参加技术分享会需要快速记录想法，(2) 听到新工具/技术想后续了解，(3) 需要系统性调研某个技术主题，(4) 整理碎片化技术笔记为结构化知识。
---

# Tech Share Research Skill

快速记录技术分享中的灵感，系统化跟进调研。

## 核心工作流

### 1. 快速记录（会议中）

当用户说"帮我记录一个想法"、"后续研究 XXX"时：

```bash
# 使用脚本快速记录
python3 ~/.openclaw/workspace/skills/tech-share-research/scripts/record_idea.py \
  --content "想法内容" \
  --tags "标签 1,标签 2" \
  --source "分享会名称/来源"
```

**记录要素：**
- 核心想法（一句话）
- 相关技术/产品名
- 来源（分享会、文章、讨论）
- 紧急程度（高/中/低）

### 2. 分类整理（会议后）

读取 `data/ideas.json`，按状态分类：

| 状态 | 说明 | 行动 |
|------|------|------|
| `backlog` | 待研究 | 加入调研队列 |
| `researching` | 研究中 | 正在收集信息 |
| `documented` | 已归档 | 笔记完成，存入知识库 |
| `abandoned` | 已放弃 | 标记原因 |

### 3. 深度调研（后续跟进）

当用户说"研究一下 XXX"时：

1. **搜索信息**：使用浏览器或 web_search 收集官方文档、评测、对比
2. **记录笔记**：调用 learning-tracker 或创建结构化笔记
3. **更新状态**：标记为 `documented`

使用脚本：
```bash
python3 ~/.openclaw/workspace/skills/tech-share-research/scripts/research_topic.py \
  --topic "技术/产品名" \
  --idea-id "关联想法 ID"
```

### 4. 定期回顾（每周）

运行回顾脚本，生成周报：
```bash
python3 ~/.openclaw/workspace/skills/tech-share-research/scripts/weekly_review.py
```

## 数据结构

### 想法记录 (ideas.json)

```json
{
  "id": "uuid",
  "content": "想法内容",
  "tags": ["标签"],
  "source": "来源",
  "status": "backlog|researching|documented|abandoned",
  "priority": "high|medium|low",
  "created_at": "ISO 时间戳",
  "updated_at": "ISO 时间戳",
  "research_notes": "关联笔记 ID"
}
```

## 标签体系

参考 `references/tags.md` 中的分类体系。

**常见标签：**
- `AI 工具`、`开发效率`、`产品调研`、`技术趋势`
- `IDE`、`Agent`、`低代码`、`自动化`

## 与 Learning Tracker 集成

本技能与 `~/dev/projects/learning-tracker` 协同工作：

- **快速记录** → 写入 `data/ideas.json`
- **深度调研** → 写入 `learning-tracker/data/notes.json`
- **状态同步** → 通过 idea-id 关联

## 触发示例

| 用户输入 | 动作 |
|----------|------|
| "帮我记录一个想法：XXX" | record_idea |
| "后续研究一下 XXX" | 创建 backlog 条目 |
| "研究一下我之前记录的 XXX" | research_topic |
| "这周记录了哪些想法" | weekly_review |
| "把 XXX 的想法整理成笔记" | 调用 learning-tracker |

## 相关文件

- **脚本**: `scripts/record_idea.py`, `scripts/research_topic.py`, `scripts/weekly_review.py`
- **参考**: `references/tags.md`, `references/templates.md`
- **数据**: `data/ideas.json`, `data/state.json`
