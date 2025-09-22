const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 导入AI生成系统
const { AICopywritingGenerator } = require('./ai-model-integration');

const app = express();
const PORT = process.env.PORT || 5000;

// 初始化AI生成器（支持模拟模式）
let aiGenerator = null;
let useMockMode = false;

if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  try {
    aiGenerator = new AICopywritingGenerator(process.env.OPENAI_API_KEY);
    console.log('✅ AI生成器初始化成功 - 使用OpenAI API');
  } catch (error) {
    console.log('⚠️  AI生成器初始化失败，切换到模拟模式:', error.message);
    useMockMode = true;
  }
} else {
  console.log('⚠️  OpenAI API密钥未配置，使用模拟模式');
  useMockMode = true;
}

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// 模拟数据存储
let products = [];
let copywritings = [];

// 文案风格配置
const WRITING_STYLES = {
  professional: {
    name: '专业商务风格',
    description: '正式、专业、权威，适合B2B产品',
    tone: 'professional and authoritative'
  },
  friendly: {
    name: '活泼亲民风格',
    description: '亲切、友好、易理解，适合大众消费品',
    tone: 'friendly and approachable'
  },
  simple: {
    name: '简洁明了风格',
    description: '直接、简洁、重点突出',
    tone: 'concise and direct'
  },
  luxury: {
    name: '奢华高端风格',
    description: '高端、精致、有品质感',
    tone: 'luxurious and premium'
  },
  humorous: {
    name: '幽默风趣风格',
    description: '有趣、轻松、有记忆点',
    tone: 'humorous and engaging'
  },
  emotional: {
    name: '情感共鸣风格',
    description: '温暖、有情感、能引起共鸣',
    tone: 'warm and emotionally resonant'
  }
};

// 平台配置
const PLATFORMS = {
  ecommerce: {
    name: '电商平台',
    description: '淘宝、京东、亚马逊等电商平台产品描述',
    maxLength: 2000
  },
  social: {
    name: '社交媒体',
    description: '微信、微博、小红书等社交媒体文案',
    maxLength: 500
  },
  ads: {
    name: '广告文案',
    description: '百度、Google、Facebook等广告文案',
    maxLength: 100
  },
  email: {
    name: '邮件营销',
    description: '邮件营销文案',
    maxLength: 1000
  },
  manual: {
    name: '产品手册',
    description: '产品手册和说明书文案',
    maxLength: 3000
  }
};

// API路由

// 获取文案风格列表
app.get('/api/styles', (req, res) => {
  res.json(WRITING_STYLES);
});

// 获取平台列表
app.get('/api/platforms', (req, res) => {
  res.json(PLATFORMS);
});

// 保存产品信息
app.post('/api/products', (req, res) => {
  const { name, description, features, category, targetAudience, priceRange } = req.body;
  
  const product = {
    id: Date.now().toString(),
    name,
    description,
    features: features || [],
    category: category || '其他',
    targetAudience: targetAudience || '',
    priceRange: priceRange || '',
    createdAt: new Date().toISOString()
  };
  
  products.push(product);
  res.json(product);
});

