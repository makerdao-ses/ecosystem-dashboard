import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/core/store/store';
import { fetchCoreUnitByCode } from './cuAboutAPI';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ContributorCommitment } from '@ses/core/models/interfaces/contributor';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';

export enum status {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
}

export interface CurrentCoreUnitAbout {
  cuAbout: CoreUnit;
  statusCoreUnit: status;
  error: null;
}

export const initialState: CurrentCoreUnitAbout = {
  error: null,
  statusCoreUnit: status.idle,
  cuAbout: {
    id: '',
    shortCode: '',
    code: '',
    name: '',
    image: '',
    auditors: [],
    lastActivity: undefined,
    paragraphDescription: '',
    paragraphImage: '',
    sentenceDescription: '',
    category: [],
    activityFeed: [],
    cuMip: [],
    socialMediaChannels: [] as SocialMediaChannels[],
    budgetStatements: [] as BudgetStatement[],
    contributorCommitment: [] as ContributorCommitment[],
  } as unknown as CoreUnit,
};

export const loadCoreUnitAbout = createAsyncThunk('CoreUnit/loadCoreUnitABout', (coreUnitId: string) =>
  fetchCoreUnitByCode(coreUnitId)
);

export const cuAboutSlice = createSlice({
  name: 'cuAbout',
  initialState,
  reducers: {
    clearCoreUNit: (state) => {
      state.cuAbout = initialState.cuAbout;
      state.statusCoreUnit = status.idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCoreUnitAbout.pending, (state) => {
        state.statusCoreUnit = status.loading;
      })
      .addCase(loadCoreUnitAbout.fulfilled, (state, action) => {
        if (action.payload) {
          state.statusCoreUnit = status.idle;
          state.cuAbout = action.payload;
        }
      });
  },
});

export const cuAboutSelector = (state: RootState) => state.cuAbout as unknown as CoreUnit;
export const contributorCommitmentSelector = (state: RootState) => cuAboutSelector(state).contributorCommitment;
export const { clearCoreUNit } = cuAboutSlice.actions;
export default cuAboutSlice.reducer;
