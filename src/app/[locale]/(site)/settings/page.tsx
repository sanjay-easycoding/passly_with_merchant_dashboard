"use client";

import React from 'react';

import { useTranslations, type Locale } from '@/lib/translations';

export default function SettingsPage({ params }: { params: { locale: Locale } }) {
  const t = useTranslations(params.locale, 'pages');

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t?.settings?.configure || 'Settings'}
        </h1>
        <p className="text-lg text-gray-600">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {t?.navigation?.title || 'Settings'}
            </h2>
            <nav className="space-y-2">
              <a href="#profile" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                {t?.navigation?.profile || 'Profile'}
              </a>
              <a href="#security" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                {t?.navigation?.security || 'Security'}
              </a>
              <a href="#notifications" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                {t?.navigation?.notifications || 'Notifications'}
              </a>
              <a href="#billing" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                {t?.navigation?.billing || 'Billing'}
              </a>
            </nav>
          </div>
        </div>

        {/* Settings Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div id="profile" className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t?.profile?.title || 'Profile Information'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.profile?.name || 'Full Name'}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t?.profile?.namePlaceholder || 'Enter your full name'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.profile?.email || 'Email Address'}
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t?.profile?.emailPlaceholder || 'Enter your email'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.profile?.company || 'Company'}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t?.profile?.companyPlaceholder || 'Enter your company name'}
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {t?.profile?.saveButton || 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div id="security" className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t?.security?.title || 'Security Settings'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.security?.currentPassword || 'Current Password'}
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t?.security?.currentPasswordPlaceholder || 'Enter current password'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t?.security?.newPassword || 'New Password'}
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t?.security?.newPasswordPlaceholder || 'Enter new password'}
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {t?.security?.updateButton || 'Update Password'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


