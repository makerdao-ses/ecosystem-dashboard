import { DateTime } from 'luxon';
import { Commitment, Contributor, ContributorCommitment } from '../../stories/containers/cu-about/cu-about.api';
import { CuJobEnum } from '../enums/cu-job.enum';

export const CURRENT_MONTH = DateTime.now().toFormat('y-MM-dd');
export const CURRENT_MINUS_1_MONTH = DateTime.now()
  .set({ day: 1 })
  .minus({ month: 1 })
  .toFormat('y-MM-dd');
export const CURRENT_MINUS_2_MONTH = DateTime.now()
  .set({ day: 1 })
  .minus({ month: 2 })
  .toFormat('y-MM-dd');
export const CURRENT_MINUS_3_MONTH = DateTime.now()
  .set({ day: 1 })
  .minus({ month: 3 })
  .toFormat('y-MM-dd');
export const CURRENT_PLUS_1_MONTH = DateTime.now()
  .set({ day: 1 })
  .plus({ month: 1 })
  .toFormat('y-MM-dd');
export const MARKDOWN_SENTENCE_DESCRIPTION =
  'The Protocol Engineering Core Unit secures a wealth of engineering, security, research and smart contract development experience ensuring that the Maker protocol can safely continue to grow as a DeFi leader';
export const MARKDOWN_PARAGRAPH_DESCRIPTION = '## Responsibilities\n\n_The Protocol Engineering Team’s responsibility is to extend the functionality of the Maker protocol, assist with the maintenance and operation of existing smart contracts and ensure the safety and correctness of protocol design and implementation';
export const MARKDOWN_PARAGRAPH_IMAGE = 'https://gateway-proxy-bee-9-0.gateway.ethswarm.org/bzz/6b6b084402b6cccb9e892ff2563a7b836259103e02a0cac59057a14d3ac9f0ef';

export const CONTRIBUTOR_COMMITMENT_ONE: ContributorCommitment = {
  id: 'ESE-001',
  jobTitle: 'Lead Developer' as CuJobEnum,
  commitment: Commitment.FullTime,
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
    }
  ] as Contributor[],
};
export const CONTRIBUTOR_COMMITMENT_TWO: ContributorCommitment = {
  id: 'ESE-001',
  jobTitle: 'Data Analyst' as CuJobEnum,
  startDate: CURRENT_MINUS_1_MONTH,
  commitment: Commitment.FullTime,
  contributor: [
    {
      id: '1',
      name: 'Jack',
      discordHandle: 'jevans#9525',
      email: 'Jack@ses.makerdao.network',
      twitterHandle: '__Jevans_',
      facilitatorImage: '',
      forumHandle: '_Jack',
    }] as Contributor[],
};
