"use client";

import { usePathname } from 'next/navigation';
import React from 'react';

import { useTranslations } from '@/lib/translations';

const steps = [
  { key: 'pass-type' },
  { key: 'branding' },
  { key: 'details' },
  { key: 'business' }
];

export default function Steps() {
  const pathname = usePathname();
  const matched = steps.findIndex((s) => pathname?.includes(`/${s.key}`));
  const currentIndex = matched >= 0 ? matched : 0;
  const progress = ((currentIndex + 1) / steps.length) * 100;

  // Derive locale from the path: /en/... or /de/...
  const localeMatch = pathname?.match(/^\/(en|de)\//);
  const locale = (localeMatch?.[1] as 'en' | 'de') || 'en';
  
  // Get translations
  const _t = useTranslations(locale, 'builder');

  return (
    <div className="w-full">
      {/* Step and Percentage Labels */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-medium text-gray-700">
          Step {currentIndex + 1} of {steps.length}
        </span>
        <span className="text-lg font-medium text-gray-700">
          {Math.round(progress)}%
        </span>
      </div>
      
      {/* Simple Progress Bar */}
      <div className="relative">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
