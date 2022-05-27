import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { RootState } from '../../../core/store/store';
import {
  Commitment,
  ContributorCommitment,
  CuAbout,
  CuMip,
  fetchCoreUnitByCode,
  SocialMediaChannels,
} from './cu-about.api';

export enum status {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
}

export interface CurrentCoreUnitAbout {
  cuAbout: CuAbout;
  statusCoreUnit: status;
  error: null;
}

export const initialState: CurrentCoreUnitAbout = {
  error: null,
  statusCoreUnit: status.idle,
  cuAbout: {
    id: '',
    name: '',
    code: '',
    category: [],
    paragraphDescription: '',
    sentenceDescription: '',
    paragraphImage: '',
    cuMip: [
      {
        cuId: '',
        formalSubmission: '2019-06-11',
        mipCode: '',
        mipStatus: CuStatusEnum.Accepted,
        rfc: '2019-06-11',
        accepted: '2019-06-11',
        mipTitle: '',
        mipUrl: '',
        obsolete: '2019-06-11',
        rejected: '2019-06-11',
      },
    ] as CuMip[],
    budgetStatements: [
      {
        budgetStatementFTEs: [
          {
            ftes: 0,
            month: '',
          },
        ],
      },
    ],
    contributorCommitment: [
      {
        id: '',
        jobTitle: '',
        commitment: Commitment.Inactive,
        contributor: [
          {
            email: '',
            forumHandle: '',
            id: '',
            facilitatorImage: '',
            name: '',
            discordHandle: '',
            twitterHandle: '',
          },
        ],
      },
    ] as ContributorCommitment[],
    socialMediaChannels: [
      {
        forumTag: '',
        twitter: '',
        youtube: '',
        discord: '',
        linkedIn: '',
        website: '',
      },
    ] as SocialMediaChannels[],
  } as CuAbout,
};

export const loadCoreUnitABout = createAsyncThunk(
  'CoreUnit/loadCoreUnitABout',
  async(coreUnitId: string) => fetchCoreUnitByCode(coreUnitId)
);

export const cuAboutSlice = createSlice({
  name: 'cuAbout',
  initialState,
  reducers: {
    clearCoreUNit: (state) => {
      state.cuAbout = {} as CuAbout;
      state.statusCoreUnit = status.idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCoreUnitABout.pending, (state) => {
        state.statusCoreUnit = status.loading;
      })
      .addCase(loadCoreUnitABout.fulfilled, (state, action) => {
        state.cuAbout = action.payload;
        state.statusCoreUnit = status.succeeded;
      });
  },
});

export const cuAboutSelector = (state: RootState) => state.cuAbout;
export const contributorCommitmentSelector = (state: RootState) => {
  return cuAboutSelector(state).cuAbout.contributorCommitment;
};
export const { clearCoreUNit } = cuAboutSlice.actions;
export default cuAboutSlice.reducer;
