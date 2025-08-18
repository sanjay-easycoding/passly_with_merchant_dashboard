"use client";

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

import { getTranslations, type Locale } from '@/lib/translations';

type ForgotPasswordFormProps = {
  onSubmit?: (form: { email: string }) => void | Promise<void>;
};

export default function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const pathname = usePathname();
  const detectedLocale: Locale = pathname?.startsWith('/en') ? 'en' : 'de';
  const t = getTranslations(detectedLocale);
  const title = t?.pages?.forgotPassword?.title ?? 'Identity Confirmation';
  const subtitle = t?.pages?.forgotPassword?.subtitle ?? 'Enter mail id to get OTP.';
  const cta = t?.pages?.forgotPassword?.cta ?? 'Get OTP';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setError(isValid ? undefined : 'Enter a valid email');
      if (!isValid) return;
      await onSubmit?.({ email });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-[400px]">
      <div className="w-full">
        <h1 className="text-center text-[28px] font-semibold text-gray-900 mb-[20px] mt-[70px]">{title}</h1>
        <p className="text-center text-[black] text-[16px] mb-[58px]">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[50px]">
        <div className="w-full max-w-[640px] min-w-[400px]">
          <div className="relative w-full">
            <Image src="/emailIcon.png" alt="email" width={16} height={16} className="absolute left-[20px] top-1/2 -translate-y-1/2 z-10 w-[16px] h-[16px]" />
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched) setError(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value) ? undefined : 'Enter a valid email');
              }}
              onBlur={() => {
                setTouched(true);
                setError(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? undefined : 'Enter a valid email');
              }}
              placeholder="e-mail"
              aria-invalid={!!error}
              className={`w-full rounded-[12px] bg-white pl-[48px] pr-[48px] py-[15px] text-[16px] font-medium shadow-[2px_3px_4px_0px_#00000059] placeholder:text-gray-400 focus:outline-none ${error ? 'border border-[#ff4d4f] focus:border-[#ff4d4f]' : 'border border-teal-300 focus:border-teal-300'}`}
            />
          </div>
          <p className="text-[#ff4d4f] text-[14px] mt-2 min-h-[16px]">{touched && error ? error : ''}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full max-w-[520px] min-w-[320px] rounded-[12px] bg-gray-900 py-[15px] text-white text-[20px] font-medium hover:bg-gray-900/95"
        >
          {isSubmitting ? 'Please wait…' : cta}
        </button>
      </form>
    </div>
  );
}


