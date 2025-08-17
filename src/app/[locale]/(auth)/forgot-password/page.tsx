"use client";

import AuthTwoColumn from '@/components/auth/AuthTwoColumn';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import OtpVerificationForm from '@/components/auth/OtpVerificationForm';
import ForgotPasswordSuccess from '@/components/auth/ForgotPasswordSuccess';
import { type Locale } from '@/lib/translations';
import React from 'react';

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


