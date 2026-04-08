# 多智能体服务框架 - 架构图

## 图 1: 整体架构总览

	

---

## 图 2: 智能体层级与协同

```mermaid
graph TB
    subgraph Level1["Level 1: 规划智能体"]
        P[规划智能体<br/>Planner Agent]
        P1[任务理解]
        P2[路径规划]
        P3[资源分配]
        P4[异常处理]
        P --> P1
        P --> P2
        P --> P3
        P --> P4
    end
    
    subgraph Level2["Level 2: 专家层智能体"]
        E1[服务智能体<br/>Service Agent]
        E2[营销智能体<br/>Marketing Agent]
        E3[其他领域智能体]
    end
    
    subgraph Level3["Level 3: 子智能体池"]
        W1[内容生成]
        W2[数据分析]
        W3[用户画像]
        W4[渠道投放]
        W5[效果追踪]
        W6[合规检查]
        W7[模板匹配]
        W8[语义检索]
    end
    
    P -->|任务分解 | E1
    P -->|任务分解 | E2
    P -->|任务分解 | E3
    
    E1 -->|调用 | W1
    E1 -->|调用 | W3
    E1 -->|调用 | W6
    E1 -->|调用 | W8
    
    E2 -->|调用 | W1
    E2 -->|调用 | W2
    E2 -->|调用 | W3
    E2 -->|调用 | W4
    E2 -->|调用 | W5
    E2 -->|调用 | W7
    
    style Level1 fill:#c8e6c9
    style Level2 fill:#a5d6a7
    style Level3 fill:#81c784
    style P fill:#4caf50,color:#fff
```

---

## 图 3: 记忆存储架构

```mermaid
graph TB
    subgraph ShortTerm["短期记忆 Short-term Memory"]
        ST1[会话上下文<br/>Session Context]
        ST2[对话历史<br/>Conversation History]
        ST3[临时变量<br/>Temp Variables]
        STM[Redis Cluster<br/>TTL: 30 分钟 -24 小时]
    end
    
    subgraph MidTerm["中期记忆 Mid-term Memory"]
        MT1[任务执行记录<br/>Task Executions]
        MT2[会话摘要<br/>Session Summaries]
        MT3[中间结果<br/>Intermediate Results]
        MTM[PostgreSQL<br/>保留：7-30 天]
    end
    
    subgraph LongTerm["长期记忆 Long-term Memory"]
        LT1[用户画像<br/>User Profiles]
        LT2[知识库<br/>Knowledge Base]
        LT3[经验沉淀<br/>Lessons Learned]
        LT4[行为模式<br/>Behavior Patterns]
        LTM[Vector DB + PostgreSQL<br/>永久存储]
    end
    
    ST1 --> STM
    ST2 --> STM
    ST3 --> STM
    
    MT1 --> MTM
    MT2 --> MTM
    MT3 --> MTM
    
    LT1 --> LTM
    LT2 --> LTM
    LT3 --> LTM
    LT4 --> LTM
    
    STM -.->|定期归档 | MTM
    MTM -.->|重要数据沉淀 | LTM
    
    style ShortTerm fill:#ffe0b2
    style MidTerm fill:#ffcc80
    style LongTerm fill:#ffb74d
    style STM fill:#ff9800,color:#fff
    style MTM fill:#f57c00,color:#fff
    style LTM fill:#e65100,color:#fff
```

---

## 图 4: 任务执行流程

```mermaid
sequenceDiagram
    participant U as 用户/触发器
    participant G as 网关层
    participant S as 调度中心
    participant P as 规划智能体
    participant E as 专家层智能体
    participant W as 子智能体
    participant M as 记忆系统
    participant T as 工具集
    participant Q as 质量审核
    participant D as 投放服务
    participant F as 反馈系统
    
    U->>G: 1. 请求/事件触发
    G->>S: 2. 创建任务实例
    S->>P: 3. 执行规划
    
    P->>M: 4. 查询上下文
    M-->>P: 返回上下文
    P->>P: 5. 任务分解与路径规划
    
    par 并行执行子任务
        P->>E: 6a. 分配任务给专家层
        E->>W: 7a. 调用子智能体
        W->>T: 8a. 调用工具
        T-->>W: 返回结果
        W-->>E: 返回结果
        E-->>P: 返回结果
    and
        P->>E: 6b. 分配另一任务
        E->>W: 7b. 调用子智能体
        W->>T: 8b. 调用工具
        T-->>W: 返回结果
        W-->>E: 返回结果
        E-->>P: 返回结果
    end
    
    P->>Q: 9. 提交质量审核
    Q->>Q: 10a. 自动审核
    Q->>Q: 10b. 人工抽检 (10%)
    Q-->>P: 审核结果
    
    alt 审核通过
        P->>D: 11. 执行投放
        D->>U: 12. 内容触达用户
        U->>F: 13. 用户反馈 (点击/转化/评分)
        F->>M: 14. 存储反馈数据
        F->>P: 15. 反馈用于优化
    else 审核不通过
        P->>P: 11. 修订方案
        P->>Q: 重新提交审核
    end
    
    style U fill:#e3f2fd
    style P fill:#c8e6c9
    style Q fill:#fff3e0
    style F fill:#fce4ec
```

