#!/usr/bin/env python3
"""
深度调研某个技术主题
用法：python3 research_topic.py --topic "主题名" --idea-id "关联想法 ID"
"""

import json
import argparse
from datetime import datetime
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
IDEAS_FILE = DATA_DIR / "ideas.json"
LEARNING_TRACKER_IDEAS = Path.home() / "dev/projects/learning-tracker/data/ideas.json"
LEARNING_TRACKER_NOTES = Path.home() / "dev/projects/learning-tracker/data/notes.json"

def load_json(path):
    if not path.exists():
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def update_idea_status(idea_id, status="researching"):
    """更新想法状态"""
    ideas = load_json(IDEAS_FILE)
    for idea in ideas:
        if idea["id"] == idea_id:
            idea["status"] = status
            idea["updated_at"] = datetime.now().isoformat()
            break
    save_json(IDEAS_FILE, ideas)

def create_research_note(topic, idea_id, content):
    """在 Learning Tracker 中创建调研笔记"""
    notes = load_json(LEARNING_TRACKER_NOTES)
    
    import uuid
    new_note = {
        "id": str(uuid.uuid4()),
        "title": f"{topic} 调研报告",
        "content": content,
        "tags": ["产品调研", topic, "技术分享"],
        "created_at": datetime.now().isoformat()
    }
    
    notes.append(new_note)
    save_json(LEARNING_TRACKER_NOTES, notes)
    
    # 更新想法关联
    ideas = load_json(IDEAS_FILE)
    for idea in ideas:
        if idea["id"] == idea_id:
            idea["research_notes"] = new_note["id"]
            idea["status"] = "documented"
            idea["updated_at"] = datetime.now().isoformat()
            break
    save_json(IDEAS_FILE, ideas)
    
    return new_note

def main():
    parser = argparse.ArgumentParser(description="深度调研技术主题")
    parser.add_argument("--topic", required=True, help="调研主题")
    parser.add_argument("--idea-id", help="关联的想法 ID")
    parser.add_argument("--content", help="调研内容（可选，否则标记为待调研）")
    
    args = parser.parse_args()
    
    if args.idea_id:
        update_idea_status(args.idea_id, "researching")
        print(f"📋 想法 {args.idea_id[:8]}... 状态更新为：researching")
    
    if args.content:
        note = create_research_note(args.topic, args.idea_id, args.content)
        print(f"✅ 调研笔记已创建：{note['title']}")
    else:
        print(f"🔍 主题 '{args.topic}' 已标记为待调研")
        print("下一步：使用浏览器或 web_search 收集信息")

if __name__ == "__main__":
    main()
