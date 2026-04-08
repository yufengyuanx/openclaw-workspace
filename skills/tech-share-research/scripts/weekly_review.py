#!/usr/bin/env python3
"""
每周想法回顾
用法：python3 weekly_review.py
"""

import json
from datetime import datetime, timedelta
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
IDEAS_FILE = DATA_DIR / "ideas.json"

def load_json(path):
    if not path.exists():
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def weekly_review(days=7):
    """生成过去 N 天的想法回顾"""
    ideas = load_json(IDEAS_FILE)
    cutoff = datetime.now() - timedelta(days=days)
    
    # 按状态分类
    by_status = {"backlog": [], "researching": [], "documented": [], "abandoned": []}
    recent = []
    
    for idea in ideas:
        created = datetime.fromisoformat(idea["created_at"])
        if created >= cutoff:
            recent.append(idea)
        by_status[idea["status"]].append(idea)
    
    print(f"\n{'='*50}")
    print(f"📊 技术分享想法回顾 (过去{days}天)")
    print(f"{'='*50}\n")
    
    # 统计
    print(f"📈 总计：{len(ideas)} 条想法")
    print(f"🆕 新增：{len(recent)} 条")
    print(f"⏳ 待研究：{len(by_status['backlog'])} 条")
    print(f"🔍 研究中：{len(by_status['researching'])} 条")
    print(f"✅ 已归档：{len(by_status['documented'])} 条")
    print(f"❌ 已放弃：{len(by_status['abandoned'])} 条")
    
    # 待研究列表
    if by_status['backlog']:
        print(f"\n{'='*50}")
        print("⏳ 待研究 (Backlog)")
        print(f"{'='*50}")
        for idea in by_status['backlog'][:10]:  # 只显示前 10 条
            tags = ", ".join(idea['tags']) if idea['tags'] else "无标签"
            print(f"  • [{idea['priority']}] {idea['content'][:50]}...")
            print(f"    标签：{tags} | 来源：{idea['source']}")
    
    # 本周新增
    if recent:
        print(f"\n{'='*50}")
        print("🆕 本周新增")
        print(f"{'='*50}")
        for idea in recent:
            print(f"  • {idea['content'][:60]}...")
            print(f"    状态：{idea['status']} | {idea['created_at'][:10]}")
    
    print(f"\n{'='*50}\n")
    
    return {
        "total": len(ideas),
        "recent": len(recent),
        "by_status": {k: len(v) for k, v in by_status.items()}
    }

if __name__ == "__main__":
    weekly_review()
