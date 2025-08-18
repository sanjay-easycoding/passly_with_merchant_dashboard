import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { BuilderState } from '@/store/builderSlice';

// Example RTK Query API for saving/loading drafts to the backend later
export const builderApi = createApi({
  reducerPath: 'builderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    saveDraft: build.mutation<{ ok: boolean }, Partial<BuilderState>>({
      query: (body) => ({ url: '/builder/draft', method: 'POST', body }),
    }),
    loadDraft: build.query<Partial<BuilderState>, string>({
      query: (id) => `/builder/draft/${id}`,
    }),
  }),
});

export const { useSaveDraftMutation, useLoadDraftQuery } = builderApi;


