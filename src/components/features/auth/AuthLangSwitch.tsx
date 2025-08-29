"use client";

import { usePathname } from 'next/navigation';
import React from 'react';

export default function AuthLangSwitch() {
  const pathname = usePathname() || '/en';
  const current = pathname.startsWith('/de') ? 'de' : 'en';

  function buildPath(target: 'en' | 'de') {
    // Replace the first segment (/en or /de) with the target
    const rest = pathname.replace(/^\/(en|de)/, '');
    return `/${target}${rest || ''}`;
  }

  return (
    <div className="flex items-center gap-2">
      {(['de', 'en'] as const).map((code) => (
        <a
          key={code}
          href={buildPath(code)}
          className={`px-3 py-1 rounded-md text-sm border transition-colors ${
            current === code
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {code.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
