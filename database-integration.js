// 数据库集成方案 - 支持行业知识库和案例学习
const { Pool } = require('pg');

class DatabaseIntegration {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  }

  // 行业知识库管理
  async getIndustryKnowledge(category) {
    const query = `
      SELECT * FROM industry_knowledge 
      WHERE category = $1 
      ORDER BY updated_at DESC 
      LIMIT 1
    `;
    const result = await this.pool.query(query, [category]);
    return result.rows[0];
  }

  async updateIndustryKnowledge(category, knowledge) {
    const query = `
      INSERT INTO industry_knowledge (category, keywords, selling_points, consumer_concerns, tone, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      ON CONFLICT (category) 
      DO UPDATE SET 
        keywords = EXCLUDED.keywords,
        selling_points = EXCLUDED.selling_points,
        consumer_concerns = EXCLUDED.consumer_concerns,
        tone = EXCLUDED.tone,
        updated_at = NOW()
    `;
    await this.pool.query(query, [
      category,
      JSON.stringify(knowledge.keywords),
      JSON.stringify(knowledge.sellingPoints),
      JSON.stringify(knowledge.consumerConcerns),
      knowledge.tone
    ]);
  }

  // 案例学习管理
  async getHighConvertingCases(category, limit = 10) {
    const query = `
      SELECT * FROM high_converting_cases 
      WHERE category = $1 AND conversion_rate >= 5.0
      ORDER BY conversion_rate DESC 
      LIMIT $2
    `;
    const result = await this.pool.query(query, [category, limit]);
    return result.rows;
  }

  async addCase(caseData) {
    const query = `
      INSERT INTO high_converting_cases 
      (category, product_name, description, copywriting, conversion_rate, platform, style, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
    `;
    await this.pool.query(query, [
      caseData.category,
      caseData.productName,
      caseData.description,
      caseData.copywriting,
      caseData.conversionRate,
      caseData.platform,
      caseData.style
    ]);
  }

  // 用户反馈学习
  async recordUserFeedback(copywritingId, rating, feedback) {
    const query = `
      INSERT INTO user_feedback 
      (copywriting_id, rating, feedback, created_at)
      VALUES ($1, $2, $3, NOW())
    `;
    await this.pool.query(query, [copywritingId, rating, feedback]);
  }

  async getFeedbackInsights() {
    const query = `
      SELECT 
        AVG(rating) as avg_rating,
        COUNT(*) as total_feedback,
        STRING_AGG(DISTINCT feedback, '; ') as common_feedback
      FROM user_feedback 
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `;
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  // 模型性能监控
  async recordGenerationMetrics(metrics) {
    const query = `
      INSERT INTO generation_metrics 
      (model_name, generation_time, token_count, quality_score, created_at)
      VALUES ($1, $2, $3, $4, NOW())
    `;
    await this.pool.query(query, [
      metrics.modelName,
      metrics.generationTime,
      metrics.tokenCount,
      metrics.qualityScore
    ]);
  }

  async getPerformanceStats() {
    const query = `
      SELECT 
        model_name,
        AVG(generation_time) as avg_time,
        AVG(quality_score) as avg_quality,
        COUNT(*) as total_generations
      FROM generation_metrics 
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY model_name
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }
}

// 数据库表结构
const createTables = `
  -- 行业知识库表
  CREATE TABLE IF NOT EXISTS industry_knowledge (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) UNIQUE NOT NULL,
    keywords JSONB,
    selling_points JSONB,
    consumer_concerns JSONB,
    tone TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  -- 高转化案例表
  CREATE TABLE IF NOT EXISTS high_converting_cases (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    description TEXT,
    copywriting TEXT NOT NULL,
    conversion_rate DECIMAL(5,2),
    platform VARCHAR(50),
    style VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- 用户反馈表
  CREATE TABLE IF NOT EXISTS user_feedback (
    id SERIAL PRIMARY KEY,
    copywriting_id VARCHAR(100) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- 生成指标表
  CREATE TABLE IF NOT EXISTS generation_metrics (
    id SERIAL PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL,
    generation_time INTEGER,
    token_count INTEGER,
    quality_score INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- 创建索引
  CREATE INDEX IF NOT EXISTS idx_industry_knowledge_category ON industry_knowledge(category);
  CREATE INDEX IF NOT EXISTS idx_cases_category ON high_converting_cases(category);
  CREATE INDEX IF NOT EXISTS idx_cases_conversion_rate ON high_converting_cases(conversion_rate DESC);
  CREATE INDEX IF NOT EXISTS idx_feedback_copywriting_id ON user_feedback(copywriting_id);
  CREATE INDEX IF NOT EXISTS idx_metrics_created_at ON generation_metrics(created_at);
`;

module.exports = {
  DatabaseIntegration,
  createTables
};
