// 简化的Llama AI Agent测试脚本（不依赖Ollama服务）

const HandcraftJewelryAI = require('./llama-agent');

async function testLlamaAgentSimple() {
  console.log('🧪 开始测试Llama AI Agent（简化版）...\n');
  
  try {
    // 初始化Agent
    console.log('1. 初始化Llama Agent...');
    const agent = new HandcraftJewelryAI();
    console.log('✅ Llama Agent初始化成功\n');
    
    // 测试行业知识库
    console.log('2. 测试行业知识库...');
    console.log('材质知识:', agent.industryKnowledge.materials.metals.slice(0, 3).join('、'));
    console.log('工艺技术:', agent.industryKnowledge.materials.techniques.slice(0, 3).join('、'));
    console.log('设计风格:', agent.industryKnowledge.styles.modern.slice(0, 3).join('、'));
    console.log('✅ 行业知识库加载成功\n');
    
    // 测试案例数据
    console.log('3. 测试案例数据...');
    console.log('案例数量:', agent.caseStudies.length);
    agent.caseStudies.forEach((caseStudy, index) => {
      console.log(`${index + 1}. ${caseStudy.product} - 转化率: ${caseStudy.performance.conversion}`);
    });
    console.log('✅ 案例数据加载成功\n');
    
    // 测试备用文案生成
    console.log('4. 测试备用文案生成...');
    const fallbackCopywritings = agent.generateFallbackCopywritings();
    console.log('✅ 备用文案生成成功');
    console.log('生成结果:');
    fallbackCopywritings.forEach((copywriting, index) => {
      console.log(`${index + 1}. ${copywriting.content}`);
      console.log(`   风格: ${copywriting.style}, 置信度: ${copywriting.confidence}`);
    });
    console.log('');
    
    // 测试风格检测
    console.log('5. 测试风格检测...');
    const testTexts = [
      '复古风格的纯银耳环',
      '现代简约设计',
      '波西米亚风格手链'
    ];
    
    testTexts.forEach(text => {
      const style = agent.detectStyle(text);
      console.log(`"${text}" -> 风格: ${style}`);
    });
    console.log('✅ 风格检测功能正常\n');
    
    // 测试置信度计算
    console.log('6. 测试置信度计算...');
    const testCopywriting = '✨ 纯手工制作，每一件都是独一无二的艺术品。优质材质，精湛工艺，展现您的独特品味。';
    const confidence = agent.calculateConfidence(testCopywriting);
    console.log(`测试文案: "${testCopywriting}"`);
    console.log(`置信度: ${confidence}`);
    console.log('✅ 置信度计算功能正常\n');
    
    console.log('🎉 所有基础功能测试通过！');
    console.log('\n📝 注意: 要使用完整的Llama功能，需要：');
    console.log('1. 安装Ollama: winget install Ollama.Ollama');
    console.log('2. 启动服务: ollama serve');
    console.log('3. 下载模型: ollama pull llama3.1:8b');
    console.log('4. 然后运行: node test-llama.js');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('详细错误:', error);
  }
}

// 运行测试
if (require.main === module) {
  testLlamaAgentSimple();
}

module.exports = testLlamaAgentSimple;
