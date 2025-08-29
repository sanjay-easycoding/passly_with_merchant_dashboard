import AuthTwoColumn from '@/components/features/auth/AuthTwoColumn';
import LoginForm from '@/components/features/auth/LoginForm';
import { type Locale } from '@/lib/translations';

export default function LoginPage({ params: _params }: { params: { locale: Locale } }) {
  return (
    <AuthTwoColumn rightImageSrc="/login1.jpg">
      <LoginForm />
    </AuthTwoColumn>
  );
}
