// AI大模型集成方案 - 专业营销文案生成系统
const { OpenAI } = require('openai');

class AICopywritingGenerator {
  constructor(apiKey) {
    if (apiKey && apiKey !== 'your_openai_api_key_here') {
      this.openai = new OpenAI({ apiKey });
      this.useAI = true;
    } else {
      this.openai = null;
      this.useAI = false;
    }
    this.industryKnowledge = new IndustryKnowledgeBase();
    this.caseLearning = new CaseLearningSystem();
    this.promptEngineering = new PromptEngineering();
  }

  // 主生成方法
  async generateCopywriting(product, style, platform, variantCount = 3) {
    try {
      if (!this.useAI) {
        // 如果没有AI，使用增强的模拟生成
        return this.generateEnhancedMockCopywriting(product, style, platform, variantCount);
      }

      // 1. 获取行业专业知识
      const industryContext = this.industryKnowledge.getContext(product.category);
      
      // 2. 获取相关优秀案例
      const similarCases = await this.caseLearning.findSimilarCases(product);
      
      // 3. 构建专业提示词
      const prompt = this.promptEngineering.buildPrompt({
        product,
        style,
        platform,
        industryContext,
        similarCases,
        variantCount
      });

      // 4. 调用AI模型生成
      const response = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      });

      // 5. 解析和优化结果
      return this.parseAndOptimizeResponse(response.choices[0].message.content, platform);
      
    } catch (error) {
      console.error('AI生成失败:', error);
      return this.generateEnhancedMockCopywriting(product, style, platform, variantCount);
    }
  }

  // 增强的模拟生成方法
  generateEnhancedMockCopywriting(product, style, platform, variantCount) {
    const industryContext = this.industryKnowledge.getContext(product.category);
    const angles = ['功能卖点', '情感共鸣', '使用场景', '对比优势', '品质保证'];
    const variants = [];

    for (let i = 0; i < variantCount; i++) {
      const angle = angles[i % angles.length];
      let content = '';

      // 使用行业专业知识生成更专业的文案
      const keywords = industryContext.keywords;
      const sellingPoints = industryContext.sellingPoints;
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const randomSellingPoint = sellingPoints[Math.floor(Math.random() * sellingPoints.length)];

      switch (angle) {
        case '功能卖点':
          content = `【${product.name}】${randomKeyword}！${product.description}。${randomSellingPoint}，${product.features.length > 0 ? `主要特点：${product.features.join('、')}。` : ''}${platform === 'ecommerce' ? '立即下单，品质保证！' : '了解更多详情。'}`;
          break;
        case '情感共鸣':
          content = `每一个细节都体现着用心，${product.name}不仅是一件商品，更是对生活的热爱。${product.description}，让${product.targetAudience || '您'}感受到真正的品质生活。${randomSellingPoint}，值得拥有！`;
          break;
        case '使用场景':
          content = `无论是${product.targetAudience || '日常使用'}还是特殊场合，${product.name}都能完美胜任。${product.description}，${randomKeyword}，让每一个瞬间都更加精彩。`;
          break;
        case '对比优势':
          content = `为什么选择${product.name}？${product.description}。相比同类产品，我们更注重${randomSellingPoint}，为您提供更好的体验。${randomKeyword}，值得信赖！`;
          break;
        case '品质保证':
          content = `${product.name}，严格把控每一个环节，确保${product.description}。${randomSellingPoint}，${product.features.length > 0 ? `核心优势：${product.features.join('、')}。` : ''}${randomKeyword}，值得信赖的选择。`;
          break;
      }

      // 根据平台调整长度
      const maxLength = this.getPlatformMaxLength(platform);
      if (content.length > maxLength) {
        content = content.substring(0, maxLength - 3) + '...';
      }

      variants.push({
        angle,
        content,
        wordCount: content.length,
        keyPoints: [randomKeyword, randomSellingPoint],
        targetEmotion: this.getTargetEmotion(style)
      });
    }

    return variants;
  }

  getPlatformMaxLength(platform) {
    const lengths = {
      'ecommerce': 2000,
      'social': 500,
      'ads': 100,
      'email': 1000,
      'manual': 3000
    };
    return lengths[platform] || 2000;
  }

  getTargetEmotion(style) {
    const emotions = {
      'professional': '专业信任',
      'friendly': '亲切友好',
      'simple': '简洁明了',
      'luxury': '奢华尊贵',
      'humorous': '轻松愉快',
      'emotional': '温暖共鸣'
    };
    return emotions[style] || '专业信任';
  }
}

