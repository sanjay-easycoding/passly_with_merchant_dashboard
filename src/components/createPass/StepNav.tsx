"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const steps = [
  'pass-type',
  'branding',
  'details',
  'business',
  'experience',
  'distribution',
  'publish',
];

export default function StepNav({ onContinue }: { onContinue?: () => void }) {
  const pathname = usePathname();
  const idx = steps.findIndex((s) => pathname?.includes(`/${s}`));
  const currentIndex = idx >= 0 ? idx : 0;
  const localeMatch = pathname?.match(/^\/(en|de)\//);
  const locale = (localeMatch?.[1] as 'en' | 'de') || 'en';

  return (
    <div className="mt-6 flex items-center justify-end gap-4">
      {currentIndex > 0 && (
        <Link
          href={`/${locale}/create-new-pass/${steps[currentIndex - 1]}`}
          className="text-gray-800 hover:underline"
        >
          Previous
        </Link>
      )}
      <Link
        href={`/${locale}/create-new-pass/${steps[Math.min(currentIndex + 1, steps.length - 1)]}`}
        className="px-5 py-2 rounded-lg bg-[#111827] text-white hover:bg-[#0f1420]"
        onClick={onContinue}
      >
        {currentIndex === steps.length - 1 ? 'Publish Pass' : 'Continue'}
      </Link>
    </div>
  );
}


