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
  const [touched, setTouched] = React.useState<{ password?: boolean; confirm?: boolean }>({});
  const [errors, setErrors] = React.useState<{ password?: string; confirm?: string; terms?: string }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accepted) return;
    setIsSubmitting(true);
    try {
      const validationErrors: { password?: string; confirm?: string; terms?: string } = {};
      if (!password) validationErrors.password = 'Password is required';
      if (!confirmPassword) validationErrors.confirm = 'Please re-enter password';
      else if (confirmPassword !== password) validationErrors.confirm = "Passwords don't match";
      if (!accepted) validationErrors.terms = 'You must accept terms';
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
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
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) setErrors((p) => ({ ...p, password: e.target.value ? undefined : 'Password is required' }));
              }}
              onBlur={() => {
                setTouched((t) => ({ ...t, password: true }));
                setErrors((p) => ({ ...p, password: password ? undefined : 'Password is required' }));
              }}
              placeholder="Password"
              aria-invalid={!!errors.password}
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
          <p className="text-[#ff4d4f] text-[14px] mt-2 min-h-[16px]">{errors.password ? errors.password : ''}</p>
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
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (touched.confirm) setErrors((p) => ({ ...p, confirm: e.target.value ? (e.target.value === password ? undefined : "Passwords don't match") : 'Please re-enter password' }));
              }}
              onBlur={() => {
                setTouched((t) => ({ ...t, confirm: true }));
                setErrors((p) => ({ ...p, confirm: confirmPassword ? (confirmPassword === password ? undefined : "Passwords don't match") : 'Please re-enter password' }));
              }}
              placeholder="Re-Enter Password"
              aria-invalid={!!errors.confirm}
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
          <p className="text-[#ff4d4f] text-[14px] mt-2 min-h-[16px]">{errors.confirm ? errors.confirm : ''}</p>
        </div>

        {/* Terms */}
        <div className="w-full max-w-[640px] min-w-[400px] flex items-center gap-2 mt-2 text-[14px] text-gray-700">
          <input id="terms" type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="w-4 h-4" />
          <label htmlFor="terms" className="select-none">
            I agree to the <a href="#" className="text-blue-500 font-semibold">Terms & Conditions</a>
          </label>
        </div>
        <div className="w-full max-w-[640px] min-w-[400px] text-[#ff4d4f] text-[14px] min-h-[16px]">
          {errors.password || errors.confirm || (!accepted && touched.password) ? (errors.password || errors.confirm || errors.terms) : ''}
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