// 1. 行业专业知识库
class IndustryKnowledgeBase {
  constructor() {
    this.knowledge = {
      '手工制品': {
        keywords: ['匠心独运', '传统工艺', '手工制作', '独一无二', '艺术价值', '文化传承'],
        sellingPoints: ['纯手工打造', '每件都是艺术品', '传承千年工艺', '独一无二的设计'],
        consumerConcerns: ['品质保证', '工艺精湛', '收藏价值', '使用体验'],
        tone: '温暖、有故事感、强调工艺价值'
      },
      '珠宝首饰': {
        keywords: ['璀璨夺目', '奢华典雅', '永恒经典', '精致工艺', '闪耀光芒', '高贵气质'],
        sellingPoints: ['精选材质', '精湛工艺', '设计独特', '保值增值'],
        consumerConcerns: ['真伪辨别', '品质等级', '佩戴效果', '保养方法'],
        tone: '奢华、优雅、强调品质和设计'
      },
      '服装时尚': {
        keywords: ['时尚潮流', '个性表达', '舒适体验', '百搭单品', '设计感', '品质面料'],
        sellingPoints: ['时尚设计', '舒适面料', '百搭实用', '个性表达'],
        consumerConcerns: ['尺码合适', '面料舒适', '搭配效果', '洗涤保养'],
        tone: '时尚、活力、强调个性和舒适'
      },
      '美妆护肤': {
        keywords: ['天然成分', '温和配方', '有效成分', '安全无刺激', '持久效果', '专业配方'],
        sellingPoints: ['天然安全', '效果显著', '温和不刺激', '专业配方'],
        consumerConcerns: ['成分安全', '效果持久', '适用肤质', '使用方法'],
        tone: '专业、安全、强调效果和成分'
      },
      '数码3C': {
        keywords: ['高性能', '创新科技', '智能体验', '品质可靠', '先进技术', '用户体验'],
        sellingPoints: ['先进技术', '高性能', '智能体验', '品质可靠'],
        consumerConcerns: ['性能参数', '兼容性', '售后服务', '性价比'],
        tone: '科技感、专业、强调性能和体验'
      },
      '家居生活': {
        keywords: ['温馨舒适', '实用美观', '品质生活', '环保健康', '简约设计', '生活美学'],
        sellingPoints: ['实用美观', '环保健康', '提升生活品质', '简约设计'],
        consumerConcerns: ['材质安全', '使用便利', '空间搭配', '清洁保养'],
        tone: '温馨、实用、强调生活品质'
      }
    };
  }

  getContext(category) {
    return this.knowledge[category] || this.knowledge['其他'];
  }
}

