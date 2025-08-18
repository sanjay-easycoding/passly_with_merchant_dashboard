import Image from 'next/image';
import React from 'react';

import AuthLangSwitch from './AuthLangSwitch';

type AuthTwoColumnProps = {
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
  rightImageSrc?: string;
};

export default function AuthTwoColumn({
  children,
  rightSlot,
  rightImageSrc = '/login1.jpg',
}: AuthTwoColumnProps) {
  return (
    <section className="w-full min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
        {/* Left side */}
        <div className="relative bg-gray-50 flex items-start justify-center pt-20 md:pt-24 pb-12 px-4 sm:px-6">
          <div className="absolute top-4 right-4 z-20">
            <AuthLangSwitch />
          </div>
          {/* Ellipse image (top-left) */}
          <div className="absolute top-0 left-0 z-10 w-[150px] h-[150px]">
            <Image src="/Ellipse.png" alt="Ellipse" width={150} height={150} className="w-full h-full object-cover" />
          </div>

          {/* Children container (title, subtitle, form, etc. should be provided by child component) */}
          {children}

          {/* Group image (bottom-right) */}
          <div className="absolute right-4 bottom-4 z-10 w-[150px] h-[150px]">
            <Image src="/Group.png" alt="Group" width={150} height={150} className="w-full h-full object-cover" />
          </div>
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


