import React from 'react';

import { getTranslations, type Locale } from '@/lib/translations';

interface GetStartedSectionProps {
  locale: Locale;
}

const GetStartedSection = ({ locale }: GetStartedSectionProps) => {
  const t = getTranslations(locale);

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

        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Area 1 - Large Card */}
          <div style={{ boxShadow: '0px 4px 4.5px 2px #00000047' }} className="sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
           
           
           
            <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  {locale === 'de' ? 'Kunde scannt. Karte gespeichert' : 'Customer Scans. Card Saved'}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  {locale === 'de' 
                    ? 'Kein App-Download. Einfach scannen und in Apple Wallet speichern — schnell, vertraut, reibungslos'
                    : 'No app download. Just scan and save to Apple Wallet — fast, familiar, frictionless'
                  }
                </p>
                
                <div className="flex justify-center mb-4 sm:mb-6">
                  <img 
                    src="/getStartedPhone.png" 
                    alt="Phone with QR code" 
                    className="w-32 sm:w-40 md:w-48 h-96"
                  />
                </div>

              </div>
              
              <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
                <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white text-xs sm:text-sm rounded-full font-medium">
                  {locale === 'de' ? 'Keine App erforderlich' : 'No app required'}
                </div>
                <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-800 text-white text-xs sm:text-sm rounded-full font-medium">
                  {locale === 'de' ? 'Sofort speichern' : 'Instant save'}
                </div>
              </div>
            </div>



          </div>

          {/* Area 2 - Medium Card */}
          <div style={{ boxShadow: '0px 4px 4.5px 2px #00000047' }} className="sm:col-span-2 lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 sm:p-6 sm:h-56 md:h-64 relative overflow-hidden h-full">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                {locale === 'de' ? 'Machen Sie es einzigartig' : 'Make It Uniquely Yours'}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                {locale === 'de' 
                  ? 'Fügen Sie Ihr Logo, Farben und benutzerdefinierte Nachrichten hinzu, um sie an Ihre Markenidentität anzupassen.'
                  : 'Add your logo, colors, and custom messaging to match your brand identity.'
                }
              </p>
              
              {/* UI Interface */}
              <div >
           
              <div className="flex justify-end mb-4 sm:mb-6">
                  <img 
                    src="/getStartedMonitor.jpg" 
                    alt="Card customization interface" 
                    className="w-[100px] h-[100px]"
                  />
                </div>
              </div>


              
            </div>
          </div>

          {/* Area 3 - Small Card */}
          <div style={{ boxShadow: '0px 4px 4.5px 2px #00000047' }} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 sm:p-6 h-full overflow-hidden">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">
                {locale === 'de' ? 'Wählen Sie den perfekten Pass' : 'Pick the Perfect Pass'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                {locale === 'de' 
                  ? 'Wählen Sie aus Treuekarten, Gutscheinen, Tickets oder Geschenkkarten.'
                  : 'Choose from loyalty cards, coupons, tickets, or gift cards.'
                }
              </p>
              
              {/* Floating Passes */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="w-full h-5 sm:h-6 md:h-8 bg-gradient-to-r from-green-500 to-purple-600 rounded-lg shadow-md border border-gray-200 flex items-center justify-center">
                  <div className="text-xs text-white">
                    {locale === 'de' ? 'Treue' : 'Loyalty'}
                  </div>
                </div>
                <div className="w-full h-5 sm:h-6 md:h-8 bg-gradient-to-r from-blue-500 to-pink-600 rounded-lg shadow-md border border-gray-200 flex items-center justify-center">
                  <div className="text-xs text-white">
                    {locale === 'de' ? 'Gutscheine' : 'Coupons'}
                  </div>
                </div>
                <div className="w-full h-5 sm:h-6 md:h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-md border border-gray-200 flex items-center justify-center">
                  <div className="text-xs text-white">
                    {locale === 'de' ? 'Events' : 'Events'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Area 4 - Small Card */}
          <div style={{ boxShadow: '0px 4px 4.5px 2px #00000047' }} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 sm:p-6 h-full relative overflow-hidden">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">
                {locale === 'de' ? 'Funktioniert ohne App' : 'Works Without an App'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                {locale === 'de' 
                  ? 'Kunden können auf Ihre Karte direkt aus ihrem Browser zugreifen.'
                  : 'Customers can access your card directly from their browser.'
                }
              </p>
              
              {/* Phone with Wallet */}
              <div className="relative flex justify-center">
                <div className="w-10 h-16 sm:w-12 sm:h-20 md:w-14 md:h-24 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="w-7 h-12 sm:w-8 sm:h-16 md:w-10 md:h-20 bg-gray-900 rounded-sm mx-0.5 sm:mx-1 md:mx-1.5 mt-0.5 sm:mt-1 md:mt-1.5">
                    <div className="text-xs text-white text-center pt-1 sm:pt-1.5 md:pt-2">WALLET</div>
                  </div>
                </div>
                
                {/* Floating Icons */}
                <div className="absolute -top-0.5 sm:-top-1 md:-top-1.5 -left-0.5 sm:-left-1 md:-left-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-blue-500 rounded-full flex items-center justify-center border border-white">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white rounded-sm"></div>
                </div>
                <div className="absolute -top-0.5 sm:-top-1 md:-top-1.5 -right-0.5 sm:-right-1 md:-right-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-green-500 rounded-full flex items-center justify-center border border-white">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white rounded-sm"></div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                <div className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-200">
                  {locale === 'de' ? 'Kein App-Ärger' : 'No App hassle'}
                </div>
                <div className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full border border-blue-200">
                  {locale === 'de' ? 'Keine Verzögerungen' : 'No delays'}
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default GetStartedSection;
