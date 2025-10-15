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
    <div className="flex items-center justify-between gap-4">
      <div>
        {currentIndex > 0 && (
          <Link
            href={`/${locale}/create-new-pass/${steps[currentIndex - 1].id}`}
            className="group inline-flex items-center gap-2 px-6 py-2 rounded-full font-medium text-gray-900 bg-white border border-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Link>
        )}
      </div>

      <Link
        href={`/${locale}/create-new-pass/${steps[Math.min(currentIndex + 1, steps.length - 1)].id}`}
        className="group inline-flex items-center gap-2 px-6 py-2 rounded-full font-medium text-white bg-black hover:bg-gray-800 transition-all duration-200 shadow-sm"
        onClick={onContinue}
      >
        <span>
          {currentIndex === steps.length - 1 ? 'Publish Pass' : 'Continue'}
        </span>
        
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
