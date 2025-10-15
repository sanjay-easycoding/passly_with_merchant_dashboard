"use client";
import React from 'react';
import { useDispatch , useSelector } from 'react-redux';


import PreviewCard from '@/components/features/createPass/PreviewCard';
import { useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { setCampaignName as setCampaignNameAction, setType } from '@/store/builderSlice';

import type { Locale } from '@/lib/translations';

type TileProps = {
  title: string;
  subtitle: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
};

export default function PassTypePage({ params }: { params: { locale: Locale } }) {
  const [selected, setSelected] = React.useState<'store' | 'coupon' | 'event' | 'boarding' | 'generic'>('store');
  const dispatch = useDispatch();
  
  // Get translations
  const t = useTranslations(params.locale, 'builder');

  // Use Redux state for campaign name
  const campaignName = useSelector((state: RootState) => state.builder.campaignName);

  const _handleContinue = () => {
    dispatch(setCampaignNameAction(campaignName));
    dispatch(setType(selected));
  };

  const passTypes = [
    { key: 'store', icon: '🏪' },
    { key: 'coupon', icon: '🎫' },
    { key: 'event', icon: '🎟️' },
    { key: 'boarding', icon: '✈️' },
    { key: 'generic', icon: '💳' }
  ];

  function Tile({ title, subtitle, icon, active, onClick }: TileProps) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full rounded-lg p-4 border transition-all duration-200 flex items-center gap-4 ${
          active
            ? 'bg-blue-50 border-blue-200 shadow-md'
            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }`}
      >
        <div className="text-2xl">{icon}</div>
        <div className="flex-1 text-left">
          <div className="font-semibold text-lg text-gray-900 mb-1">{title}</div>
          <div className="text-sm text-gray-600">{subtitle}</div>
        </div>
      </button>
    );
  }

  return (
    <>
      {/* Left column: selection + campaign name */}
      <div className="p-8 lg:p-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">{(t.passType as { title: string }).title}</h2>

        <div className="space-y-3 mb-10">
          {passTypes.map((passType) => (
            <Tile
              key={passType.key}
              title={(t.passType as { tiles: Record<string, { title: string; subtitle: string }> }).tiles[passType.key].title}
              subtitle={(t.passType as { tiles: Record<string, { title: string; subtitle: string }> }).tiles[passType.key].subtitle}
              icon={passType.icon}
              active={selected === passType.key}
              onClick={() => { setSelected(passType.key as PassType); dispatch(setType(passType.key as PassType)); }}
            />
          ))}
        </div>

        {/* Campaign Name section */}
        <div className="mt-10">
          <label className="block text-[16px] font-semibold text-gray-900 mb-2">{(t.passType as { campaignName: { label: string } }).campaignName.label}</label>
          <textarea
            className="w-full rounded-xl border border-gray-300 px-4 py-3 min-h-[110px] resize-y"
            placeholder={(t.passType as { campaignName: { placeholder: string } }).campaignName.placeholder}
            value={campaignName}
            onChange={(e) => {
              const v = e.target.value;
              dispatch(setCampaignNameAction(v));
            }}
          />
          <p className="text-sm text-gray-500 mt-2">{(t.passType as { campaignName: { helpText: string } }).campaignName.helpText}</p>
        </div>
      </div>

      {/* Right column: preview */}
      <div className="p-8 lg:p-10 flex flex-col items-center justify-center bg-gray-50">
        <PreviewCard />
      </div>
    </>
  );
}
