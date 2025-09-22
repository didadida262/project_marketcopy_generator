import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Star, Zap, Target, Users, Palette, Globe } from 'lucide-react';

// UI Components
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/safe-select';
import { AnimatedCard } from './components/ui/animated-card';
import { GlowButton } from './components/ui/glow-button';
import { StepIndicator } from './components/ui/step-indicator';

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

  // 修复 ResizeObserver 错误
  React.useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      if (e.message?.includes('ResizeObserver loop completed with undelivered notifications')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
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
      console.error('生成失败:', err);
      
      // 处理不同类型的错误
      let errorMessage = '生成失败，请重试';
      
      if (err.response) {
        const { status, data } = err.response;
        switch (status) {
          case 400:
            errorMessage = data.details || '请求参数错误';
            break;
          case 401:
            errorMessage = data.details || 'API密钥无效';
            break;
          case 402:
            errorMessage = data.details || 'API配额不足';
            break;
          case 429:
            errorMessage = data.details || 'API调用频率超限';
            break;
          case 500:
            errorMessage = data.details || '服务器内部错误';
            break;
          default:
            errorMessage = data.error || `请求失败 (${status})`;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
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
    <AnimatedCard delay={0.2} className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
        >
          <Target className="w-8 h-8 text-white" />
        </motion.div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          输入产品信息
        </CardTitle>
        <CardDescription className="text-lg">
          告诉我们您的产品详情，AI将为您生成专业的营销文案
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProductSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              产品名称 *
            </label>
            <Input
              value={productForm.name}
              onChange={(e) => setProductForm({...productForm, name: e.target.value})}
              required
              placeholder="例如：手工陶瓷茶杯"
              className="h-12 text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              产品描述 *
            </label>
            <Textarea
              value={productForm.description}
              onChange={(e) => setProductForm({...productForm, description: e.target.value})}
              required
              placeholder="详细描述产品的特点、用途、优势等"
              className="min-h-[120px] text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              产品特点
            </label>
            <Input
              value={productForm.features}
              onChange={(e) => setProductForm({...productForm, features: e.target.value})}
              placeholder="用逗号分隔，例如：手工制作,环保材料,独特设计"
              className="h-12 text-lg"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                产品分类
              </label>
              <Select
                value={productForm.category}
                onValueChange={(value) => setProductForm({...productForm, category: value})}
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="手工制品">手工制品</SelectItem>
                  <SelectItem value="珠宝首饰">珠宝首饰</SelectItem>
                  <SelectItem value="服装时尚">服装时尚</SelectItem>
                  <SelectItem value="美妆护肤">美妆护肤</SelectItem>
                  <SelectItem value="数码3C">数码3C</SelectItem>
                  <SelectItem value="家居生活">家居生活</SelectItem>
                  <SelectItem value="其他">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="w-4 h-4" />
                目标受众
              </label>
              <Input
                value={productForm.targetAudience}
                onChange={(e) => setProductForm({...productForm, targetAudience: e.target.value})}
                placeholder="例如：年轻女性,商务人士"
                className="h-12 text-lg"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Star className="w-4 h-4" />
              价格区间
            </label>
            <Input
              value={productForm.priceRange}
              onChange={(e) => setProductForm({...productForm, priceRange: e.target.value})}
              placeholder="例如：100-300元"
              className="h-12 text-lg"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center pt-4"
          >
            <GlowButton
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full md:w-auto px-8"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Wand2 className="w-5 h-5 mr-2" />
              )}
              {loading ? '保存中...' : '保存产品信息'}
            </GlowButton>
          </motion.div>
        </form>
      </CardContent>
    </AnimatedCard>
  );

  const renderStep2 = () => (
    <AnimatedCard delay={0.2} className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center"
        >
          <Palette className="w-8 h-8 text-white" />
        </motion.div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          选择文案风格和平台
        </CardTitle>
        <CardDescription className="text-lg">
          选择适合的文案风格和目标平台，AI将为您生成专业的营销内容
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Target className="w-4 h-4" />
              选择产品
            </label>
            <Select
              value={generationForm.productId}
              onValueChange={(value) => setGenerationForm({...generationForm, productId: value})}
              required
            >
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder="选择产品" />
              </SelectTrigger>
              <SelectContent>
                {products.map(product => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                文案风格
              </label>
              <Select
                value={generationForm.style}
                onValueChange={(value) => setGenerationForm({...generationForm, style: value})}
                required
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="选择风格" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(styles).map(([key, style]) => (
                    <SelectItem key={key} value={key}>
                      {style.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {generationForm.style && styles[generationForm.style] && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400"
                >
                  {styles[generationForm.style].description}
                </motion.p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                目标平台
              </label>
              <Select
                value={generationForm.platform}
                onValueChange={(value) => setGenerationForm({...generationForm, platform: value})}
                required
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="选择平台" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(platforms).map(([key, platform]) => (
                    <SelectItem key={key} value={key}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {generationForm.platform && platforms[generationForm.platform] && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border-l-4 border-green-400"
                >
                  {platforms[generationForm.platform].description}
                </motion.p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              生成变体数量
            </label>
            <Select
              value={generationForm.variantCount.toString()}
              onValueChange={(value) => setGenerationForm({...generationForm, variantCount: parseInt(value)})}
            >
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder="选择数量" />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}个变体
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center pt-4"
          >
            <GlowButton
              type="submit"
              disabled={loading}
              size="lg"
              variant="gradient"
              className="w-full md:w-auto px-8"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Sparkles className="w-5 h-5 mr-2" />
              )}
              {loading ? '生成中...' : '生成文案'}
            </GlowButton>
          </motion.div>
        </form>
      </CardContent>
    </AnimatedCard>
  );

  const renderStep3 = () => {
    const latestCopywriting = copywritings[copywritings.length - 1];
    
    if (!latestCopywriting) return null;
    
    return (
      <AnimatedCard delay={0.2} className="max-w-6xl mx-auto">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            查看生成的文案
          </CardTitle>
          <CardDescription className="text-lg">
            AI为您生成了专业的营销文案，请查看并评分
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl border border-green-500/30 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-green-400" />
                <span className="font-medium text-gray-300">风格:</span>
                <span className="text-green-400 font-semibold">{styles[latestCopywriting.style]?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-emerald-400" />
                <span className="font-medium text-gray-300">平台:</span>
                <span className="text-emerald-400 font-semibold">{platforms[latestCopywriting.platform]?.name}</span>
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-6">
            {latestCopywriting.content.map((variant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 hover:border-green-500/50 transition-all duration-300 copywriting-card"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-400" />
                      {variant.angle}
                    </h4>
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-500/30 rounded-full text-sm font-medium">
                      {variant.wordCount}字
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    {variant.content}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-400">评分:</span>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(star => (
                        <motion.button
                          key={star}
                          whileTap={{ scale: 0.9 }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                            latestCopywriting.rating && star <= latestCopywriting.rating
                              ? 'bg-yellow-400 text-black'
                              : 'bg-gray-700 text-gray-400 hover:bg-yellow-400/20 hover:text-yellow-400'
                          }`}
                          onClick={() => handleRating(latestCopywriting.id, star)}
                        >
                          <Star className="w-4 h-4" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center pt-8"
          >
            <GlowButton
              onClick={() => setCurrentStep(1)}
              variant="secondary"
              size="lg"
              className="px-8"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              生成新文案
            </GlowButton>
          </motion.div>
        </CardContent>
      </AnimatedCard>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* 背景装饰 - Aceternity 风格 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10">
        {/* 头部 */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-16 px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mx-auto mb-6 w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center floating-animation motion-div neon-glow"
            style={{ willChange: 'transform' }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent mb-4"
          >
            AI营销文案生成器
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            快速生成专业的营销文案，提升您的销售效果
          </motion.p>
        </motion.header>

        {/* 错误提示 */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto px-4 mb-8"
          >
            <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-6 py-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-red-300 mb-1">生成失败</h4>
                  <p className="text-red-400 text-sm leading-relaxed">{error}</p>
                  {error.includes('API密钥') && (
                    <div className="mt-3 p-3 bg-red-900/30 rounded border border-red-500/20">
                      <p className="text-red-300 text-xs">
                        💡 请检查您的环境变量设置，确保 OPENAI_API_KEY 已正确配置
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 步骤指示器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="max-w-4xl mx-auto px-4 mb-12"
        >
          <StepIndicator
            currentStep={currentStep}
            totalSteps={3}
            steps={['输入产品信息', '选择风格和平台', '查看生成结果']}
          />
        </motion.div>

        {/* 主要内容 */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="max-w-7xl mx-auto px-4 pb-16"
        >
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </motion.main>

        {/* 加载状态 */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-white mb-2">AI正在生成文案</h3>
              <p className="text-gray-300">请稍候，这可能需要几秒钟...</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default App;