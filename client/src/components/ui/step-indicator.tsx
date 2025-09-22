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
                  isCurrent && 'bg-blue-500 border-blue-500 text-white shadow-lg',
                  isUpcoming && 'bg-gray-100 border-gray-300 text-gray-500'
                )}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  boxShadow: isCurrent ? '0 0 20px rgba(59, 130, 246, 0.5)' : '0 0 0px rgba(59, 130, 246, 0)',
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
                  isCurrent && 'text-blue-600',
                  isCompleted && 'text-green-600',
                  isUpcoming && 'text-gray-500'
                )}
                animate={{
                  color: isCurrent ? '#2563eb' : isCompleted ? '#16a34a' : '#6b7280',
                }}
              >
                {step}
              </motion.span>
            </div>
            {index < steps.length - 1 && (
              <motion.div
                className={cn(
                  'h-0.5 w-16 transition-colors duration-300',
                  stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-300'
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