// 生成文案 - 使用AI大模型
app.post('/api/generate', async (req, res) => {
  try {
    const { productId, style, platform, variantCount = 3 } = req.body;
    
    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: '产品不存在' });
    }
    
    const styleConfig = WRITING_STYLES[style];
    const platformConfig = PLATFORMS[platform];
    
    if (!styleConfig || !platformConfig) {
      return res.status(400).json({ error: '无效的风格或平台' });
    }
    
    // 使用AI大模型生成文案
    let generatedCopywritings;
    
    if (useMockMode) {
      // 使用模拟生成
      console.log('使用模拟模式生成文案');
      generatedCopywritings = generateMockCopywritings(product, styleConfig, platformConfig, variantCount);
    } else {
      try {
        // 使用真实AI模型
        generatedCopywritings = await aiGenerator.generateCopywriting(
          product, 
          style, 
          platform, 
          variantCount
        );
      } catch (aiError) {
        console.error('AI生成失败，切换到模拟模式:', aiError);
        
        // 根据错误类型返回不同的错误信息
        if (aiError.code === 'insufficient_quota') {
          return res.status(402).json({ 
            error: 'OpenAI API配额不足',
            details: '请检查您的OpenAI账户余额或升级套餐'
          });
        } else if (aiError.code === 'invalid_api_key') {
          return res.status(401).json({ 
            error: 'OpenAI API密钥无效',
            details: '请检查您的API密钥是否正确'
          });
        } else if (aiError.code === 'rate_limit_exceeded') {
          return res.status(429).json({ 
            error: 'API调用频率超限',
            details: '请稍后再试，或升级您的OpenAI套餐'
          });
        } else {
          // 其他错误，使用模拟模式
          console.log('切换到模拟模式生成文案');
          generatedCopywritings = generateMockCopywritings(product, styleConfig, platformConfig, variantCount);
        }
      }
    }
    
    // 保存生成的文案
    const copywriting = {
      id: Date.now().toString(),
      productId,
      style,
      platform,
      content: generatedCopywritings,
      createdAt: new Date().toISOString(),
      rating: null,
      aiGenerated: !useMockMode
    };
    
    copywritings.push(copywriting);
    res.json(copywriting);
    
  } catch (error) {
    console.error('生成文案错误:', error);
    res.status(500).json({ error: '生成文案失败' });
  }
});

// 评分文案
app.post('/api/copywritings/:id/rate', (req, res) => {
  const { id } = req.params;
  const { rating, feedback } = req.body;
  
  const copywriting = copywritings.find(c => c.id === id);
  if (!copywriting) {
    return res.status(404).json({ error: '文案不存在' });
  }
  
  copywriting.rating = rating;
  copywriting.feedback = feedback;
  copywriting.ratedAt = new Date().toISOString();
  
  res.json(copywriting);
});

// 获取用户的产品列表
app.get('/api/products', (req, res) => {
  res.json(products);
});

// 获取文案历史
app.get('/api/copywritings', (req, res) => {
  res.json(copywritings);
});

// 模拟AI生成文案的函数
function generateMockCopywritings(product, styleConfig, platformConfig, variantCount) {
  const variants = [];
  const angles = ['功能卖点', '情感共鸣', '使用场景', '对比优势', '品质保证'];
  
  for (let i = 0; i < variantCount; i++) {
    const angle = angles[i % angles.length];
    let content = '';
    
    switch (angle) {
      case '功能卖点':
        content = `【${product.name}】${styleConfig.tone === 'professional and authoritative' ? '专业推荐' : '精选好物'}！${product.description}。${product.features.length > 0 ? `主要特点：${product.features.join('、')}。` : ''}${platformConfig.name === '电商平台' ? '立即下单，品质保证！' : '了解更多详情。'}`;
        break;
      case '情感共鸣':
        content = `每一个细节都体现着用心，${product.name}不仅是一件商品，更是对生活的热爱。${product.description}，让${product.targetAudience || '您'}感受到真正的品质生活。`;
        break;
      case '使用场景':
        content = `无论是${product.targetAudience || '日常使用'}还是特殊场合，${product.name}都能完美胜任。${product.description}，让每一个瞬间都更加精彩。`;
        break;
      case '对比优势':
        content = `为什么选择${product.name}？${product.description}。相比同类产品，我们更注重${product.features[0] || '品质'}，为您提供更好的体验。`;
        break;
      case '品质保证':
        content = `${product.name}，严格把控每一个环节，确保${product.description}。${product.features.length > 0 ? `核心优势：${product.features.join('、')}。` : ''}值得信赖的选择。`;
        break;
    }
    
    // 根据平台调整长度
    if (content.length > platformConfig.maxLength) {
      content = content.substring(0, platformConfig.maxLength - 3) + '...';
    }
    
    variants.push({
      angle,
      content,
      wordCount: content.length
    });
  }
  
  return variants;
}

// 生产环境路由
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Vercel 无服务器环境
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // 本地开发环境
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
  });
}

// 导出app供Vercel使用
module.exports = app;
