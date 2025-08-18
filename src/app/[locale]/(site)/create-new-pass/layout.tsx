"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Type the children prop
const CreateNewPassLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
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
