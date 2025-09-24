const { Ollama } = require('ollama');

class HandcraftJewelryAI {
  constructor() {
    this.ollama = new Ollama();
    this.model = 'llama3.1:8b'; // 使用Llama 3.1 8B模型
    this.industryKnowledge = this.loadIndustryKnowledge();
    this.caseStudies = this.loadCaseStudies();
  }

  // 加载手工饰品行业专业知识
  loadIndustryKnowledge() {
    return {
      materials: {
        metals: ['纯银', '925银', '黄金', '玫瑰金', '铜', '不锈钢', '钛钢'],
        gems: ['天然宝石', '人造宝石', '珍珠', '水晶', '玛瑙', '琥珀', '珊瑚'],
        techniques: ['手工雕刻', '镶嵌工艺', '抛光打磨', '电镀处理', '氧化做旧', '珐琅彩绘']
      },
      styles: {
        vintage: ['复古风格', '维多利亚风格', '新艺术风格', '装饰艺术风格'],
        modern: ['简约现代', '极简主义', '几何设计', '抽象艺术'],
        ethnic: ['民族风格', '波西米亚', '印度风格', '非洲风格', '中国风']
      },
      targetAudience: {
        demographics: ['25-45岁女性', '追求个性', '注重品质', '有一定消费能力'],
        psychographics: ['喜欢独特设计', '重视手工价值', '追求艺术感', '环保意识强']
      },
      sellingPoints: {
        craftsmanship: ['纯手工制作', '独一无二', '工艺精湛', '细节完美'],
        materials: ['优质材料', '天然宝石', '环保材质', '持久耐用'],
        design: ['原创设计', '艺术价值', '时尚潮流', '个性表达']
      }
    };
  }

  // 加载优秀案例数据
  loadCaseStudies() {
    return [
      {
        product: '手工银制耳环',
        description: '纯银手工制作，镶嵌天然珍珠，复古维多利亚风格',
        copywriting: '✨ 纯银手工耳环，每一件都是独一无二的艺术品。天然珍珠的温润光泽，搭配复古维多利亚风格设计，展现优雅与个性的完美结合。',
        performance: { conversion: 0.15, engagement: 0.23 }
      },
      {
        product: '手工雕刻吊坠',
        description: '手工雕刻玛瑙吊坠，几何抽象设计，现代简约风格',
        copywriting: '🎨 手工雕刻玛瑙吊坠，几何抽象设计展现现代艺术美学。每一道刻痕都诉说着匠人的用心，是艺术与生活的完美融合。',
        performance: { conversion: 0.18, engagement: 0.28 }
      },
      {
        product: '手工编织手链',
        description: '天然棉线手工编织，波西米亚风格，多色搭配',
        copywriting: '🌈 天然棉线手工编织，波西米亚风格的多彩手链。每一根线都经过精心挑选，每一道编织都承载着温暖与祝福。',
        performance: { conversion: 0.12, engagement: 0.19 }
      }
    ];
  }

  // 生成专业的产品描述
  async generateProductDescription(product) {
    const prompt = this.buildProductPrompt(product);
    
    try {
      const response = await this.ollama.generate({
        model: this.model,
        prompt: prompt,
        stream: false
      });
      
      return this.parseResponse(response.response);
    } catch (error) {
      console.error('Llama生成失败:', error);
      return this.generateFallbackDescription(product);
    }
  }

  // 构建专业提示词
  buildProductPrompt(product) {
    const { name, category, materials, style, targetAudience } = product;
    
    return `你是一位专业的手工饰品营销专家，拥有丰富的行业经验和成功案例。

产品信息：
- 产品名称：${name}
- 分类：${category}
- 材质：${materials}
- 风格：${style}
- 目标受众：${targetAudience}

行业专业知识：
- 材质特点：${this.industryKnowledge.materials.metals.join('、')}
- 工艺技术：${this.industryKnowledge.materials.techniques.join('、')}
- 设计风格：${this.industryKnowledge.styles.modern.join('、')}
- 目标客户：${this.industryKnowledge.targetAudience.demographics.join('、')}

优秀案例参考：
${this.caseStudies.map(caseStudy => `- ${caseStudy.product}: ${caseStudy.copywriting}`).join('\n')}

请生成3个不同风格的营销文案，要求：
1. 突出手工工艺价值
2. 强调材质优势
3. 体现设计独特性
4. 符合目标受众心理
5. 具有情感共鸣
6. 包含行动号召

格式要求：
- 每个文案150-200字
- 使用emoji增强视觉效果
- 语言生动有感染力
- 突出产品差异化优势

请直接输出3个文案，用"---"分隔。`;
  }

