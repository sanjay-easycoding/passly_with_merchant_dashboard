"use client";
import React from 'react';
import type { Locale } from '@/lib/translations';
import StepNav from '@/components/createPass/StepNav';
import PreviewCard from '@/components/createPass/PreviewCard';
import { useDispatch } from 'react-redux';
import { setCampaignName as setCampaignNameAction, setType } from '@/store/builderSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type TileProps = {
  title: string;
  subtitle: string;
  emoji: string;
  active?: boolean;
  onClick?: () => void;
};

function ComingSoonChip() {
  return (
    <span className="inline-block px-4 py-1 rounded-full bg-[#000000] text-white text-[14px] font-semibold shadow-[0_4px_10px_rgba(0,0,0,0.25)]">Coming Soon</span>
  );
}

function Tile({ title, subtitle, emoji, active, onClick }: TileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[16px] p-6 border transition ${
        active
          ? 'bg-[#DDEAB6] border-[#C9DB8F] shadow-[0_12px_24px_-8px_rgba(0,0,0,0.25)]'
          : 'bg-[#b2b2b2] border-gray-200 shadow-[0_8px_16px_rgba(0,0,0,0.12)] cursor-not-allowed'
      } hover:shadow-[0_14px_28px_-8px_rgba(0,0,0,0.28)] text-center flex flex-col items-center justify-center gap-3 min-h-[180px]`}
    >
      <div className="text-[42px] leading-none mb-1">{emoji}</div>
      <div className="font-semibold text-[20px] text-gray-900">{title}</div>
      <div className="text-[14px] text-gray-700 leading-relaxed max-w-[260px]">{subtitle}</div>
      {/* ComingSoon removed for enabled options */}
    </button>
  );
}

export default function PassTypePage({ params }: { params: { locale: Locale } }) {
  const [selected, setSelected] = React.useState<'loyalty' | 'discount' | 'tickets' | 'gift' | 'membership'>('loyalty');
  const dispatch = useDispatch();

  // Use Redux state for campaign name
  const campaignName = useSelector((state: RootState) => state.builder.campaignName);

  const handleContinue = () => {
    dispatch(setCampaignNameAction(campaignName));
    dispatch(setType(selected));
  };

  return (
    <>
      {/* Left column: selection + campaign name */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-[28px] font-semibold mb-6">What will you create</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Tile
            title="Loyalty Card"
            subtitle="Rewards repeat customers with stamps or points"
            emoji="⭐"
            active={selected === 'loyalty'}
            onClick={() => { setSelected('loyalty'); dispatch(setType('loyalty')); }}
          />

          <div className="relative opacity-60 cursor-not-allowed">
            <Tile
              title=""
              subtitle="Offer Discount and Promotions"
              emoji="%"
              active={false}
              onClick={() => {}}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <ComingSoonChip />
            </div>
          </div>

          <div className="relative opacity-60 cursor-not-allowed">
            <Tile
              title=""
              subtitle="Digital tickets for Events and Shows"
              emoji="🎟️"
              active={false}
              onClick={() => {}}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <ComingSoonChip />
            </div>
          </div>

          <div className="relative opacity-60 cursor-not-allowed">
            <Tile
              title=""
              subtitle="Digital Gift Cards and Vouchers"
              emoji="🎁"
              active={false}
              onClick={() => {}}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <ComingSoonChip />
            </div>
          </div>

          <div className="relative opacity-60 cursor-not-allowed">
            <Tile
              title=""
              subtitle="Membership Cards and exclusive passes"
              emoji="🪪"
              active={false}
              onClick={() => {}}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <ComingSoonChip />
            </div>
          </div>
        </div>

        {/* Campaign Name section */}
        <div className="mt-10">
          <label className="block text-[16px] font-semibold text-gray-900 mb-2">Campaign Name</label>
          <textarea
            className="w-full rounded-xl border border-gray-300 px-4 py-3 min-h-[110px] resize-y"
            placeholder="e.g., Summer Sale 2025, Coffee Loyalty Program"
            value={campaignName}
            onChange={(e) => {
              const v = e.target.value;
              dispatch(setCampaignNameAction(v));
            }}
          />
          <p className="text-sm text-gray-500 mt-2">This will be the main title of your pass</p>
        </div>
      </div>

      {/* Right column: preview */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6">Live Preview</h2>
        <PreviewCard />
      </div>

      {/* Bottom navigation under cards */}
      <div className="lg:col-span-2">
        <StepNav onContinue={handleContinue} />
      </div>
    </>
  );
}