// 2. 优秀案例学习系统
class CaseLearningSystem {
  constructor() {
    this.cases = [
      // 手工制品案例
      {
        category: '手工制品',
        product: '手工陶瓷茶具',
        description: '传统景德镇工艺，每件都是独一无二的艺术品',
        highConvertingCopy: '【匠心独运】景德镇大师手作陶瓷茶具，传承千年工艺，每件都是独一无二的艺术品。纯手工打造，釉色温润如玉，茶香四溢。不仅是一件茶具，更是对传统文化的传承。限量发售，值得收藏！',
        conversionRate: 12.5,
        platform: 'ecommerce',
        style: 'emotional'
      },
      {
        category: '手工制品',
        product: '手工编织包包',
        description: '天然藤条编织，环保时尚，展现自然之美',
        highConvertingCopy: '【自然之美】手工编织藤条包，天然材质，环保时尚。每一针每一线都倾注了匠人的心血，展现自然之美。容量大，实用性强，是时尚与环保的完美结合。',
        conversionRate: 8.3,
        platform: 'social',
        style: 'friendly'
      },
      // 珠宝首饰案例
      {
        category: '珠宝首饰',
        product: '天然翡翠手镯',
        description: 'A货翡翠，种水俱佳，寓意吉祥',
        highConvertingCopy: '【传世之宝】天然A货翡翠手镯，种水俱佳，翠色浓郁。每一块翡翠都是大自然的馈赠，寓意吉祥如意。专业鉴定证书，品质保证。传世之宝，值得拥有！',
        conversionRate: 15.2,
        platform: 'ecommerce',
        style: 'luxury'
      },
      // 服装时尚案例
      {
        category: '服装时尚',
        product: '纯棉T恤',
        description: '100%纯棉，舒适透气，百搭单品',
        highConvertingCopy: '【舒适至上】100%纯棉T恤，亲肤透气，舒适度满分。简约设计，百搭实用，是衣橱必备单品。多色可选，满足不同搭配需求。',
        conversionRate: 6.8,
        platform: 'social',
        style: 'simple'
      },
      // 美妆护肤案例
      {
        category: '美妆护肤',
        product: '天然面膜',
        description: '纯天然成分，温和不刺激，深层滋养',
        highConvertingCopy: '【天然呵护】纯天然成分面膜，温和不刺激，深层滋养肌肤。无添加防腐剂，安全可靠。使用后肌肤水润光滑，重现年轻光彩。',
        conversionRate: 9.7,
        platform: 'social',
        style: 'professional'
      }
    ];
  }

  async findSimilarCases(product) {
    // 根据产品类别和特征找到相似案例
    const similarCases = this.cases.filter(case_ => 
      case_.category === product.category ||
      this.calculateSimilarity(product.description, case_.description) > 0.3
    );

    // 按转化率排序，返回最相关的案例
    return similarCases
      .sort((a, b) => b.conversionRate - a.conversionRate)
      .slice(0, 3);
  }

  calculateSimilarity(text1, text2) {
    // 简单的相似度计算，实际项目中可以使用更复杂的算法
    const words1 = text1.split('');
    const words2 = text2.split('');
    const intersection = words1.filter(word => words2.includes(word));
    return intersection.length / Math.max(words1.length, words2.length);
  }
}

// 3. 提示词工程系统
class PromptEngineering {
  buildPrompt({ product, style, platform, industryContext, similarCases, variantCount }) {
    const styleInstructions = this.getStyleInstructions(style);
    const platformInstructions = this.getPlatformInstructions(platform);
    const industryInstructions = this.getIndustryInstructions(industryContext);
    const caseInstructions = this.getCaseInstructions(similarCases);

    return `你是一位专业的营销文案专家，拥有丰富的行业经验和成功案例。请为以下产品生成${variantCount}个不同角度的营销文案。

## 产品信息
- 产品名称：${product.name}
- 产品描述：${product.description}
- 产品特点：${product.features.join('、')}
- 产品分类：${product.category}
- 目标受众：${product.targetAudience}
- 价格区间：${product.priceRange}

## 文案要求
${styleInstructions}

${platformInstructions}

${industryInstructions}

${caseInstructions}

## 生成要求
1. 生成${variantCount}个不同角度的文案变体
2. 每个变体都要有明确的营销角度（如：功能卖点、情感共鸣、使用场景、对比优势、品质保证等）
3. 文案要符合目标平台的字数限制和表达习惯
4. 使用行业专业术语和消费者关注点
5. 参考优秀案例的表达方式和结构
6. 确保文案具有吸引力和转化力

## 输出格式
请以JSON格式输出，包含以下字段：
- angle: 营销角度
- content: 文案内容
- wordCount: 字数统计
- keyPoints: 核心卖点
- targetEmotion: 目标情感

请开始生成文案：`;
  }

