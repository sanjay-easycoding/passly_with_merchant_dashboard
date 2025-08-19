import AuthTwoColumn from '@/components/auth/AuthTwoColumn';
import LoginForm from '@/components/auth/LoginForm';
import { type Locale } from '@/lib/translations';

export default async function LoginPage({ params }: { params: Promise<{ locale: Locale }> }) {
  await params; // Await params to satisfy Next.js 15 requirements
  
  return (
    <AuthTwoColumn rightImageSrc="/login1.jpg">
      <LoginForm />
    </AuthTwoColumn>
  );
}


