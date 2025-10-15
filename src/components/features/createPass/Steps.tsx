"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useTranslations } from '@/lib/translations';

const steps = [
  { key: 'pass-type', translationKey: 'passType', icon: '📋' },
  { key: 'branding', translationKey: 'branding', icon: '🎨' },
  { key: 'details', translationKey: 'details', icon: '📝' },
  { key: 'business', translationKey: 'business', icon: '🏢' },
  { key: 'experience', translationKey: 'experience', icon: '✨' },
  { key: 'distribution', translationKey: 'distribution', icon: '📤' },
  { key: 'publish', translationKey: 'publish', icon: '🚀' }
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
  const t = useTranslations(locale, 'builder');

  return (
    <div className="w-full space-y-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="text-base font-bold text-gray-800">
            {t.progress.step} {currentIndex + 1} {t.progress.of} {steps.length}
          </div>
          <div className="text-base font-bold text-gray-800">
            {Math.round(progress)}% {t.progress.complete}
          </div>
        </div>
        
        {/* Progress Track */}
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] rounded-full transition-all duration-500 ease-out shadow-md"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="relative mt-8 flex justify-between">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const href = `/${locale}/create-new-pass/${step.key}`;
            
            return (
              <Link 
                key={step.key} 
                href={href}
                className="flex flex-col items-center relative group"
              >
                {/* Connector Line */}
                {idx < steps.length - 1 && (
                  <div 
                    className={`absolute left-1/2 top-7 h-1 transition-all duration-300 ${
                      isCompleted ? 'bg-gradient-to-r from-[#10B981] to-[#059669]' : 'bg-gray-200'
                    }`}
                    style={{ 
                      width: 'calc(100vw / 7 - 48px)',
                      transform: 'translateX(24px)'
                    }}
                  ></div>
                )}
                
                {/* Step Circle */}
                <div className="relative z-10">
                  <div 
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      isCurrent 
                        ? 'bg-gradient-to-br from-[#10B981] to-[#059669] shadow-xl scale-110 ring-4 ring-emerald-100' 
                        : isCompleted 
                        ? 'bg-gradient-to-br from-[#10B981] to-[#047857] shadow-lg' 
                        : 'bg-gray-200 group-hover:bg-gray-300 group-hover:shadow-md'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className={`text-xl ${isCurrent || isCompleted ? 'text-white' : 'text-gray-600'}`}>
                        {step.icon}
                      </span>
                    )}
                  </div>
                  
                  {/* Pulse Animation for Current Step */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
                  )}
                </div>
                
                {/* Step Label */}
                <div className={`mt-3 text-sm font-semibold text-center transition-all duration-300 max-w-[90px] ${
                  isCurrent ? 'text-[#10B981] font-bold' : isCompleted ? 'text-[#059669]' : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                  {t.steps[step.translationKey as keyof typeof t.steps]}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Current Step Info Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 border-2 border-emerald-100 shadow-md">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-xl">
            <span className="text-5xl">{steps[currentIndex].icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t.steps[steps[currentIndex].translationKey as keyof typeof t.steps]}
            </h3>
            <p className="text-base text-gray-600 font-medium">
              Complete this step to continue building your pass
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
