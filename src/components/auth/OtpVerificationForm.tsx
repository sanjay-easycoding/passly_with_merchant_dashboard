"use client";

import { usePathname } from 'next/navigation';
import React from 'react';

import { getTranslations, type Locale } from '@/lib/translations';

type OtpVerificationFormProps = {
  onVerify?: (otp: string) => void | Promise<void>;
  onBack?: () => void;
};

export default function OtpVerificationForm({ onVerify, onBack }: OtpVerificationFormProps) {
  const pathname = usePathname();
  const detectedLocale: Locale = pathname?.startsWith('/en') ? 'en' : 'de';
  const t = getTranslations(detectedLocale);
  const title = t?.pages?.forgotPasswordOtp?.title ?? 'Identity Validation';
  const subtitle = t?.pages?.forgotPasswordOtp?.subtitle ?? 'Enter OTP';
  const verifyLabel = t?.pages?.forgotPasswordOtp?.verify ?? 'Verify';
  const backLabel = t?.pages?.forgotPasswordOtp?.back ?? 'Back';
  const [digits, setDigits] = React.useState<string[]>(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  function handleChange(index: number, value: string) {
    const cleaned = value.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[index] = cleaned;
    setDigits(next);
    if (cleaned && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const otp = digits.join("");
      if (otp.length !== digits.length) {
        setIsSubmitting(false);
        return;
      }
      await onVerify?.(otp);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-[400px]">
      <div className="w-full">
        <h1 className="text-center text-[28px] font-semibold text-gray-900 mb-[25px]">{title}</h1>
        <p className="text-center text-gray-600 text-[16px] mb-[50px]">{subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-[25px]">
        <div className="flex items-center justify-center gap-8 mb-[50px]">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputsRef.current[i] = el; }}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-[64px] h-[64px] text-center text-bold text-[30px] rounded-[12px] border border-gray-200 shadow-[2px_3px_4px_0px_#00000059] focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full max-w-[520px] min-w-[320px] rounded-[12px] bg-gray-900 py-[15px] text-white text-[20px] font-medium hover:bg-gray-900/95"
        >
          {isSubmitting ? 'Verifying…' : verifyLabel}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full max-w-[520px] min-w-[320px] rounded-[12px] border border-gray-300 bg-white py-[15px] text-gray-900 text-[20px] font-medium hover:bg-gray-50"
        >
          {backLabel}
        </button>
      </form>
    </div>
  );
}


