import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OffersFrequency = 'Daily' | 'Weekly' | 'Monthly' | 'Never';

export interface BuilderState {
  campaignName: string;
  brandColor: string;
  logoUrl: string | null;
  type: string;
  rewardDescription: string;
  stampsNeeded: number;
  minPurchase: number;
  businessName: string;
  contact: string;
  offersFrequency: OffersFrequency;
  tagline: string;
  businessAddress: string;
  email: string;
  website: string;
  socialMedia: string;
  welcomeMessage: string;
  instructions: string;
  specialOffers: string;
}

export const initialState: BuilderState = {
  campaignName: '',
  brandColor: '#7123a9',
  logoUrl: null,
  type: 'loyalty',
  rewardDescription: 'Free Coffee',
  stampsNeeded: 5,
  minPurchase: 700,
  businessName: 'Your Business',
  contact: '+10-6789887612',
  offersFrequency: 'Monthly',
  tagline: 'Join our loyalty program today!',
  businessAddress: '123 Main St, Anytown, USA',
  email: 'info@example.com',
  website: 'www.example.com',
  socialMedia: 'facebook.com/example, twitter.com/example',
  welcomeMessage: 'Welcome to our loyalty program!',
  instructions: 'Collect stamps to earn rewards.',
  specialOffers: 'Check out our exclusive offers!',
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<Partial<BuilderState>>) {
      Object.assign(state, action.payload);
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setCampaignName(state, action: PayloadAction<string>) {
      state.campaignName = action.payload;
    },
    setBrandColor(state, action: PayloadAction<string>) {
      state.brandColor = action.payload;
    },
    setLogoUrl(state, action: PayloadAction<string | null>) {
      state.logoUrl = action.payload;
    },
    setRewardDescription(state, action: PayloadAction<string>) {
      state.rewardDescription = action.payload;
    },
    setStampsNeeded(state, action: PayloadAction<number>) {
      state.stampsNeeded = action.payload;
    },
    setMinPurchase(state, action: PayloadAction<number>) {
      state.minPurchase = action.payload;
    },
    setBusinessName(state, action: PayloadAction<string>) {
      state.businessName = action.payload;
    },
    setContact(state, action: PayloadAction<string>) {
      state.contact = action.payload;
    },
    setOffersFrequency(state, action: PayloadAction<OffersFrequency>) {
      state.offersFrequency = action.payload;
    },
    setTagline(state, action: PayloadAction<string>) {
      state.tagline = action.payload;
    },
    setBusinessAddress(state, action: PayloadAction<string>) {
      state.businessAddress = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setWebsite(state, action: PayloadAction<string>) {
      state.website = action.payload;
    },
    setSocialMedia(state, action: PayloadAction<string>) {
      state.socialMedia = action.payload;
    },
    setWelcomeMessage(state, action: PayloadAction<string>) {
      state.welcomeMessage = action.payload;
    },
    setInstructions(state, action: PayloadAction<string>) {
      state.instructions = action.payload;
    },
    setSpecialOffers(state, action: PayloadAction<string>) {
      state.specialOffers = action.payload;
    },
  },
});

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
} = builderSlice.actions;

export default builderSlice.reducer;


