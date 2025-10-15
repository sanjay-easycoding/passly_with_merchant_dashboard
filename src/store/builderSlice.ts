import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { PassType, OffersFrequency, PassBuilderState } from '@/types';

// Use the proper interface from types
export interface BuilderState extends Omit<PassBuilderState, 'createdAt' | 'updatedAt' | 'status'> {
  // These fields are managed by the slice, not user input
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
}

export const initialState: BuilderState = {
  // Pass Type & Branding
  campaignName: '',
  type: 'store',
  brandColor: '#7123a9',
  logoUrl: null,
  tagline: '',
  
  // Details
  rewardDescription: '',
  stampsNeeded: 5,
  minPurchase: 700,
  
  // Business Information
  businessName: '',
  businessAddress: '',
  contact: '',
  email: '',
  website: '',
  socialMedia: '',
  
  // Customer Experience
  welcomeMessage: '',
  instructions: '',
  specialOffers: '',
  offersFrequency: 'Monthly',
  
  // Metadata
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'draft',
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<Partial<BuilderState>>) {
      // Validate and sanitize incoming data
      const sanitizedData = Object.entries(action.payload).reduce((acc, [key, value]) => {
        if (key in state && value !== undefined) {
          acc[key as keyof BuilderState] = value;
        }
        return acc;
      }, {} as Partial<BuilderState>);
      
      Object.assign(state, sanitizedData);
      state.updatedAt = new Date();
    },
    
    setType(state, action: PayloadAction<PassType>) {
      state.type = action.payload;
      state.updatedAt = new Date();
    },
    
    setCampaignName(state, action: PayloadAction<string>) {
      // Validate campaign name length
      if (action.payload.length > 100) {
        throw new Error('Campaign name must be less than 100 characters');
      }
      state.campaignName = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    setBrandColor(state, action: PayloadAction<string>) {
      // Validate hex color format
      if (!/^#[0-9A-F]{6}$/i.test(action.payload)) {
        throw new Error('Invalid hex color format');
      }
      state.brandColor = action.payload;
      state.updatedAt = new Date();
    },
    
    setLogoUrl(state, action: PayloadAction<string | null>) {
      // Validate URL format if provided
      if (action.payload && !isValidUrl(action.payload)) {
        throw new Error('Invalid logo URL format');
      }
      state.logoUrl = action.payload;
      state.updatedAt = new Date();
    },
    
    setRewardDescription(state, action: PayloadAction<string>) {
      // Validate reward description length
      if (action.payload.length > 500) {
        throw new Error('Reward description must be less than 500 characters');
      }
      state.rewardDescription = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    setStampsNeeded(state, action: PayloadAction<number>) {
      // Validate stamps range
      if (action.payload < 1 || action.payload > 20) {
        throw new Error('Stamps needed must be between 1 and 20');
      }
      state.stampsNeeded = action.payload;
      state.updatedAt = new Date();
    },
    
    setMinPurchase(state, action: PayloadAction<number>) {
      // Validate minimum purchase amount
      if (action.payload < 0) {
        throw new Error('Minimum purchase cannot be negative');
      }
      state.minPurchase = action.payload;
      state.updatedAt = new Date();
    },
    
    setBusinessName(state, action: PayloadAction<string>) {
      // Validate business name length
      if (action.payload.length > 100) {
        throw new Error('Business name must be less than 100 characters');
      }
      state.businessName = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    setContact(state, action: PayloadAction<string>) {
      // Basic phone number validation
      if (action.payload && !isValidPhoneNumber(action.payload)) {
        throw new Error('Invalid phone number format');
      }
      state.contact = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    setOffersFrequency(state, action: PayloadAction<OffersFrequency>) {
      state.offersFrequency = action.payload;
      state.updatedAt = new Date();
    },
    
    setTagline(state, action: PayloadAction<string>) {
      // Validate tagline length
      if (action.payload.length > 200) {
        throw new Error('Tagline must be less than 200 characters');
      }
      state.tagline = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    setBusinessAddress(state, action: PayloadAction<string>) {
      // Validate address length
      if (action.payload.length > 500) {
        throw new Error('Business address must be less than 500 characters');
      }
      state.businessAddress = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    setEmail(state, action: PayloadAction<string>) {
      // Validate email format
      if (action.payload && !isValidEmail(action.payload)) {
        throw new Error('Invalid email format');
      }
      state.email = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    setWebsite(state, action: PayloadAction<string>) {
      // Validate website URL format
      if (action.payload && !isValidUrl(action.payload)) {
        throw new Error('Invalid website URL format');
      }
      state.website = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    setSocialMedia(state, action: PayloadAction<string>) {
      // Validate social media handle length
      if (action.payload.length > 50) {
        throw new Error('Social media handle must be less than 50 characters');
      }
      state.socialMedia = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    setWelcomeMessage(state, action: PayloadAction<string>) {
      // Validate welcome message length
      if (action.payload.length > 1000) {
        throw new Error('Welcome message must be less than 1000 characters');
      }
      state.welcomeMessage = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    setInstructions(state, action: PayloadAction<string>) {
      // Validate instructions length
      if (action.payload.length > 1000) {
        throw new Error('Instructions must be less than 1000 characters');
      }
      state.instructions = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    setSpecialOffers(state, action: PayloadAction<string>) {
      // Validate special offers length
      if (action.payload.length > 1000) {
        throw new Error('Special offers must be less than 1000 characters');
      }
      state.specialOffers = action.payload.trim();
      state.updatedAt = new Date();
    },
    
    clearBuilderData(state) {
      Object.assign(state, initialState);
      state.createdAt = new Date();
      state.updatedAt = new Date();
    },
    
    publishPass(state) {
      state.status = 'published';
      state.updatedAt = new Date();
    },
    
    archivePass(state) {
      state.status = 'archived';
      state.updatedAt = new Date();
    },
  },
});

// Validation utility functions
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phone: string): boolean {
  // Basic phone validation - allows international formats
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
}

export const {
  hydrate,
  setType,
  setCampaignName,
  setBrandColor,
  setLogoUrl,
  setRewardDescription,
  setStampsNeeded,
  setMinPurchase,
  setBusinessName,
  setContact,
  setOffersFrequency,
  setTagline,
  setBusinessAddress,
  setEmail,
  setWebsite,
  setSocialMedia,
  setWelcomeMessage,
  setInstructions,
  setSpecialOffers,
  clearBuilderData,
  publishPass,
  archivePass,
} = builderSlice.actions;

export default builderSlice.reducer;


