# 每日 Skill 推荐 Cron 任务

## 任务说明
每天早上 9 点搜索一个热门 skill 并发布到博客

## Cron 配置
```yaml
schedule: "0 9 * * *"  # 每天 9:00 AM
task: daily-skill-blog
```

## 执行流程
1. 搜索 ClawHub 热门 skills（按下载量排序）
2. 选择一个用户未安装的 top skill
3. 收集信息：
   - Skill 名称、版本、作者
   - ClawHub 页面链接
   - 下载量、Stars
   - 功能描述
   - 用户评价/反馈
   - 安全评级
4. 创建博客文章（格式参考第 1 期）
5. Git push 触发自动部署
6. 发送总结给用户

## 文章模板
- 标题：`100 个 Skills 第 x 期：[Skill 名称]`
- 分类：技术笔记
- 标签：OpenClaw, Skill, 工具推荐
- 内容包含：基本信息、功能介绍、安装指南、使用场景、使用例子、用户评价、优缺点

## 已发布
- 第 1 期 (2026-03-27): Skill Vetter - https://yufengyuanx.github.io/blog/tech/100-skills-01-skill-vetter.html
- 第 2 期 (2026-03-28): Summarize - https://yufengyuanx.github.io/blog/tech/100-skills-02-summarize.html
- 第 3 期 (2026-03-29): Capability Evolver - https://yufengyuanx.github.io/blog/tech/100-skills-03-capability-evolver.html
