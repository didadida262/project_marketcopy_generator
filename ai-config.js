// AI模型配置和优化
module.exports = {
  // 模型配置
  models: {
    primary: 'gpt-4-turbo-preview',
    fallback: 'gpt-3.5-turbo',
    fast: 'gpt-3.5-turbo-16k'
  },

  // 生成参数
  generationParams: {
    temperature: 0.7,
    max_tokens: 2000,
    top_p: 0.9,
    frequency_penalty: 0.1,
    presence_penalty: 0.1
  },

  // 行业专业知识库扩展
  industryKnowledge: {
    // 可以动态加载更多行业数据
    loadFromDatabase: true,
    updateFrequency: 'daily',
    sources: [
      'industry_experts',
      'market_research',
      'competitor_analysis',
      'consumer_feedback'
    ]
  },

  // 案例学习配置
  caseLearning: {
    minConversionRate: 5.0,
    maxCases: 10,
    similarityThreshold: 0.3,
    updateFrequency: 'weekly'
  },

  // 提示词优化
  promptOptimization: {
    useFewShotLearning: true,
    includeExamples: 3,
    dynamicPrompting: true,
    contextWindow: 4000
  },

  // 质量评估
  qualityAssessment: {
    minWordCount: 20,
    maxWordCount: 2000,
    requiredElements: ['产品名称', '核心卖点', '行动号召'],
    qualityThreshold: 70
  }
};
