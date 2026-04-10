# 100 个 OpenClaw Skills 系列 #13：数据分析与可视化技能

> **发布日期：** 2026-04-10  
> **安全等级：** 🟡 MEDIUM  
> **关键词：** 数据分析，可视化，pandas, matplotlib, Python

---

## 🎯 技能概述

数据分析与可视化技能让 AI 助手能够处理 CSV/Excel 数据、执行统计分析、生成图表和报告。适合数据科学家、分析师和需要快速数据洞察的开发者。

## 📦 核心技能

### 1. data-analysis

**功能：** 通用数据分析任务处理

**核心能力：**
- CSV/Excel/JSON 数据加载与解析
- 描述性统计（均值、中位数、标准差等）
- 数据清洗（缺失值处理、异常值检测）
- 数据转换与聚合
- 相关性分析与假设检验

**安装命令：**
```bash
openclaw skills install data-analysis
```

**使用示例：**
```bash
# 分析销售数据
分析 sales_2025.csv，告诉我：
- 每月销售额趋势
- Top 10 产品
- 异常值检测

# 数据清洗
清理 customer_data.csv，处理缺失值和重复记录
```

**适用场景：**
- 销售/运营数据分析
- 用户行为分析
- A/B 测试结果评估
- 数据质量审计

---

### 2. data-visualization

**功能：** 生成 publication-quality 数据可视化图表

**核心能力：**
- 基础图表：折线图、柱状图、散点图、饼图
- 高级图表：热力图、箱线图、小提琴图
- 多子图布局
- 自定义样式与主题
- 导出为 PNG/SVG/PDF

**安装命令：**
```bash
openclaw skills install data-visualization
```

**使用示例：**
```bash
# 生成销售趋势图
绘制 monthly_sales.csv 的折线图，保存为 sales_trend.png

# 多变量分析
创建 scatter matrix 展示 features.csv 中各变量关系

# 热力图
生成 correlation_heatmap.svg 展示相关性矩阵
```

**输出格式：**
- PNG (默认，适合报告)
- SVG (可编辑，适合演示)
- PDF (publication-ready)

---

### 3. excel-automation

**功能：** Excel 文件读写与自动化处理

**核心能力：**
- 多 sheet 读写
- 公式计算与验证
- 数据透视表生成
- 条件格式化
- 批量处理多个 Excel 文件

**安装命令：**
```bash
openclaw skills install excel-automation
```

**使用示例：**
```bash
# 合并多个 Excel 报表
合并 Q1_*.xlsx 到 annual_report.xlsx

# 生成透视表
从 sales.xlsx 创建按地区和产品的透视表

# 批量更新
更新所有.xlsx 文件中的汇率列
```

---

## 🔒 安全评估

| 维度 | 评级 | 说明 |
|------|------|------|
| 权限范围 | 🟡 MEDIUM | 需要文件系统读写权限 |
| 代码执行 | 🟡 MEDIUM | 执行 Python 数据分析代码 |
| 数据外传 | 🟢 LOW | 本地处理，不上传数据 |
| 依赖风险 | 🟢 LOW | 依赖 pandas/numpy/matplotlib，成熟库 |

**建议：**
1. 在隔离目录处理敏感数据
2. 审查生成的代码再执行
3. 大文件处理时监控内存使用

---

## 💡 实战案例

### 案例 1：销售仪表板自动生成

```bash
# 每日销售报告自动化
cron: "0 9 * * *"
command: |
  分析 /data/daily_sales.csv
  生成图表保存到 /reports/
  发送摘要到 Slack
```

**输出：**
- 销售趋势折线图
- 产品类别柱状图
- 地区分布地图
- 关键指标摘要

---

### 案例 2：用户行为分析

```bash
# 分析用户点击流数据
分析 user_events.csv:
- 计算留存率 (Day 1/7/30)
- 识别高价值用户群
- 生成漏斗转化图
- 输出细分报告
```

---

### 案例 3：财务报表自动化

```bash
# 月度财务处理
合并 expenses_*.xlsx
创建透视表按部门和类别
生成预算 vs 实际对比图
导出 PDF 报告
```

---

## 📊 技能对比

| 技能 | 优势 | 局限 |
|------|------|------|
| data-analysis | 统计功能全面 | 可视化有限 |
| data-visualization | 图表质量高 | 需先清洗数据 |
| excel-automation | Excel 原生支持 | 大文件性能一般 |

**推荐组合：** data-analysis + data-visualization

---

## 🛠️ 技术栈

**核心库：**
- `pandas` - 数据处理
- `numpy` - 数值计算
- `matplotlib` - 基础绘图
- `seaborn` - 统计图表
- `plotly` - 交互式图表 (可选)
- `openpyxl` - Excel 处理

**性能优化：**
- 大文件使用 `chunksize` 分块处理
- 数值运算用 numpy 向量化
- 图表缓存避免重复渲染

---

## 🚀 进阶技巧

1. **管道式处理：** 串联多个技能形成数据 pipeline
2. **缓存中间结果：** 避免重复计算
3. **增量更新：** 只处理新增数据
4. **交互式探索：** 结合 Jupyter 进行迭代分析

---

## 📚 相关资源

- [pandas 官方文档](https://pandas.pydata.org/docs/)
- [matplotlib 画廊](https://matplotlib.org/stable/gallery/index.html)
- [Python 数据科学手册](https://jakevdp.github.io/PythonDataScienceHandbook/)
- [Kaggle 数据科学课程](https://www.kaggle.com/learn)

---

## ✅ 总结

数据分析与可视化技能是数据驱动决策的利器：
- **data-analysis** 处理统计与清洗
- **data-visualization** 生成高质量图表
- **excel-automation** 处理企业 Excel 工作流

**推荐指数：** ⭐⭐⭐⭐⭐（分析师/开发者必备）

**下一步：** 结合 cron 技能实现定期报告自动化

---

*下一篇预告：#14 - 测试自动化技能 (pytest/Selenium)*
