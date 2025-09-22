import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  steps,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;

        return (
          <React.Fragment key={stepNumber}>
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300',
                  isCompleted && 'bg-green-500 border-green-500 text-white',
                  isCurrent && 'bg-green-500 border-green-500 text-white shadow-lg neon-glow',
                  isUpcoming && 'bg-gray-800 border-gray-600 text-gray-400'
                )}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  boxShadow: isCurrent ? '0 0 20px rgba(34, 197, 94, 0.5)' : '0 0 0px rgba(34, 197, 94, 0)',
                }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{stepNumber}</span>
                )}
              </motion.div>
              <motion.span
                className={cn(
                  'mt-2 text-sm font-medium transition-colors duration-300',
                  isCurrent && 'text-green-400',
                  isCompleted && 'text-green-400',
                  isUpcoming && 'text-gray-400'
                )}
                animate={{
                  color: isCurrent ? '#4ade80' : isCompleted ? '#4ade80' : '#9ca3af',
                }}
              >
                {step}
              </motion.span>
            </div>
            {index < steps.length - 1 && (
              <motion.div
                className={cn(
                  'h-0.5 w-16 transition-colors duration-300',
                  stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-600'
                )}
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: stepNumber < currentStep ? 1 : 0.3,
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
