# 多智能体框架 Demo - 服务生成到反馈完整链路

## Demo 场景：智能营销内容生成与投放

**业务背景**: 电商平台需要为双 11 活动生成个性化营销内容，投放给不同用户群体，并收集反馈进行优化。

---

## 一、完整链路流程图

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              完整链路演示 (End-to-End Demo)                              │
└─────────────────────────────────────────────────────────────────────────────────────────┘

  ┌─────────────┐
  │  触发阶段   │
  │  (Trigger)  │
  └─────────────┘
       │
       │  1. 定时触发：每天 9:00 生成当日营销内容
       │  2. 事件触发：用户达到特定行为阈值
       │  3. API 触发：运营手动触发
       ▼
  ┌─────────────────────────────────────────────────────────────────────────────────────┐
  │                              调度中心 (Scheduler)                                    │
  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
  │  │ Cron 触发器  │    │ Webhook 触发 │    │ API 触发器   │    │ 手动触发     │       │
  │  │ 0 9 * * *   │    │ user.action  │    │ POST /run   │    │ Admin 按钮   │       │
  │  └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘       │
  └─────────────────────────────────────────────────────────────────────────────────────┘
       │
       │ 创建任务实例：task_id = "marketing_20260312_001"
       ▼
  ┌─────────────────────────────────────────────────────────────────────────────────────┐
  │                           规划智能体 (Planner Agent)                                 │
  │                                                                                     │
  │  输入：{"campaign": "双 11 预热", "target_audience": "活跃用户", "budget": 100000}   │
  │                                                                                     │
  │  思考过程：                                                                          │
  │  1. 理解任务：生成双 11 营销内容并投放                                               │
  │  2. 分解任务：                                                                       │
  │     - 查询目标用户群体特征                                                           │
  │     - 分析历史转化数据                                                               │
  │     - 生成多版本文案                                                                 │
  │     - 选择投放渠道                                                                   │
  │     - 配置 A/B 测试                                                                   │
  │  3. 分配子任务给专家层智能体                                                         │
  │                                                                                     │
  │  输出：任务执行计划 (DAG)                                                            │
  └─────────────────────────────────────────────────────────────────────────────────────┘
       │
       │ 任务分解与分发
       ▼
  ┌─────────────────────────────────────────────────────────────────────────────────────┐
  │                        专家层智能体 (Expert Agents)                                  │
  │                                                                                     │
  │  ┌─────────────────────────────┐        ┌─────────────────────────────┐             │
  │  │     营销智能体 (Marketing)   │        │     服务智能体 (Service)    │             │
  │  │                             │        │                             │             │
  │  │  • 内容策略制定            │        │  • 用户服务支持             │             │
  │  │  • 投放渠道选择            │        │  • 投诉处理                 │             │
  │  │  • 效果预估                │        │  • 满意度调查               │             │
  │  └─────────────────────────────┘        └─────────────────────────────┘             │
  └─────────────────────────────────────────────────────────────────────────────────────┘
       │
       │ 调用子智能体执行具体任务
       ▼
  ┌─────────────────────────────────────────────────────────────────────────────────────┐
  │                         子智能体池 (Worker Agents)                                   │
  │                                                                                     │
  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
  │  │  用户画像智能体  │  │  内容生成智能体  │  │  渠道选择智能体  │  │  效果预测智能体  │ │
  │  │                 │  │                 │  │                 │  │                 │ │
  │  │  调用工具：      │  │  调用工具：      │  │  调用工具：      │  │  调用工具：      │ │
  │  │  - user.query   │  │  - llm.generate │  │  - channel.list │  │  - ml.predict   │ │
  │  │  - user.segment │  │  - template.use │  │  - channel.cost │  │  - ab.config    │ │
  │  │                 │  │  - compliance.  │  │                 │  │                 │ │
  │  │  输出：          │  │  输出：          │  │  输出：          │  │  输出：          │ │
  │  │  用户分群列表    │  │  3 版本文案      │  │  渠道推荐列表    │  │  A/B 测试配置    │ │
  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
  └─────────────────────────────────────────────────────────────────────────────────────┘
       │
       │ 汇聚结果，生成最终投放方案
       ▼
  ┌─────────────────────────────────────────────────────────────────────────────────────┐
  │                           质量审核 (Quality Gate)                                    │
  │                                                                                     │
  │  ┌─────────────────────────────────────────────────────────────────────────────┐   │
  │  │  自动审核 (Auto Review)                                                      │   │
  │  │  ✓ 敏感词检测：通过                                                          │   │
  │  │  ✓ 合规检查：通过                                                            │   │
  │  │  ✓ 格式校验：通过                                                            │   │
  │  │  ✓ 品牌规范：通过                                                            │   │
  │  └─────────────────────────────────────────────────────────────────────────────┘   │
  │                                    │                                                │
  │                                    ▼                                                │
  │  ┌─────────────────────────────────────────────────────────────────────────────┐   │
  │  │  人工抽检 (Manual Review) - 抽检率 10%                                       │   │
  │  │  审核员：operator_001                                                       │   │
  │  │  审核结果：✓ 通过  |  审核意见：文案创意好，符合品牌调性                      │   │
  │  └─────────────────────────────────────────────────────────────────────────────┘   │
  └─────────────────────────────────────────────────────────────────────────────────────┘
       │
       │ 审核通过，进入投放阶段
       ▼
  ┌─────────────────────────────────────────────────────────────────────────────────────┐
  │                           服务投放 (Service Delivery)                                │
  │                                                                                     │
  │  版本管理：                                                                          │
  │  ┌─────────────────────────────────────────────────────────────────────────────┐   │
  │  │  Version A (50% 流量)                    Version B (50% 流量)                 │   │
  │  │  ┌─────────────────────────────┐         ┌─────────────────────────────┐     │   │
  │  │  │  文案："双 11 狂欢，全场 5 折起!"    │         │  文案："双 11 来袭，限时特惠!"    │     │   │
  │  │  │  渠道：APP 推送 + 短信              │         │  渠道：微信 + 邮件                 │     │   │
  │  │  │  人群：高价值用户                  │         │  人群：活跃用户                     │     │   │
  │  │  └─────────────────────────────┘         └─────────────────────────────┘     │   │
  │  └─────────────────────────────────────────────────────────────────────────────┘   │
  │                                                                                     │
  │  投放执行：                                                                          │
  │  • 调用渠道 API 发送内容                                                             │
  │  • 记录投放日志 (impression_id, user_id, timestamp, channel, version)               │
  │  • 实时监控投放状态                                                                 │
  └─────────────────────────────────────────────────────────────────────────────────────┘
       │
       │ 用户接收内容并产生行为
       ▼
  ┌─────────────────────────────────────────────────────────────────────────────────────┐
  │                          用户反馈收集 (Feedback Collection)                          │
  │                                                                                     │
  │  显性反馈：                                                                          │
  │  • 点击行为：click (timestamp, content_id, user_id)                                 │
  │  • 转化行为：purchase (order_id, amount, timestamp)                                 │
  │  • 评分：rating (1-5 星，可选填意见)                                                 │
  │  • 投诉：complaint (type, description)                                              │
  │                                                                                     │
  │  隐性反馈：                                                                          │
  │  • 停留时长：dwell_time (秒)                                                        │
  │  • 跳过行为：skip                                                                   │
  │  • 分享行为：share                                                                  │
  │                                                                                     │
  │  数据埋点：                                                                          │
  │  ┌─────────────────────────────────────────────────────────────────────────────┐   │
  │  │  track_event("content_expose", {                                            │   │
  │  │    "user_id": "u_12345",                                                     │   │
  │  │    "content_id": "c_双 11_v1",                                                 │   │
  │  │    "version": "A",                                                           │   │
  │  │    "channel": "app_push",                                                    │   │
  │  │    "timestamp": 1710230400                                                   │   │
  │  │  })                                                                          │   │
  │  └─────────────────────────────────────────────────────────────────────────────┘   │
  └─────────────────────────────────────────────────────────────────────────────────────┘
       │
       │ 反馈数据汇聚分析
       ▼
  ┌─────────────────────────────────────────────────────────────────────────────────────┐
  │                          效果评估与优化 (Evaluation & Optimization)                  │
  │                                                                                     │
  │  实时看板：                                                                          │
  │  ┌─────────────────────────────────────────────────────────────────────────────┐   │
  │  │  指标               Version A      Version B      显著提升                   │   │
  │  │  ─────────────────────────────────────────────────────────────────────       │   │
  │  │  曝光量             100,000        100,000        -                         │   │
  │  │  点击率 (CTR)        3.5%           4.2%           B +20% ✓                  │   │
  │  │  转化率 (CVR)        1.2%           1.8%           B +50% ✓                  │   │
  │  │  ROI                2.5            3.8            B +52% ✓                  │   │
  │  └─────────────────────────────────────────────────────────────────────────────┘   │
  │                                                                                     │
  │  自动决策：                                                                          │
  │  • 规则：CTR 差异>15% 且 样本量>10000 → 自动判定优胜版本                             │
  │  • 结果：Version B 胜出，自动提升流量至 80%                                         │
  │                                                                                     │
  │  反馈闭环：                                                                          │
  │  • 将优胜版本特征记录到长期记忆                                                      │
  │  • 更新用户画像偏好                                                                  │
  │  • 优化下一次内容生成策略                                                            │
  └─────────────────────────────────────────────────────────────────────────────────────┘
       │
       │ 迭代优化
       ▼
  ┌─────────────────────────────────────────────────────────────────────────────────────┐
  │                           版本迭代 (Version Iteration)                               │
  │                                                                                     │
  │  基于反馈的优化：                                                                    │
  │  ┌─────────────────────────────────────────────────────────────────────────────┐   │
  │  │  发现：Version B 的"限时特惠"文案在高价值用户群体表现更好                        │   │
  │  │  假设：紧迫感 + 优惠信息对高价值用户更有效                                    │   │
  │  │  行动：                                                                      │   │
  │  │    1. 创建 Version C：强化"限时"和"专属"概念                                 │   │
  │  │    2. 针对高价值用户单独投放                                                 │   │
  │  │    3. 继续 A/B 测试验证假设                                                   │   │
  │  └─────────────────────────────────────────────────────────────────────────────┘   │
  │                                                                                     │
  │  新版本发布流程：                                                                    │
  │  开发 → 测试 → 预发 → 灰度 (1%→5%→20%) → 全量                                      │
  └─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 二、核心代码示例

