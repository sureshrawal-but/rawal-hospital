'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'buttons';
  className?: string;
  children?: ReactNode;
}

export default function Tabs({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'underline',
  className,
  children,
}: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');
  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (!controlledActiveTab) setInternalActiveTab(tabId);
    onChange?.(tabId);
  };

  const variants = {
    underline: {
      container: 'border-b border-gray-200',
      tab: 'px-4 py-3 text-sm font-medium text-gray-500 hover:text-primary relative',
      active: 'text-primary',
      indicator: 'absolute bottom-0 left-0 right-0 h-0.5 bg-primary',
    },
    pills: {
      container: 'bg-gray-100 rounded-xl p-1',
      tab: 'px-4 py-2 text-sm font-medium rounded-lg text-gray-600',
      active: 'bg-white text-primary shadow-sm',
      indicator: '',
    },
    buttons: {
      container: 'flex gap-2',
      tab: 'px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-gray-600 hover:border-primary hover:text-primary',
      active: 'bg-primary text-white border-primary',
      indicator: '',
    },
  };

  const style = variants[variant];

  return (
    <div className={className}>
      <div className={cn('flex', style.container)}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(style.tab, isActive && style.active, 'transition-all duration-200 relative')}
              aria-selected={isActive}
              role="tab"
            >
              <div className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && (
                  <span className={cn(
                    'px-1.5 py-0.5 text-xs rounded-full',
                    isActive ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'
                  )}>
                    {tab.badge}
                  </span>
                )}
              </div>
              {isActive && style.indicator && (
                <motion.div
                  layoutId="tab-indicator"
                  className={style.indicator}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      {children}
    </div>
  );
}
