"use client";

import React from 'react';

type SignupPasswordFormProps = {
  onRegister?: (form: { password: string; confirmPassword: string; accepted: boolean }) => void | Promise<void>;
  onBack?: () => void;
};

export default function SignupPasswordForm({ onRegister, onBack }: SignupPasswordFormProps) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accepted) return;
    setIsSubmitting(true);
    try {
      await onRegister?.({ password, confirmPassword, accepted });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <h1 className="text-center text-[28px] font-semibold text-gray-900 mb-[28px]">
          Build your key to the
          <br />
          kingdom
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[18px]">
        {/* Password */}
        <div className="w-full max-w-[640px] min-w-[400px]">
          <div className="relative w-full">
            <img src="/lockIcon.png" alt="lock" className="absolute left-[20px] top-1/2 -translate-y-1/2 z-10 w-[16px] h-[16px]" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-[12px] border border-gray-200 bg-white pl-[48px] pr-[52px] py-[15px] text-[16px] font-medium shadow-[2px_3px_4px_0px_#00000059] placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              <img src={showPassword ? '/hidePassword.svg' : '/showPassword.svg'} alt="toggle" className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="w-full max-w-[640px] min-w-[400px]">
          <div className="relative w-full">
            <img src="/lockIcon.png" alt="lock" className="absolute left-[20px] top-1/2 -translate-y-1/2 z-10 w-[16px] h-[16px]" />
            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-Enter Password"
              className="w-full rounded-[12px] border border-gray-200 bg-white pl-[48px] pr-[52px] py-[15px] text-[16px] font-medium shadow-[2px_3px_4px_0px_#00000059] placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              <img src={showConfirm ? '/hidePassword.svg' : '/showPassword.svg'} alt="toggle" className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="w-full max-w-[640px] min-w-[400px] flex items-center gap-2 mt-2 text-[14px] text-gray-700">
          <input id="terms" type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="w-4 h-4" />
          <label htmlFor="terms" className="select-none">
            I agree to the <a href="#" className="text-blue-500 font-semibold">Terms & Conditions</a>
          </label>
        </div>

        {/* Buttons */}
        <button
          type="submit"
          disabled={isSubmitting || !accepted || password !== confirmPassword}
          className="w-full max-w-[520px] min-w-[320px] rounded-[12px] bg-gray-900 py-[15px] text-white text-[20px] font-medium hover:bg-gray-900/95 disabled:opacity-60"
        >
          {isSubmitting ? 'Registering…' : 'Register'}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full max-w-[520px] min-w-[320px] rounded-[12px] border border-gray-300 bg-white py-[15px] text-gray-900 text-[20px] font-medium hover:bg-gray-50"
        >
          Back
        </button>
      </form>
    </div>
  );
}


