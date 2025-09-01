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
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 sm:mb-10 md:mb-12 leading-tight px-2">
              {locale === 'de' && 'Gehen Sie digital mit Ihren Stempelkarten-Belohnungen'}
              {locale === 'en' && (
                <>Go digital with your Stamp card Rewards</>
              )}
            </h1>
            
            {/* Minimal Box Placeholder */}
           <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="flex justify-center items-center mb-16"
        >
          {/* Individual Cards Appearing One by One - Centered */}
          <div className="relative w-80 h-48 flex items-center justify-center">
            {/* Loyalty Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                y: [50, 0, 0, -50]
              }}
              transition={{ 
                duration: 2,
                delay: 0.5,
                times: [0, 0.3, 0.7, 1]
              }}
              className="absolute w-64 h-40 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl shadow-2xl border border-green-400/30 z-10"
            >
              {/* Card Chip */}
              <div className="w-8 h-6 bg-yellow-400 rounded-md absolute top-4 right-4 shadow-lg"></div>
              {/* Card Logo */}
              <div className="w-12 h-12 bg-white/20 rounded-full absolute top-4 left-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              {/* Card Type */}
              <div className="text-lg text-white font-bold absolute bottom-6 left-4 tracking-wide">LOYALTY</div>
              {/* Card Number */}
              <div className="text-sm text-white/70 absolute bottom-4 right-4 font-mono">•••• 1234</div>
              {/* Card Brand */}
              <div className="text-xs text-white/50 absolute bottom-2 left-4 font-medium">STARBUCKS</div>
            </motion.div>

            {/* Coupon Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                y: [50, 0, 0, -50]
              }}
              transition={{ 
                duration: 2,
                delay: 1.2,
                times: [0, 0.3, 0.7, 1]
              }}
              className="absolute w-64 h-40 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 rounded-2xl shadow-2xl border border-purple-400/30 z-10"
            >
              {/* Card Chip */}
              <div className="w-8 h-6 bg-yellow-400 rounded-md absolute top-4 right-4 shadow-lg"></div>
              {/* Card Logo */}
              <div className="w-12 h-12 bg-white/20 rounded-full absolute top-4 left-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              {/* Card Type */}
              <div className="text-lg text-white font-bold absolute bottom-6 left-4 tracking-wide">COUPON</div>
              {/* Card Number */}
              <div className="text-sm text-white/70 absolute bottom-4 right-4 font-mono">•••• 5678</div>
              {/* Card Brand */}
              <div className="text-xs text-white/50 absolute bottom-2 left-4 font-medium">AMAZON</div>
            </motion.div>

            {/* Event Ticket */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                y: [50, 0, 0, -50]
              }}
              transition={{ 
                duration: 2,
                delay: 1.9,
                times: [0, 0.3, 0.7, 1]
              }}
              className="absolute w-64 h-40 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-2xl border border-blue-400/30 z-10"
            >
              {/* Card Chip */}
              <div className="w-8 h-6 bg-yellow-400 rounded-md absolute top-4 right-4 shadow-lg"></div>
              {/* Card Logo */}
              <div className="w-12 h-12 bg-white/20 rounded-full absolute top-4 left-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              {/* Card Type */}
              <div className="text-lg text-white font-bold absolute bottom-6 left-4 tracking-wide">TICKET</div>
              {/* Card Number */}
              <div className="text-sm text-white/70 absolute bottom-4 right-4 font-mono">•••• 9012</div>
              {/* Card Brand */}
              <div className="text-xs text-white/50 absolute bottom-2 left-4 font-medium">CONCERT</div>
            </motion.div>

            {/* Gift Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                y: [50, 0, 0, -50]
              }}
              transition={{ 
                duration: 2,
                delay: 2.6,
                times: [0, 0.3, 0.7, 1]
              }}
              className="absolute w-64 h-40 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl shadow-2xl border border-orange-400/30 z-10"
            >
              {/* Card Chip */}
              <div className="w-8 h-6 bg-yellow-400 rounded-md absolute top-4 right-4 shadow-lg"></div>
              {/* Card Logo */}
              <div className="w-12 h-12 bg-white/20 rounded-full absolute top-4 left-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              {/* Card Type */}
              <div className="text-lg text-white font-bold absolute bottom-6 left-4 tracking-wide">GIFT</div>
              {/* Card Number */}
              <div className="text-sm text-white/70 absolute bottom-4 right-4 font-mono">•••• 3456</div>
              {/* Card Brand */}
              <div className="text-xs text-white/50 absolute bottom-2 left-4 font-medium">APPLE</div>
            </motion.div>

            {/* VIP Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                y: [50, 0, 0, -50]
              }}
              transition={{ 
                duration: 2,
                delay: 3.3,
                times: [0, 0.3, 0.7, 1]
              }}
              className="absolute w-64 h-40 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 rounded-2xl shadow-2xl border border-teal-400/30 z-10"
            >
              {/* Card Chip */}
              <div className="w-8 h-6 bg-yellow-400 rounded-md absolute top-4 right-4 shadow-lg"></div>
              {/* Card Logo */}
              <div className="w-12 h-12 bg-white/20 rounded-full absolute top-4 left-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              {/* Card Type */}
              <div className="text-lg text-white font-bold absolute bottom-6 left-4 tracking-wide">VIP</div>
              {/* Card Number */}
              <div className="text-sm text-white/70 absolute bottom-4 right-4 font-mono">•••• 7890</div>
              {/* Card Brand */}
              <div className="text-xs text-white/50 absolute bottom-2 left-4 font-medium">PREMIUM</div>
            </motion.div>
          </div>

          {/* Digital Wallet - Appears at Center After All Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 5.5 }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              transition: { duration: 0.3 }
            }}
            className="absolute"
          >

            {/* Wallet Body */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 6 }}
              className="w-80 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl relative overflow-hidden z-20"
            >
              {/* Diagonal Blue Line */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 6.8 }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform rotate-45 origin-center opacity-80 absolute top-1/2 left-0 transform -translate-y-1/2"></div>
                </div>
              </motion.div>
              
              {/* Scanning Light Effect */}
              <motion.div
                animate={{ 
                  x: [-320, 320],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: 6.5,
                  ease: "easeInOut"
                }}
                className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              ></motion.div>
              
              {/* Wallet Fold */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 6.2 }}
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-t-2xl border-b-2 border-gray-600"
              ></motion.div>
              
              {/* Wallet Pocket */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 6.4 }}
                className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-br from-gray-600 to-gray-700 rounded-b-2xl"
              ></motion.div>
              
              {/* Digital Cards Inside */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 6.6 }}
                className="absolute top-4 left-4 right-4 bottom-4"
              >
                {/* Card 1 */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 6.8 }}
                  whileHover={{ 
                    scale: 1.1,
                    z: 20,
                    transition: { duration: 0.2 }
                  }}
                  className="absolute top-2 left-2 w-16 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md cursor-pointer relative overflow-hidden"
                >
                  <div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1 opacity-80"></div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-yellow-300 rounded-full absolute top-1 left-1"
                  ></motion.div>
                  
                  {/* Sparkling Effect */}
                  <motion.div
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                    className="absolute top-1 right-2 w-1 h-1 bg-blue-300 rounded-full"
                  ></motion.div>
                  
                  <motion.div
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, -180, -360]
                    }}
                    transition={{ 
                      duration: 1.2,
                      repeat: Infinity,
                      delay: 1
                    }}
                    className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-blue-200 rounded-full"
                  ></motion.div>
                  
                  <motion.div
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 90, 180]
                    }}
                    transition={{ 
                      duration: 1.8,
                      repeat: Infinity,
                      delay: 1.5
                    }}
                    className="absolute top-2 left-3 w-0.5 h-0.5 bg-blue-400 rounded-full"
                  ></motion.div>
                  
                  <motion.div
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, -90, -180]
                    }}
                    transition={{ 
                      duration: 1.3,
                      repeat: Infinity,
                      delay: 2
                    }}
                    className="absolute bottom-2 right-1 w-0.5 h-0.5 bg-blue-300 rounded-full"
                  ></motion.div>
                </motion.div>
                
                {/* Card 2 */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 7 }}
                  whileHover={{ 
                    scale: 1.1,
                    z: 20,
                    transition: { duration: 0.2 }
                  }}
                  className="absolute top-4 left-4 w-16 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-md cursor-pointer"
                >
                  <div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1 opacity-80"></div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="w-2 h-2 bg-yellow-300 rounded-full absolute top-1 left-1"
                  ></motion.div>
                </motion.div>
                
                {/* Card 3 */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 7.2 }}
                  whileHover={{ 
                    scale: 1.1,
                    z: 20,
                    transition: { duration: 0.2 }
                  }}
                  className="absolute top-6 left-6 w-16 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg shadow-md cursor-pointer"
                >
                  <div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1 opacity-80"></div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="w-2 h-2 bg-yellow-300 rounded-full absolute top-1 left-1"
                  ></motion.div>
                </motion.div>
              </motion.div>
              
              {/* Wallet Stitch Details */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 7.4 }}
                className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-500 opacity-30"
              ></motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 7.6 }}
                className="absolute top-1/2 left-6 right-6 h-0.5 bg-gray-500 opacity-20"
              ></motion.div>
              
              {/* Pulsing Brand */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 7.8 }}
                className="absolute bottom-4 right-4 text-white text-xs font-medium"
              >
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  DIGITAL WALLET
                </motion.span>
              </motion.div>
              
              {/* Success Checkmark */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 8 }}
                className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 45 }}
                  transition={{ duration: 0.3, delay: 8.2 }}
                  className="w-3 h-3 border-2 border-white border-t-0 border-l-0 transform rotate-45"
                ></motion.div>
              </motion.div>
            </motion.div>
            

            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 8.8 }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <motion.line
                x1="50%"
                y1="50%"
                x2="80%"
                y2="20%"
                stroke="url(#gradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 9 }}
              />
              <motion.line
                x1="50%"
                y1="50%"
                x2="20%"
                y2="80%"
                stroke="url(#gradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 9.2 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </motion.svg>
          </motion.div>
        </motion.div>

            
            {/* Main Content Container */}
            <div className="flex flex-col items-center justify-center mb-12 sm:mb-14 md:mb-16">
              {/* Description Text */}
              <p className="text-lg sm:text-xl text-black leading-relaxed mb-6 sm:mb-8 max-w-4xl text-center px-4">
                {locale === 'de' && '"Betreten Sie die Zukunft des Kundenengagements mit digitalen Pässen — Treuekarten, Gutscheine und Event-Tickets, die nahtlos über QR und Apple Wallet funktionieren."'}
                {locale === 'en' && '"Step into the future of customer engagement with digital passes — loyalty cards, coupons, and event tickets that work seamlessly through QR and Apple Wallet."'}
              </p>
              
              {/* Know More Button */}
              <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                {locale === 'de' && 'Mehr erfahren'}
                {locale === 'en' && 'Know more'}
              </button>
            </div>
            


            
          </div>
        </div>
      </section>
      

    </>
  );
};

export default HeroSection;
