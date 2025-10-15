"use client";

import Image from 'next/image';
import React from 'react';
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

export default function BrandingPage({ params }: { params: { locale: Locale } }) {
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
  const t = useTranslations(params.locale, 'builder');

  // Initialize localLogoUrl from Redux state
  React.useEffect(() => {
    setLocalLogoUrl(logoUrl);
  }, [logoUrl]);

  const dispatch = useDispatch();

  function handleChoose(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setHex(value);
    setSelectedColor(value);
  }

  function applyHex() {
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
      setSelectedColor(hex);
    }
  }

  // Use conditional dispatch
  const handleContinue = () => {
    if (localLogoUrl) {
      dispatch(setLogoUrl(localLogoUrl));
    }
    if (selectedColor) {
      dispatch(setBrandColor(selectedColor));
    }
    if (tagline) {
      dispatch(setTagline(tagline));
    }
  };

  return (
    <>
      {/* Left column: branding form */}
      <div className="bg-white rounded-xl border border-gray-200 p-8" style={{ boxShadow: 'rgba(0, 0, 0, 0.34) 0px 4px 4px 0px, rgba(0, 0, 0, 0.31) 0px -4px 4px 0px' }}>
        <h2 className="text-2xl font-semibold mb-12 text-center">{t.branding.title}</h2>

        {/* Logo uploader */}
        <div className="mb-8">
          <label className="block text-[16px] font-semibold text-gray-900 mb-2">{t.branding.logo.label}</label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-600 cursor-pointer hover:bg-gray-50 flex items-center justify-center h-48"
            onClick={() => fileRef.current?.click()}
          >
            {!localLogoUrl ? (
              <div>
                <div className="text-3xl mb-2">↑</div>
                <div>{t.branding.logo.dropText}</div>
                <div className="mt-2 text-sm">{t.branding.logo.fileTypes}</div>
              </div>
            ) : (
              <Image src={localLogoUrl} alt="Logo preview" width={200} height={200} className="max-h-full max-w-full object-contain" />
            )}
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
            <p className="text-[#ff4d4f] text-[14px] mt-2">{logoError}</p>
          ) : null}
          {localLogoUrl ? (
            <div className="mt-4">
              <button
                type="button"
                className="px-3 py-2 rounded-md border text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setLocalLogoUrl(null);
                  setLogoError(null);
                  if (fileRef.current) fileRef.current.value = '';
                  dispatch(setLogoUrl(null));
                }}
              >
                {t.branding.logo.delete}
              </button>
            </div>
          ) : null}
        </div>

        {/* Brand Color */}
        <div className="mb-8">
          <label className="block text-[16px] font-semibold text-gray-900 mb-3">{t.branding.brandColor.label}</label>
          <div className="grid grid-cols-6 gap-4 my-8">
            {palette.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => { setSelectedColor(c); setHex(c); dispatch(setBrandColor(c)); }}
                className="w-11 h-11 rounded-lg shadow-sm"
                style={{ backgroundColor: c }}
                aria-label={`select ${c}`}
              />
            ))}
          </div>

          <div className="mb-5">
            <button
              type="button"
              onClick={() => colorRef.current?.click()}
              className="w-full rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50 px-4 py-3 text-center"
            >
              {t.branding.brandColor.chooseOther}
            </button>
            <input ref={colorRef} type="color" value={hex} onChange={(e) => { handleChoose(e); try { const prev = JSON.parse(localStorage.getItem('passly_builder') || '{}'); localStorage.setItem('passly_builder', JSON.stringify({ ...prev, brandColor: e.target.value })); } catch { /* Ignore localStorage errors */ } }} className="hidden" />
          </div>

          <div className="flex items-center gap-3 my-5">
            <div
              className="w-10 h-10 rounded-full border cursor-pointer"
              style={{ backgroundColor: selectedColor }}
              onClick={() => colorRef.current?.click()}
              title={t.branding.brandColor.openColorPicker}
            />
            <input
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              onBlur={applyHex}
              onClick={() => colorRef.current?.click()}
              className="rounded-lg border border-gray-300 px-3 py-2 w-64 cursor-pointer"
              title={t.branding.brandColor.openColorPicker}
            />
          </div>
        </div>

        {/* Optional Tagline */}
        <div className="mb-2">
          <label className="block text-[16px] font-semibold text-gray-900 mb-2">{t.branding.tagline.label}</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
            placeholder={t.branding.tagline.placeholder}
            value={tagline}
            onChange={(e) => { setTagline(e.target.value); dispatch(setTagline(e.target.value)); }}
          />
          <p className="text-sm text-gray-500 mt-2">{t.branding.tagline.helpText}</p>
        </div>
      </div>

      {/* Right column: preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center" style={{ boxShadow: 'rgba(0, 0, 0, 0.34) 0px 4px 4px 0px, rgba(0, 0, 0, 0.31) 0px -4px 4px 0px' }}>
        <h2 className="text-2xl font-semibold mb-12 text-center">{t.branding.livePreview}</h2>
        <PreviewCard headerColor={selectedColor} title={campaignName || 'Your Campaign'} logoUrl={logoUrl} />
      </div>
    </>
  );
}
