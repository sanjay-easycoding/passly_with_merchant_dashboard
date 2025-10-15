"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

import type { Locale } from '@/lib/translations';

// Type the children prop
const CreateNewPassLayout: React.FC<React.PropsWithChildren<Record<string, never>>> = ({ children }) => {
  const { locale } = useParams() as { locale: Locale };
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('passly_auth');
    if (!isLoggedIn) {
      router.push(`/${locale}/login`);
    }
  }, [router, locale]);

  return ( 
    <div className="min-h-screen">
      <main>
        {children}
      </main>
    </div>
  );
};

export default CreateNewPassLayout;