  // 解析Llama响应
  parseResponse(response) {
    try {
      const copywritings = response.split('---').map(text => text.trim()).filter(text => text);
      return copywritings.map((copywriting, index) => ({
        id: `llama_${Date.now()}_${index}`,
        content: copywriting,
        style: this.detectStyle(copywriting),
        platform: 'universal',
        aiGenerated: true,
        model: 'llama3.1:8b',
        confidence: this.calculateConfidence(copywriting)
      }));
    } catch (error) {
      console.error('解析响应失败:', error);
      return this.generateFallbackCopywritings();
    }
  }

  // 检测文案风格
  detectStyle(copywriting) {
    if (copywriting.includes('复古') || copywriting.includes('经典')) return 'vintage';
    if (copywriting.includes('现代') || copywriting.includes('简约')) return 'modern';
    if (copywriting.includes('民族') || copywriting.includes('波西米亚')) return 'ethnic';
    return 'modern';
  }

  // 计算置信度
  calculateConfidence(copywriting) {
    let score = 0.5; // 基础分数
    
    // 检查关键词
    const keywords = ['手工', '独特', '艺术', '品质', '设计'];
    keywords.forEach(keyword => {
      if (copywriting.includes(keyword)) score += 0.1;
    });
    
    // 检查长度
    if (copywriting.length >= 100 && copywriting.length <= 300) score += 0.2;
    
    // 检查emoji使用
    if (copywriting.match(/[\u{1F600}-\u{1F64F}]/u)) score += 0.1;
    
    return Math.min(score, 1.0);
  }

  // 生成备用文案
  generateFallbackCopywritings() {
    return [
      {
        id: `fallback_${Date.now()}_1`,
        content: '✨ 纯手工制作，每一件都是独一无二的艺术品。优质材质，精湛工艺，展现您的独特品味。',
        style: 'modern',
        platform: 'universal',
        aiGenerated: true,
        model: 'fallback',
        confidence: 0.8
      },
      {
        id: `fallback_${Date.now()}_2`,
        content: '🎨 原创设计，手工工艺，每一道工序都体现匠人精神。让艺术与生活完美融合。',
        style: 'modern',
        platform: 'universal',
        aiGenerated: true,
        model: 'fallback',
        confidence: 0.8
      },
      {
        id: `fallback_${Date.now()}_3`,
        content: '💎 精选材质，手工打造，展现独特魅力。每一件都承载着温暖与祝福。',
        style: 'modern',
        platform: 'universal',
        aiGenerated: true,
        model: 'fallback',
        confidence: 0.8
      }
    ];
  }

  // 生成备用描述
  generateFallbackDescription(product) {
    return this.generateFallbackCopywritings();
  }

  // 学习新案例
  async learnFromCase(caseData) {
    try {
      const prompt = `学习新的成功案例：
产品：${caseData.product}
描述：${caseData.description}
文案：${caseData.copywriting}
效果：转化率${caseData.performance.conversion}，互动率${caseData.performance.engagement}

请分析这个案例的成功要素，并总结可复制的经验。`;
      
      const response = await this.ollama.generate({
        model: this.model,
        prompt: prompt,
        stream: false
      });
      
      console.log('学习结果:', response.response);
      return true;
    } catch (error) {
      console.error('学习失败:', error);
      return false;
    }
  }

  // 获取行业洞察
  async getIndustryInsights() {
    try {
      const prompt = `基于手工饰品行业，分析当前市场趋势和消费者偏好：
1. 热门材质趋势
2. 流行设计风格
3. 目标客户变化
4. 营销策略建议

请提供专业的行业分析。`;
      
      const response = await this.ollama.generate({
        model: this.model,
        prompt: prompt,
        stream: false
      });
      
      return response.response;
    } catch (error) {
      console.error('获取洞察失败:', error);
      return '无法获取行业洞察，请稍后重试。';
    }
  }
}

module.exports = HandcraftJewelryAI;
