import Image from 'next/image';
import React from 'react';



const Footer = () => {
  

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



<div className="relative py-8 sm:py-10 md:py-12 mb-50">
<div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 relative">
{/* Single Green Card Behind Wallet */}
<div className="absolute -top-15 right-25 z-0 hidden md:block">
<div className="w-[500px] h-30 bg-lime-400 transform rotate-7 shadow-md"></div>
</div>
{/* Dark Green Card Behind Wallet */}
<div className="absolute -top-9 right-25 z-1 hidden md:block">
<div className="w-[540px] h-28 bg-green-700 transform rotate-5 shadow-md"></div>
</div>
{/* Wallet Shape */}
<div className="bg-black rounded-4xl p-6 sm:p-8 md:p-10 relative w-[650px] min-h-[450px] z-10">
{/* Wallet Flap */}
<div className="absolute top-18 right-0 h-full flex items-start">
<div className="w-24 h-18 bg-white rounded-l-full flex items-center pl-2">
<div className="w-12 h-12 bg-green-700 rounded-full"></div>
</div>
</div>
{/* Wallet Content */}
<div className="relative z-10 flex flex-col items-center text-center mt-6 sm:mt-8 md:mt-10">
<h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-5">
Tap In. Stand Out. Join Us
</h2>
<p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mb-6 sm:mb-8">
Ready to Go Contactless? Let’s Build Your First Pass — No App Needed.
</p>
<p className="text-base sm:text-lg md:text-xl text-white mb-8 sm:mb-10">
Start in minutes — no tech skills needed.
</p>
<div className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
<input
type="email"
placeholder={'Enter your e-mail'}
className="w-full sm:flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-full bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600"
/>
<button className="bg-white text-gray-900 font-semibold py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-full border-2 border-emerald-600 hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap">
Get Started
</button>
</div>
</div>
</div>
</div>
</div>

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
