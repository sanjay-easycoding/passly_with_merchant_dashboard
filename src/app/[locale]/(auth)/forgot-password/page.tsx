"use client";

import React from 'react';

import AuthTwoColumn from '@/components/features/auth/AuthTwoColumn';
import ForgotPasswordForm from '@/components/features/auth/ForgotPasswordForm';
import ForgotPasswordSuccess from '@/components/features/auth/ForgotPasswordSuccess';
import OtpVerificationForm from '@/components/features/auth/OtpVerificationForm';
import { type Locale } from '@/lib/translations';

export default function ForgotPasswordPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const [stage, setStage] = React.useState<'email' | 'otp' | 'success'>("email");

  return (
    <AuthTwoColumn rightImageSrc={stage === 'email' ? '/login2.jpg' : stage === 'otp' ? '/login3.jpg' : '/login4.jpg'}>
      {stage === 'email' && (
        <ForgotPasswordForm onSubmit={() => setStage('otp')} />
      )}
      {stage === 'otp' && (
        <OtpVerificationForm onVerify={() => setStage('success')} onBack={() => setStage('email')} />
      )}
      {stage === 'success' && (
        <ForgotPasswordSuccess onDone={() => (window.location.href = `/${params.locale}/login`)} />
      )}
    </AuthTwoColumn>
  );
}
