import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlowButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  glow = true,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
    secondary: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
    gradient: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white',
  };

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden rounded-lg font-medium transition-all duration-300',
        'hover:scale-105 active:scale-95',
        sizeClasses[size],
        variantClasses[variant],
        glow && 'shadow-lg hover:shadow-2xl',
        className
      )}
      whileHover={{ 
        boxShadow: glow ? '0 0 30px rgba(59, 130, 246, 0.6)' : undefined,
      }}
      whileTap={{ scale: 0.95 }}
      {...(props as MotionProps)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