### 2.1 任务触发与调度

```python
# scheduler/triggers.py

from datetime import datetime
from enum import Enum

class TriggerType(Enum):
    CRON = "cron"
    EVENT = "event"
    API = "api"
    MANUAL = "manual"

class Trigger:
    def __init__(self, trigger_id: str, trigger_type: TriggerType, config: dict):
        self.trigger_id = trigger_id
        self.trigger_type = trigger_type
        self.config = config
        self.enabled = True
    
    def should_fire(self, context: dict) -> bool:
        """判断是否应该触发"""
        if not self.enabled:
            return False
        
        if self.trigger_type == TriggerType.CRON:
            return self._check_cron()
        elif self.trigger_type == TriggerType.EVENT:
            return self._check_event(context)
        elif self.trigger_type == TriggerType.API:
            return self._check_api(context)
        return False
    
    def _check_cron(self) -> bool:
        """检查 Cron 表达式"""
        from croniter import croniter
        cron_expr = self.config.get("cron_expr", "0 9 * * *")
        iter = croniter(cron_expr, datetime.now())
        next_time = iter.get_next()
        return abs((next_time - datetime.now()).total_seconds()) < 60
    
    def _check_event(self, context: dict) -> bool:
        """检查事件触发条件"""
        event_type = self.config.get("event_type")
        return context.get("event_type") == event_type
    
    def _check_api(self, context: dict) -> bool:
        """API 触发直接返回 True"""
        return True
```

