"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { use } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { clearBuilderData } from '@/store/builderSlice';
import AppleModal from '@/components/ui/AppleModal';

const steps = [
  { id: 'pass-type', label: 'Pass Type', icon: '📋' },
  { id: 'branding', label: 'Branding', icon: '🎨' },
  { id: 'details', label: 'Details', icon: '📝' },
  { id: 'business', label: 'Business', icon: '🏢' },
  { id: 'experience', label: 'Experience', icon: '✨' },
  { id: 'distribution', label: 'Distribution', icon: '📤' },
  { id: 'publish', label: 'Publish', icon: '🚀' },
];

export default function StepNav({ onContinue }: { onContinue?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.builder);
  const [showResetModal, setShowResetModal] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [successType, setSuccessType] = React.useState<'draft' | 'published'>('draft');
  
  const idx = steps.findIndex((s) => pathname?.includes(`/${s.id}`));
  const currentIndex = idx >= 0 ? idx : 0;
  const localeMatch = pathname?.match(/^\/(en|de)\//);
  const locale = (localeMatch?.[1] as 'en' | 'de') || 'en';

  // Save as draft function
  const handleSaveAsDraft = () => {
    console.log('=== SAVE AS DRAFT ===');
    console.log('Saving current data as draft...');
    
    // Create draft data object with timestamp and ID
    const draftData = {
      id: `draft_${Date.now()}`,
      status: 'draft',
      savedAt: new Date().toISOString(),
      data: {
        ...data,
        status: 'draft'
      }
    };
    
    // Get existing saved data or initialize empty array
    let existingData = [];
    if (typeof window !== 'undefined') {
      existingData = JSON.parse(localStorage.getItem('passly_saved_passes') || '[]');
    }
    
    // Add new draft to the array
    existingData.push(draftData);
    
    // Save back to localStorage (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.setItem('passly_saved_passes', JSON.stringify(existingData));
    }
    
    console.log('📋 Draft saved with ID:', draftData.id);
    console.log('📊 Draft data:', draftData);
    console.log('📝 Total saved passes:', existingData.length);
    
    // Show success message
    setSuccessMessage(`Pass saved as draft successfully! You can continue editing later from the campaigns page.`);
    setSuccessType('draft');
    setShowSuccessModal(true);
  };

  // Reset function
  const handleReset = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    // Reset all Redux state to default values
    dispatch(clearBuilderData());
    console.log('Builder data reset to default values');
    
    // Navigate to the first step
    router.push(`/${locale}/create-new-pass/pass-type`);
  };

  // Publish function
  const handlePublish = () => {
    console.log('=== PUBLISH PASS ===');
    console.log('Publishing current data...');
    
    // Create published data object with timestamp and ID
    const publishedData = {
      id: `published_${Date.now()}`,
      status: 'published',
      publishedAt: new Date().toISOString(),
      data: {
        ...data,
        status: 'published'
      }
    };
    
    // Get existing saved data or initialize empty array
    let existingData = [];
    if (typeof window !== 'undefined') {
      existingData = JSON.parse(localStorage.getItem('passly_saved_passes') || '[]');
    }
    
    // Add new published pass to the array
    existingData.push(publishedData);
    
    // Save back to localStorage (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.setItem('passly_saved_passes', JSON.stringify(existingData));
    }
    
    console.log('🚀 Pass published with ID:', publishedData.id);
    console.log('📊 Published data:', publishedData);
    console.log('📝 Total saved passes:', existingData.length);
    
    // Show success message
    setSuccessMessage(`Pass published successfully! Your pass is now live and ready to use. You can manage it from the campaigns page.`);
    setSuccessType('published');
    setShowSuccessModal(true);
  };

  // Handle success modal confirmation
  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    // Navigate to campaigns page
    router.push(`/${locale}/dashboard`);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        {/* Left - Previous Button */}
        <div>
          {currentIndex > 0 && (
            <Link
              href={`/${locale}/create-new-pass/${steps[currentIndex - 1].id}`}
              className="group inline-flex items-center gap-2 px-6 py-2 rounded-full font-medium text-gray-900 bg-white border border-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </Link>
          )}
        </div>

        {/* Center - Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAsDraft}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save as Draft
          </button>
          
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-red-700 bg-red-100 border border-red-300 hover:bg-red-200 transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
          
          {/* Only show Publish button if not on the last step */}
          {currentIndex !== steps.length - 1 && (
            <button
              onClick={handlePublish}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-white bg-green-600 border border-green-700 hover:bg-green-700 transition-all duration-200 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Publish
            </button>
          )}
        </div>

        {/* Right - Continue Button */}
        <div>
          <Link
            href={`/${locale}/create-new-pass/${steps[Math.min(currentIndex + 1, steps.length - 1)].id}`}
            className="group inline-flex items-center gap-2 px-6 py-2 rounded-full font-medium text-white bg-black hover:bg-gray-800 transition-all duration-200 shadow-sm"
            onClick={onContinue}
          >
            <span>
              {currentIndex === steps.length - 1 ? 'Publish Pass' : 'Continue'}
            </span>
            
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Apple-style Reset Confirmation Modal */}
      <AppleModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={confirmReset}
        title="Reset All Data"
        message="Are you sure you want to reset all data? This action cannot be undone and you will lose all your progress."
        confirmText="Reset"
        cancelText="Cancel"
        type="warning"
      />

      {/* Apple-style Success Modal */}
      <AppleModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onConfirm={handleSuccessConfirm}
        title={successType === 'published' ? 'Pass Published!' : 'Draft Saved!'}
        message={successMessage}
        confirmText="View Campaigns"
        cancelText="Close"
        type={successType === 'published' ? 'success' : 'info'}
      />
    </>
  );
}
