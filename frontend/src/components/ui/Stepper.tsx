'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onChange?: (step: number) => void;
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Stepper({ steps, currentStep, onChange, variant = 'horizontal', className }: StepperProps) {
  const isHorizontal = variant === 'horizontal';

  return (
    <div className={cn(
      isHorizontal ? 'flex items-start' : 'flex flex-col gap-0',
      className
    )}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div key={step.id} className={cn(
            isHorizontal ? 'flex-1 relative' : 'flex items-start gap-4 relative',
          )}>
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className={cn(
                isHorizontal
                  ? 'absolute top-5 left-[calc(50%+24px)] right-[calc(50%-24px)] h-0.5'
                  : 'absolute left-5 top-12 bottom-0 w-0.5',
                'bg-gray-200',
                (isCompleted || (isCurrent && index < steps.length - 1)) && 'bg-accent'
              )} />
            )}

            <div className={cn(
              isHorizontal ? 'flex flex-col items-center' : 'flex items-start gap-4 pt-3',
              onChange && !isUpcoming && 'cursor-pointer'
            )}>
              {/* Step circle */}
              <div
                onClick={() => onChange?.(isCompleted || isCurrent ? index : undefined)}
                className={cn(
                  'relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 shrink-0',
                  isCompleted && 'bg-accent border-accent',
                  isCurrent && 'border-primary bg-primary-50',
                  isUpcoming && 'border-gray-300 bg-white',
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 text-white" />
                ) : (
                  <span className={cn(
                    'text-sm font-semibold',
                    isCurrent && 'text-primary',
                    isUpcoming && 'text-gray-400'
                  )}>
                    {index + 1}
                  </span>
                )}
                {isCurrent && (
                  <motion.span
                    layoutId="step-pulse"
                    className="absolute inset-0 rounded-full border-2 border-primary animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                )}
              </div>

              {/* Step label */}
              <div className={cn(
                isHorizontal ? 'text-center mt-2' : 'ml-3',
              )}>
                <p className={cn(
                  'text-sm font-medium',
                  isCompleted && 'text-accent',
                  isCurrent && 'text-primary',
                  isUpcoming && 'text-gray-400'
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
