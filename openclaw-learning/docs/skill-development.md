# OpenClaw 技能开发指南

## 🎯 技能是什么？

技能（Skills）是 OpenClaw 的功能扩展模块，每个技能包含：
- **SKILL.md**: 技能说明和使用文档
- **scripts/**: 执行脚本（JavaScript/Node.js）
- **assets/**: 可选的资源文件

## 📁 技能结构

```
my-skill/
├── SKILL.md              # 必需 - 技能文档
├── _meta.json            # 可选 - 元数据
├── scripts/
│   ├── main.mjs          # 主入口
│   └── helper.mjs        # 辅助函数
└── assets/
    └── config.yaml       # 可选资源
```

## 🚀 创建第一个技能

### 步骤 1: 创建目录

```bash
mkdir -p ~/.openclaw/workspace/skills/hello-world/{scripts,assets}
cd ~/.openclaw/workspace/skills/hello-world
```

### 步骤 2: 编写 SKILL.md

```markdown
---
name: hello-world
description: 我的第一个 OpenClaw 技能
author: Your Name
version: 1.0.0
---

# Hello World 技能

这是一个示例技能，用于学习 OpenClaw 技能开发。

## 使用方法

```
hello "你的名字"
```

## 输出示例

```
你好，你的名字！欢迎来到 OpenClaw 技能开发。
```

## 触发词

- hello
- 你好
- greet
```

### 步骤 3: 编写主脚本

```javascript
#!/usr/bin/env node
// scripts/main.mjs

// OpenClaw 技能入口
// 通过 stdin 接收输入，stdout 输出结果

const input = process.argv.slice(2).join(' ');

if (!input) {
  console.log('请提供一个名字：hello "你的名字"');
  process.exit(1);
}

console.log(`你好，${input}！欢迎来到 OpenClaw 技能开发。🦞`);
```

### 步骤 4: 测试技能

```bash
# 在 OpenClaw 中测试
# 发送消息：hello "Frank"

# 或直接在命令行测试
node scripts/main.mjs "Frank"
```

## 🔧 高级技能开发

### 使用工具调用

```javascript
// scripts/main.mjs
import { readFileSync, writeFileSync } from 'fs';

// 示例：读取文件并处理
function processFile(path) {
  const content = readFileSync(path, 'utf-8');
  return content.toUpperCase();
}

// 示例：写入文件
function saveResult(path, data) {
  writeFileSync(path, data);
  return `结果已保存到 ${path}`;
}

// 主逻辑
const [action, ...args] = process.argv.slice(2);

switch (action) {
  case 'read':
    console.log(processFile(args[0]));
    break;
  case 'write':
    console.log(saveResult(args[0], args[1]));
    break;
  default:
    console.log('用法：skill read|write <args>');
}
```

### 调用外部 API

```javascript
// scripts/weather.mjs
import https from 'https';

async function getWeather(city) {
  return new Promise((resolve, reject) => {
    const url = `https://wttr.in/${city}?format=j1`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        const current = json.current_condition[0];
        resolve({
          temp: current.temp_C,
          desc: current.weatherDesc[0].value,
          humidity: current.humidity
        });
      });
    }).on('error', reject);
  });
}

// 使用
const city = process.argv[2] || 'Beijing';
getWeather(city).then(console.log).catch(console.error);
```

### 与 OpenClaw 工具集成

```javascript
// scripts/file-organizer.mjs
import { execSync } from 'child_process';

// 调用 OpenClaw exec 工具
function runCommand(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf-8' });
  } catch (error) {
    return `错误：${error.message}`;
  }
}

// 示例：整理下载目录
function organizeDownloads() {
  const commands = [
    'mkdir -p ~/Downloads/{Images,Documents,Archives}',
    'mv ~/Downloads/*.jpg ~/Downloads/Images/ 2>/dev/null',
    'mv ~/Downloads/*.png ~/Downloads/Images/ 2>/dev/null',
    'mv ~/Downloads/*.pdf ~/Downloads/Documents/ 2>/dev/null',
    'mv ~/Downloads/*.zip ~/Downloads/Archives/ 2>/dev/null',
  ];
  
  return commands.map(runCommand).join('\n');
}

console.log(organizeDownloads());
```

## 📋 SKILL.md 模板

```markdown
---
name: skill-name
description: 简短描述（用于技能市场展示）
author: Your Name
version: 1.0.0
license: MIT
tags: [tag1, tag2, tag3]
requires: [env-var1, env-var2]  # 可选 - 需要的环境变量
---

# 技能名称

## 功能描述

详细说明技能的功能和使用场景。

## 安装

```bash
npx clawhub@latest install your-username/skill-name
```

## 使用方法

### 基本用法

```
<触发词> <参数>
```

### 高级用法

```
<触发词> --flag <value>
```

## 示例

```
示例 1: 输入 → 输出
示例 2: 输入 → 输出
```

## 配置

如需配置，请设置以下环境变量：

```bash
export API_KEY="your-key"
export CUSTOM_OPTION="value"
```

## 触发词

- keyword1
- keyword2
- 中文触发词

## 依赖

- Node.js 18+
- 其他依赖...

## 更新日志

### v1.0.0
- 初始版本
```

## 🎨 最佳实践

### 1. 错误处理

```javascript
try {
  // 主要逻辑
} catch (error) {
  console.error(`技能执行失败：${error.message}`);
  process.exit(1);
}
```

### 2. 输入验证

```javascript
if (!input || input.length < 2) {
  console.log('❌ 输入太短，请提供至少 2 个字符');
  process.exit(1);
}
```

### 3. 输出格式化

```javascript
// 使用 emoji 增强可读性
console.log('✅ 任务完成！');
console.log('❌ 发生错误');
console.log('⚠️ 注意事项');

// 使用结构化输出
console.log(JSON.stringify({
  status: 'success',
  data: result,
  message: '操作成功'
}, null, 2));
```

### 4. 文档清晰

- 提供多个使用示例
- 说明所有参数和选项
- 列出可能的错误和解决方案

## 📤 发布到 ClawHub

### 步骤 1: 准备发布

```bash
# 确保目录结构正确
ls -la
# SKILL.md, scripts/, _meta.json

# 验证 SKILL.md 格式
cat SKILL.md | head -20
```

### 步骤 2: 上传到 GitHub

```bash
git init
git add .
git commit -m "Initial release"
git remote add origin https://github.com/your-username/skill-name.git
git push -u origin main
```

### 步骤 3: 提交到 ClawHub

访问 https://clawhub.com/upload 或直接分享 GitHub 仓库链接。

## 🔍 调试技巧

### 本地测试

```bash
# 直接运行脚本
node scripts/main.mjs test-input

# 查看日志
tail -f ~/.openclaw/logs/gateway.log

# 检查技能加载
openclaw skills info skill-name
```

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 技能不响应 | SKILL.md 格式错误 | 检查 frontmatter 格式 |
| 脚本执行失败 | 权限问题 | `chmod +x scripts/*.mjs` |
| 输出不显示 | stdout 被阻塞 | 确保使用 console.log |
| 环境变量未加载 | 配置未生效 | 重启 Gateway |

## 📚 参考资源

- **官方技能示例**: https://github.com/openclaw/skills
- **ClawHub 热门技能**: https://clawhub.com/skills
- **Node.js 文档**: https://nodejs.org/docs
- **OpenClaw 工具参考**: https://docs.openclaw.ai/tools

---

**🦞 Happy Coding!**
