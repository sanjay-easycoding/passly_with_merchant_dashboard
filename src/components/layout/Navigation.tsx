"use client";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTranslations, type Locale, useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { clearBuilderData } from '@/store/builderSlice';

// Remove duplicate Create New Pass link
const navItems = [
  { name: 'dashboard', href: 'dashboard' },

  { name: 'settings', href: 'settings' }
];

// Removed unused navButtons array

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
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const builderData = useSelector((state: RootState) => state.builder);
  
  const t = getTranslations(locale) as {
    navigation: {
      dashboard: string;
      campaigns: string;
      createNewPass: string;
      settings: string;
      login: string;
      logout: string;
    };
    common: {
      title: string;
    };
  };

  // Get translations for the popup
  const translations = useTranslations(locale, 'pages');
  const getStartedTranslations = translations?.createNewPassGetStarted as {
    popup?: {
      title: string;
      description: string;
      continueExisting: string;
      startFresh: string;
      cancel: string;
    };
  };
  const popupTranslations = getStartedTranslations?.popup || {
    title: 'Continue with existing data?',
    description: 'We found some previously saved data. Would you like to continue where you left off or start fresh?',
    continueExisting: 'Continue with existing data',
    startFresh: 'Start fresh',
    cancel: 'Cancel'
  };

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

  // Check if there's existing builder data
  const hasExistingData = builderData.campaignName || 
                         builderData.brandColor || 
                         builderData.logoUrl || 
                         builderData.tagline || 
                         builderData.stampsNeeded || 
                         builderData.rewardDescription || 
                         builderData.businessName || 
                         builderData.contact;

  // Add authentication check for Create New Pass link
  const handleCreateNewPassClick = () => {
    if (!isLoggedIn) {
      window.location.href = `/${locale}/login`;
      return;
    }
    
    // If logged in, check for existing data
    if (hasExistingData) {
      setShowModal(true);
    } else {
      // No existing data, go directly to pass-type (step 1)
      window.location.href = `/${locale}/create-new-pass/pass-type`;
    }
  };

  // Middle navigation items based on auth state
  const midNavItems = isLoggedIn
    ? [
        { label: (t.navigation?.dashboard as string) || 'Dashboard', href: 'dashboard', isLink: true },
        { label: (t.navigation?.settings as string) || 'Settings', href: 'settings', isLink: true },
        { label: (t.navigation?.createNewPass as string) || 'Create New Pass', href: '', isLink: false, onClick: handleCreateNewPassClick }
      ]
    : [
        { label: 'Start', href: '', isLink: true },
        { label: 'Product', href: '#product', isLink: true },
        { label: 'Pricing', href: '#pricing', isLink: true }
      ];

  const handleContinueWithExisting = () => {
    setShowModal(false);
    window.location.href = `/${locale}/create-new-pass/pass-type`;
  };

  const handleStartFresh = () => {
    setShowModal(false);
    dispatch(clearBuilderData());
    window.location.href = `/${locale}/create-new-pass/pass-type`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Don't render authentication-dependent content until client-side hydration is complete
  if (!isClient) {
    return (
      <nav className="relative">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
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
      <div className="max-w-[1440px] mx-auto px-8 py-0">
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
                  {item.isLink ? (
                    <Link
                      href={item.href.startsWith('/') || item.href.startsWith('#') || item.href === '' ? item.href || `/${locale}/` : getNavLink(item.href)}
                      className="text-gray-800 hover:text-blue-600 transition-colors relative group font-medium"
                    >
                      {item.label}
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </Link>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="text-gray-800 hover:text-blue-600 transition-colors relative group font-medium cursor-pointer"
                    >
                      {item.label}
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </button>
                  )}
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
            item.isLink ? (
              <Link
                key={item.label}
                href={item.href.startsWith('/') || item.href.startsWith('#') || item.href === '' ? item.href || `/${locale}/` : getNavLink(item.href)}
                onClick={handleMobileNavClick}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick?.();
                  handleMobileNavClick();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </button>
            )
          ))}
          
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

      {/* Modal for Draft Selection */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100000] p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-sm sm:max-w-md mx-4 w-full">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">
              {popupTranslations.title}
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
              {popupTranslations.description}
            </p>
            
            <div className="flex flex-col gap-2 sm:gap-3">
              <button
                onClick={handleContinueWithExisting}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-[#008929] text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                {popupTranslations.continueExisting}
              </button>
              <button
                onClick={handleStartFresh}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
              >
                {popupTranslations.startFresh}
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                {popupTranslations.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