### 2.2 规划智能体

```python
# agents/planner_agent.py

from typing import List, Dict, Any
import json

class PlannerAgent:
    def __init__(self, llm_client, tool_registry):
        self.llm = llm_client
        self.tool_registry = tool_registry
        self.memory = ShortTermMemory()
    
    async def plan(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        规划任务执行路径
        
        Args:
            task: 任务描述，包含目标、约束、资源等
        
        Returns:
            执行计划 (DAG 结构)
        """
        # 1. 理解任务意图
        intent = await self._understand_intent(task)
        
        # 2. 查询相关上下文
        context = await self._gather_context(task)
        
        # 3. 生成执行计划
        plan = await self._generate_plan(intent, context)
        
        # 4. 验证计划可行性
        is_valid = await self._validate_plan(plan)
        
        if not is_valid:
            plan = await self._revise_plan(plan)
        
        return plan
    
    async def _understand_intent(self, task: Dict) -> str:
        """理解任务意图"""
        prompt = f"""
        请分析以下任务的意图:
        {json.dumps(task, ensure_ascii=False)}
        
        输出任务类型、目标、关键约束。
        """
        response = await self.llm.generate(prompt)
        return response
    
    async def _gather_context(self, task: Dict) -> Dict:
        """收集相关上下文信息"""
        context = {
            "user_profile": await self.tool_registry.call("user.query", task.get("user_id")),
            "history": await self.memory.get_task_history(task.get("campaign_id")),
            "knowledge": await self.tool_registry.call("knowledge.search", task.get("topic")),
        }
        return context
    
    async def _generate_plan(self, intent: str, context: Dict) -> Dict:
        """生成执行计划"""
        prompt = f"""
        基于以下信息生成任务执行计划:
        
        任务意图: {intent}
        上下文: {json.dumps(context, ensure_ascii=False)}
        
        可用工具: {self.tool_registry.list_tools()}
        
        请输出 DAG 格式的执行计划，包含:
        1. 任务节点列表 (id, name, tool, inputs, dependencies)
        2. 执行顺序
        3. 并行/串行标识
        """
        response = await self.llm.generate(prompt)
        return json.loads(response)
    
    async def _validate_plan(self, plan: Dict) -> bool:
        """验证计划可行性"""
        # 检查所有工具是否存在
        for node in plan.get("nodes", []):
            tool_name = node.get("tool")
            if not self.tool_registry.exists(tool_name):
                return False
        
        # 检查依赖关系是否合法 (无循环依赖)
        if self._has_cycle(plan.get("nodes", [])):
            return False
        
        return True
    
    def _has_cycle(self, nodes: List[Dict]) -> bool:
        """检测循环依赖 (拓扑排序)"""
        # 实现略
        pass
    
    async def _revise_plan(self, plan: Dict) -> Dict:
        """修订计划"""
        # 根据验证失败原因修订计划
        pass
```

