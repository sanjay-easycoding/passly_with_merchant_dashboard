import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import AuthLangSwitch from './AuthLangSwitch';

import type { Locale } from '@/lib/translations';

type AuthTwoColumnProps = {
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
  rightImageSrc?: string;
  locale?: Locale;
};

export default function AuthTwoColumn({
  children,
  rightSlot,
  rightImageSrc = '/login1.jpg',
  locale = 'en',
}: AuthTwoColumnProps) {
  return (
    <section className="w-full min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
        {/* Left side */}
        <div className="relative bg-white flex items-start justify-center pt-20 md:pt-24 pb-12 px-4 sm:px-6">
          {/* Back Button */}
          <div className="absolute top-4 left-4 z-20">
            <Link 
              href={`/${locale}/`} 
              className="inline-flex items-center gap-2 text-black hover:text-gray-900 transition-colors"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
              <span className="text-base font-medium">Back</span>
            </Link>
          </div>
          
          {/* Language Switch */}
          <div className="absolute top-4 right-4 z-20">
            <AuthLangSwitch />
          </div>
          {/* Ellipse image (top-left) */}
          {/* <div className="absolute top-0 left-0 z-10 w-[150px] h-[150px]">
            <Image src="/Ellipse.png" alt="Ellipse" width={150} height={150} className="w-full h-full object-cover" />
          </div> */}

          {/* Children container (title, subtitle, form, etc. should be provided by child component) */}
          {children}

          {/* Group image (bottom-right) */}
          {/* <div className="absolute right-4 bottom-4 z-10 w-[150px] h-[150px]">
            <Image src="/Group.png" alt="Group" width={150} height={150} className="w-full h-full object-cover" />
          </div> */}
        </div>

        {/* Right side */}
        <div className="relative bg-gray-50 block h-[40vh] sm:h-[50vh] md:h-auto md:block">
          {rightSlot ? (
            rightSlot
          ) : (
            <Image src={rightImageSrc} alt="Login" fill className="object-cover" />
          )}
        </div>
      </div>
    </section>
  );
}