  getStyleInstructions(style) {
    const styles = {
      'professional': '采用专业商务风格，语言正式权威，突出专业性和可信度',
      'friendly': '采用活泼亲民风格，语言亲切友好，易于理解，贴近消费者',
      'simple': '采用简洁明了风格，语言直接简洁，重点突出，避免冗余',
      'luxury': '采用奢华高端风格，语言精致有品质感，突出高端定位',
      'humorous': '采用幽默风趣风格，语言有趣轻松，有记忆点，增加趣味性',
      'emotional': '采用情感共鸣风格，语言温暖有情感，能引起共鸣，触动人心'
    };
    return `## 文案风格要求\n${styles[style] || styles['professional']}`;
  }

  getPlatformInstructions(platform) {
    const platforms = {
      'ecommerce': '适用于电商平台，突出产品卖点，包含购买引导，字数控制在2000字以内',
      'social': '适用于社交媒体，语言生动有趣，易于分享传播，字数控制在500字以内',
      'ads': '适用于广告投放，语言简洁有力，突出核心卖点，字数控制在100字以内',
      'email': '适用于邮件营销，语言亲切专业，包含行动号召，字数控制在1000字以内',
      'manual': '适用于产品手册，语言详细专业，包含使用说明，字数控制在3000字以内'
    };
    return `## 平台适配要求\n${platforms[platform] || platforms['ecommerce']}`;
  }

  getIndustryInstructions(industryContext) {
    return `## 行业专业知识
- 专业术语：${industryContext.keywords.join('、')}
- 核心卖点：${industryContext.sellingPoints.join('、')}
- 消费者关注点：${industryContext.consumerConcerns.join('、')}
- 表达风格：${industryContext.tone}`;
  }

  getCaseInstructions(similarCases) {
    if (similarCases.length === 0) return '';
    
    let caseText = '## 优秀案例参考\n';
    similarCases.forEach((case_, index) => {
      caseText += `${index + 1}. ${case_.product} (转化率: ${case_.conversionRate}%)\n`;
      caseText += `   文案：${case_.highConvertingCopy}\n`;
      caseText += `   特点：${case_.style}风格，${case_.platform}平台\n\n`;
    });
    
    return caseText;
  }
}

// 4. 响应解析和优化
class ResponseParser {
  parseAndOptimizeResponse(response, platform) {
    try {
      // 尝试解析JSON响应
      const parsed = JSON.parse(response);
      return this.optimizeVariants(parsed, platform);
    } catch (error) {
      // 如果不是JSON格式，尝试解析文本
      return this.parseTextResponse(response, platform);
    }
  }

  optimizeVariants(variants, platform) {
    return variants.map(variant => ({
      ...variant,
      content: this.optimizeContent(variant.content, platform),
      wordCount: variant.content.length,
      quality: this.assessQuality(variant)
    }));
  }

  optimizeContent(content, platform) {
    // 根据平台优化内容
    const maxLength = this.getPlatformMaxLength(platform);
    if (content.length > maxLength) {
      return content.substring(0, maxLength - 3) + '...';
    }
    return content;
  }

  getPlatformMaxLength(platform) {
    const lengths = {
      'ecommerce': 2000,
      'social': 500,
      'ads': 100,
      'email': 1000,
      'manual': 3000
    };
    return lengths[platform] || 2000;
  }

  assessQuality(variant) {
    // 简单的质量评估
    let score = 0;
    if (variant.content.length > 50) score += 20;
    if (variant.content.includes('【') || variant.content.includes('！')) score += 10;
    if (variant.content.includes('专业') || variant.content.includes('品质')) score += 10;
    return Math.min(score, 100);
  }
}

module.exports = {
  AICopywritingGenerator,
  IndustryKnowledgeBase,
  CaseLearningSystem,
  PromptEngineering
};
