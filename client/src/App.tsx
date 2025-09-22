import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  category: string;
  targetAudience: string;
  priceRange: string;
  createdAt: string;
}

interface CopywritingVariant {
  angle: string;
  content: string;
  wordCount: number;
}

interface Copywriting {
  id: string;
  productId: string;
  style: string;
  platform: string;
  content: CopywritingVariant[];
  createdAt: string;
  rating?: number;
  feedback?: string;
}

interface Style {
  name: string;
  description: string;
  tone: string;
}

interface Platform {
  name: string;
  description: string;
  maxLength: number;
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [styles, setStyles] = useState<{[key: string]: Style}>({});
  const [platforms, setPlatforms] = useState<{[key: string]: Platform}>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [copywritings, setCopywritings] = useState<Copywriting[]>([]);
  
  // 表单状态
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    features: '',
    category: '',
    targetAudience: '',
    priceRange: ''
  });
  
  const [generationForm, setGenerationForm] = useState({
    productId: '',
    style: '',
    platform: '',
    variantCount: 3
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 加载初始数据
  useEffect(() => {
    loadStyles();
    loadPlatforms();
    loadProducts();
    loadCopywritings();
  }, []);

  const loadStyles = async () => {
    try {
      const response = await axios.get('/api/styles');
      setStyles(response.data);
    } catch (err) {
      console.error('加载风格失败:', err);
    }
  };

  const loadPlatforms = async () => {
    try {
      const response = await axios.get('/api/platforms');
      setPlatforms(response.data);
    } catch (err) {
      console.error('加载平台失败:', err);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('加载产品失败:', err);
    }
  };

  const loadCopywritings = async () => {
    try {
      const response = await axios.get('/api/copywritings');
      setCopywritings(response.data);
    } catch (err) {
      console.error('加载文案失败:', err);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const features = productForm.features.split(',').map(f => f.trim()).filter(f => f);
      const response = await axios.post('/api/products', {
        ...productForm,
        features
      });
      
      setProducts([...products, response.data]);
      setProductForm({
        name: '',
        description: '',
        features: '',
        category: '',
        targetAudience: '',
        priceRange: ''
      });
      setCurrentStep(2);
    } catch (err: any) {
      setError(err.response?.data?.error || '保存产品失败');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/generate', generationForm);
      setCopywritings([...copywritings, response.data]);
      setCurrentStep(3);
    } catch (err: any) {
      setError(err.response?.data?.error || '生成文案失败');
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (copywritingId: string, rating: number) => {
    try {
      await axios.post(`/api/copywritings/${copywritingId}/rate`, { rating });
      loadCopywritings();
    } catch (err) {
      console.error('评分失败:', err);
    }
  };

  const renderStep1 = () => (
    <div className="card">
      <h2>步骤1: 输入产品信息</h2>
      <form onSubmit={handleProductSubmit}>
        <div className="form-group">
          <label>产品名称 *</label>
          <input
            type="text"
            value={productForm.name}
            onChange={(e) => setProductForm({...productForm, name: e.target.value})}
            required
            placeholder="例如：手工陶瓷茶杯"
          />
        </div>
        
        <div className="form-group">
          <label>产品描述 *</label>
          <textarea
            value={productForm.description}
            onChange={(e) => setProductForm({...productForm, description: e.target.value})}
            required
            placeholder="详细描述产品的特点、用途、优势等"
          />
        </div>
        
        <div className="form-group">
          <label>产品特点</label>
          <input
            type="text"
            value={productForm.features}
            onChange={(e) => setProductForm({...productForm, features: e.target.value})}
            placeholder="用逗号分隔，例如：手工制作,环保材料,独特设计"
          />
        </div>
        
        <div className="grid grid-2">
          <div className="form-group">
            <label>产品分类</label>
            <select
              value={productForm.category}
              onChange={(e) => setProductForm({...productForm, category: e.target.value})}
            >
              <option value="">选择分类</option>
              <option value="手工制品">手工制品</option>
              <option value="珠宝首饰">珠宝首饰</option>
              <option value="服装时尚">服装时尚</option>
              <option value="美妆护肤">美妆护肤</option>
              <option value="数码3C">数码3C</option>
              <option value="家居生活">家居生活</option>
              <option value="其他">其他</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>目标受众</label>
            <input
              type="text"
              value={productForm.targetAudience}
              onChange={(e) => setProductForm({...productForm, targetAudience: e.target.value})}
              placeholder="例如：年轻女性,商务人士"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>价格区间</label>
          <input
            type="text"
            value={productForm.priceRange}
            onChange={(e) => setProductForm({...productForm, priceRange: e.target.value})}
            placeholder="例如：100-300元"
          />
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? '保存中...' : '保存产品信息'}
        </button>
      </form>
    </div>
  );

  const renderStep2 = () => (
    <div className="card">
      <h2>步骤2: 选择文案风格和平台</h2>
      <form onSubmit={handleGenerate}>
        <div className="form-group">
          <label>选择产品</label>
          <select
            value={generationForm.productId}
            onChange={(e) => setGenerationForm({...generationForm, productId: e.target.value})}
            required
          >
            <option value="">选择产品</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-2">
          <div className="form-group">
            <label>文案风格</label>
            <select
              value={generationForm.style}
              onChange={(e) => setGenerationForm({...generationForm, style: e.target.value})}
              required
            >
              <option value="">选择风格</option>
              {Object.entries(styles).map(([key, style]) => (
                <option key={key} value={key}>
                  {style.name}
                </option>
              ))}
            </select>
            {generationForm.style && styles[generationForm.style] && (
              <p style={{fontSize: '14px', color: '#666', marginTop: '8px'}}>
                {styles[generationForm.style].description}
              </p>
            )}
          </div>
          
          <div className="form-group">
            <label>目标平台</label>
            <select
              value={generationForm.platform}
              onChange={(e) => setGenerationForm({...generationForm, platform: e.target.value})}
              required
            >
              <option value="">选择平台</option>
              {Object.entries(platforms).map(([key, platform]) => (
                <option key={key} value={key}>
                  {platform.name}
                </option>
              ))}
            </select>
            {generationForm.platform && platforms[generationForm.platform] && (
              <p style={{fontSize: '14px', color: '#666', marginTop: '8px'}}>
                {platforms[generationForm.platform].description}
              </p>
            )}
          </div>
        </div>
        
        <div className="form-group">
          <label>生成变体数量</label>
          <select
            value={generationForm.variantCount}
            onChange={(e) => setGenerationForm({...generationForm, variantCount: parseInt(e.target.value)})}
          >
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num}个</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? '生成中...' : '生成文案'}
        </button>
      </form>
    </div>
  );

  const renderStep3 = () => {
    const latestCopywriting = copywritings[copywritings.length - 1];
    
    if (!latestCopywriting) return null;
    
    return (
      <div className="card">
        <h2>步骤3: 查看生成的文案</h2>
        <div className="mb-20">
          <p><strong>风格:</strong> {styles[latestCopywriting.style]?.name}</p>
          <p><strong>平台:</strong> {platforms[latestCopywriting.platform]?.name}</p>
        </div>
        
        {latestCopywriting.content.map((variant, index) => (
          <div key={index} className="copywriting-variant">
            <h4>{variant.angle} ({variant.wordCount}字)</h4>
            <p>{variant.content}</p>
            
            <div className="rating">
              <span>评分:</span>
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  className={`star ${latestCopywriting.rating && star <= latestCopywriting.rating ? 'active' : ''}`}
                  onClick={() => handleRating(latestCopywriting.id, star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
        
        <div className="text-center mt-20">
          <button 
            className="btn btn-secondary" 
            onClick={() => setCurrentStep(1)}
          >
            生成新文案
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="header">
        <h1>AI营销文案生成器</h1>
        <p className="text-center">快速生成专业的营销文案，提升您的销售效果</p>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <div className="step">
        <div className={`step-number ${currentStep >= 1 ? 'completed' : ''}`}>
          {currentStep > 1 ? '✓' : '1'}
        </div>
        <div>输入产品信息</div>
      </div>
      
      <div className="step">
        <div className={`step-number ${currentStep >= 2 ? 'completed' : ''}`}>
          {currentStep > 2 ? '✓' : '2'}
        </div>
        <div>选择风格和平台</div>
      </div>
      
      <div className="step">
        <div className={`step-number ${currentStep >= 3 ? 'completed' : ''}`}>
          {currentStep > 3 ? '✓' : '3'}
        </div>
        <div>查看生成结果</div>
      </div>
      
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      
      {loading && <div className="loading">处理中，请稍候...</div>}
    </div>
  );
};

export default App;