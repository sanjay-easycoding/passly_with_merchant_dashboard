"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import type { Locale } from '@/lib/translations';

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

  return ( 
    <div className="min-h-screen">
      <Navigation locale={locale as Locale} />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CreateNewPassLayout;
