"use client";

import { usePathname } from 'next/navigation';
import React from 'react';

import { getTranslations, type Locale } from '@/lib/translations';

type ForgotPasswordSuccessProps = {
  onDone?: () => void;
};

export default function ForgotPasswordSuccess({ onDone }: ForgotPasswordSuccessProps) {
  const pathname = usePathname();
  const detectedLocale: Locale = pathname?.startsWith('/en') ? 'en' : 'de';
  const t = getTranslations(detectedLocale);
  const title = t?.pages?.forgotPasswordSuccess?.title ?? 'Verified !';
  const heading = t?.pages?.forgotPasswordSuccess?.heading ?? 'Verification Successful';
  const msg = t?.pages?.forgotPasswordSuccess?.message ?? 'Your password has been reset successfully.';
  const done = t?.pages?.forgotPasswordSuccess?.done ?? 'Done';
  return (
    <div className="flex flex-col items-center w-full max-w-[400px]">
      <h1 className="text-center text-[28px] font-semibold text-gray-900 mb-[40px] mt-[70px]">{title}</h1>

      <div className="w-full max-w-[520px] rounded-[16px] bg-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] border border-gray-100 p-8 mb-20">
        <div className="mx-auto w-[64px] h-[64px] rounded-full bg-emerald-500 flex items-center justify-center text-white text-3xl mb-4">✓</div>
        <h2 className="text-center text-[20px] font-semibold text-gray-900 mb-2">{heading}</h2>
        <p className="text-center text-gray-600">{msg}</p>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="w-full max-w-[520px] min-w-[320px] rounded-[12px] bg-gray-900 py-[15px] text-white text-[20px] font-medium hover:bg-gray-900/95"
      >
        {done}
      </button>
    </div>
  );
}


