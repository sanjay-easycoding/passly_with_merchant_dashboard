"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useTranslations } from '@/lib/translations';

const steps = [
  { key: 'pass-type', translationKey: 'passType' },
  { key: 'branding', translationKey: 'branding' },
  { key: 'details', translationKey: 'details' },
  { key: 'business', translationKey: 'business' },
  { key: 'experience', translationKey: 'experience' },
  { key: 'distribution', translationKey: 'distribution' },
  { key: 'publish', translationKey: 'publish' }
];

export default function Steps() {
  const pathname = usePathname();
  const matched = steps.findIndex((s) => pathname?.includes(`/${s.key}`));
  const currentIndex = matched >= 0 ? matched : 0;
  const percent = Math.round((currentIndex / (steps.length - 1)) * 100);

  // Derive locale from the path: /en/... or /de/...
  const localeMatch = pathname?.match(/^\/(en|de)\//);
  const locale = (localeMatch?.[1] as 'en' | 'de') || 'en';
  
  // Get translations
  const t = useTranslations(locale, 'builder');

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[16px] text-black font-medium">{t.progress.step} {currentIndex + 1} {t.progress.of} {steps.length}</span>
        <span className="text-[16px] text-black font-medium">{percent}% {t.progress.complete}</span>
      </div>

      <div className="w-full h-[12px] bg-[#424141] rounded-[6px] overflow-hidden">
        <div className="h-full bg-[#5DB29F] rounded-[6px] transition-[width] duration-300" style={{ width: `${percent}%` }} />
      </div>

      <div className="mt-4 flex flex-wrap gap-4 justify-between">
        {steps.map((s, i) => {
          const href = `/${locale}/create-new-pass/${s.key}`;
          const isActive = i === currentIndex;
          return (
            <Link
              key={s.key}
              href={href}
              className={`text-center whitespace-nowrap text-[16px] font-semibold cursor-pointer ${
                isActive ? 'text-[#10B981]' : 'text-black hover:text-[#10B981]'
              }`}
            >
              {t.steps[s.translationKey as keyof typeof t.steps]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}


