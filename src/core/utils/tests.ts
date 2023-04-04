import {
  renderExpenditures,
  renderLastModified,
  renderLinks,
  renderSummary,
  renderTeamMember,
} from '@ses/containers/CUTable/CuTableRenders';
import { DateTime } from 'luxon';
import { CommitmentJob } from '../enums/commitmentJobEnum';
import { CuJobEnum } from '../enums/cuJobEnum';
import { SortEnum } from '../enums/sortEnum';
import { BudgetStatus } from '../models/dto/coreUnitDTO';
import type { CuCommentDto } from '../models/dto/commentsDTO';
import type {
  ActivityFeedDto,
  AuditorDto,
  AuditReportDto,
  BudgetStatementDto,
  BudgetStatementFteDto,
  BudgetStatementMKRVestDto,
  BudgetStatementWalletDto,
  CommentsBudgetStatementDto,
  ContributorCommitmentDto,
  ContributorDto,
  CoreUnitDto,
  CuMipDto,
  LastActivityDto,
  SocialMediaChannelDto,
  BudgetStatementLineItemDto,
} from '../models/dto/coreUnitDTO';

export const CURRENT_MONTH = DateTime.now().toFormat('y-MM-dd');
export const CURRENT_MINUS_1_MONTH = DateTime.now().set({ day: 1 }).minus({ month: 1 }).toFormat('y-MM-dd');
export const CURRENT_MINUS_2_MONTH = DateTime.now().set({ day: 1 }).minus({ month: 2 }).toFormat('y-MM-dd');
export const CURRENT_MINUS_3_MONTH = DateTime.now().set({ day: 1 }).minus({ month: 3 }).toFormat('y-MM-dd');
export const CURRENT_PLUS_1_MONTH = DateTime.now().set({ day: 1 }).plus({ month: 1 }).toFormat('y-MM-dd');
export const MARKDOWN_SENTENCE_DESCRIPTION =
  'The Protocol Engineering Core Unit secures a wealth of engineering, security, research and smart contract development experience ensuring that the Maker protocol can safely continue to grow as a DeFi leader';
export const MARKDOWN_PARAGRAPH_DESCRIPTION =
  '## Responsibilities\n\n_The Protocol Engineering Team’s responsibility is to extend the functionality of the Maker protocol, assist with the maintenance and operation of existing smart contracts and ensure the safety and correctness of protocol design and implementation';
export const MARKDOWN_PARAGRAPH_IMAGE =
  'https://gateway-proxy-bee-9-0.gateway.ethswarm.org/bzz/6b6b084402b6cccb9e892ff2563a7b836259103e02a0cac59057a14d3ac9f0ef';

export const CONTRIBUTOR_COMMITMENT_ONE: ContributorCommitmentDto = {
  id: 'ESE-001',
  jobTitle: 'Lead Developer' as CuJobEnum,
  commitment: CommitmentJob.Fulltime,
  startDate: CURRENT_MINUS_1_MONTH,
  contributor: [
    {
      id: '0',
      name: 'Petru',
      discordHandle: 'catana | SES#2938',
      email: 'Petru@ses.makerdao.network',
      twitterHandle: 'Petru_Catana',
      facilitatorImage: '',
      forumHandle: 'Petru_Catana',
    },
  ] as ContributorDto[],
};
export const CONTRIBUTOR_COMMITMENT_TWO: ContributorCommitmentDto = {
  id: 'ESE-001',
  jobTitle: 'Data Analyst' as CuJobEnum,
  startDate: CURRENT_MINUS_1_MONTH,
  commitment: CommitmentJob.PartTime,
  contributor: [
    {
      id: '1',
      name: 'Jack',
      discordHandle: 'jevans#9525',
      email: 'Jack@ses.makerdao.network',
      twitterHandle: '__Jevans_',
      facilitatorImage: '',
      forumHandle: '_Jack',
    },
  ] as ContributorDto[],
};