---

## 图 5: A/B 测试与反馈闭环

```mermaid
graph LR
    subgraph Experiment["A/B 实验配置"]
        E1[版本 A<br/>50% 流量]
        E2[版本 B<br/>50% 流量]
    end
    
    subgraph Delivery["投放执行"]
        D1[渠道 1: APP 推送]
        D2[渠道 2: 短信]
        D3[渠道 3: 微信]
    end
    
    subgraph Tracking["数据追踪"]
        T1[曝光事件]
        T2[点击事件]
        T3[转化事件]
        T4[评分事件]
    end
    
    subgraph Analysis["效果分析"]
        A1[实时看板]
        A2[统计显著性检验]
        A3[优胜版本判定]
    end
    
    subgraph Optimization["优化决策"]
        O1[自动流量调整]
        O2[策略更新]
        O3[模型优化]
    end
    
    subgraph Learning["学习沉淀"]
        L1[更新用户画像]
        L2[优化内容策略]
        L3[沉淀最佳实践]
    end
    
    E1 --> D1
    E1 --> D2
    E2 --> D2
    E2 --> D3
    
    D1 --> T1
    D2 --> T1
    D3 --> T1
    
    T1 --> T2
    T2 --> T3
    T3 --> T4
    
    T4 --> A1
    T4 --> A2
    A2 --> A3
    
    A3 --> O1
    A3 --> O2
    O2 --> O3
    
    O3 --> L1
    O3 --> L2
    O3 --> L3
    
    L2 -.->|下一次实验 | E1
    L2 -.->|下一次实验 | E2
    
    style Experiment fill:#e3f2fd
    style Delivery fill:#c8e6c9
    style Tracking fill:#fff3e0
    style Analysis fill:#f3e5f5
    style Optimization fill:#fce4ec
    style Learning fill:#e0f2f1
```

---

## 图 6: 服务版本管理与发布流程

```mermaid
graph TB
    subgraph Development["开发阶段"]
        D1[新版本开发]
        D2[单元测试]
        D3[集成测试]
    end
    
    subgraph Testing["测试阶段"]
        T1[测试环境部署]
        T2[功能测试]
        T3[性能测试]
        T4[安全测试]
    end
    
    subgraph Staging["预发阶段"]
        S1[预发环境部署]
        S2[回归测试]
        S3[验收测试]
    end
    
    subgraph Production["生产发布"]
        P1[灰度 1%]
        P2[灰度 5%]
        P3[灰度 20%]
        P4[灰度 50%]
        P5[全量 100%]
    end
    
    subgraph Monitoring["监控告警"]
        M1[错误率监控]
        M2[延迟监控]
        M3[业务指标监控]
        M4[自动告警]
    end
    
    subgraph Rollback["回滚机制"]
        R1[自动回滚触发]
        R2[手动回滚]
        R3[版本切换]
    end
    
    D1 --> D2 --> D3
    D3 --> T1 --> T2 --> T3 --> T4
    T4 --> S1 --> S2 --> S3
    S3 --> P1 --> P2 --> P3 --> P4 --> P5
    
    P1 --> M1
    P2 --> M1
    P3 --> M1
    P4 --> M1
    P5 --> M1
    
    M1 --> M4
    M4 --> R1
    R1 --> R3
    R2 --> R3
    
    style Development fill:#e3f2fd
    style Testing fill:#c8e6c9
    style Staging fill:#fff3e0
    style Production fill:#f3e5f5
    style Monitoring fill:#ffe0b2
    style Rollback fill:#ffcdd2
```

---

## 图 7: 工具集架构

```mermaid
graph TB
    subgraph InternalTools["内部工具 Internal Tools"]
        IT1[内容管理<br/>- 内容查询<br/>- 内容创建<br/>- 内容审核]
        IT2[用户管理<br/>- 用户查询<br/>- 用户画像<br/>- 行为分析]
        IT3[业务工具<br/>- 订单查询<br/>- 服务预约<br/>- 工单处理]
    end
    
    subgraph ExternalTools["外部工具 External Tools"]
        ET1[搜索类<br/>- 搜索引擎 API<br/>- 知识库检索]
        ET2[服务类<br/>- 地图 API<br/>- 天气 API<br/>- 支付 API]
        ET3[营销类<br/>- 短信/邮件<br/>- 社交媒体<br/>- 广告平台]
    end
    
    subgraph ToolRegistry["工具注册中心"]
        TR1[工具描述]
        TR2[参数校验]
        TR3[权限控制]
        TR4[调用日志]
        TR5[限流配置]
    end
    
    subgraph ToolGateway["工具网关"]
        TG1[请求路由]
        TG2[认证鉴权]
        TG3[限流熔断]
        TG4[超时控制]
        TG5[重试机制]
    end
    
    InternalTools --> ToolRegistry
    ExternalTools --> ToolRegistry
    ToolRegistry --> ToolGateway
    
    style InternalTools fill:#e8f5e9
    style ExternalTools fill:#c8e6c9
    style ToolRegistry fill:#fff3e0
    style ToolGateway fill:#ffe0b2
```

