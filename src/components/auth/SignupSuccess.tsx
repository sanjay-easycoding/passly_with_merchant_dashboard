"use client";

import React from 'react';

type SignupSuccessProps = {
  onDone?: () => void;
};

export default function SignupSuccess({ onDone }: SignupSuccessProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-[400px]">
      <h1 className="text-center text-[28px] font-semibold text-gray-900 mb-[40px] mt-[40px]">Success !</h1>

      <div className="w-full max-w-[520px] rounded-[16px] bg-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] border border-gray-100 p-8 mb-20">
        <div className="mx-auto w-[64px] h-[64px] rounded-full bg-emerald-500 flex items-center justify-center text-white text-3xl mb-4">✓</div>
        <h2 className="text-center text-[20px] font-semibold text-gray-900 mb-2">Account Creation Successful</h2>
        <p className="text-center text-gray-600">supporting subtext</p>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="w-full max-w-[520px] min-w-[320px] rounded-[12px] bg-gray-900 py-[15px] text-white text-[20px] font-medium hover:bg-gray-900/95"
      >
        Done
      </button>
    </div>
  );
}


