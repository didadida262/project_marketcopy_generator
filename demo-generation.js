// 演示：没有OpenAI密钥时的文案生成过程
const { AICopywritingGenerator } = require('./ai-model-integration');

// 创建生成器（没有API密钥）
const generator = new AICopywritingGenerator('your_openai_api_key_here');

// 示例产品
const product = {
  name: '手工陶瓷茶杯',
  description: '传统景德镇工艺制作，每件都是独一无二的艺术品',
  features: ['手工制作', '环保材料', '独特设计'],
  category: '手工制品',
  targetAudience: '年轻女性',
  priceRange: '100-300元'
};

// 生成文案
async function demonstrateGeneration() {
  console.log('🎯 产品信息:');
  console.log(`产品名称: ${product.name}`);
  console.log(`产品描述: ${product.description}`);
  console.log(`产品分类: ${product.category}`);
  console.log(`目标受众: ${product.targetAudience}`);
  console.log('');

  console.log('📚 行业知识库匹配:');
  const industryContext = generator.industryKnowledge.getContext(product.category);
  console.log(`专业术语: ${industryContext.keywords.join('、')}`);
  console.log(`核心卖点: ${industryContext.sellingPoints.join('、')}`);
  console.log(`消费者关注点: ${industryContext.consumerConcerns.join('、')}`);
  console.log('');

  console.log('🎨 生成过程:');
  console.log('1. 随机选择专业术语: 匠心独运');
  console.log('2. 随机选择核心卖点: 纯手工打造');
  console.log('3. 根据角度生成文案...');
  console.log('');

  // 实际生成
  const result = await generator.generateCopywriting(product, 'emotional', 'ecommerce', 3);
  
  console.log('✨ 生成结果:');
  result.forEach((variant, index) => {
    console.log(`\n${index + 1}. ${variant.angle} (${variant.wordCount}字)`);
    console.log(`   文案: ${variant.content}`);
    console.log(`   核心卖点: ${variant.keyPoints.join('、')}`);
    console.log(`   目标情感: ${variant.targetEmotion}`);
  });
}

// 运行演示
demonstrateGeneration();
