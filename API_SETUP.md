# API 配置指南

## OpenAI API 密钥配置

本应用需要配置 OpenAI API 密钥才能正常使用 AI 文案生成功能。

### 获取 API 密钥

1. **访问 OpenAI 平台**
   - 打开 https://platform.openai.com/api-keys
   - 使用您的 OpenAI 账户登录

2. **创建 API 密钥**
   - 点击 "Create new secret key"
   - 输入密钥名称（可选）
   - 点击 "Create secret key"
   - **重要**：立即复制密钥，关闭页面后将无法再次查看

3. **配置环境变量**
   - 复制 `env.example` 文件为 `.env`
   - 将您的 API 密钥粘贴到 `OPENAI_API_KEY` 字段

### 配置步骤

```bash
# 1. 复制环境变量文件
cp env.example .env

# 2. 编辑 .env 文件
# 将 your_openai_api_key_here 替换为您的实际 API 密钥
OPENAI_API_KEY=sk-your-actual-api-key-here

# 3. 重启应用
npm run server
```

### 常见问题

#### 1. API 密钥无效
- 检查密钥是否正确复制
- 确认密钥没有多余的空格或换行符
- 验证密钥是否已激活

#### 2. 配额不足
- 检查您的 OpenAI 账户余额
- 访问 https://platform.openai.com/usage 查看使用情况
- 考虑升级到付费套餐

#### 3. 调用频率超限
- 等待一段时间后重试
- 考虑升级到更高限制的套餐
- 检查是否有其他应用在使用同一密钥

#### 4. 网络连接问题
- 检查网络连接
- 确认防火墙设置
- 尝试使用 VPN（如果在受限地区）

### 费用说明

- **GPT-4 Turbo**: 每 1K tokens 约 $0.01-0.03
- **文案生成**: 每次生成约消耗 500-1000 tokens
- **预估成本**: 每次生成约 $0.005-0.03

### 安全建议

1. **保护 API 密钥**
   - 不要将密钥提交到代码仓库
   - 不要在前端代码中暴露密钥
   - 定期轮换密钥

2. **监控使用情况**
   - 定期检查 API 使用量
   - 设置使用限制和告警
   - 监控异常调用

3. **环境隔离**
   - 开发、测试、生产环境使用不同的密钥
   - 为不同项目创建独立的 API 密钥

### 技术支持

如果遇到问题，请检查：
1. 控制台错误信息
2. 网络连接状态
3. API 密钥有效性
4. 账户余额和限制

更多信息请参考 [OpenAI API 文档](https://platform.openai.com/docs)
