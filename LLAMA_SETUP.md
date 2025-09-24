# Llama AI Agent 安装配置指南

## 🚀 **快速开始**

### 1. **安装Ollama**
```bash
# Windows (PowerShell)
winget install Ollama.Ollama

# 或者下载安装包
# https://ollama.ai/download
```

### 2. **启动Ollama服务**
```bash
# 启动Ollama服务
ollama serve
```

### 3. **下载Llama模型**
```bash
# 下载Llama 3.1 8B模型
ollama pull llama3.1:8b

# 或者下载其他版本
ollama pull llama3.1:70b  # 更大更强的模型
ollama pull llama3.1:7b   # 更小的模型
```

### 4. **安装项目依赖**
```bash
npm install
```

## 🔧 **配置说明**

### 1. **环境变量配置**
在 `.env` 文件中添加：
```env
# Llama配置
LLAMA_MODEL=llama3.1:8b
LLAMA_TEMPERATURE=0.7
LLAMA_MAX_TOKENS=2000

# 可选：OpenAI作为备用
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. **模型选择建议**

| 模型 | 大小 | 性能 | 推荐场景 |
|------|------|------|----------|
| `llama3.1:7b` | 4GB | 中等 | 开发测试 |
| `llama3.1:8b` | 5GB | 良好 | 生产环境 |
| `llama3.1:70b` | 40GB | 优秀 | 高质量需求 |

### 3. **硬件要求**

#### 最低配置
- **CPU**: 4核心
- **内存**: 8GB RAM
- **存储**: 10GB 可用空间

#### 推荐配置
- **CPU**: 8核心以上
- **内存**: 16GB RAM以上
- **GPU**: NVIDIA RTX 3060以上（可选，加速推理）
- **存储**: 50GB 可用空间

## 🎯 **手工饰品专业知识库**

### 1. **材质知识**
- **金属**: 纯银、925银、黄金、玫瑰金、铜、不锈钢
- **宝石**: 天然宝石、人造宝石、珍珠、水晶、玛瑙
- **工艺**: 手工雕刻、镶嵌工艺、抛光打磨、电镀处理

### 2. **设计风格**
- **复古风格**: 维多利亚风格、新艺术风格、装饰艺术风格
- **现代风格**: 简约现代、极简主义、几何设计、抽象艺术
- **民族风格**: 波西米亚、印度风格、非洲风格、中国风

### 3. **目标客户**
- **主要客户**: 25-45岁女性，追求个性，注重品质
- **次要客户**: 18-30岁，追求时尚，性价比导向

## 📊 **性能优化**

### 1. **模型优化**
```bash
# 设置模型参数
ollama run llama3.1:8b --temperature 0.7 --top-p 0.9
```

### 2. **内存优化**
```bash
# 限制模型内存使用
export OLLAMA_MAX_LOADED_MODELS=1
export OLLAMA_MAX_QUEUE=1
```

### 3. **GPU加速（可选）**
```bash
# 安装CUDA支持
# 确保NVIDIA驱动和CUDA已安装
ollama run llama3.1:8b --gpu-layers 20
```

## 🔍 **测试验证**

### 1. **测试Llama连接**
```bash
# 测试模型是否可用
ollama run llama3.1:8b "你好，请介绍一下手工饰品的特点"
```

### 2. **测试API端点**
```bash
# 测试Llama状态
curl http://localhost:5000/api/llama/status

# 测试行业洞察
curl http://localhost:5000/api/llama/insights
```

### 3. **测试文案生成**
```bash
# 启动服务器
npm run server

# 在浏览器中测试文案生成功能
```

## 🚨 **常见问题**

### 1. **模型下载失败**
```bash
# 检查网络连接
# 尝试使用代理
export HTTP_PROXY=http://proxy:port
export HTTPS_PROXY=http://proxy:port
```

### 2. **内存不足**
```bash
# 使用更小的模型
ollama pull llama3.1:7b

# 或者减少并发请求
```

### 3. **响应速度慢**
```bash
# 使用GPU加速
# 或者使用更小的模型
# 调整模型参数
```

## 📈 **监控和维护**

### 1. **性能监控**
```bash
# 查看模型状态
ollama list

# 查看运行状态
ollama ps
```

### 2. **日志查看**
```bash
# 查看Ollama日志
ollama logs

# 查看应用日志
npm run server
```

### 3. **模型更新**
```bash
# 更新模型
ollama pull llama3.1:8b

# 重启服务
ollama serve
```

## 🎨 **自定义配置**

### 1. **修改模型参数**
编辑 `llama-config.js` 文件：
```javascript
const llamaConfig = {
  model: {
    name: 'llama3.1:8b',
    temperature: 0.7,  // 调整创造性
    maxTokens: 2000,   // 调整长度
    topP: 0.9,        // 调整多样性
    topK: 40          // 调整随机性
  }
};
```

### 2. **添加专业知识**
编辑 `llama-agent.js` 文件，在 `loadIndustryKnowledge()` 方法中添加更多专业知识。

### 3. **优化提示词**
编辑 `buildProductPrompt()` 方法，优化提示词模板。

## 🔒 **安全考虑**

### 1. **API安全**
- 限制API调用频率
- 添加身份验证
- 监控异常请求

### 2. **数据安全**
- 加密敏感数据
- 定期备份模型
- 限制访问权限

## 📚 **进阶功能**

### 1. **模型微调**
```bash
# 使用自定义数据微调模型
ollama create my-jewelry-model -f Modelfile
```

### 2. **多模型支持**
```bash
# 支持多个模型切换
ollama pull llama3.1:7b
ollama pull llama3.1:8b
ollama pull llama3.1:70b
```

### 3. **API集成**
```bash
# 集成到现有系统
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"productId":"123","style":"modern","platform":"social"}'
```

## 🎯 **最佳实践**

### 1. **提示词工程**
- 使用具体的产品信息
- 包含目标受众信息
- 添加情感触发词

### 2. **结果优化**
- 设置合适的温度参数
- 使用多样化的提示词
- 定期评估和改进

### 3. **性能监控**
- 监控响应时间
- 跟踪生成质量
- 收集用户反馈

## 🚀 **部署建议**

### 1. **本地部署**
- 适合开发和小规模使用
- 需要足够的硬件资源
- 维护成本较低

### 2. **云端部署**
- 使用云服务商的GPU实例
- 适合大规模生产使用
- 成本较高但性能更好

### 3. **混合部署**
- 本地开发，云端生产
- 平衡成本和性能
- 灵活的资源分配
