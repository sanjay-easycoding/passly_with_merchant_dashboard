"use client";

import React from 'react';

import AuthTwoColumn from '@/components/features/auth/AuthTwoColumn';
import SignupForm from '@/components/features/auth/SignupForm';
import SignupPasswordForm from '@/components/features/auth/SignupPasswordForm';
import SignupSuccess from '@/components/features/auth/SignupSuccess';
import { type Locale } from '@/lib/translations';

export default function SignupPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const [stage, setStage] = React.useState<'basic' | 'password' | 'success'>("basic");

  return (
    <AuthTwoColumn rightImageSrc={stage === 'basic' ? '/signup1.jpg' : stage === 'password' ? '/signup2.jpg' : '/login4.jpg'}>
      {stage === 'basic' && (
        <SignupForm onSubmit={() => setStage('password')} />
      )}
      {stage === 'password' && (
        <SignupPasswordForm onBack={() => setStage('basic')} onRegister={() => setStage('success')} />
      )}
      {stage === 'success' && (
        <SignupSuccess onDone={() => (window.location.href = `/${params.locale}/login`)} />
      )}
    </AuthTwoColumn>
  );
}
