"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

// Type the children prop
const CreateNewPassLayout: React.FC<React.PropsWithChildren<Record<string, never>>> = ({ children }) => {
  const { locale } = useParams();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('passly_auth');
    if (!isLoggedIn) {
      router.push(`/${locale}/login`);
    }
  }, [router, locale]);

  return <div>{children}</div>;
};

export default CreateNewPassLayout;
