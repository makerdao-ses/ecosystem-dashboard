import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  BudgetStatementDto,
  ContributorCommitmentDto,
  CoreUnitDto,
  RoadMapDto,
  SocialMediaChannelDto,
} from '../../../core/models/dto/core-unit.dto';
import { RootState } from '../../../core/store/store';
import { fetchCoreUnitByCode } from './cu-about.api';

export enum status {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
}

export interface CurrentCoreUnitAbout {
  cuAbout: CoreUnitDto;
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
    paragraphDescription: '',
    paragraphImage: '',
    sentenceDescription: '',
    category: [],
    activityFeed: [],
    cuMip: [],
    roadMap: [] as RoadMapDto[],
    socialMediaChannels: [] as SocialMediaChannelDto[],
    budgetStatements: [] as BudgetStatementDto[],
    contributorCommitment: [] as ContributorCommitmentDto[],
  },
};

export const loadCoreUnitAbout = createAsyncThunk('CoreUnit/loadCoreUnitABout', (coreUnitId: string) => {
  return fetchCoreUnitByCode(coreUnitId);
});

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

export const cuAboutSelector = (state: RootState) => {
  return state.cuAbout;
};
export const contributorCommitmentSelector = (state: RootState) => {
  return cuAboutSelector(state).cuAbout.contributorCommitment;
};
export const { clearCoreUNit } = cuAboutSlice.actions;
export default cuAboutSlice.reducer;
