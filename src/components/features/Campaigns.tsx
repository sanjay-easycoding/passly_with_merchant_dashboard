"use client";

import React from 'react';

import { getTranslations, type Locale } from '@/lib/translations';

interface CampaignsProps {
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

export default function Campaigns({ locale }: CampaignsProps) {
  const t = getTranslations(locale);

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
    console.log(`Downloading QR code for campaign ${campaignId}`);
    alert(`Downloading QR code for campaign ${campaignId}`);
  };

  const handleEditCampaign = (campaignId: number) => {
    // In a real app, this would navigate to the edit page
    console.log(`Editing campaign ${campaignId}`);
    window.location.href = `/${locale}/create-new-pass/pass-type`;
  };

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
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                      onClick={() => handleEditCampaign(campaign.id)}
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
    </div>
  );
}
