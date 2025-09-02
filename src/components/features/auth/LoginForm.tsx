"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { getTranslations, type Locale } from '@/lib/translations';

type LoginFormProps = {
  onSubmit?: (form: { email: string; password: string }) => void | Promise<void>;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [touched, setTouched] = React.useState<{ email?: boolean; password?: boolean }>({});
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const detectedLocale: Locale = pathname?.startsWith('/en') ? 'en' : 'de';
  const t = getTranslations(detectedLocale);
  const title = t?.pages?.login?.title ?? 'Enter Portal';
  const emailPh = t?.pages?.login?.emailPlaceholder ?? 'e-mail';
  const passwordPh = t?.pages?.login?.passwordPlaceholder ?? 'Password';
  const forgot = t?.pages?.login?.forgot ?? 'Forgot Password';
  const loginCta = t?.pages?.login?.loginCta ?? 'Log-in';
  const noAccount = t?.pages?.login?.noAccount ?? "Don't have an account ?";
  const signup = t?.pages?.login?.signup ?? 'Sign-up';
  const orWith = t?.pages?.login?.orWith ?? 'or Sign-up with';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const validationErrors: { email?: string; password?: string } = {};
      if (!email) {
        validationErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        validationErrors.email = 'Enter a valid email';
      }
      if (!password) {
        validationErrors.password = 'Password is required';
      }
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;

      // Static credential check per requirements
      const validEmail = 'dev@easy-coding.io';
      const validPassword = 'dev@easy-coding.io';
      if (email === validEmail && password === validPassword) {
        setLoginError(null);
        // Persist minimal session in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('passly_auth', JSON.stringify({ email, loggedInAt: Date.now() }));
        }
        if (onSubmit) {
          await onSubmit({ email, password });
        } else {
          router.push(`/${detectedLocale}/dashboard`);
        }
      } else {
        setLoginError('Invalid credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-[400px]">
    <div className="w-full flex flex-col items-center">
      <Image src="/passly_logo.svg" alt="Passly Logo" width={60} height={60} className="w-[60px] h-[60px] mb-6" />
      <h1 className="text-center text-[28px] font-semibold text-gray-900 mb-[30px]">{title}</h1>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[24px]">
      {/* Email */}
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
              if (touched.email) {
                setErrors((prev) => ({
                  ...prev,
                  email: !e.target.value
                    ? 'Email is required'
                    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                    ? undefined
                    : 'Enter a valid email',
                }));
              }
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

      {/* Password */}
      <div className="w-full max-w-[640px] min-w-[400px]">
        <div className="relative w-full">
          <Image src="/lockIcon.png" alt="lock" width={16} height={16} className="absolute left-[20px] top-1/2 -translate-y-1/2 z-10 w-[16px] h-[16px]" />
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (touched.password) {
                setErrors((prev) => ({ ...prev, password: e.target.value ? undefined : 'Password is required' }));
              }
            }}
            onBlur={() => {
              setTouched((t) => ({ ...t, password: true }));
              setErrors((prev) => ({ ...prev, password: password ? undefined : 'Password is required' }));
            }}
            placeholder={passwordPh}
            aria-invalid={!!errors.password}
            className={`w-full rounded-[12px] bg-white pl-[48px] pr-[52px] py-[15px] text-[16px] font-medium shadow-[2px_3px_4px_0px_#00000059] placeholder:text-gray-400 focus:outline-none ${errors.password ? 'border border-[#ff4d4f] focus:border-[#ff4d4f]' : 'border border-gray-200 focus:border-gray-200'}`}
          />
          <button
            type="button"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            onClick={() => setIsPasswordVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
          >
            <Image src={isPasswordVisible ? '/hidePassword.svg' : '/showPassword.svg'} alt="toggle" width={16} height={16} className="w-[16px] h-[16px]" />
          </button>
        </div>
        <p className="text-[#ff4d4f] text-[14px] mt-2 min-h-[16px]">{touched.password && errors.password ? errors.password : ''}</p>
      </div>

      <div className="w-full max-w-[640px] min-w-[400px] flex justify-end -mt-[4px]">
        <Link href={`/${detectedLocale}/forgot-password`} className="text-blue-500 font-semibold text-[14px] hover:underline">{forgot}</Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full max-w-[520px] min-w-[320px] rounded-[12px] bg-gray-900 py-[15px] text-white text-[20px] font-medium hover:bg-gray-900/95 cursor-pointer"
      >
        {isSubmitting ? "Logging in..." : loginCta}
      </button>

      {loginError ? (
        <p className="text-[#ff4d4f] text-[14px] mt-2">{loginError}</p>
      ) : null}

      <p className="text-[16px] text-black mt-1">
        {noAccount} <Link href={`/${detectedLocale}/signup`} className="text-blue-500 font-semibold">{signup}</Link>
      </p>

      <div className="relative w-full text-center mt-2">
        <span className="relative z-10 px-4 bg-transparent text-black text-[16px]">{orWith}</span>
      </div>

      <div className="mt-2 flex items-center justify-center gap-[40px] w-full">
        <button type="button" className="w-[3rem] h-[3rem] rounded-lg">
          <Image src="/google.png" alt="Google" width={60} height={60} className="w-[60px] h-[60px] object-contain" />
        </button>
        <button type="button" className="w-[3rem] h-[3rem] rounded-lg">
          <Image src="/facebook.png" alt="Facebook" width={60} height={60} className="w-[60px] h-[60px] object-contain" />
        </button>
        <button type="button" className="w-[3rem] h-[3rem] rounded-lg">
          <Image src="/twitter.png" alt="Twitter" width={60} height={60} className="w-[60px] h-[60px] object-contain" />
        </button>
      </div>
    </form>
    </div>
  );
}
