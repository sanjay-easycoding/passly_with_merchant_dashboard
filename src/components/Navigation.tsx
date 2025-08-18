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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  const t = getTranslations(locale);

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

  // Add authentication check for Create New Pass link
  const handleCreateNewPassClick = () => {
    const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('passly_auth');
    if (isLoggedIn) {
      window.location.href = `/${locale}/create-new-pass/get-started`;
    } else {
      window.location.href = `/${locale}/login`;
    }
  };

  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('passly_auth');

  return (
    <nav className="relative bg-white">
      <div className="max-w-7xl mx-auto px-8 py-6">
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
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={getNavLink(item.href)}
                  className="text-black hover:text-gray-600 transition-colors relative group"
                >
                  {t.navigation[item.name as keyof typeof t.navigation]}
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </Link>
              </div>
            ))}
            {/* Update Create New Pass link */}
            <div key="createNewPass">
              <Link
                href="#"
                onClick={handleCreateNewPassClick}
                className="text-black hover:text-gray-600 transition-colors relative group"
              >
                {t.navigation.createNewPass}
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation Buttons and Language Dropdown */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Custom Language Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white hover:border-blue-500 hover:bg-gray-50 transition-all duration-200 min-w-[80px] justify-between"
              >
                <span className="font-medium">{selectedLang?.name}</span>
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
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code as Locale);
                        setIsDropdownOpen(false);
                        const targetPath = buildLocalePath(lang.code as Locale);
                        window.location.href = targetPath;
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors duration-150 ${
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
            
            {!isLoggedIn ? (
              navButtons.map((button) => (
                <Link
                  key={button.name}
                  href={getNavLink('login')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    button.variant === "primary" 
                      ? "bg-black text-white hover:bg-gray-800"
                      : "border border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-blue-500"
                  }`}
                >
                  {t.navigation[button.name as keyof typeof t.navigation]}
                </Link>
              ))
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem('passly_auth');
                  window.location.href = `/${locale}/`;
                }}
                className="px-6 py-2 rounded-lg font-medium transition-all duration-200 border border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-blue-500"
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
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white hover:border-blue-500 hover:bg-gray-50 transition-all duration-200"
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
                <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
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

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-white border-t border-gray-200`}>
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
          
          {/* Create New Pass link for mobile */}
          <button
            onClick={() => {
              handleCreateNewPassClick();
              handleMobileNavClick();
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            {t.navigation.createNewPass}
          </button>
          
          {/* Mobile Action Buttons */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navButtons.map((button) => (
                <Link
                  key={button.name}
                  href={getNavLink('login')}
                  onClick={handleMobileNavClick}
                  className={`w-full block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    button.variant === "primary" 
                      ? "text-white bg-black hover:bg-gray-800" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {t.navigation[button.name as keyof typeof t.navigation]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