### 2.3 记忆管理系统

```python
# memory/memory_manager.py

import redis
import psycopg2
from typing import Optional, List
from datetime import datetime, timedelta

class MemoryManager:
    def __init__(self, redis_client, pg_client, vector_db):
        self.redis = redis_client
        self.pg = pg_client
        self.vector_db = vector_db
    
    # ========== 短期记忆 (Session Memory) ==========
    
    async def set_session_context(self, session_id: str, context: dict, ttl_minutes: int = 30):
        """设置会话上下文"""
        key = f"session:{session_id}:context"
        self.redis.setex(key, ttl_minutes * 60, json.dumps(context))
    
    async def get_session_context(self, session_id: str) -> Optional[dict]:
        """获取会话上下文"""
        key = f"session:{session_id}:context"
        data = self.redis.get(key)
        return json.loads(data) if data else None
    
    async def add_session_message(self, session_id: str, role: str, content: str):
        """添加会话消息"""
        key = f"session:{session_id}:messages"
        message = {"role": role, "content": content, "timestamp": datetime.now().isoformat()}
        self.redis.rpush(key, json.dumps(message))
        self.redis.expire(key, 30 * 60)  # 30 分钟 TTL
    
    # ========== 中期记忆 (Task Memory) ==========
    
    async def store_task_execution(self, task_id: str, execution_data: dict):
        """存储任务执行记录"""
        query = """
        INSERT INTO task_executions (task_id, status, input, output, duration, created_at)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        self.pg.execute(query, (
            task_id,
            execution_data["status"],
            json.dumps(execution_data["input"]),
            json.dumps(execution_data["output"]),
            execution_data["duration"],
            datetime.now()
        ))
    
    async def get_task_history(self, campaign_id: str, limit: int = 10) -> List[dict]:
        """获取任务历史"""
        query = """
        SELECT task_id, status, output, created_at
        FROM task_executions
        WHERE campaign_id = %s
        ORDER BY created_at DESC
        LIMIT %s
        """
        results = self.pg.fetch_all(query, (campaign_id, limit))
        return [dict(row) for row in results]
    
    # ========== 长期记忆 (Long-term Memory) ==========
    
    async def store_user_profile(self, user_id: str, profile: dict):
        """存储用户画像"""
        # 结构化数据存 PostgreSQL
        query = """
        INSERT INTO user_profiles (user_id, profile_data, updated_at)
        VALUES (%s, %s, %s)
        ON CONFLICT (user_id) DO UPDATE
        SET profile_data = %s, updated_at = %s
        """
        self.pg.execute(query, (user_id, json.dumps(profile), datetime.now(), json.dumps(profile), datetime.now()))
        
        # 向量化存 Vector DB (用于语义检索)
        embedding = await self._generate_embedding(json.dumps(profile))
        self.vector_db.upsert(
            collection="user_profiles",
            id=user_id,
            vector=embedding,
            metadata=profile
        )
    
    async def search_similar_users(self, user_profile: dict, top_k: int = 5) -> List[dict]:
        """搜索相似用户"""
        embedding = await self._generate_embedding(json.dumps(user_profile))
        results = self.vector_db.search(
            collection="user_profiles",
            query_vector=embedding,
            top_k=top_k
        )
        return results
    
    async def _generate_embedding(self, text: str) -> List[float]:
        """生成文本向量"""
        # 调用 embedding 模型
        pass
    
    # ========== 上下文管理 ==========
    
    async def build_context(self, session_id: str, task_id: str, user_id: str) -> dict:
        """构建完整上下文"""
        context = {
            "session": await self.get_session_context(session_id),
            "task_history": await self.get_task_history(task_id),
            "user_profile": await self._get_user_profile(user_id),
        }
        return context
```

