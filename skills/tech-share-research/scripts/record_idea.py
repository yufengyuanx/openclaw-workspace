#!/usr/bin/env python3
"""
快速记录技术分享想法
用法：python3 record_idea.py --content "想法内容" --tags "标签 1，标签 2" --source "来源"
"""

import json
import uuid
import argparse
from datetime import datetime
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
IDEAS_FILE = DATA_DIR / "ideas.json"

def ensure_data_dir():
    DATA_DIR.mkdir(exist_ok=True)
    if not IDEAS_FILE.exists():
        IDEAS_FILE.write_text("[]", encoding="utf-8")

def load_ideas():
    with open(IDEAS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_ideas(ideas):
    with open(IDEAS_FILE, "w", encoding="utf-8") as f:
        json.dump(ideas, f, indent=2, ensure_ascii=False)

def record_idea(content, tags=None, source="技术分享", priority="medium"):
    """记录一个新想法"""
    ensure_data_dir()
    ideas = load_ideas()
    
    new_idea = {
        "id": str(uuid.uuid4()),
        "content": content,
        "tags": [t.strip() for t in tags.split(",")] if tags else [],
        "source": source,
        "status": "backlog",
        "priority": priority,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "research_notes": None
    }
    
    ideas.append(new_idea)
    save_ideas(ideas)
    
    return new_idea

def main():
    parser = argparse.ArgumentParser(description="记录技术分享想法")
    parser.add_argument("--content", required=True, help="想法内容")
    parser.add_argument("--tags", default="", help="标签，逗号分隔")
    parser.add_argument("--source", default="技术分享", help="来源")
    parser.add_argument("--priority", choices=["high", "medium", "low"], default="medium")
    
    args = parser.parse_args()
    
    idea = record_idea(args.content, args.tags, args.source, args.priority)
    
    print(f"✅ 想法已记录！")
    print(f"ID: {idea['id'][:8]}...")
    print(f"内容：{idea['content']}")
    print(f"标签：{', '.join(idea['tags']) if idea['tags'] else '无'}")
    print(f"状态：{idea['status']}")

if __name__ == "__main__":
    main()
