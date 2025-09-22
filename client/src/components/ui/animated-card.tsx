import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AnimatedCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.5,
  ...props
}) => {
  const directionVariants = {
    up: { y: 20, opacity: 0 },
    down: { y: -20, opacity: 0 },
    left: { x: 20, opacity: 0 },
    right: { x: -20, opacity: 0 },
  };

  return (
    <motion.div
      initial={directionVariants[direction]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300",
        className
      )}
      {...(props as MotionProps)}
    >
      {children}
    </motion.div>
  );
};