### 2.4 工具注册与调用

```python
# tools/registry.py

from typing import Dict, Any, Callable
import jsonschema

class ToolRegistry:
    def __init__(self):
        self.tools: Dict[str, Dict] = {}
        self.rate_limiters: Dict[str, RateLimiter] = {}
    
    def register(self, name: str, description: str, schema: dict, handler: Callable):
        """注册工具"""
        self.tools[name] = {
            "name": name,
            "description": description,
            "schema": schema,
            "handler": handler,
            "stats": {"calls": 0, "errors": 0, "avg_latency": 0}
        }
        self.rate_limiters[name] = RateLimiter(
            requests_per_minute=schema.get("rate_limit", {}).get("requests_per_minute", 100)
        )
    
    async def call(self, tool_name: str, **kwargs) -> Any:
        """调用工具"""
        if tool_name not in self.tools:
            raise ToolNotFoundError(f"Tool {tool_name} not found")
        
        tool = self.tools[tool_name]
        
        # 参数校验
        jsonschema.validate(kwargs, tool["schema"]["input"])
        
        # 限流检查
        if not self.rate_limiters[tool_name].allow():
            raise RateLimitExceeded(f"Rate limit exceeded for {tool_name}")
        
        # 执行工具
        try:
            result = await tool["handler"](**kwargs)
            tool["stats"]["calls"] += 1
            return result
        except Exception as e:
            tool["stats"]["errors"] += 1
            raise
    
    def list_tools(self) -> List[dict]:
        """列出所有可用工具"""
        return [
            {
                "name": t["name"],
                "description": t["description"],
                "input_schema": t["schema"]["input"]
            }
            for t in self.tools.values()
        ]


# ========== 工具示例 ==========

async def user_query_tool(user_id: str, fields: List[str] = None) -> dict:
    """查询用户信息"""
    # 调用用户服务 API
    response = await http_client.get(f"/api/users/{user_id}", params={"fields": fields})
    return response.json()

async def content_generate_tool(prompt: str, template_id: str = None) -> dict:
    """生成内容"""
    if template_id:
        template = await get_template(template_id)
        prompt = template.render(prompt=prompt)
    
    response = await llm_client.generate(prompt)
    return {"content": response, "model": "qwen3.5-plus"}

async def channel_select_tool(criteria: dict) -> List[dict]:
    """选择投放渠道"""
    channels = await get_all_channels()
    scored = []
    for channel in channels:
        score = await calculate_channel_score(channel, criteria)
        scored.append({**channel, "score": score})
    return sorted(scored, key=lambda x: x["score"], reverse=True)[:5]


# 注册工具
registry = ToolRegistry()

registry.register(
    name="user.query",
    description="查询用户信息",
    schema={
        "type": "object",
        "properties": {
            "user_id": {"type": "string"},
            "fields": {"type": "array", "items": {"type": "string"}}
        },
        "required": ["user_id"]
    },
    handler=user_query_tool
)

registry.register(
    name="content.generate",
    description="生成营销内容",
    schema={
        "type": "object",
        "properties": {
            "prompt": {"type": "string"},
            "template_id": {"type": "string"}
        },
        "required": ["prompt"]
    },
    handler=content_generate_tool
)

registry.register(
    name="channel.select",
    description="选择最优投放渠道",
    schema={
        "type": "object",
        "properties": {
            "criteria": {
                "type": "object",
                "properties": {
                    "budget": {"type": "number"},
                    "target_audience": {"type": "string"},
                    "goal": {"type": "string"}
                }
            }
        },
        "required": ["criteria"]
    },
    handler=channel_select_tool
)
```

