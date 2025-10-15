"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTranslations, type Locale, useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { clearBuilderData } from '@/store/builderSlice';

interface DashboardProps {
  locale: Locale;
}

// Mock data for campaigns - in a real app this would come from an API
const mockCampaigns = [
  {
    id: 1,
    name: 'Summer Loyalty Card',
    publishDate: '2024-01-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Holiday Discount Pass',
    publishDate: '2024-01-10',
    status: 'Active'
  },
  {
    id: 3,
    name: 'VIP Membership Card',
    publishDate: '2024-01-08',
    status: 'Draft'
  }
];

export default function Dashboard({ locale }: DashboardProps) {
  const t = getTranslations(locale);
  const dashboardT = t.pages?.dashboard;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const builderData = useSelector((state: RootState) => state.builder);

  // Get translations for the popup
  const translations = useTranslations(locale, 'pages');
  const getStartedTranslations = translations?.createNewPassGetStarted as {
    popup?: {
      title: string;
      description: string;
      continueExisting: string;
      startFresh: string;
      cancel: string;
    };
  };
  const popupTranslations = getStartedTranslations?.popup || {
    title: 'Continue with existing data?',
    description: 'We found some previously saved data. Would you like to continue where you left off or start fresh?',
    continueExisting: 'Continue with existing data',
    startFresh: 'Start fresh',
    cancel: 'Cancel'
  };

  // Check if there's existing builder data
  const hasExistingData = builderData.campaignName || 
                         builderData.brandColor || 
                         builderData.logoUrl || 
                         builderData.tagline || 
                         builderData.stampsNeeded || 
                         builderData.rewardDescription || 
                         builderData.businessName || 
                         builderData.contact;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownloadQR = (campaignId: number) => {
    // In a real app, this would generate and download a QR code
    alert(`Downloading QR code for campaign ${campaignId}`);
  };

  const handleEditCampaign = () => {
    // In a real app, this would navigate to the edit page
    window.location.href = `/${locale}/create-new-pass/pass-type`;
  };

  const handleCreateNewPassClick = () => {
    // Check for existing data
    if (hasExistingData) {
      setShowModal(true);
    } else {
      // No existing data, go directly to pass-type (step 1)
      window.location.href = `/${locale}/create-new-pass/pass-type`;
    }
  };

  const handleContinueWithExisting = () => {
    setShowModal(false);
    window.location.href = `/${locale}/create-new-pass/pass-type`;
  };

  const handleStartFresh = () => {
    setShowModal(false);
    dispatch(clearBuilderData());
    window.location.href = `/${locale}/create-new-pass/pass-type`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header with title and button */}
      <div className="mb-20 mt-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {dashboardT?.title || 'Dashboard'}
          </h1>
          <p className="text-lg text-gray-600">
            {dashboardT?.description || 'Welcome to your Passly dashboard'}
          </p>
        </div>
        
        {/* Create New Pass Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleCreateNewPassClick}
            className="inline-flex items-center px-6 py-3 bg-[#008929] text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Pass
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{dashboardT?.stats?.totalPasses || 'Total Passes'}</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{dashboardT?.stats?.activeUsers || 'Active Users'}</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{dashboardT?.stats?.revenue || 'Revenue'}</p>
              <p className="text-2xl font-semibold text-gray-900">$0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            {locale === 'de' ? 'Kampagnen' : 'Campaigns'}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {locale === 'de' ? 'Name des Passes' : 'Pass Name'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {locale === 'de' ? 'Veröffentlichungsdatum' : 'Published Date'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {locale === 'de' ? 'QR Code' : 'QR Code'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {locale === 'de' ? 'Aktionen' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {campaign.status === 'Active' 
                            ? (locale === 'de' ? 'Aktiv' : 'Active')
                            : (locale === 'de' ? 'Entwurf' : 'Draft')
                          }
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDate(campaign.publishDate)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDownloadQR(campaign.id)}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {locale === 'de' ? 'QR Code herunterladen' : 'Download QR Code'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={handleEditCampaign}
                      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      {locale === 'de' ? 'Kampagne bearbeiten' : 'Edit Campaign'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state when no campaigns */}
        {mockCampaigns.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 00-2 2v2h4V7a2 2 0 00-2-2z" />
            </svg>
            <p className="text-lg text-gray-500">
              {locale === 'de' 
                ? 'Noch keine Kampagnen vorhanden'
                : 'No campaigns yet'
              }
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {locale === 'de'
                ? 'Erstellen Sie Ihren ersten Pass, um loszulegen'
                : 'Create your first pass to get started'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal for Draft Selection */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100000] p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-sm sm:max-w-md mx-4 w-full">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">
              {popupTranslations.title}
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
              {popupTranslations.description}
            </p>
            
            <div className="flex flex-col gap-2 sm:gap-3">
              <button
                onClick={handleContinueWithExisting}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-[#008929] text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                {popupTranslations.continueExisting}
              </button>
              <button
                onClick={handleStartFresh}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
              >
                {popupTranslations.startFresh}
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                {popupTranslations.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
