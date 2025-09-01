"use client"
import { motion } from 'framer-motion';
import React from 'react';

import { type Locale } from '@/lib/translations';


interface HeroSectionProps {
  locale: Locale;
}

const HeroSection = ({ locale }: HeroSectionProps) => {
  
  return (
    <>
      <section className="bg-white py-12 sm:py-16 md:py-20 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center flex-wrap">
            
            {/* Left Section - Content */}
            <div className="text-left">
              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium text-black mb-8 sm:mb-10 md:mb-12 leading-tight">
                {locale === 'de' &&
                (

                  <>  
                  <div className="mb-2">Gehen Sie digital mit</div>
                  <div className="relative h-20 overflow-hidden">
                  <motion.div
                        animate={{
                          y: [0, -20],
                          opacity: [1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                          times: [0, 1]
                        }}
                        className="absolute inset-0 flex items-center"
                      >
                        <span className="text-black">Stamp Card</span>
                      </motion.div>
                      <motion.div
                        animate={{
                          y: [20, 0, -20],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                          delay: 1.5,
                          times: [0, 0.5, 1]
                        }}
                        className="absolute inset-0 flex items-center"
                      >
                        <span className="text-black">Loyalty Programs</span>
                      </motion.div>
                      <motion.div
                        animate={{
                          y: [20, 0, -20],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                          delay: 3,
                          times: [0, 0.5, 1]
                        }}
                        className="absolute inset-0 flex items-center"
                      >
                        <span className="text-black">Coupons</span>
                      </motion.div>
                    </div>

                      </> 
                )}
                
                
          
                {locale === 'en' && (
                  <>
                    <div className="mb-2">Go Digital with Your</div>
                    <div className="relative h-20 overflow-hidden">
                      <motion.div
                        animate={{
                          y: [0, -20],
                          opacity: [1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                          times: [0, 1]
                        }}
                        className="absolute inset-0 flex items-center"
                      >
                        <span className="text-black">Stamp Card</span>
                      </motion.div>
                      <motion.div
                        animate={{
                          y: [20, 0, -20],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                          delay: 1.5,
                          times: [0, 0.5, 1]
                        }}
                        className="absolute inset-0 flex items-center"
                      >
                        <span className="text-black">Loyalty Programs</span>
                      </motion.div>
                      <motion.div
                        animate={{
                          y: [20, 0, -20],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                          delay: 3,
                          times: [0, 0.5, 1]
                        }}
                        className="absolute inset-0 flex items-center"
                      >
                        <span className="text-black">Coupons</span>
                      </motion.div>
                    </div>
                  </>
                )}
              </h1>
              
              {/* Description Text */}
              <p className="text-xl text-black leading-relaxed mb-8 sm:mb-10 max-w-2xl">
                {locale === 'de' && '"Betreten Sie die Zukunft des Kundenengagements mit digitalen Pässen — Treuekarten, Gutscheine und Event-Tickets, die nahtlos über QR und Apple Wallet funktionieren."'}
                {locale === 'en' && '"Step into the future of customer engagement with digital passes — loyalty cards, coupons, and event tickets that work seamlessly through QR and Apple Wallet."'}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-6 sm:px-8 py-2 sm:py-2 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                  {locale === 'de' && 'Kostenlos starten'}
                  {locale === 'en' && 'Start for Free'}
                </button>
                <button className="border-2 border-black text-black px-6 sm:px-8 py-2 sm:py-2 rounded-full text-base sm:text-lg font-medium hover:bg-black hover:text-white transition-all duration-200">
                  {locale === 'de' && 'Anmelden'}
                  {locale === 'en' && 'Login'}
                </button>
              </div>
            </div>
            
            {/* Right Section - Video */}
            <div className="flex justify-center lg:justify-end bg-white h-full flex-1">
       
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                >
                  <source src="/videos/passly_hero.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
           
            </div>
            
          </div>
        </div>
      </section>
      

    </>
  );
};

export default HeroSection;
