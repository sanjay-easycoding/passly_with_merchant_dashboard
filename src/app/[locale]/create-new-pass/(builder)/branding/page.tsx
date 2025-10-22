"use client";

import Image from 'next/image';
import React, { use } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PreviewCard from '@/components/features/createPass/PreviewCard';
import { useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { setBrandColor, setLogoUrl, setTagline } from '@/store/builderSlice';

import type { Locale } from '@/lib/translations';

const palette = [
  '#F5A9B8', '#000000', '#F44336', '#FFEB3B', '#10E7B3', '#98CAE3',
  '#7F1DFF', '#FF00E5', '#F59E0B', '#10B981', '#0F766E', '#5B21B6'
];

export default function BrandingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  // Unwrap params using use()
  const resolvedParams = use(params);
  
  const [selectedColor, setSelectedColor] = React.useState<string>('#7123a9');
  const [hex, setHex] = React.useState<string>('#7123a9');
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const colorRef = React.useRef<HTMLInputElement | null>(null);
  // Rename local state for logo URL
  const [localLogoUrl, setLocalLogoUrl] = React.useState<string | null>(null);
  const [logoError, setLogoError] = React.useState<string | null>(null);
  const campaignName = useSelector((state: RootState) => state.builder.campaignName);
  const tagline = useSelector((state: RootState) => state.builder.tagline);

  // Retrieve logo URL from Redux
  const logoUrl = useSelector((state: RootState) => state.builder.logoUrl);

  // Get translations
  const t = useTranslations(resolvedParams.locale, 'builder');

  // Initialize localLogoUrl from Redux state
  React.useEffect(() => {
    setLocalLogoUrl(logoUrl);
  }, [logoUrl]);

  const dispatch = useDispatch();

  function handleChoose(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setHex(value);
    setSelectedColor(value);
    dispatch(setBrandColor(value));
  }

  function applyHex() {
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
      setSelectedColor(hex);
      dispatch(setBrandColor(hex));
    }
  }

  // Update Redux store immediately when values change
  React.useEffect(() => {
    if (selectedColor) {
      dispatch(setBrandColor(selectedColor));
    }
  }, [selectedColor, dispatch]);

  React.useEffect(() => {
    if (localLogoUrl) {
      dispatch(setLogoUrl(localLogoUrl));
    }
  }, [localLogoUrl, dispatch]);

  React.useEffect(() => {
    if (tagline) {
      dispatch(setTagline(tagline));
    }
  }, [tagline, dispatch]);

  return (
    <div className="p-8 lg:p-12">
      {/* Apple-style Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">{t.branding.title}</h2>
        <p className="text-base text-gray-600 font-medium">Customize the look and feel of your pass to match your brand</p>
      </div>

      {/* Logo Section */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-900 mb-4">{t.branding.logo.label}</label>
        
        <div className="flex items-center gap-4">
          {/* Logo Preview Circle */}
          <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 shadow-sm">
            {localLogoUrl ? (
              <Image src={localLogoUrl} alt="Logo preview" width={48} height={48} className="rounded-full object-cover" />
            ) : (
              <div className="text-xl text-gray-400">📁</div>
            )}
          </div>
          
          {/* Upload Button */}
          <div className="flex-1">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium shadow-sm"
            >
              Upload Logo
            </button>
            <p className="text-xs text-gray-500 mt-2 font-medium">PNG, JPG, SVG up to 5MB</p>
          </div>
        </div>
        
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (file.size > 2 * 1024 * 1024) {
              setLogoError(t.branding.logo.fileTooLarge);
              setLocalLogoUrl(null);
              return;
            }
            setLogoError(null);
            const url = URL.createObjectURL(file);
            setLocalLogoUrl(url);
            if (typeof url === "string" && url.trim() !== "") {
              dispatch(setLogoUrl(url));
            }
          }}
        />
        
        {logoError ? (
          <p className="text-red-500 text-xs mt-2 font-medium">{logoError}</p>
        ) : null}
      </div>

      {/* Brand Color Section */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-900 mb-4">{t.branding.brandColor.label}</label>
        
        <div className="flex items-center gap-4">
          {/* Color Swatches */}
          <div className="flex gap-2">
            {palette.slice(0, 5).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => { setSelectedColor(c); setHex(c); dispatch(setBrandColor(c)); }}
                className={`w-8 h-8 rounded-full border-2 hover:scale-105 transition-all duration-200 shadow-sm ${
                  selectedColor === c ? 'border-gray-400 scale-105' : 'border-gray-200'
                }`}
                style={{ backgroundColor: c }}
                aria-label={`select ${c}`}
              />
            ))}
          </div>
          
          {/* Hex Input */}
          <input
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            onBlur={applyHex}
            onClick={() => colorRef.current?.click()}
            className="rounded-xl border border-gray-200 px-3 py-2 w-28 cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 shadow-sm text-sm"
            title={t.branding.brandColor.openColorPicker}
          />
        </div>
        
        <input ref={colorRef} type="color" value={hex} onChange={(e) => { handleChoose(e); dispatch(setBrandColor(e.target.value)); }} className="hidden" />
      </div>

      {/* Tagline Section */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-900 mb-4">{t.branding.tagline.label} (optional)</label>
        
        <input
          className="w-full rounded-xl border border-gray-200 px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 shadow-sm"
          placeholder="e.g. Your Favorite Coffee Stop"
          value={tagline}
          onChange={(e) => { setTagline(e.target.value); dispatch(setTagline(e.target.value)); }}
        />
      </div>
    </div>
  );
}
