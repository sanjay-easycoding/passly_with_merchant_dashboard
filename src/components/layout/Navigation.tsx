"use client";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

import { getTranslations, type Locale } from '@/lib/translations';

// Remove duplicate Create New Pass link
const navItems = [
  { name: 'dashboard', href: 'dashboard' },

  { name: 'settings', href: 'settings' }
];

const navButtons = [
  { name: 'login', variant: 'primary' }
];

const languages = [
  { code: 'de', name: 'DE' },
  { code: 'en', name: 'EN' }
];

interface NavigationProps {
  locale: Locale;
}

const Navigation = ({ locale }: NavigationProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(locale);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  const t = getTranslations(locale) as any;

  useEffect(() => {
    setIsClient(true);
    // Check authentication status only on client side
    const authData = localStorage.getItem('passly_auth');
    setIsLoggedIn(!!authData);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update selected language when locale prop changes
  useEffect(() => {
    setSelectedLanguage(locale);
  }, [locale]);

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  // Middle navigation items based on auth state
  const midNavItems = isLoggedIn
    ? [
        { label: (t.navigation?.dashboard as string) || 'Dashboard', href: 'dashboard' },
        { label: (t.navigation?.settings as string) || 'Settings', href: 'settings' },
        { label: (t.navigation?.createNewPass as string) || 'Create New Pass', href: 'create-new-pass/get-started' }
      ]
    : [
        { label: 'Start', href: '' },
        { label: 'Product', href: '#product' },
        { label: 'Pricing', href: '#pricing' }
      ];

  // Function to get the correct navigation link
  const getNavLink = (href: string) => {
    // Extract current locale from pathname if available
    const currentPath = pathname;
    let currentLocale = locale;
    
    // Try to detect locale from current path
    if (currentPath.startsWith('/en/')) {
      currentLocale = 'en';
    } else if (currentPath.startsWith('/de/')) {
      currentLocale = 'de';
    }
    
    // Navigate to the detected locale's section
    return `/${currentLocale}/${href}`;
  };

  // Build same-path URL for a different locale
  const buildLocalePath = (targetLocale: Locale) => {
    const remainder = pathname.replace(/^\/(en|de)/, '');
    const path = `/${targetLocale}${remainder || ''}`;
    return path;
  };

  // Close mobile menu when clicking a link
  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Add authentication check for Create New Pass link
  const handleCreateNewPassClick = () => {
    if (isLoggedIn) {
      window.location.href = `/${locale}/create-new-pass/get-started`;
    } else {
      window.location.href = `/${locale}/login`;
    }
  };

  // Don't render authentication-dependent content until client-side hydration is complete
  if (!isClient) {
    return (
      <nav className="relative">
        <div className="max-w-8xl mx-auto px-8 py-4">
          <div className="bg-white/40 backdrop-blur-xl rounded-full shadow-lg border border-white/30 px-6 py-3">
            <div className="flex justify-between items-center">
              {/* Logo Section */}
              <div className="flex items-center gap-2">
                {/* Wrap both logo and text in Link */}
                <Link href={`/${locale}/`} className="flex items-center gap-2">
                  <Image src="/passly_logo.svg" alt="Passly Logo" width={40} height={40} className="w-10 h-10 block mb-[18px] mr-[5px] cursor-pointer" />
                  <div className="text-xl sm:text-2xl font-bold text-black cursor-pointer">
                    {t.common.title}
                  </div>
                </Link>
              </div>
              
              {/* Desktop Middle Navigation Links (pre-hydration) */}
              <div className="hidden lg:flex items-center gap-8">
                {midNavItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href.startsWith('/') || item.href.startsWith('#') || item.href === '' ? item.href || `/${locale}/` : getNavLink(item.href)}
                      className="text-gray-800 hover:text-blue-600 transition-colors relative group font-medium"
                    >
                      {item.label}
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </Link>
                  </div>
                ))}
              </div>
              
              {/* Desktop CTA Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="w-32 h-10 bg-gray-200/60 rounded-full animate-pulse"></div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center gap-2">
                              {/* Language Dropdown for Mobile - New Implementation */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white/90 backdrop-blur-sm hover:border-blue-500 hover:bg-white transition-all duration-200 shadow-sm"
                  >
                  <span className="font-medium text-sm">{selectedLang?.name || 'EN'}</span>
                    <svg
                      className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isDropdownOpen && (
                  <div 
                    className="absolute top-12 right-0 w-20 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                    style={{ zIndex: 10000 }}
                  >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang.code as Locale);
                            setIsDropdownOpen(false);
                            const targetPath = buildLocalePath(lang.code as Locale);
                            window.location.href = targetPath;
                          }}
                                                 className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 hover:border-l-2 hover:border-l-black transition-all ${
                           selectedLanguage === lang.code 
                             ? 'bg-blue-50 text-blue-600 font-medium border-l-2 border-l-black' 
                           : 'text-gray-700'
                         }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hamburger Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {/* Icon when menu is closed */}
                  <svg
                    className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  {/* Icon when menu is open */}
                  <svg
                    className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 rounded-b-2xl shadow-lg mx-8`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Navigation Links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={getNavLink(item.href)}
                onClick={handleMobileNavClick}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {t.navigation[item.name as keyof typeof t.navigation]}
              </Link>
            ))}
            
            {/* Mobile Auth Button - Show loading state */}
            <div className="px-3 py-2">
              <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-4 z-50">
      <div className="max-w-7xl mx-auto px-8 py-0">
        <div className="bg-white/40 backdrop-blur-xl rounded-full shadow-lg border border-white/30 px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              {/* Wrap both logo and text in Link */}
              <Link href={`/${locale}/`} className="flex items-center gap-2">
                <Image src="/passly_logo.svg" alt="Passly Logo" width={40} height={40} className="w-10 h-10 block mb-[18px] mr-[5px] cursor-pointer" />
                <div className="text-xl sm:text-2xl font-bold text-black cursor-pointer">
                  {t.common.title}
                </div>
              </Link>
            </div>
            
            {/* Desktop Middle Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {midNavItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href.startsWith('/') || item.href.startsWith('#') || item.href === '' ? item.href || `/${locale}/` : getNavLink(item.href)}
                    className="text-gray-800 hover:text-blue-600 transition-colors relative group font-medium"
                  >
                    {item.label}
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Desktop Right: Language dropdown + CTA(s) */}
            <div className="hidden lg:flex items-center gap-4">
                            {/* Language Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-white/40 rounded-full text-gray-800 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all duration-200 min-w-[80px] justify-between shadow-sm"
                >
                  <span className="font-medium">{selectedLang?.name || 'EN'}</span>
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-20 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
                    style={{ zIndex: 99999 }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code as Locale);
                          setIsDropdownOpen(false);
                          const targetPath = buildLocalePath(lang.code as Locale);
                          window.location.href = targetPath;
                        }}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 hover:border-l-2 hover:border-l-black transition-all ${
                          selectedLanguage === lang.code 
                            ? 'bg-blue-50 text-blue-600 font-medium border-l-2 border-l-black' 
                            : 'text-gray-700'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                  )}
              </div>
              
              {!isLoggedIn ? (
                <>
                  <Link
                    href={`/${locale}/signup`}
                    className="px-6 py-2 rounded-full font-medium transition-all duration-200 border border-gray-800 text-gray-900 bg-white hover:bg-gray-50 shadow-sm"
                  >
                    Start for free
                  </Link>
                  <Link
                    href={getNavLink('login')}
                    className="px-6 py-2 rounded-full font-medium transition-all duration-200 bg-black text-white hover:bg-gray-800 shadow-sm"
                  >
                    {t.navigation.login}
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    localStorage.removeItem('passly_auth');
                    setIsLoggedIn(false);
                    window.location.href = `/${locale}/`;
                  }}
                  className="px-6 py-2 rounded-full font-medium transition-all duration-200 bg-black text-white hover:bg-gray-800 shadow-sm"
                >
                  {t.navigation.logout}
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Language Dropdown for Mobile */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white/90 backdrop-blur-sm hover:border-blue-500 hover:bg-white transition-all duration-200 shadow-sm"
                >
                  <span className="font-medium text-sm">{selectedLang?.name}</span>
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code as Locale);
                          setIsDropdownOpen(false);
                          const targetPath = buildLocalePath(lang.code as Locale);
                          window.location.href = targetPath;
                        }}
                        className={`w-full px-4 py-3 text-left transition-colors duration-150 text-sm ${
                          selectedLanguage === lang.code 
                            ? 'bg-blue-50 text-blue-600 font-medium' 
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Icon when menu is open */}
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 rounded-b-2xl shadow-lg mx-8`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Mobile Navigation Links */}
          {midNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href.startsWith('/') || item.href.startsWith('#') || item.href === '' ? item.href || `/${locale}/` : getNavLink(item.href)}
              onClick={handleMobileNavClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          
          {/* Extra mobile action for Create New Pass when logged in */}
          {isLoggedIn && (
          <button
            onClick={() => {
              handleCreateNewPassClick();
              handleMobileNavClick();
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            {t.navigation.createNewPass}
          </button>
          )}
          
          {/* Mobile Action Buttons */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {!isLoggedIn ? (
                <>
                  <Link
                    href={`/${locale}/signup`}
                    onClick={handleMobileNavClick}
                    className="w-full block px-3 py-2 rounded-md text-base font-medium text-gray-900 border border-gray-200 bg-white hover:bg-gray-50"
                  >
                    Start for free
                  </Link>
                  <Link
                    href={getNavLink('login')}
                    onClick={handleMobileNavClick}
                    className="w-full block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {t.navigation.login}
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    localStorage.removeItem('passly_auth');
                    setIsLoggedIn(false);
                    setIsMobileMenuOpen(false);
                    window.location.href = `/${locale}/`;
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium border border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-blue-500 transition-colors"
                >
                  {t.navigation.logout}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
