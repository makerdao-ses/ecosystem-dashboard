import { DateTime } from 'luxon';
import { CommitmentJob } from '../enums/CommitmentJob.enum';
import { CuJobEnum } from '../enums/cu-job.enum';
import { CuCommentDto } from '../models/dto/comments.dto';
import { ContributorCommitmentDto, ContributorDto } from '../models/dto/core-unit.dto';

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
