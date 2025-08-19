import Image from 'next/image';
import React from 'react';

import { useTranslations, type Locale } from '@/lib/translations';

interface FooterProps {
  locale: Locale;
}

const Footer = ({ locale }: FooterProps) => {
  const t = useTranslations(locale, 'footer');

  return (
    <>

<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 min-h-[500px]">
  
</div>

      {/* Footer */}
      <footer
        className="relative text-white bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: "linear-gradient(to bottom, #00000000, #00000000, #00000000, black, black), url('/footer-bg.jpg')"
        }}
      >
        {/* Footer Content */}
        <div className="relative z-10 pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Side - Company Information */}
              <div className="space-y-6">
                {/* Logo/Icon */}
                <div className="flex items-center space-x-3">
                  <Image src="/passly_logo.svg" alt="Passly Logo" width={48} height={40} className="w-12 h-10" />
                  <span className="text-2xl sm:text-3xl font-bold text-black lg:text-white">Passly</span>
                </div>
                {/* Tagline */}
                <p className="text-black lg:text-white text-lg sm:text-xl max-w-md">
                  The Future of Wallet Engagement.
                </p>
                {/* Copyright */}
                <p className="text-black lg:text-white text-sm sm:text-base">
                 © 2025 Passly. All rights Reserved
                </p>
              </div>

              {/* Right Side - Navigation and Contact */}
              <div className="space-y-8">
                {/* Primary Navigation Links */}
                <div className="flex flex-wrap gap-6 sm:gap-8">
                  <a href="#" className="text-black lg:text-white hover:text-white transition-colors duration-200">
                Home
                  </a>
                  <a href="#" className="text-black lg:text-white hover:text-white transition-colors duration-200">
                    Product
                  </a>
                  <a href="#" className="text-black lg:text-white hover:text-white transition-colors duration-200">
                  Pricing
                  </a>
                  <a href="#" className="text-black lg:text-white hover:text-white transition-colors duration-200">
                  Blog
                  </a>
                  <a href="#" className="text-black lg:text-white hover:text-white transition-colors duration-200">
                    Contact
                  </a>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-4 sm:gap-6">
                  {/* Twitter/X */}
                  <a href="#" className="w-10 h-10 bg-black border border-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                    <span className="text-white font-bold text-sm">X</span>
                  </a>
                  {/* Facebook */}
                  <a href="#" className="w-10 h-10 bg-black border border-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                    <span className="text-white font-bold text-sm">f</span>
                  </a>
                  {/* LinkedIn */}
                  <a href="#" className="w-10 h-10 bg-black border border-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                    <span className="text-white font-bold text-sm">in</span>
                  </a>
                  {/* Instagram */}
                  <a href="#" className="w-10 h-10 bg-black border border-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>

                {/* Legal/Policy Links */}
                <div className="flex flex-wrap gap-6 sm:gap-8">
                  <a href="#" className="text-gray-400 hover:text-white underline transition-colors duration-200">
                 Privacy Policy
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white underline transition-colors duration-200">
                    Terms of Services
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white underline transition-colors duration-200">
                 Newsletter Sign-up
                  </a>
                </div>

                {/* Newsletter Description */}
                <p className="text-gray-400 text-sm sm:text-base max-w-md">
                 Get updates on new features, guides, and exclusive offers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
