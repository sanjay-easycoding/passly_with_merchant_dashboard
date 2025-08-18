"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { getTranslations, type Locale } from '@/lib/translations';

type SignupFormProps = {
  onSubmit?: (form: { name: string; email: string }) => void | Promise<void>;
};

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [touched, setTouched] = React.useState<{ name?: boolean; email?: boolean }>({});
  const [errors, setErrors] = React.useState<{ name?: string; email?: string }>({});
  const pathname = usePathname();
  const router = useRouter();
  const detectedLocale: Locale = pathname?.startsWith('/en') ? 'en' : 'de';
  const t = getTranslations(detectedLocale);
  const title = t?.pages?.signup?.title ?? "Let's set you up in seconds.";
  const cta = t?.pages?.signup?.continueCta ?? 'Continue';
  const namePh = t?.pages?.signup?.namePlaceholder ?? 'Your name';
  const emailPh = t?.pages?.signup?.emailPlaceholder ?? 'e-mail';
  const already = t?.pages?.signup?.alreadyAccount ?? 'Already have an account ?';
  const signin = t?.pages?.signup?.signin ?? 'Sign-in';
  const orWith = t?.pages?.signup?.orWith ?? 'or Sign-up with';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const validationErrors: { name?: string; email?: string } = {};
      if (!name.trim()) validationErrors.name = 'Name is required';
      if (!email) validationErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) validationErrors.email = 'Enter a valid email';

      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;

      if (onSubmit) await onSubmit({ name, email });
      else router.push(`/${detectedLocale}/login`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-[400px]">
      <div className="w-full">
        <h1 className="text-center text-[28px] font-semibold text-gray-900 mb-[50px]">{title}</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[24px]">
        {/* Name */}
        <div className="w-full max-w-[640px] min-w-[400px]">
          <div className="relative w-full">
            <img src="/nameIcon.png" alt="name" className="absolute left-[20px] top-1/2 -translate-y-1/2 z-10 w-[16px] h-[16px]" />
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (touched.name) setErrors((prev) => ({ ...prev, name: e.target.value.trim() ? undefined : 'Name is required' }));
              }}
              onBlur={() => {
                setTouched((t) => ({ ...t, name: true }));
                setErrors((prev) => ({ ...prev, name: name.trim() ? undefined : 'Name is required' }));
              }}
              placeholder={namePh}
              aria-invalid={!!errors.name}
              className={`w-full rounded-[12px] bg-white pl-[48px] pr-[48px] py-[15px] text-[16px] font-medium shadow-[2px_3px_4px_0px_#00000059] placeholder:text-gray-400 focus:outline-none ${errors.name ? 'border border-[#ff4d4f] focus:border-[#ff4d4f]' : 'border border-gray-200 focus:border-gray-200'}`}
            />
          </div>
          <p className="text-[#ff4d4f] text-[14px] mt-2 min-h-[16px]">{touched.name && errors.name ? errors.name : ''}</p>
        </div>

        {/* Email */}
        <div className="w-full max-w-[640px] min-w-[400px]">
          <div className="relative w-full">
            <img src="/emailIcon.png" alt="email" className="absolute left-[20px] top-1/2 -translate-y-1/2 z-10 w-[16px] h-[16px]" />
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email)
                  setErrors((prev) => ({
                    ...prev,
                    email: !e.target.value
                      ? 'Email is required'
                      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                      ? undefined
                      : 'Enter a valid email',
                  }));
              }}
              onBlur={() => {
                setTouched((t) => ({ ...t, email: true }));
                setErrors((prev) => ({
                  ...prev,
                  email: !email
                    ? 'Email is required'
                    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    ? undefined
                    : 'Enter a valid email',
                }));
              }}
              placeholder={emailPh}
              aria-invalid={!!errors.email}
              className={`w-full rounded-[12px] bg-white pl-[48px] pr-[48px] py-[15px] text-[16px] font-medium shadow-[2px_3px_4px_0px_#00000059] placeholder:text-gray-400 focus:outline-none ${errors.email ? 'border border-[#ff4d4f] focus:border-[#ff4d4f]' : 'border border-gray-200 focus:border-gray-200'}`}
            />
          </div>
          <p className="text-[#ff4d4f] text-[14px] mt-2 min-h-[16px]">{touched.email && errors.email ? errors.email : ''}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full max-w-[520px] min-w-[320px] rounded-[12px] bg-gray-900 py-[15px] text-white text-[20px] font-medium hover:bg-gray-900/95"
        >
          {isSubmitting ? 'Please wait…' : cta}
        </button>

        <p className="text-[16px] text-black mt-4">
          {already}{' '}
          <Link href={`/${detectedLocale}/login`} className="text-blue-500 font-semibold">{signin}</Link>
        </p>

        <div className="relative w-full text-center mt-3">
          <span className="relative z-10 px-4 bg-transparent text-black text-[16px]">{orWith}</span>
        </div>

        <div className="mt-6 flex items-center justify-center gap-[40px] w-full">
          <button type="button" className="w-[3rem] h-[3rem] rounded-lg">
            <img src="/google.png" alt="Google" className="w-[60px] h-[60px] object-contain" />
          </button>
          <button type="button" className="w-[3rem] h-[3rem] rounded-lg">
            <img src="/facebook.png" alt="Facebook" className="w-[60px] h-[60px] object-contain" />
          </button>
          <button type="button" className="w-[3rem] h-[3rem] rounded-lg">
            <img src="/twitter.png" alt="Twitter" className="w-[60px] h-[60px] object-contain" />
          </button>
        </div>
      </form>
    </div>
  );
}


