import React from 'react';

import AuthTwoColumn from '@/components/auth/AuthTwoColumn';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import ForgotPasswordSuccess from '@/components/auth/ForgotPasswordSuccess';
import OtpVerificationForm from '@/components/auth/OtpVerificationForm';
import { type Locale } from '@/lib/translations';

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <AuthTwoColumn rightImageSrc="/login2.jpg">
      <ForgotPasswordForm onSubmit={() => {}} />
    </AuthTwoColumn>
  );
}


