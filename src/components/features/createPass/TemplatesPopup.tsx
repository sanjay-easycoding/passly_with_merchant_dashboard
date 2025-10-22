import React from 'react';

export interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  layoutType: 'dark' | 'light' | 'gradient' | 'minimal' | 'vibrant' | 'elegant';
}

const layoutTemplates: LayoutTemplate[] = [
  {
    id: 'dark-premium',
    name: 'Dark Premium',
    description: 'Elegant dark theme with 3D effects',
    layoutType: 'dark',
    preview: (
      <div className="w-full h-24 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-lg">
        Dark Premium
      </div>
    )
  },
  {
    id: 'light-modern',
    name: 'Light Modern',
    description: 'Clean and modern light design',
    layoutType: 'light',
    preview: (
      <div className="w-full h-24 bg-gradient-to-br from-white to-gray-100 rounded-lg flex items-center justify-center text-gray-800 text-sm font-medium shadow-lg border border-gray-200">
        Light Modern
      </div>
    )
  },
  {
    id: 'gradient-vibrant',
    name: 'Gradient Vibrant',
    description: 'Bold gradient colors',
    layoutType: 'gradient',
    preview: (
      <div className="w-full h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-lg">
        Gradient Vibrant
      </div>
    )
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Simple and clean design',
    layoutType: 'minimal',
    preview: (
      <div className="w-full h-24 bg-white rounded-lg flex items-center justify-center text-gray-700 text-sm font-medium shadow-sm border-2 border-gray-300">
        Minimal Clean
      </div>
    )
  },
  {
    id: 'vibrant-energy',
    name: 'Vibrant Energy',
    description: 'High energy with bright colors',
    layoutType: 'vibrant',
    preview: (
      <div className="w-full h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-lg">
        Vibrant Energy
      </div>
    )
  },
  {
    id: 'elegant-classic',
    name: 'Elegant Classic',
    description: 'Timeless elegant design',
    layoutType: 'elegant',
    preview: (
      <div className="w-full h-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-lg">
        Elegant Classic
      </div>
    )
  }
];

interface TemplatesPopupProps {
  onClose: () => void;
  onSelectTemplate: (template: LayoutTemplate) => void;
}

export default function TemplatesPopup({ onClose, onSelectTemplate }: TemplatesPopupProps) {
  const handleSelectTemplate = (template: LayoutTemplate) => {
    onSelectTemplate(template);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Choose Layout Design</h2>
            <p className="text-gray-600 mt-1">Select a layout design for your loyalty pass card</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Layout Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {layoutTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className="group cursor-pointer border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all duration-200 bg-white"
              >
                {/* Layout Preview */}
                <div className="w-full h-32 rounded-lg mb-4 relative overflow-hidden">
                  {template.preview}
                </div>

                {/* Layout Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  {/* Layout Type */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-full font-medium">
                      {template.layoutType}
                    </span>
                  </div>
                </div>

                {/* Select Button */}
                <div className="mt-4">
                  <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 group-hover:bg-blue-600">
                    Use Layout
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            You can customize any layout design after selecting it
          </p>
        </div>
      </div>
    </div>
  );
}
