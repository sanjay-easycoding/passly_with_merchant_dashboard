"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const steps = [
  { key: 'pass-type', label: 'Pass Type' },
  { key: 'branding', label: 'Branding' },
  { key: 'details', label: 'Details' },
  { key: 'business', label: 'Business' },
  { key: 'experience', label: 'Experience' },
  { key: 'distribution', label: 'Distribution' },
  { key: 'publish', label: 'Publish' }
];

export default function Steps() {
  const pathname = usePathname();
  const matched = steps.findIndex((s) => pathname?.includes(`/${s.key}`));
  const currentIndex = matched >= 0 ? matched : 0;
  const percent = Math.round((currentIndex / (steps.length - 1)) * 100);

  // Derive locale from the path: /en/... or /de/...
  const localeMatch = pathname?.match(/^\/(en|de)\//);
  const locale = (localeMatch?.[1] as 'en' | 'de') || 'en';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[16px] text-black font-medium">Step {currentIndex + 1} of {steps.length}</span>
        <span className="text-[16px] text-black font-medium">{percent}% complete</span>
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
              {s.label}
            </Link>
          );
        })}
      </div>


    </div>
  );
}