### 2.5 A/B 测试与效果评估

```python
# ab_testing/experiment.py

from typing import Dict, List
import numpy as np
from scipy import stats

class ABTest:
    def __init__(self, experiment_id: str, variants: List[str], traffic_split: List[float]):
        self.experiment_id = experiment_id
        self.variants = variants  # ["A", "B", "C"]
        self.traffic_split = traffic_split  # [0.5, 0.5, 0]
        self.metrics = {}
    
    def assign_variant(self, user_id: str) -> str:
        """为用户分配实验版本"""
        # 使用一致性哈希确保同一用户始终看到同一版本
        hash_value = hash(f"{self.experiment_id}:{user_id}") % 100
        
        cumulative = 0
        for i, split in enumerate(self.traffic_split):
            cumulative += split * 100
            if hash_value < cumulative:
                return self.variants[i]
        return self.variants[-1]
    
    def track_event(self, user_id: str, event_type: str, value: float = 1.0):
        """追踪用户行为事件"""
        variant = self.assign_variant(user_id)
        key = f"{self.experiment_id}:{variant}:{event_type}"
        
        # 存储到 Redis (实时计数)
        redis_client.hincrby(key, "count", 1)
        redis_client.hincrby(key, "sum", value)
        
        # 异步写入数据库 (详细记录)
        async_writer.write_event({
            "experiment_id": self.experiment_id,
            "user_id": user_id,
            "variant": variant,
            "event_type": event_type,
            "value": value,
            "timestamp": datetime.now()
        })
    
    def get_results(self) -> Dict:
        """获取实验结果"""
        results = {}
        for variant in self.variants:
            variant_data = self._get_variant_stats(variant)
            results[variant] = variant_data
        
        # 统计显著性检验
        results["significance"] = self._calculate_significance(results)
        
        return results
    
    def _get_variant_stats(self, variant: str) -> Dict:
        """获取单个版本的统计数据"""
        impressions = redis_client.hget(f"{self.experiment_id}:{variant}:impressions", "count") or 0
        clicks = redis_client.hget(f"{self.experiment_id}:{variant}:clicks", "count") or 0
        conversions = redis_client.hget(f"{self.experiment_id}:{variant}:conversions", "count") or 0
        
        return {
            "impressions": int(impressions),
            "clicks": int(clicks),
            "conversions": int(conversions),
            "ctr": clicks / impressions if impressions > 0 else 0,
            "cvr": conversions / clicks if clicks > 0 else 0,
        }
    
    def _calculate_significance(self, results: Dict) -> Dict:
        """计算统计显著性"""
        # 使用卡方检验比较转化率
        variant_a = results.get(self.variants[0], {})
        variant_b = results.get(self.variants[1], {})
        
        if variant_a.get("impressions", 0) < 1000 or variant_b.get("impressions", 0) < 1000:
            return {"significant": False, "reason": "样本量不足"}
        
        # 构建列联表
        table = [
            [variant_a.get("clicks", 0), variant_a.get("impressions", 0) - variant_a.get("clicks", 0)],
            [variant_b.get("clicks", 0), variant_b.get("impressions", 0) - variant_b.get("clicks", 0)]
        ]
        
        chi2, p_value, dof, expected = stats.chi2_contingency(table)
        
        return {
            "significant": p_value < 0.05,
            "p_value": p_value,
            "confidence": 1 - p_value,
            "winner": self.variants[0] if variant_a["ctr"] > variant_b["ctr"] else self.variants[1]
        }
    
    def auto_optimize(self):
        """自动优化流量分配"""
        results = self.get_results()
        
        if results["significance"]["significant"]:
            winner = results["significance"]["winner"]
            # 将流量逐步转移到优胜版本
            winner_idx = self.variants.index(winner)
            self.traffic_split = [0.0] * len(self.variants)
            self.traffic_split[winner_idx] = 0.8  # 80% 流量给优胜版本
            self.traffic_split[1 - winner_idx] = 0.2  # 20% 保留给对照版本
            
            logger.info(f"自动优化：{winner} 胜出，流量调整为 {self.traffic_split}")
```

