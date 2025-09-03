import React from 'react';

import { type Locale } from '@/lib/translations';

interface GoDigitalSectionProps {
  locale: Locale;
}

const GoDigitalSection = ({ locale }: GoDigitalSectionProps) => {
  return (
    <section className="relative w-full mx-auto max-h-[500px] mb-[400px]">
      {/* Full Width Video */}
      <div className="relative w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        >
          <source src="/videos/Go_digital_with_loyality.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Centered Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-semibold text-white leading-tight" 
                style={{
                  textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.6)',
                  WebkitTextStroke: '1px rgba(0, 0, 0, 0.5)',
                  filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.8))'
                }}>
              {locale === 'de' && (
                <>
                  <span className="block">Digitalisieren Sie Ihr</span>
                  <span className="block">Treueprogramm jetzt</span>
                </>
              )}
              {locale === 'en' && (
                <>
                  <span className="block">Go digital with your</span>
                  <span className="block">loyalty program now</span>
                </>
              )}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoDigitalSection;
