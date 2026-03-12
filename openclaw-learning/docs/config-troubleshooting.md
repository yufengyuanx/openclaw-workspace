# OpenClaw 配置示例与故障排除

## ⚙️ 配置示例

### 1. 模型配置示例

#### Anthropic Claude
```json
{
  "model": {
    "provider": "anthropic",
    "apiKey": "sk-ant-...",
    "defaultModel": "claude-sonnet-4-20250514",
    "fallbackModels": [
      "claude-3-5-sonnet-20241022",
      "claude-3-haiku-20240307"
    ]
  }
}
```

#### OpenAI GPT
```json
{
  "model": {
    "provider": "openai",
    "apiKey": "sk-...",
    "defaultModel": "gpt-4o",
    "baseUrl": "https://api.openai.com/v1"
  }
}
```

#### 本地模型 (Ollama)
```json
{
  "model": {
    "provider": "ollama",
    "defaultModel": "llama3.1:8b",
    "baseUrl": "http://localhost:11434"
  }
}
```

### 2. 通道配置示例

#### Telegram
```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz",
      "webhookPort": 8443,
      "allowedUsers": ["your-telegram-id"]
    }
  }
}
```

#### Discord
```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "botToken": "MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.GHIJKL.mnopqrstuvwxyz",
      "guildId": "123456789012345678",
      "channelId": "987654321098765432"
    }
  }
}
```

### 3. 工具配置示例

#### Brave Search
```json
{
  "tools": {
    "web_search": {
      "braveApiKey": "YOUR_BRAVE_API_KEY",
      "defaultCount": 5,
      "defaultCountry": "US"
    }
  }
}
```

#### ElevenLabs TTS
```json
{
  "tools": {
    "tts": {
      "provider": "elevenlabs",
      "apiKey": "YOUR_ELEVENLABS_KEY",
      "defaultVoice": "nova",
      "defaultChannel": "telegram"
    }
  }
}
```

---

## 🔧 故障排除

### Gateway 启动失败

**问题**: `openclaw gateway start` 无响应或报错

**解决方案**:
```bash
# 1. 检查端口占用
lsof -i :18800
# 或
netstat -an | grep 18800

# 2. 查看日志
tail -f ~/.openclaw/logs/gateway.log

# 3. 重置 Gateway
openclaw gateway stop
rm ~/.openclaw/gateway.json
openclaw gateway start

# 4. 检查 Node.js 版本
node --version
# 需要 v18+
```

### 技能无法加载

**问题**: 技能安装后不生效

**解决方案**:
```bash
# 1. 检查技能目录
ls -la ~/.openclaw/workspace/skills/

# 2. 验证技能格式
openclaw skills check

# 3. 查看 SKILL.md 格式
cat ~/.openclaw/workspace/skills/skill-name/SKILL.md

# 4. 重启 Gateway
openclaw gateway restart
```

### 模型连接超时

**问题**: AI 请求超时或返回 401

**解决方案**:
```bash
# 1. 检查 API Key
openclaw configure --section model

# 2. 测试连接
curl -H "Authorization: Bearer YOUR_KEY" \
  https://api.anthropic.com/v1/messages \
  -d '{"model":"claude-3-sonnet-20240229","max_tokens":10}'

# 3. 检查网络
ping api.anthropic.com

# 4. 使用代理（如需要）
export HTTP_PROXY=http://proxy:port
export HTTPS_PROXY=http://proxy:port
```

### 子 Agent 无响应

**问题**: spawn 的子 Agent 不返回结果

**解决方案**:
```bash
# 1. 列出所有会话
sessions_list

# 2. 查看会话历史
sessions_history sessionKey="xxx"

# 3. 检查是否超时
# 默认超时 60 秒，长任务需设置 timeoutSeconds

# 4. 终止卡住的 Agent
subagents action="kill" target="agent-id"

# 5. 检查资源使用
session_status
```

### 通道消息不响应

**问题**: Telegram/Discord 消息无回复

**解决方案**:
```bash
# 1. 检查通道状态
openclaw configure --section channels

# 2. 验证 Bot Token
# Telegram: 向 @userinfobot 发送消息获取 ID
# Discord: 检查 Bot 权限和服务器设置

# 3. 查看通道日志
tail -f ~/.openclaw/logs/channels.log

# 4. 重新配置通道
openclaw configure --section channels
```

### 内存/存储问题

**问题**: 磁盘空间不足或内存占用高

**解决方案**:
```bash
# 1. 清理旧日志
find ~/.openclaw/logs -name "*.log" -mtime +7 -delete

# 2. 清理旧会话
# 手动删除 ~/.openclaw/sessions/ 中的旧会话

# 3. 压缩记忆文件
# 将 memory/ 中的旧文件归档

# 4. 检查磁盘使用
du -sh ~/.openclaw/*
```

---

## 📊 性能优化

### 减少 Token 消耗

1. **使用轻量模型处理简单任务**
   ```
   简单问答 → Haiku/Claude-3-Haiku
   复杂推理 → Sonnet/Claude-3-Sonnet
   代码任务 → Opus/Claude-3-Opus
   ```

2. **合理设置上下文**
   - 定期清理 MEMORY.md
   - 使用 memory/ 目录存储日常日志
   - 避免在每次对话中携带大量历史

3. **使用子 Agent 隔离**
   - 长任务用子 Agent 处理
   - 避免主会话历史无限增长

### 提高响应速度

1. **使用本地缓存**
   ```bash
   # 配置本地模型作为 fallback
   openclaw configure --section model
   ```

2. **优化技能加载**
   - 只安装必要的技能
   - 禁用不用的工具

3. **网络优化**
   - 使用 CDN 接入点
   - 配置合理的超时时间

---

## 🛡️ 安全建议

### API Key 管理

```bash
# 1. 使用环境变量（推荐）
export ANTHROPIC_API_KEY="sk-ant-..."
export BRAVE_API_KEY="..."

# 2. 或使用配置文件（确保权限）
chmod 600 ~/.openclaw/config.json
```

### 访问控制

```json
{
  "security": {
    "allowedUsers": ["telegram-id-1", "telegram-id-2"],
    "allowedCommands": ["read", "write", "exec"],
    "blockedCommands": ["rm -rf", "sudo", "curl | bash"]
  }
}
```

### 备份策略

```bash
# 定期备份配置
tar -czf openclaw-backup-$(date +%Y%m%d).tar.gz \
  ~/.openclaw/config.json \
  ~/.openclaw/workspace/

# 使用 Git 版本控制工作区
cd ~/.openclaw/workspace
git init
git add .
git commit -m "Initial backup"
```

---

## 📞 获取帮助

- **官方文档**: https://docs.openclaw.ai
- **GitHub Issues**: https://github.com/openclaw/openclaw/issues
- **Discord 社区**: https://discord.com/invite/clawd
- **ClawHub 技能**: https://clawhub.com

**提交 Issue 时请包含**:
1. OpenClaw 版本 (`openclaw --version`)
2. 系统信息 (`uname -a`)
3. 相关日志 (`~/.openclaw/logs/`)
4. 复现步骤
