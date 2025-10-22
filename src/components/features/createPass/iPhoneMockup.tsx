import React from 'react';

interface iPhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export default function iPhoneMockup({ children, className = '' }: iPhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone Frame */}
      <div className="relative mx-auto w-[360px] h-[720px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3.5rem] p-3 shadow-2xl">
        {/* Screen Bezel */}
        <div className="w-full h-full bg-black rounded-[3rem] p-1">
          {/* Screen */}
          <div className="w-full h-full bg-black rounded-[2.8rem] overflow-hidden relative">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-black rounded-full z-10 border border-gray-700"></div>
            
            {/* Status Bar */}
            <div className="absolute top-4 left-0 right-0 h-8 flex items-center justify-between px-10 z-20">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <div className="text-white text-sm font-semibold">9:41</div>
              <div className="flex items-center space-x-1">
                <div className="w-5 h-3 border border-white rounded-sm">
                  <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
                </div>
                <div className="w-5 h-3 border border-white rounded-sm">
                  <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
                </div>
              </div>
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-white rounded-full opacity-70"></div>
            
            {/* Content Area */}
            <div className="w-full h-full pt-12 pb-6 px-4 flex items-center justify-center">
              <div className="w-full max-w-[320px]">
                {children}
              </div>
            </div>
          </div>
        </div>
        
        {/* Side Buttons */}
        <div className="absolute left-0 top-20 w-1 h-16 bg-gray-700 rounded-r-sm"></div>
        <div className="absolute left-0 top-40 w-1 h-8 bg-gray-700 rounded-r-sm"></div>
        <div className="absolute left-0 top-52 w-1 h-8 bg-gray-700 rounded-r-sm"></div>
        <div className="absolute right-0 top-20 w-1 h-16 bg-gray-700 rounded-l-sm"></div>
      </div>
    </div>
  );
}
