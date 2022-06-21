import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CuJobEnum } from '../../../core/enums/cu-job.enum';
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
    id: '001',
    name: 'Sustainable Ecosystem Scaling',
    code: 'SES-001',
    image:
      'https://api.gateway.ethswarm.org/bzz/efb3bbb702ecec395c08db27647158dc42928edc52e7a4f43dd0f444a24aa01d/',
    category: ['Technical', 'Growth', 'Support', 'Operational'],
    paragraphDescription:
      '**Vision**\n    \n    An effective, decentralized, and scalable ecosystem:\n    \n    1. The industry’s best on-boarding experience and retention rate\n    2. Easy to find the capital needed for the best projects to work on:\n        1. Optimal driving force for protocol growth\n        2. Most fulfilling for the project’s participants\n    3. Resilient safety mechanisms\n        1. Preventing protocol failure\n        2. Allow for rapid innovation and experimentation\n \n **Strategy**\n \n    - Opportunity & Risk Assessment\n        - Engage with the different DAO stakeholders and keep an open backlog accessible to the broader Community.\n        - Prioritize issues based on importance and risk and build a Road Map to tackle these issues.\n    - Research\n        - Research the opportunities and issues, with a data-centric approach.\n        - Explore solutions and frameworks that produce high-quality, repeatable results.\n    - Incubate\n        - Set groups for success into becoming a functional Core Unit answering a specific need for the DAO. Guide and support them through the process.\n        - Feedback the research through continuous improvement to accelerate the scale and improve the success rate of new Core Units.',
    sentenceDescription:
      '"SES aims to sustainably grow the Maker Protocol’s moats by removing barriers between decentralized workforce, capital, and work',
    paragraphImage:
      'https://gateway-proxy-bee-9-0.gateway.ethswarm.org/bzz/1fe299c01206d1d422cf79a60ea49b8a77b04382f8d25745842eb2a199eb4389',
    cuMip: [
      {
        accepted: '2021-05-25',
        cuId: '1',
        formalSubmission: '2021-05-04',
        forumUrl: 'https://forum.makerdao.com/t/mip41c4-sp10-facilitator-onboarding-sustainable-ecosystem-scaling-core-unit/7370',
        id: '2',
        mipCode: 'MIP41c4SP10',
        obsolete: '2021-05-25',
        mipStatus: CuStatusEnum.Obsolete,
        mipTitle: 'MIP41c4-SP10: Facilitator Onboarding, SES-001',
        mipUrl: 'https://mips.makerdao.com/mips/details/MIP41c4SP10'
      },
      {
        accepted: '2021-05-25',
        obsolete: '2021-05-25',
        cuId: '1',
        formalSubmission: '2021-04-07',
        forumUrl: 'https://forum.makerdao.com/t/mip40c3-sp10-modify-core-unit-budget-ses-001',
        id: '4',
        mipCode: 'MIP40c3SP10',
        mipStatus: CuStatusEnum.Obsolete,
        mipTitle: 'MIP40c3-SP10: Modify Core Unit Budget, SES-001',
        mipUrl: 'https://mips.makerdao.com/mips/details/MIP40c3SP10'
      },
      {
        accepted: '2021-11-13',
        cuId: '1',
        formalSubmission: '2021-08-11',
        forumUrl: 'https://forum.makerdao.com/t/mip40c3-sp31-modify-core-unit-budget-sustainable-ecosystem-scaling-ses-001',
        id: '5',
        mipCode: 'MIP40c3SP31',
        obsolete: '2021-05-25',
        mipStatus: CuStatusEnum.Obsolete,
        mipTitle: 'MIP40c3-SP31: Modify Core Unit Budget - Sustainable Ecosystem Scaling (SES-001)',
        mipUrl: 'https://mips.makerdao.com/mips/details/MIP40c3SP31'
      },
      {
        accepted: '2021-06-28',
        cuId: '1',
        formalSubmission: '2021-06-14',
        mipCode: 'MIP40c3SP17',
        mipStatus: CuStatusEnum.Accepted,
        mipTitle: 'Modify Core Unit Budget (MKR) - Sustainable Ecosystem Scaling (SES-001)',
        mipUrl: 'https://mips.makerdao.com/mips/details/MIP40c3SP17'
      }
    ] as CuMip[],
    budgetStatements: [
      {
        budgetStatementFTEs: [
          {
            ftes: 5,
            month: '',
          },
        ],
      },
    ],
    contributorCommitment: [
      {
        id: '2',
        jobTitle: 'Lead Developer' as CuJobEnum,
        startDate: '2014-03-28',
        commitment: Commitment.FullTime,
        contributor: [
          {
            discordHandle: 'catana | SES#2938',
            email: 'Petru@ses.makerdao.network',
            facilitatorImage: '',
            twitterHandle: 'Petru_Catana',
            name: 'Petru',
            forumHandle: '',
            id: '1',
          },
        ],
      },
      {
        id: '3',
        jobTitle: 'Data Analyst' as CuJobEnum,
        startDate: '2016-10-01',
        commitment: Commitment.PartTime,
        contributor: [
          {
            discordHandle: 'jevans#9525',
            email: 'Jack@ses.makerdao.network',
            facilitatorImage: '',
            twitterHandle: '__Jevans_',
            name: 'Jack',
            forumHandle: '',
            id: '2',
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
