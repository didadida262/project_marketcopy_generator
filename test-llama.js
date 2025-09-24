// Llama AI Agent 测试脚本

const HandcraftJewelryAI = require('./llama-agent');

async function testLlamaAgent() {
  console.log('🧪 开始测试Llama AI Agent...\n');
  
  try {
    // 初始化Agent
    console.log('1. 初始化Llama Agent...');
    const agent = new HandcraftJewelryAI();
    console.log('✅ Llama Agent初始化成功\n');
    
    // 测试产品描述生成
    console.log('2. 测试产品描述生成...');
    const testProduct = {
      name: '手工银制耳环',
      category: '耳环',
      materials: '纯银',
      style: '复古风格',
      targetAudience: '25-35岁女性'
    };
    
    const descriptions = await agent.generateProductDescription(testProduct);
    console.log('✅ 产品描述生成成功');
    console.log('生成结果:');
    
    // 处理单个描述或描述数组
    const descArray = Array.isArray(descriptions) ? descriptions : [descriptions];
    descArray.forEach((desc, index) => {
      console.log(`${index + 1}. ${desc.content}`);
      console.log(`   风格: ${desc.style}, 置信度: ${desc.confidence}`);
    });
    console.log('');
    
    // 测试行业洞察
    console.log('3. 测试行业洞察...');
    const insights = await agent.getIndustryInsights();
    console.log('✅ 行业洞察获取成功');
    console.log('洞察内容:', insights.substring(0, 200) + '...');
    console.log('');
    
    // 测试案例学习
    console.log('4. 测试案例学习...');
    const testCase = {
      product: '手工雕刻吊坠',
      description: '手工雕刻玛瑙吊坠，几何抽象设计',
      copywriting: '🎨 手工雕刻玛瑙吊坠，几何抽象设计展现现代艺术美学。',
      performance: { conversion: 0.18, engagement: 0.28 }
    };
    
    const learnResult = await agent.learnFromCase(testCase);
    console.log('✅ 案例学习完成:', learnResult);
    console.log('');
    
    console.log('🎉 所有测试通过！Llama AI Agent工作正常');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('详细错误:', error);
    
    // 提供故障排除建议
    console.log('\n🔧 故障排除建议:');
    console.log('1. 确保Ollama服务正在运行: ollama serve');
    console.log('2. 确保模型已下载: ollama pull llama3.1:8b');
    console.log('3. 检查网络连接和防火墙设置');
    console.log('4. 查看Ollama日志: ollama logs');
  }
}

// 运行测试
if (require.main === module) {
  testLlamaAgent();
}

module.exports = testLlamaAgent;