---

## 图 8: 数据流与可观测性

```mermaid
graph TB
    subgraph DataFlow["数据流 Data Flow"]
        DF1[请求入口]
        DF2[智能体处理]
        DF3[工具调用]
        DF4[记忆读写]
        DF5[结果输出]
    end
    
    subgraph Metrics["指标采集 Metrics"]
        ME1[请求量 QPS]
        ME2[延迟 P50/P99]
        ME3[错误率]
        ME4[资源使用率]
        ME5[业务指标]
    end
    
    subgraph Logging["日志系统 Logging"]
        LG1[访问日志]
        LG2[错误日志]
        LG3[审计日志]
        LG4[智能体决策日志]
    end
    
    subgraph Tracing["链路追踪 Tracing"]
        TR1[请求链路]
        TR2[智能体调用链]
        TR3[工具调用链]
        TR4[依赖服务链]
    end
    
    subgraph Visualization["可视化 Visualization"]
        V1[Grafana 看板]
        V2[日志分析]
        V3[链路追踪 UI]
        V4[告警面板]
    end
    
    DF1 --> DF2 --> DF3 --> DF4 --> DF5
    
    DF2 --> ME1
    DF2 --> ME2
    DF2 --> ME3
    DF3 --> ME4
    DF5 --> ME5
    
    DF2 --> LG1
    DF2 --> LG2
    DF2 --> LG4
    DF3 --> LG3
    
    DF1 --> TR1
    DF2 --> TR2
    DF3 --> TR3
    DF3 --> TR4
    
    ME1 --> V1
    ME2 --> V1
    ME3 --> V1
    ME4 --> V1
    ME5 --> V1
    
    LG1 --> V2
    LG2 --> V2
    LG3 --> V2
    LG4 --> V2
    
    TR1 --> V3
    TR2 --> V3
    TR3 --> V3
    TR4 --> V3
    
    ME3 --> V4
    
    style DataFlow fill:#e3f2fd
    style Metrics fill:#c8e6c9
    style Logging fill:#fff3e0
    style Tracing fill:#f3e5f5
    style Visualization fill:#fce4ec
```

---

## 图 9: 部署架构

```mermaid
graph TB
    subgraph LB["负载均衡层"]
        LB1[Nginx / ALB]
    end
    
    subgraph Gateway["API 网关集群"]
        G1[Gateway Pod 1]
        G2[Gateway Pod 2]
        G3[Gateway Pod 3]
    end
    
    subgraph Agent["智能体服务集群"]
        A1[Agent Pod 1<br/>HPA Auto-scale]
        A2[Agent Pod 2<br/>HPA Auto-scale]
        A3[Agent Pod 3<br/>HPA Auto-scale]
        A4[Agent Pod N...]
    end
    
    subgraph Data["数据层"]
        D1[Redis Cluster<br/>缓存/短期记忆]
        D2[PostgreSQL<br/>Primary + Replica<br/>中期记忆]
        D3[Milvus/Pinecone<br/>向量数据库<br/>长期记忆]
        D4[Kafka<br/>消息队列]
    end
    
    subgraph Observability["可观测性"]
        O1[Prometheus<br/>指标采集]
        O2[Grafana<br/>可视化]
        O3[ELK Stack<br/>日志]
        O4[Jaeger<br/>链路追踪]
    end
    
    LB --> G1
    LB --> G2
    LB --> G3
    
    G1 --> A1
    G2 --> A2
    G3 --> A3
    
    A1 --> D1
    A2 --> D1
    A3 --> D1
    A1 --> D2
    A2 --> D2
    A3 --> D2
    A1 --> D3
    A2 --> D3
    A3 --> D3
    A1 --> D4
    A2 --> D4
    A3 --> D4
    
    A1 --> O1
    A2 --> O1
    A3 --> O1
    D1 --> O1
    D2 --> O1
    D3 --> O1
    D4 --> O1
    
    O1 --> O2
    D1 --> O3
    D2 --> O3
    A1 --> O4
    A2 --> O4
    A3 --> O4
    
    style LB fill:#e3f2fd
    style Gateway fill:#c8e6c9
    style Agent fill:#a5d6a7
    style Data fill:#fff3e0
    style Observability fill:#f3e5f5
```

---

## 使用说明

1. **查看架构图**: 将上述 Mermaid 代码复制到支持 Mermaid 的编辑器中查看（如 GitHub、Notion、Mermaid Live Editor）
2. **在线预览**: 访问 https://mermaid.live 粘贴代码实时预览
3. **导出图片**: 在 Mermaid Live Editor 中可导出 PNG/SVG 格式