### 2.6 反馈收集与埋点

```python
# feedback/tracking.py

from dataclasses import dataclass
from typing import Optional
import json

@dataclass
class FeedbackEvent:
    event_type: str  # expose, click, convert, rating, complaint
    user_id: str
    content_id: str
    variant: str
    channel: str
    value: Optional[float] = None
    metadata: Optional[dict] = None
    timestamp: Optional[datetime] = None
    
    def __post_init__(self):
        if self.timestamp is None:
            self.timestamp = datetime.now()

class FeedbackTracker:
    def __init__(self, kafka_producer, db_client):
        self.kafka = kafka_producer
        self.db = db_client
    
    async def track(self, event: FeedbackEvent):
        """追踪反馈事件"""
        # 1. 发送到 Kafka (实时处理)
        self.kafka.send(
            topic="feedback_events",
            key=event.user_id,
            value=json.dumps({
                "event_type": event.event_type,
                "user_id": event.user_id,
                "content_id": event.content_id,
                "variant": event.variant,
                "channel": event.channel,
                "value": event.value,
                "metadata": event.metadata,
                "timestamp": event.timestamp.isoformat()
            })
        )
        
        # 2. 写入数据库 (持久化)
        await self._store_event(event)
        
        # 3. 更新实时指标
        await self._update_metrics(event)
    
    async def _store_event(self, event: FeedbackEvent):
        """存储事件到数据库"""
        query = """
        INSERT INTO feedback_events 
        (event_type, user_id, content_id, variant, channel, value, metadata, timestamp)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        self.db.execute(query, (
            event.event_type,
            event.user_id,
            event.content_id,
            event.variant,
            event.channel,
            event.value,
            json.dumps(event.metadata) if event.metadata else None,
            event.timestamp
        ))
    
    async def _update_metrics(self, event: FeedbackEvent):
        """更新实时指标"""
        key = f"metrics:{event.content_id}:{event.variant}:{event.event_type}"
        
        if event.event_type == "expose":
            redis_client.incr(f"{key}:count")
        elif event.event_type == "click":
            redis_client.incr(f"{key}:count")
        elif event.event_type == "convert":
            redis_client.incr(f"{key}:count")
            redis_client.incrby(f"{key}:value", event.value or 0)
        elif event.event_type == "rating":
            redis_client.incr(f"{key}:count")
            redis_client.incrby(f"{key}:sum", event.value or 0)
    
    async def get_content_stats(self, content_id: str, variant: str) -> dict:
        """获取内容统计数据"""
        base_key = f"metrics:{content_id}:{variant}"
        
        return {
            "impressions": int(redis_client.get(f"{base_key}:expose:count") or 0),
            "clicks": int(redis_client.get(f"{base_key}:click:count") or 0),
            "conversions": int(redis_client.get(f"{base_key}:convert:count") or 0),
            "conversion_value": float(redis_client.get(f"{base_key}:convert:value") or 0),
            "avg_rating": self._calculate_avg_rating(base_key),
        }
    
    def _calculate_avg_rating(self, base_key: str) -> float:
        """计算平均评分"""
        count = int(redis_client.get(f"{base_key}:rating:count") or 0)
        total = float(redis_client.get(f"{base_key}:rating:sum") or 0)
        return total / count if count > 0 else 0
```

---

