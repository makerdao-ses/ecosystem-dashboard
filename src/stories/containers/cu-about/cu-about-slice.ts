/* eslint-disable semi */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../core/store/store';
import {
  Commitment,
  ContributorCommitment,
  CuAbout,
  CuMipStatus,
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

const initialState: CurrentCoreUnitAbout = {
  error: null,
  statusCoreUnit: status.idle,
  cuAbout: {
    paragraphDescription: '',
    sentenceDescription: '',
    paragraphImage: '',
    cuMip: [
      {
        cuId: '',
        formalSubmission: '',
        mipCode: '',
        mipStatus: CuMipStatus.Rejected,
        rfc: '',
      },
    ],
    budgetStatements: [
      {
        budgetStatementFTEs: [
          {
            ftes: 0,
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
    socialMediaChannels: [{
      cuCode: '',
      forumTag: '',
      twitter: '',
      youtube: '',
      discord: '',
      linkedIn: '',
      website: '',
    }] as SocialMediaChannels[],
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
// export const ftsSelector = (state: RootState) => {
//   return (
//     cuAboutSelector(state).cuAbout.budgetStatements[0].budgetStatementFTEs[0]
//       .ftes || 0
//   );
// };
export const contributorCommitmentSelector = (state: RootState) => {
  return cuAboutSelector(state).cuAbout.contributorCommitment;
};
export const { clearCoreUNit } = cuAboutSlice.actions;
export default cuAboutSlice.reducer;
