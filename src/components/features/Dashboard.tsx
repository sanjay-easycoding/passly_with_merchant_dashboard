"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTranslations, type Locale, useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { 
  clearBuilderData,
  setCampaignName,
  setType,
  setBrandColor,
  setLogoUrl,
  setTagline,
  setRewardDescription,
  setStampsNeeded,
  setMinPurchase,
  setBusinessName,
  setBusinessAddress,
  setContact,
  setEmail,
  setWebsite,
  setSocialMedia,
  setWelcomeMessage,
  setInstructions,
  setSpecialOffers,
  setOffersFrequency
} from '@/store/builderSlice';

interface DashboardProps {
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
    status: string;
    logoUrl?: string;
    businessAddress?: string;
    website?: string;
    socialMedia?: string;
    welcomeMessage?: string;
    instructions?: string;
    specialOffers?: string;
    offersFrequency?: string;
  };
}

export default function Dashboard({ locale }: DashboardProps) {
  const t = getTranslations(locale);
  const dashboardT = (t as any).pages?.dashboard;
  const [showModal, setShowModal] = useState(false);
  const [savedPasses, setSavedPasses] = useState<SavedPass[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; passId: string | null; passName: string }>({
    show: false,
    passId: null,
    passName: ''
  });
  const dispatch = useDispatch();
  const builderData = useSelector((state: RootState) => state.builder);

  // Load saved passes from localStorage
  useEffect(() => {
    const loadSavedPasses = () => {
      try {
        if (typeof window !== 'undefined') {
          const savedData = localStorage.getItem('passly_saved_passes');
          if (savedData) {
            const passes = JSON.parse(savedData);
            console.log(`Dashboard: Loaded ${passes.length} saved passes`);
            setSavedPasses(passes);
          } else {
            console.log('Dashboard: No saved passes found');
            setSavedPasses([]);
          }
        }
      } catch (error) {
        console.error('Dashboard: Error loading saved passes:', error);
        setSavedPasses([]);
      } finally {
        setLoading(false);
      }
    };

    loadSavedPasses();
  }, []);

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

  const handleDownloadQR = (passId: string) => {
    // In a real app, this would generate and download a QR code
    alert(`Downloading QR code for pass ${passId}`);
  };

  const handleEditCampaign = (passId: string) => {
    // Find the pass data
    const passToEdit = savedPasses.find(pass => pass.id === passId);
    
    if (passToEdit) {
      console.log('Loading pass data for editing:', passToEdit);
      
      // Clear existing builder data first
      dispatch(clearBuilderData());
      
      // Load the pass data into Redux state
      const passData = passToEdit.data;
      
      // Dispatch all the data to Redux
      if (passData.campaignName) dispatch(setCampaignName(passData.campaignName));
      if (passData.type) dispatch(setType(passData.type as any));
      if (passData.brandColor) dispatch(setBrandColor(passData.brandColor));
      if (passData.logoUrl) dispatch(setLogoUrl(passData.logoUrl));
      if (passData.tagline) dispatch(setTagline(passData.tagline));
      if (passData.rewardDescription) dispatch(setRewardDescription(passData.rewardDescription));
      if (passData.stampsNeeded) dispatch(setStampsNeeded(passData.stampsNeeded));
      if (passData.minPurchase) dispatch(setMinPurchase(passData.minPurchase));
      if (passData.businessName) dispatch(setBusinessName(passData.businessName));
      if (passData.businessAddress) dispatch(setBusinessAddress(passData.businessAddress));
      if (passData.contact) dispatch(setContact(passData.contact));
      if (passData.email) dispatch(setEmail(passData.email));
      if (passData.website) dispatch(setWebsite(passData.website));
      if (passData.socialMedia) dispatch(setSocialMedia(passData.socialMedia));
      if (passData.welcomeMessage) dispatch(setWelcomeMessage(passData.welcomeMessage));
      if (passData.instructions) dispatch(setInstructions(passData.instructions));
      if (passData.specialOffers) dispatch(setSpecialOffers(passData.specialOffers));
      if (passData.offersFrequency) dispatch(setOffersFrequency(passData.offersFrequency as any));
      
      console.log('Pass data loaded into Redux state. Navigating to builder...');
      
      // Navigate to the builder
      window.location.href = `/${locale}/create-new-pass/pass-type`;
    } else {
      console.error('Pass not found:', passId);
      alert('Pass not found!');
    }
  };

  const handleToggleStatus = (passId: string) => {
    const updatedPasses = savedPasses.map(pass => {
      if (pass.id === passId) {
        const newStatus: 'draft' | 'published' = pass.status === 'published' ? 'draft' : 'published';
        const updatedPass: SavedPass = {
          ...pass,
          status: newStatus,
          ...(newStatus === 'published' ? { publishedAt: new Date().toISOString() } : { savedAt: new Date().toISOString() })
        };
        
        console.log(`Toggled pass ${passId} from ${pass.status} to ${newStatus}`);
        return updatedPass;
      }
      return pass;
    });
    
    setSavedPasses(updatedPasses);
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('passly_saved_passes', JSON.stringify(updatedPasses));
    }
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

  const handleDeleteClick = (passId: string, passName: string) => {
    setDeleteModal({
      show: true,
      passId,
      passName
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.passId) {
      const updatedPasses = savedPasses.filter(pass => pass.id !== deleteModal.passId);
      setSavedPasses(updatedPasses);
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('passly_saved_passes', JSON.stringify(updatedPasses));
      }
    }
    setDeleteModal({ show: false, passId: null, passName: '' });
  };

  const handleCancelDelete = () => {
    setDeleteModal({ show: false, passId: null, passName: '' });
  };

  // Filter passes based on selected status
  const filteredPasses = savedPasses.filter(pass => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'published') return pass.status === 'published';
    if (filterStatus === 'draft') return pass.status === 'draft';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8 pt-16">
        {/* Header with title and button */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-gray-900">
              {dashboardT?.title || 'Dashboard'}
            </h1>
            <p className="text-xl text-gray-600">
              {dashboardT?.description || 'Welcome to your Passly dashboard'}
            </p>
          </div>
          
          {/* Create New Pass Button */}
          <div className="flex-shrink-0">
            <button
              onClick={handleCreateNewPassClick}
              className="inline-flex items-center px-8 py-4 bg-[#008929] text-white font-semibold rounded-2xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Pass
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">{dashboardT?.stats?.totalPasses || 'Total Passes'}</p>
                <p className="text-4xl font-semibold text-gray-900">{savedPasses.length}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">{dashboardT?.stats?.activeUsers || 'Published Passes'}</p>
                <p className="text-4xl font-semibold text-gray-900">{savedPasses.filter(p => p.status === 'published').length}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">{dashboardT?.stats?.revenue || 'Draft Passes'}</p>
                <p className="text-4xl font-semibold text-gray-900">{savedPasses.filter(p => p.status === 'draft').length}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <h2 className="text-3xl font-semibold text-gray-900">
                {locale === 'de' ? 'Kampagnen' : 'Campaigns'}
              </h2>
              
              {/* Filter Dropdown */}
              <div className="flex items-center gap-3">
                <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
                  {locale === 'de' ? 'Filter:' : 'Filter:'}
                </label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
                  className="px-4 py-2.5 bg-white/50 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                >
                  <option value="all">
                    {locale === 'de' ? 'Alle' : 'All'}
                  </option>
                  <option value="published">
                    {locale === 'de' ? 'Veröffentlicht' : 'Published'}
                  </option>
                  <option value="draft">
                    {locale === 'de' ? 'Entwurf' : 'Draft'}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-900">
                    {locale === 'de' ? 'Name des Passes' : 'Pass Name'}
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-900">
                    {locale === 'de' ? 'Veröffentlichungsdatum' : 'Published Date'}
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-900">
                    {locale === 'de' ? 'QR Code' : 'QR Code'}
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-900">
                    {locale === 'de' ? 'Veröffentlicht' : 'Published'}
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-900">
                    {locale === 'de' ? 'Aktionen' : 'Actions'}
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-900">
                    {locale === 'de' ? 'Löschen' : 'Delete'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50">
                {filteredPasses.map((pass) => (
                  <tr key={pass.id} className="hover:bg-gray-50/30 transition-all duration-200 group">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                            {pass.data.campaignName || 'Untitled Campaign'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pass.data.type || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-900">
                      {formatDate(pass.savedAt || pass.publishedAt || new Date().toISOString())}
                    </td>
                    <td className="px-8 py-6">
                      {pass.status === 'published' && (
                        <button
                          onClick={() => handleDownloadQR(pass.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {locale === 'de' ? 'QR Code herunterladen' : 'Download QR Code'}
                        </button>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleStatus(pass.id)}
                          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                            pass.status === 'published' ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
                              pass.status === 'published' ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className="text-sm text-gray-600">
                          {pass.status === 'published' 
                            ? (locale === 'de' ? 'Veröffentlicht' : 'Published')
                            : (locale === 'de' ? 'Entwurf' : 'Draft')
                          }
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => handleEditCampaign(pass.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {locale === 'de' ? 'Bearbeiten' : 'Edit'}
                      </button>
                    </td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => handleDeleteClick(pass.id, pass.data.campaignName || 'Untitled Campaign')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        {locale === 'de' ? 'Löschen' : 'Delete'}
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          {/* Empty state when no campaigns */}
          {filteredPasses.length === 0 && (
            <div className="text-center py-16 px-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-3xl flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 00-2 2v2h4V7a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg text-gray-500 mb-2">
                {filterStatus === 'all' 
                  ? (locale === 'de' ? 'Noch keine Kampagnen vorhanden' : 'No campaigns yet')
                  : filterStatus === 'published'
                  ? (locale === 'de' ? 'Keine veröffentlichten Kampagnen' : 'No published campaigns')
                  : (locale === 'de' ? 'Keine Entwürfe vorhanden' : 'No draft campaigns')
                }
              </h3>
              <p className="text-sm text-gray-400">
                {filterStatus === 'all'
                  ? (locale === 'de' ? 'Erstellen Sie Ihren ersten Pass, um loszulegen' : 'Create your first pass to get started')
                  : (locale === 'de' ? 'Ändern Sie den Filter, um andere Kampagnen anzuzeigen' : 'Change the filter to view other campaigns')
                }
              </p>
            </div>
          )}
        </div>
      </div>

        {/* Modal for Draft Selection */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100000] p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-sm sm:max-w-md mx-4 w-full shadow-2xl border border-white/20">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center text-gray-900">
                {popupTranslations.title}
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
                {popupTranslations.description}
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleContinueWithExisting}
                  className="w-full py-4 px-6 bg-[#008929] text-white rounded-2xl font-medium hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  {popupTranslations.continueExisting}
                </button>
                <button
                  onClick={handleStartFresh}
                  className="w-full py-4 px-6 bg-gray-200 text-gray-800 rounded-2xl font-medium hover:bg-gray-300 transition-all duration-200 text-sm sm:text-base"
                >
                  {popupTranslations.startFresh}
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-full py-4 px-6 border border-gray-300 text-gray-600 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base"
                >
                  {popupTranslations.cancel}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.show && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100000] p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-sm sm:max-w-md mx-4 w-full shadow-2xl border border-white/20">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center text-gray-900">
                {locale === 'de' ? 'Kampagne löschen?' : 'Delete Campaign?'}
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
                {locale === 'de' 
                  ? `Sind Sie sicher, dass Sie "${deleteModal.passName}" löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`
                  : `Are you sure you want to delete "${deleteModal.passName}"? This action cannot be undone.`
                }
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleConfirmDelete}
                  className="w-full py-4 px-6 bg-red-600 text-white rounded-2xl font-medium hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  {locale === 'de' ? 'Ja, löschen' : 'Yes, delete'}
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="w-full py-4 px-6 border border-gray-300 text-gray-600 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base"
                >
                  {locale === 'de' ? 'Abbrechen' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
