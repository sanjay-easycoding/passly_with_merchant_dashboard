"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import StepNav from '@/components/features/createPass/StepNav';
import PreviewCard from '@/components/features/createPass/PreviewCard';

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
    <section className="min-h-screen bg-gray-50">
      {/* Apple-style Container */}
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
          {/* Apple-style Header */}
          <div className="px-8 py-6 border-b border-gray-100/50">
            <div className="flex items-center justify-between">
              {/* Left: Passly Logo */}
              <div className="flex items-center gap-4">
                {/* Logo */}
                <Image src="/passly_logo.svg" alt="Passly Logo" width={32} height={32} className="w-8 h-8" />
                <h1 className="text-xl font-semibold text-gray-900">Passly</h1>
                {/* Burger Menu */}
                <button 
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  className="p-2.5 hover:bg-gray-100/50 rounded-2xl transition-all duration-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              
              {/* Center: Step Name */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <span className="text-lg font-medium text-gray-900">
                  {steps[currentIndex]?.key?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Step'}
                </span>
              </div>
              
              {/* Right: Step Counter */}
              <div className="text-sm font-medium text-gray-600">
                Step {currentIndex + 1} of {steps.length}
              </div>
            </div>
          </div>

          {/* Apple-style Drawer */}
          {isDrawerOpen && (
            <>
              {/* Backdrop Overlay */}
              <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm"></div>
              
              {/* Drawer */}
              <div className="absolute left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-20 border-r border-white/20">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
                <div className="flex items-center gap-3">
                  <Image src="/passly_logo.svg" alt="Passly Logo" width={24} height={24} className="w-6 h-6" />
                  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2.5 hover:bg-gray-100/50 rounded-2xl transition-all duration-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Drawer Content */}
              <div className="p-6">
                <nav className="space-y-1">
                  <Link 
                    href={`/${params.locale}/dashboard`}
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-100/50 hover:text-gray-900 transition-all duration-200 font-medium"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>
                  
                  <Link 
                    href={`/${params.locale}/campaigns`}
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-100/50 hover:text-gray-900 transition-all duration-200 font-medium"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Campaigns
                  </Link>
                  
                  <Link 
                    href={`/${params.locale}/create-new-pass/get-started`}
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-100/50 hover:text-gray-900 transition-all duration-200 font-medium"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create New Pass
                  </Link>
                  
                  <Link 
                    href={`/${params.locale}/settings`}
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-100/50 hover:text-gray-900 transition-all duration-200 font-medium"
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
                <div className="my-6 border-t border-gray-100/50"></div>
                
                {/* Logout Button */}
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('passly_auth');
                      window.location.href = `/${params.locale}/`;
                    }
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50/50 transition-all duration-200 font-medium"
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
          
          {/* Apple-style Progress Indicator */}
          <div className="relative">
            <div className="h-1 bg-gray-200/50"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-[#008929] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Two Column Grid Inside */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Form Content */}
            <div className="lg:border-r border-gray-100/50">
              {children}
            </div>
            
            {/* Right Column - Preview Container */}
            <div className="flex flex-col bg-gray-50">
              {/* First Row - Controls */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-3" id="preview-controls">
                  {/* Layout Button - Left */}
                  <button
                    onClick={() => {
                      const event = new CustomEvent('openTemplates');
                      window.dispatchEvent(event);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group border border-gray-200"
                    title="Choose Layout Design"
                  >
                    <svg className="w-4 h-4 group-hover:scale-105 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    <span className="text-sm font-medium">Layout</span>
                  </button>

                  {/* Apple Segmented Control - Center */}
                  <div className="flex bg-gray-100 rounded-2xl p-1 shadow-inner">
                    <button
                      onClick={() => {
                        const event = new CustomEvent('setViewMode', { detail: 'card' });
                        window.dispatchEvent(event);
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-white text-gray-900 shadow-sm"
                      id="card-view-btn"
                    >
                      Card
                    </button>
                    <button
                      onClick={() => {
                        const event = new CustomEvent('setViewMode', { detail: 'phone' });
                        window.dispatchEvent(event);
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 hover:text-gray-900"
                      id="phone-view-btn"
                    >
                      Phone
                    </button>
                  </div>

                  {/* Apple Style Progress Badge - Right */}
                  <div className="bg-white rounded-2xl px-4 py-2.5 shadow-lg border border-gray-200">
                    <span className="text-sm font-semibold text-gray-900">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Second Row - Preview Card */}
              <div className="flex-1 p-8 lg:p-12 mt-10">
                <PreviewCard />
              </div>
            </div>
          </div>
          
          {/* Apple-style Navigation Section */}
          <div className="px-8 py-6 border-t border-gray-100/50">
            <StepNav />
          </div>
        </div>
      </div>
    </section>
  );
}
