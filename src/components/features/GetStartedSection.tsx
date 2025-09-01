import Image from 'next/image';
import React from 'react';

import { type Locale } from '@/lib/translations';

interface GetStartedSectionProps {
  locale: Locale;
}

const GetStartedSection = ({ locale }: GetStartedSectionProps) => {

  return (
    <>
      {/* Get Started Section */}
      <div className="bg-[#F3F3F3] py-12 sm:py-16 md:py-20">
        <div className="text-center mb-12 mt-6 sm:mb-16 sm:mt-6 md:mb-20 md:mt-6">
          {/* Icon */}
          <div className="inline-block mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 sm:w-1 sm:h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 sm:w-1 sm:h-2 bg-white rounded-full"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-0.5 sm:w-2 sm:h-1 bg-white rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-0.5 sm:w-2 sm:h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span>
              {locale === 'de' ? 'Loslegen' : 'Get Started'}
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
            <span>
              {locale === 'de' 
                ? '"Starten Sie smart. Gehen Sie kontaktlos. Holen Sie sich Ihren ersten Pass in Minuten live."'
                : '"Start smart. Go contactless. Get your first pass live in minutes."'
              }
            </span>
          </p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Box 1 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-center mb-4">
              <Image 
                src="/step-1.jpeg" 
                alt="Step 1" 
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {locale === 'de' ? 'Schritt 1 - Anmelden & Pass erstellen' : 'Step 1 - Sign Up & Create Your Pass'}
            </h3>
            <ul className="text-gray-600 text-left space-y-2">
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                {locale === 'de' ? 'Registrieren Sie sich auf der Passly-Plattform' : 'Register on the Passly platform'}
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                {locale === 'de' ? 'Logo, Markenfarben und grundlegende Informationen hochladen' : 'Upload logo, brand colours, and basic info'}
              </li>
            </ul>
          </div>

          {/* Box 2 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-center mb-4">
              <Image 
                src="/step-2.jpeg" 
                alt="Step 2" 
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {locale === 'de' ? 'Schritt 2 - Treueprogramm einrichten' : 'Step 2 - Set Up Your Loyalty Program'}
            </h3>
            <ul className="text-gray-600 text-left space-y-2">
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                {locale === 'de' ? 'Belohnungen definieren (Punkte, Stempel, Rabatte)' : 'Define rewards (points, stamps, discounts)'}
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                {locale === 'de' ? 'Geschäftsbedingungen hinzufügen, falls erforderlich' : 'Add terms & conditions if needed'}
              </li>
            </ul>
          </div>

          {/* Box 3 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-center mb-4">
              <Image 
                src="/step-3.jpeg" 
                alt="Step 3" 
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {locale === 'de' ? 'Schritt 3 - Mit Kunden teilen' : 'Step 3 - Share with Your Customers'}
            </h3>
            <ul className="text-gray-600 text-left space-y-2">
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                {locale === 'de' ? 'Verteilen über QR-Code an der Kasse, Website oder Social Media' : 'Distribute via QR code at checkout, website, or social media'}
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                {locale === 'de' ? 'Kunden fügen den Pass direkt in Apple Wallet hinzu' : 'Customers add the pass directly into Apple Wallet'}
              </li>
            </ul>
          </div>

          {/* Box 4 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-center mb-4">
              <Image 
                src="/step-4.jpeg" 
                alt="Step 4" 
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {locale === 'de' ? 'Schritt 4 - Verfolgen & Engagieren' : 'Step 4 - Track & Engage'}
            </h3>
            <ul className="text-gray-600 text-left space-y-2">
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                {locale === 'de' ? 'Echtzeit-Nutzung und Analysen anzeigen' : 'See real-time usage and analytics'}
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                {locale === 'de' ? 'Updates senden oder Push-Belohnungen, um Kunden zurückzuholen' : 'Send updates or push rewards to keep customers coming back'}
              </li>
            </ul>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default GetStartedSection;