## 三、部署架构

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              生产环境部署架构                                        │
└─────────────────────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────────────────────────┐
                    │           负载均衡 (Nginx/ALB)           │
                    └─────────────────────────────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │   API Gateway   │    │   API Gateway   │    │   API Gateway   │
    │   (Pod 1)       │    │   (Pod 2)       │    │   (Pod 3)       │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
              │                       │                       │
              └───────────────────────┼───────────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │  Agent Service  │    │  Agent Service  │    │  Agent Service  │
    │  (K8s Deployment, HPA auto-scale)      │    │                 │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
              │
              ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │                            数据层 (Data Layer)                           │
    │                                                                         │
    │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
    │  │   Redis     │  │ PostgreSQL  │  │   Milvus    │  │     Kafka       │ │
    │  │  Cluster    │  │  Primary+   │  │  Vector DB  │  │   Message Queue │ │
    │  │  (Cache)    │  │  Replica    │  │  (Memory)   │  │   (Events)      │ │
    │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘ │
    └─────────────────────────────────────────────────────────────────────────┘
              │
              ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │                          可观测性 (Observability)                        │
    │                                                                         │
    │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
    │  │ Prometheus  │  │   Grafana   │  │     ELK     │  │    Jaeger       │ │
    │  │  (Metrics)  │  │ (Dashboard) │  │   (Logs)    │  │  (Tracing)      │ │
    │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘ │
    └─────────────────────────────────────────────────────────────────────────┘
```

---

## 四、关键指标 (KPIs)

| 指标类别 | 具体指标 | 目标值 |
|---------|---------|-------|
| 性能指标 | P99 延迟 | < 500ms |
| 性能指标 | 吞吐量 | > 1000 QPS |
| 性能指标 | 可用性 | > 99.9% |
| 业务指标 | 点击率 (CTR) | 提升 > 20% |
| 业务指标 | 转化率 (CVR) | 提升 > 15% |
| 业务指标 | ROI | 提升 > 30% |
| 质量指标 | 用户满意度 | > 4.5/5 |
| 质量指标 | 投诉率 | < 0.1% |
| 效率指标 | 内容生成时间 | < 30 秒 |
| 效率指标 | A/B 测试周期 | < 7 天 |

---

## 五、Demo 运行步骤

### 5.1 环境准备

```bash
# 1. 启动依赖服务
docker-compose up -d redis postgres milvus kafka

# 2. 初始化数据库
python scripts/init_db.py

# 3. 注册工具
python scripts/register_tools.py

# 4. 启动服务
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

### 5.2 触发一次完整链路

```bash
# 方式 1: API 触发
curl -X POST http://localhost:8000/api/v1/tasks/run \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "double11_2026",
    "target_audience": "active_users",
    "budget": 100000,
    "channels": ["app_push", "sms", "wechat"]
  }'

# 方式 2: 定时触发 (已配置 Cron: 0 9 * * *)
# 每天 9:00 自动执行

# 方式 3: 事件触发
# 当用户行为达到阈值时自动触发
```

### 5.3 查看执行结果

```bash
# 查看任务状态
curl http://localhost:8000/api/v1/tasks/{task_id}/status

# 查看 A/B 测试结果
curl http://localhost:8000/api/v1/experiments/{experiment_id}/results

# 查看用户反馈
curl http://localhost:8000/api/v1/feedback/{content_id}/stats
```

---

## 六、总结

本 Demo 完整展示了多智能体框架从**任务触发 → 规划 → 执行 → 审核 → 投放 → 反馈 → 优化**的完整闭环，验证了架构的可行性和可落地性。

**核心价值**:
1. ✅ 支持多种触发方式 (定时/事件/API/手动)
2. ✅ 智能体分层协同 (规划→专家→子智能体)
3. ✅ 完整的记忆管理体系 (短期/中期/长期)
4. ✅ 工具集可扩展、可注册、可监控
5. ✅ 支持快速迭代、A/B 测试、灰度发布
6. ✅ 质量审核 (自动 + 人工)
7. ✅ 反馈闭环驱动持续优化

**下一步**:
- [ ] 补充安全与合规模块
- [ ] 实现容灾与高可用
- [ ] 完善可观测性 (链路追踪、智能体行为分析)
- [ ] 开发 Admin 管理后台
