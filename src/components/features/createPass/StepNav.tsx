"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const steps = [
  { id: 'pass-type', label: 'Pass Type', icon: '📋' },
  { id: 'branding', label: 'Branding', icon: '🎨' },
  { id: 'details', label: 'Details', icon: '📝' },
  { id: 'business', label: 'Business', icon: '🏢' },
  { id: 'experience', label: 'Experience', icon: '✨' },
  { id: 'distribution', label: 'Distribution', icon: '📤' },
  { id: 'publish', label: 'Publish', icon: '🚀' },
];

export default function StepNav({ onContinue }: { onContinue?: () => void }) {
  const pathname = usePathname();
  const idx = steps.findIndex((s) => pathname?.includes(`/${s.id}`));
  const currentIndex = idx >= 0 ? idx : 0;
  const localeMatch = pathname?.match(/^\/(en|de)\//);
  const locale = (localeMatch?.[1] as 'en' | 'de') || 'en';

  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <div>
          {currentIndex > 0 && (
            <Link
              href={`/${locale}/create-new-pass/${steps[currentIndex - 1].id}`}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </Link>
          )}
        </div>

        <Link
          href={`/${locale}/create-new-pass/${steps[Math.min(currentIndex + 1, steps.length - 1)].id}`}
          className="group relative inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          style={{
            background: currentIndex === steps.length - 1 
              ? 'linear-gradient(135deg, #10b981 0%, #047857 100%)'
              : 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
          }}
          onClick={onContinue}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
          
          <span className="relative z-10 text-lg">
            {currentIndex === steps.length - 1 ? 'Publish Pass' : 'Continue'}
          </span>
          
          <svg className="relative z-10 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Step Tips */}
      {currentIndex < steps.length - 1 && (
        <div className="text-center text-sm text-gray-500">
          💡 Tip: You can always come back and edit previous steps
        </div>
      )}
    </div>
  );
}