export const COMMENTS_EXAMPLE: CuCommentDto[] = [
  {
    comment:
      ' Ipsum: A helper module for generating dummy filler text. Presently it defines a new ipsum provider plugin manager service that allows for  ipsum provider classes',
    commentDate: '2021-05-01',
  },
  {
    comment:
      ' Ipsum: A helper module for generating dummy filler text. Presently it defines a new ipsum provider plugin manager service that allows for  ipsum provider classes',
    commentDate: '2021-05-01',
  },
  {
    comment:
      ' Ipsum: A helper module for generating dummy filler text. Presently it defines a new ipsum provider plugin manager service that allows for  ipsum provider classes',
    commentDate: '2021-05-01',
  },
  {
    comment:
      'Ipsum: A helper module for generating dummy filler text. Presently it defines a new ipsum provider plugin manager service that allows for  ipsum provider classes, making it easy to change existing implementations and also to add new ones',
    commentDate: '2021-07-01',
  },
  {
    comment:
      ' Ipsum: A helper module for generating dummy filler text. Presently it defines a new ipsum provider plugin manager service that allows for  ipsum provider classes, making it easy to change existing implementations and also to add new ones',
    commentDate: '2021-08-01',
  },
  {
    comment:
      ' Ipsum: A helper module for generating dummy filler text. Presently it defines a new ipsum provider plugin manager service that allows for  ipsum provider classes, making it easy to change existing implementations and also to add new ones',
    commentDate: '2026-09-01',
  },
  {
    comment:
      ' Ipsum: A helper module for generating dummy filler text. Presently it defines a new ipsum provider plugin manager service that allows for  ipsum provider classes, making it easy to change existing implementations and also to add new ones',
    commentDate: '2026-09-05',
  },
  {
    comment:
      ' Ipsum: A helper module for generating dummy filler text. Presently it defines a new ipsum provider plugin manager service that allows for  ipsum provider classes, making it easy to change existing implementations and also to add new ones',
    commentDate: '2026-09-09',
  },

  {
    comment:
      ' Ipsum: A helper module for generating dummy filler text. Presently it defines a new ipsum provider plugin manager service that allows for  ipsum provider classes, making it easy to change existing implementations and also to add new ones',
    commentDate: '2025-10-01',
  },
  {
    comment:
      ' Ipsum: A helper module for generating dummy filler text. Presently it defines a new ipsum provider plugin manager service that allows for  ipsum provider classes, making it easy to change existing implementations and also to add new ones',
    commentDate: '2023-11-01',
  },
  {
    comment:
      ' Ipsum: A helper module for generating dummy filler text. Presently it defines a new ipsum provider plugin manager service that allows for  ipsum provider classes, making it easy to change existing implementations and also to add new ones',
    commentDate: '2029-12-01',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UsersFakeData: any[] = [];

export const CoreUnit: CoreUnitDto = {
  id: '1',
  shortCode: 'SES',
  code: 'SES-001',
  name: 'Sustainable Ecosystem Scaling',
  image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png',
  sentenceDescription:
    'SES aims to sustainably grow the Maker Protocol’s moats by removing barriers between decentralized workforce, capital, and work.',
  paragraphDescription:
    'The SES Core Unit supports a decentralized, effective, and scalable economy on top of the Maker Protocol that continues to push forward its growth in a sustainable manner.',
  paragraphImage: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/diagram.png',
  category: ['Technical', 'Business', 'Operational', 'Finance'],
  legacyBudgetStatementUrl: '',
  auditors: [] as AuditorDto[],
  cuMip: [
    {
      mipCode: 'MIP39c2SP37',
      accepted: '2021-05-25',
      mipTitle: 'MIP39c2-SP20: Adding Collateral Engineering Services Core Unit',
      dateMip: DateTime.fromISO('2021-09-27').toJSDate(),
      mipStatus: 'Accepted',
      mipUrl: 'https://mips.makerdao.com/mips/details/MIP39c2SP20',
      obsolete: 'null',
      rejected: 'null',
    },
  ] as CuMipDto[],
  activityFeed: [] as ActivityFeedDto[],
  lastActivity: {
    id: '3',
    created_at: '2023-04-03T09:56:16.349Z',
    event: 'this is one event',
    description: 'event test',
  } as LastActivityDto,
  socialMediaChannels: [
    {
      website: 'https://ses.makerdao.network',
      github: 'https://github.com/makerdao-ses',
      forumTag: 'https://forum.makerdao.com/c/core-units/sustainable-ecosystem-scaling',
      discord: 'https://discord.gg/h7GKvqDyDP',
      twitter: 'https://twitter.com/MakerDAO_SES',
      youtube: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw',
      linkedIn: 'https://www.linkedin.com/company/makerdao-ses/',
    },
  ] as SocialMediaChannelDto[],
  budgetStatements: [
    {
      id: '',
      month: '2022-11-01',
      status: BudgetStatus.Escalated,
      publicationUrl: '',
      activityFeed: [] as ActivityFeedDto[],
      comments: [] as CommentsBudgetStatementDto[],
      budgetStatementFTEs: [
        {
          month: '2/2/2034',
          ftes: 7.5,
        },
      ] as BudgetStatementFteDto[],
      budgetStatementWallet: [
        {
          budgetStatementLineItem: [
            {
              month: '2022-12-01',
              actual: 200.83,
            },

            {
              month: '2022-12-01',
              actual: 1030.92,
            },
            {
              month: '2022-12-01',
              actual: 1654,
            },
          ] as BudgetStatementLineItemDto[],
        },
        {
          budgetStatementLineItem: [
            {
              month: '2022-11-01',
              actual: 14051,
            },

            {
              month: '2022-11-01',
              actual: 1000,
            },
            {
              month: '2022-11-01',
              actual: 1000,
            },
            {
              month: '2022-11-01',
              actual: 654,
            },
          ] as BudgetStatementLineItemDto[],
        },
        {
          budgetStatementLineItem: [
            {
              month: '2022-10-01',
              actual: 10000,
            },

            {
              month: '2022-10-01',
              actual: 10000,
            },
            {
              month: '2022-10-01',
              actual: 10000,
            },
          ] as BudgetStatementLineItemDto[],
        },
      ] as BudgetStatementWalletDto[],
      budgetStatementMKRVest: [] as BudgetStatementMKRVestDto[],
      auditReport: [] as AuditReportDto[],
    },
  ] as BudgetStatementDto[],
  contributorCommitment: [
    {
      id: '34',
      startDate: '2021-05-25',
      jobTitle: CuJobEnum.Facilitator,
      contributor: [
        {
          discordHandle: 'https://discord.com/users/770632510051975210',
          forumHandle: 'Juan',
          twitterHandle: '0x7u4n',
          name: 'Juan',
          facilitatorImage: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/users/juan.gif',
        },
      ] as ContributorDto[],
    },
    {
      id: '35',
      startDate: '2021-05-25',
      jobTitle: CuJobEnum.Facilitator,
      contributor: [
        {
          discordHandle: 'https://discord.com/users/770632510051975210',
          forumHandle: 'Juan',
          twitterHandle: '0x7u4n',
          name: 'Juan',
          facilitatorImage: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/users/wouter.jpg',
        },
      ] as ContributorDto[],
    },
  ] as ContributorCommitmentDto[],
};

export const columns = [
  {
    header: 'Core Unit',
    justifyContent: 'flex-start',
    style: { paddingLeft: '16px' },
    cellRender: renderSummary,
    width: '400px',
    hasSort: true,
  },
  {
    header: 'Expenditure',
    justifyContent: 'flex-start',
    cellRender: renderExpenditures,
    width: '215px',
    sortReverse: true,
    hasSort: true,
  },
  {
    header: 'Team',
    justifyContent: 'flex-start',
    cellRender: renderTeamMember,
    width: '205px',
    sortReverse: true,
    hasSort: true,
  },
  {
    header: 'Last Modified',
    justifyContent: 'flex-start',
    cellRender: renderLastModified,
    width: '122px',
    sortReverse: true,
    hasSort: true,
  },
  {
    header: '',
    justifyContent: 'center',
    cellRender: renderLinks,
    width: '358px',
    responsiveWidth: '186px',
    hasSort: false,
  },
];

export const headersSort = [SortEnum.Asc, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Disabled];
