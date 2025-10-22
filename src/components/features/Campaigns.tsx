"use client";

import React, { useState, useEffect } from 'react';

import {type Locale } from '@/lib/translations';

interface CampaignsProps {
  locale: Locale;
}

interface SavedPass {
  id: string;
  status: 'draft' | 'published';
  savedAt?: string;
  publishedAt?: string;
  data: {
    campaignName: string;
    businessName: string;
    type: string;
    rewardDescription: string;
    stampsNeeded: number;
    minPurchase: number;
    brandColor: string;
    tagline: string;
    contact: string;
    email: string;
    // ... other fields
  };
}

export default function Campaigns({ locale }: CampaignsProps) {
  const [savedPasses, setSavedPasses] = useState<SavedPass[]>([]);
  const [loading, setLoading] = useState(true);

  // Load saved passes from localStorage
  useEffect(() => {
    const loadSavedPasses = () => {
      try {
        // Only access localStorage on the client side
        if (typeof window !== 'undefined') {
          const savedData = localStorage.getItem('passly_saved_passes');
          if (savedData) {
            const passes = JSON.parse(savedData);
            console.log(`Loaded ${passes.length} saved passes from localStorage`);
            setSavedPasses(passes);
          } else {
            console.log('No saved passes found in localStorage');
            setSavedPasses([]);
          }
        }
      } catch (error) {
        console.error('Error loading saved passes:', error);
        setSavedPasses([]);
      } finally {
        setLoading(false);
      }
    };

    loadSavedPasses();
  }, []);

  // Refresh function to reload data
  const refreshData = () => {
    setLoading(true);
    try {
      if (typeof window !== 'undefined') {
        const savedData = localStorage.getItem('passly_saved_passes');
        if (savedData) {
          const passes = JSON.parse(savedData);
          console.log(`Refreshed: Loaded ${passes.length} saved passes`);
          setSavedPasses(passes);
        } else {
          console.log('Refreshing - No saved passes found');
          setSavedPasses([]);
        }
      }
    } catch (error) {
      console.error('Error refreshing saved passes:', error);
      setSavedPasses([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownloadQR = (passId: string) => {
    // In a real app, this would generate and download a QR code
    alert(`Downloading QR code for pass ${passId}`);
  };

  const handleEditCampaign = (passId: string) => {
    // In a real app, this would navigate to the edit page
    console.log('Edit campaign:', passId);
    window.location.href = `/${locale}/create-new-pass/pass-type`;
  };

  const handleDeletePass = (passId: string) => {
    if (confirm(locale === 'de' ? 'Möchten Sie diesen Pass wirklich löschen?' : 'Are you sure you want to delete this pass?')) {
      const updatedPasses = savedPasses.filter(pass => pass.id !== passId);
      setSavedPasses(updatedPasses);
      
      // Only update localStorage on the client side
      if (typeof window !== 'undefined') {
        localStorage.setItem('passly_saved_passes', JSON.stringify(updatedPasses));
      }
      
      console.log('Pass deleted:', passId);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">
            {locale === 'de' ? 'Lade Kampagnen...' : 'Loading campaigns...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-20 mt-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {locale === 'de' ? 'Kampagnen' : 'Campaigns'}
        </h1>
        <p className="text-lg text-gray-600">
          {locale === 'de' 
            ? 'Verwalten Sie Ihre veröffentlichten Pässe und Kampagnen' 
            : 'Manage your published passes and campaigns'
          }
        </p>
        <div className="mt-4 flex gap-4 text-sm text-gray-500 items-center">
          <span>
            {locale === 'de' ? 'Gesamt:' : 'Total:'} {savedPasses.length}
          </span>
          <span>
            {locale === 'de' ? 'Entwürfe:' : 'Drafts:'} {savedPasses.filter(p => p.status === 'draft').length}
          </span>
          <span>
            {locale === 'de' ? 'Veröffentlicht:' : 'Published:'} {savedPasses.filter(p => p.status === 'published').length}
          </span>
          
          <button
            onClick={refreshData}
            className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          
        </div>
      </div>


      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {locale === 'de' ? 'Kampagnenname' : 'Campaign Name'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {locale === 'de' ? 'Geschäft' : 'Business'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {locale === 'de' ? 'Status' : 'Status'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {locale === 'de' ? 'Datum' : 'Date'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  {locale === 'de' ? 'Aktionen' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {savedPasses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 00-2 2v2h4V7a2 2 0 00-2-2z" />
                      </svg>
                      <p className="text-lg text-gray-500">
                        {locale === 'de' ? 'Noch keine Kampagnen vorhanden' : 'No campaigns yet'}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        {locale === 'de' ? 'Erstellen Sie Ihren ersten Pass, um loszulegen' : 'Create your first pass to get started'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                savedPasses.map((pass) => (
                  <tr key={pass.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {pass.data.campaignName || 'Untitled Campaign'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {pass.data.type || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {pass.data.businessName || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pass.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pass.status === 'published' 
                        ? (locale === 'de' ? 'Veröffentlicht' : 'Published')
                        : (locale === 'de' ? 'Entwurf' : 'Draft')
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDate(pass.savedAt || pass.publishedAt || new Date().toISOString())}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {pass.status === 'published' && (
                        <button
                          onClick={() => handleDownloadQR(pass.id)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          QR
                        </button>
                      )}
                      <button
                        onClick={() => handleEditCampaign(pass.id)}
                        className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePass(pass.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

