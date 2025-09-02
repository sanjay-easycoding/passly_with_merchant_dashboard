import AuthTwoColumn from '@/components/features/auth/AuthTwoColumn';
import LoginForm from '@/components/features/auth/LoginForm';
import { type Locale } from '@/lib/translations';

export default function LoginPage({ params }: { params: { locale: Locale } }) {
  return (
    <AuthTwoColumn rightImageSrc="/login1.jpg" locale={params.locale}>
      <LoginForm />
    </AuthTwoColumn>
  );
}
