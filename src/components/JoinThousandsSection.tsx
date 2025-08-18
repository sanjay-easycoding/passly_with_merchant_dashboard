import Image from 'next/image';
import React from 'react';

import { getTranslations, type Locale } from '@/lib/translations';

interface JoinThousandsSectionProps {
  locale: Locale;
}

const JoinThousandsSection = ({ locale }: JoinThousandsSectionProps) => {
  const t = getTranslations(locale);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 sm:mb-6 md:mb-8">
          {t.joinThousands?.headline || 'Join Thousands of Smart Merchants'}
        </h2>
        
        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-black text-center max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
          {t.joinThousands?.subheading || 'From local cafes to clinics, businesses are going contactless with digital passes — no app, no friction.'}
        </p>
        
        {/* Profile Pictures Row */}
        <div className="flex justify-center items-center -space-x-4 mb-12 sm:mb-16 md:mb-20">
          {/* Profile 1 */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-black z-10 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <Image src="/profile_placeholder_1.jpg" alt="Profile 1" width={80} height={80} className="w-full h-full object-cover" />
          </div>
          {/* Profile 2 */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-black z-20 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
            <Image src="/profile_placeholder_2.jpg" alt="Profile 2" width={80} height={80} className="w-full h-full object-cover" />
          </div>
          {/* Profile 3 */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-black z-30 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <Image src="/profile_placeholder_3.jpg" alt="Profile 3" width={80} height={80} className="w-full h-full object-cover" />
          </div>
          {/* Profile 4 */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-black z-40 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
            <Image src="/profile_placeholder_4.jpg" alt="Profile 4" width={80} height={80} className="w-full h-full object-cover" />
          </div>
        </div>
        
        {/* Main Illustration */}
        <div className="relative max-w-3xl lg:max-w-4xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <div className="bg-white rounded-xl shadow-[0px_4px_4.5px_2px_#00000052] p-4 sm:p-4 md:p-6 lg:p-8 max-w-md mx-auto">
            <Image src="/tech_image_join_thousands.png" alt="Tech Image" width={400} height={300} className="w-full h-auto" />
          </div>
        </div>
        
        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-black text-center max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
          {t.joinThousands?.description || 'Design professional loyalty cards, coupons, event tickets, and gift cards that customers can add to their Apple Wallet. Complete setup with all required details.'}
        </p>
        
        {/* Call to Action Button */}
        <div className="text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg md:text-xl shadow-lg transition-colors duration-200">
            {t.joinThousands?.ctaButton || 'Create a Pass'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinThousandsSection;
