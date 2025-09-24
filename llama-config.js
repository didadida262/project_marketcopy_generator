// Llama AI Agent 配置文件

const llamaConfig = {
  // 模型配置
  model: {
    name: 'llama3.1:8b',
    temperature: 0.7,
    maxTokens: 2000,
    topP: 0.9,
    topK: 40
  },

  // 行业专业知识库
  industryKnowledge: {
    // 材质知识
    materials: {
      metals: {
        '纯银': {
          properties: ['柔软易塑', '抗菌性', '光泽持久', '易氧化'],
          sellingPoints: ['天然抗菌', '光泽持久', '适合敏感肌肤'],
          targetAudience: ['注重健康', '追求品质', '预算适中']
        },
        '925银': {
          properties: ['硬度适中', '不易变形', '光泽好', '性价比高'],
          sellingPoints: ['硬度适中', '不易变形', '性价比高'],
          targetAudience: ['实用主义', '追求性价比', '日常佩戴']
        },
        '黄金': {
          properties: ['永不褪色', '价值稳定', '奢华感', '投资价值'],
          sellingPoints: ['永不褪色', '投资价值', '奢华感'],
          targetAudience: ['高端客户', '投资意识', '追求奢华']
        }
      },
      gems: {
        '天然宝石': {
          properties: ['独特纹理', '自然光泽', '收藏价值', '能量属性'],
          sellingPoints: ['独一无二', '自然能量', '收藏价值'],
          targetAudience: ['追求独特', '相信能量', '收藏爱好者']
        },
        '珍珠': {
          properties: ['温润光泽', '优雅气质', '经典永恒', '适合各种场合'],
          sellingPoints: ['优雅气质', '经典永恒', '百搭单品'],
          targetAudience: ['优雅女性', '职场女性', '经典爱好者']
        }
      }
    },

    // 工艺技术
    techniques: {
      '手工雕刻': {
        description: '纯手工雕刻，每一道刻痕都体现匠人精神',
        sellingPoints: ['独一无二', '工艺精湛', '艺术价值'],
        timeCost: '高',
        skillLevel: '高'
      },
      '镶嵌工艺': {
        description: '精密镶嵌，确保宝石牢固美观',
        sellingPoints: ['工艺精湛', '牢固美观', '细节完美'],
        timeCost: '中',
        skillLevel: '中'
      },
      '抛光打磨': {
        description: '精细抛光，展现材质天然光泽',
        sellingPoints: ['光泽完美', '触感舒适', '品质保证'],
        timeCost: '中',
        skillLevel: '中'
      }
    },

    // 设计风格
    styles: {
      vintage: {
        characteristics: ['复古元素', '经典设计', '历史感', '怀旧情怀'],
        targetAudience: ['复古爱好者', '经典追求者', '怀旧情怀'],
        popularElements: ['维多利亚风格', '装饰艺术', '新艺术风格']
      },
      modern: {
        characteristics: ['简约设计', '几何线条', '现代感', '时尚潮流'],
        targetAudience: ['时尚达人', '简约爱好者', '年轻群体'],
        popularElements: ['极简主义', '几何设计', '抽象艺术']
      },
      ethnic: {
        characteristics: ['民族元素', '文化内涵', '独特风格', '艺术价值'],
        targetAudience: ['文化爱好者', '艺术追求者', '个性表达'],
        popularElements: ['波西米亚', '印度风格', '中国风', '非洲风格']
      }
    }
  },

  // 目标客户画像
  targetAudience: {
    primary: {
      demographics: {
        age: '25-45岁',
        gender: '女性为主',
        income: '中高收入',
        education: '大专以上'
      },
      psychographics: {
        values: ['追求个性', '重视品质', '环保意识', '艺术欣赏'],
        lifestyle: ['注重生活品质', '喜欢独特设计', '愿意为手工价值付费'],
        painPoints: ['找不到独特产品', '担心质量问题', '价格敏感']
      }
    },
    secondary: {
      demographics: {
        age: '18-30岁',
        gender: '男女皆有',
        income: '中等收入',
        education: '高中以上'
      },
      psychographics: {
        values: ['追求时尚', '性价比导向', '社交分享'],
        lifestyle: ['活跃社交媒体', '追求潮流', '价格敏感']
      }
    }
  },

  // 营销策略
  marketingStrategies: {
    emotional: {
      triggers: ['独特性', '艺术价值', '手工温度', '情感共鸣'],
      messages: ['每一件都是独一无二', '承载匠人精神', '传递温暖与祝福']
    },
    rational: {
      benefits: ['优质材质', '精湛工艺', '持久耐用', '投资价值'],
      proof: ['工艺展示', '材质证书', '客户评价', '使用场景']
    },
    social: {
      platforms: ['小红书', '抖音', '微博', '朋友圈'],
      content: ['工艺视频', '搭配教程', '客户故事', '行业知识']
    }
  },

  // 成功案例模板
  caseTemplates: {
    highConversion: {
      structure: ['痛点引入', '产品介绍', '价值强调', '行动号召'],
      elements: ['情感共鸣', '具体描述', '社会证明', '紧迫感']
    },
    viral: {
      structure: ['故事开头', '转折点', '情感高潮', '价值总结'],
      elements: ['真实故事', '情感冲突', '价值升华', '分享动机']
    }
  },

  // 文案生成规则
  copywritingRules: {
    length: {
      short: '50-100字',
      medium: '100-200字',
      long: '200-300字'
    },
    tone: {
      professional: '专业、权威、可信',
      friendly: '亲切、温暖、贴心',
      inspiring: '激励、鼓舞、正能量'
    },
    structure: {
      hook: '吸引注意力的开头',
      body: '产品介绍和价值说明',
      cta: '明确的行动号召'
    }
  }
};

module.exports = llamaConfig;
