"use client";

import { useState } from 'react';
import { FaMobileAlt, FaBolt, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { clearBuilderData } from '@/store/builderSlice';




export default function CreateNewPassGetStarted({ params }: { params: { locale: 'en' | 'de' } }) {
  const t = useTranslations(params.locale, 'pages');
  const c = t.createNewPassGetStarted;
  const dispatch = useDispatch();
  const builderData = useSelector((state: RootState) => state.builder);
  const [showModal, setShowModal] = useState(false);

  // Function to render heading with colored text
  const renderHeading = (heading: string) => {
    const parts = heading.split(/(<wallet>.*?<\/wallet>|<pass>.*?<\/pass>)/);
    
    return parts.map((part, index) => {
      if (part.startsWith('<wallet>') && part.endsWith('</wallet>')) {
        const text = part.replace(/<\/?wallet>/g, '');
        return <span key={index} className="text-[#10B981]">{text}</span>;
      }
      if (part.startsWith('<pass>') && part.endsWith('</pass>')) {
        const text = part.replace(/<\/?pass>/g, '');
        return <span key={index} className="text-[#4949a4]">{text}</span>;
      }
      return part;
    });
  };

  const hasExistingData = builderData.campaignName || 
                         builderData.brandColor || 
                         builderData.logoUrl || 
                         builderData.tagline || 
                         builderData.stampsNeeded || 
                         builderData.rewardDescription || 
                         builderData.businessName || 
                         builderData.contact;

  const handleGetStarted = () => {
    if (hasExistingData) {
      setShowModal(true);
    } else {
      // No existing data, go directly to pass-type
      window.location.href = `/${params.locale}/create-new-pass/pass-type`;
    }
  };

  const handleContinueWithExisting = () => {
    setShowModal(false);
    window.location.href = `/${params.locale}/create-new-pass/pass-type`;
  };

  const handleStartFresh = () => {
    setShowModal(false);
    dispatch(clearBuilderData());
    window.location.href = `/${params.locale}/create-new-pass/pass-type`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[54px] font-extrabold text-black leading-tight text-center md:text-left">
              {renderHeading(c.heading)}
            </h1>
            <p className="mt-4 sm:mt-6 md:mt-[30px] font-semibold text-black text-base sm:text-lg max-w-2xl mb-4 sm:mb-6 md:mb-[25px] text-center md:text-left">{c.description}</p>
            {/* Get Started Button */}
            <div className="text-center">
              <button
                onClick={handleGetStarted}
                className="cursor-pointer inline-block mt-6 sm:mt-8 rounded-full bg-[#008929] text-white px-8 sm:px-12 md:px-16 py-3 sm:py-4 w-48 sm:w-56 md:w-64 text-center font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                {c.cta}
              </button>
            </div>
          </div>

          {/* Right placeholder card */}
          {/* Redesign card from scratch */}
          <div className="w-full max-w-sm sm:max-w-md mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              {/* Green Header */}
              <div className="bg-[#008929] text-white p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-700 rounded flex items-center justify-center">
                    <span className="text-white text-sm sm:text-lg">★</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm sm:text-lg">{c.card.campaign}</div>
                    <div className="text-xs sm:text-sm opacity-90">{c.card.passType}</div>
                  </div>
                </div>
              </div>
              
              {/* White Body */}
              <div className="p-3 sm:p-4">
                <p className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{c.card.collect}</p>
                <div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="text-gray-400 text-base sm:text-lg">☆</span>
                  ))}
                </div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                  <span>{c.card.stampsNeeded}</span>
                  <span>{c.card.minPurchase}</span>
                </div>
                <div className="border-t pt-3 sm:pt-4 mb-3 sm:mb-4">
                  <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{c.card.business}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{c.card.phone}</div>
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-green-600 text-xs sm:text-sm font-medium hover:text-green-700">
                    {c.card.add}
                  </button>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 rounded flex items-center justify-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-800 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto px-6 pb-16 sm:pb-20 md:pb-24 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-3 sm:mb-4">
              <FaMobileAlt className="text-lg sm:text-xl md:text-2xl"/>
            </div>
            <div className="font-bold text-sm sm:text-base md:text-lg">{c.features.completeSetup.title}</div>
            <div className="mt-2 text-black text-xs sm:text-sm md:text-base">{c.features.completeSetup.desc}</div>
          </div>
          <div className="text-center">
            <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-3 sm:mb-4">
              <FaBolt className="text-lg sm:text-xl md:text-2xl"/>
            </div>
            <div className="font-bold text-sm sm:text-base md:text-lg">{c.features.instantDistribution.title}</div>
            <div className="mt-2 text-black text-xs sm:text-sm md:text-base">{c.features.instantDistribution.desc}</div>
          </div>
          <div className="text-center">
            <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-3 sm:mb-4">
              <FaStar className="text-lg sm:text-xl md:text-2xl"/>
            </div>
            <div className="font-bold text-sm sm:text-base md:text-lg">{c.features.fullBranding.title}</div>
            <div className="mt-2 text-black text-xs sm:text-sm md:text-base">{c.features.fullBranding.desc}</div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-sm sm:max-w-md mx-4 w-full">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">
              {c.popup.title}
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
              {c.popup.description}
            </p>
            
            <div className="flex flex-col gap-2 sm:gap-3">
              <button
                onClick={handleContinueWithExisting}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-[#008929] text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                {c.popup.continueExisting}
              </button>
              <button
                onClick={handleStartFresh}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
              >
                {c.popup.startFresh}
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                {c.popup.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
