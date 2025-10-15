"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import StepNav from '@/components/features/createPass/StepNav';

import type { Locale } from '@/lib/translations';

export default function CreatePassBuilderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Calculate current step and progress
  const steps = [
    { key: 'pass-type' },
    { key: 'branding' },
    { key: 'details' },
    { key: 'business' },
    { key: 'experience' },
    { key: 'distribution' },
    { key: 'publish' }
  ];
  
  const matched = steps.findIndex((s) => pathname?.includes(`/${s.key}`));
  const currentIndex = matched >= 0 ? matched : 0;
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <section className="bg-[#ddddde] min-h-screen pt-10">
      {/* Single Container with Progress Border */}
      <div className="max-w-[1440px] mx-auto px-6 pb-10">
        <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-xl overflow-hidden relative" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px' }}>
          {/* Header with Logo, Steps, and Menu */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {/* Left: Passly Logo */}
              <div className="flex items-center gap-4">
                {/* Logo */}
                <Image src="/passly_logo.svg" alt="Passly Logo" width={32} height={32} className="w-8 h-8" />
                <h1 className="text-lg font-bold text-black">Passly</h1>
                {/* Burger Menu */}
                <button 
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              
              {/* Center: Step Name */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <span className="text-base font-semibold text-gray-800">
                  {steps[currentIndex]?.key?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Step'}
                </span>
              </div>
              
              {/* Right: Step Counter */}
              <div className="text-base font-semibold text-gray-800">
                Step {currentIndex + 1} of {steps.length}
              </div>
            </div>
          </div>

          {/* Left Drawer Inside Container */}
          {isDrawerOpen && (
            <>
              {/* Backdrop Overlay */}
              <div className="absolute inset-0 z-10" style={{ backgroundColor: 'rgb(0 0 0 / 70%)' }}></div>
              
              {/* Drawer */}
              <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl z-20">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Image src="/passly_logo.svg" alt="Passly Logo" width={24} height={24} className="w-6 h-6" />
                  <h2 className="text-lg font-bold text-black">Menu</h2>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Drawer Content */}
              <div className="p-6">
                <nav className="space-y-2">
                  <Link 
                    href={`/${params.locale}/dashboard`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 font-medium"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>
                  
                  <Link 
                    href={`/${params.locale}/campaigns`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 font-medium"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Campaigns
                  </Link>
                  
                  <Link 
                    href={`/${params.locale}/create-new-pass/get-started`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 font-medium"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create New Pass
                  </Link>
                  
                  <Link 
                    href={`/${params.locale}/settings`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 font-medium"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Link>
                </nav>
                
                {/* Divider */}
                <div className="my-6 border-t border-gray-100"></div>
                
                {/* Logout Button */}
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('passly_auth');
                      window.location.href = `/${params.locale}/`;
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
      </div>
            </>
          )}
          
          {/* Progress Indicator on Column Border */}
          <div className="relative">
            <div className="h-1 bg-gray-200"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
      </div>
          
          {/* Two Column Grid Inside */}
          <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        {children}
            
            {/* Percentage in Top Right of Preview */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-white rounded-full px-3 py-1 shadow-md border border-gray-200">
                <span className="text-sm font-semibold text-gray-800">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons Inside Container */}
          <div className="px-6 py-4 border-t border-gray-100">
            <StepNav />
          </div>
        </div>
      </div>
    </section>
  );
}
