import Image from 'next/image';
import React from 'react';

const FooterNew = () => {
  return (
    <footer className="bg-black text-white">
      {/* Top Header Section */}
      <div className="border-b border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Logo and Tagline */}
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Image src="/passly_logo.svg" alt="Passly Logo" width={32} height={32} className="w-8 h-8" />
                <span className="text-2xl font-bold">PASSLY</span>
              </div>
              <p className="text-gray-400 text-sm">Digital Pass Builder For Modern Businesses</p>
            </div>
            
            {/* Contact Info */}
            <div className="text-right">
              <p className="text-white font-medium">+1 234 567 89 90 00</p>
              <p className="text-gray-400">info@passly.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* About Us */}
            <div>
              <h3 className="text-lg font-semibold mb-6">About us</h3>
              <p className="text-gray-400 leading-relaxed">
                Transform your customer engagement with digital passes. Create loyalty cards, coupons, and event tickets that work seamlessly with Apple Wallet and Google Pay.
              </p>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Open hours</h3>
              <div className="space-y-2 text-gray-400">
                <p>Monday: 9am - 5pm</p>
                <p>Tuesday-Friday: 11am - 6pm</p>
                <p>Saturday: 8:00am - 12pm</p>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Address</h3>
              <div className="space-y-2 text-gray-400">
                <p>123 Digital Street</p>
                <p>Tech Valley</p>
                <p>San Francisco, CA</p>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Follow Us</h3>
              <div className="space-y-2 text-gray-400">
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Twitter</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">Copyright © 2025 Passly</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
