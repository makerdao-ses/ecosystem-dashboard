import { request, gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CuJobEnum } from '../../../core/enums/cu-job.enum';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';
import { LinkModel } from '../../components/cu-table-column-links/cu-table-column-links';
import { CoreUnit } from '../../components/title-navigation-cu-about/title-navigation-cu-about';

interface BudgetStatementFTEs {
  month: string;
  ftes: number;
}

export interface BudgetStatement {
  budgetStatementFTEs: BudgetStatementFTEs[];
}

export interface CuMip {
  mipTitle: string;
  mipCode: string;
  cuId: string;
  rfc?: string;
  formalSubmission?: string;
  accepted?: string;
  rejected?: string;
  obsolete?: string;
  mipStatus: CuStatusEnum;
  mipUrl?: string;
}
export enum Commitment {
  FullTime = 'Full Time',
  PartTime = 'Part Time',
  Variable = 'Variable',
  Inactive = 'Inactive',
}

export interface Contributor {
  id: string;
  name: string;
  forumHandle: string;
  discordHandle: string;
  twitterHandle: string;
  email: string;
  facilitatorImage: string;
}
export interface ContributorCommitment {
  id: string;
  jobTitle: CuJobEnum;
  startDate: string;
  commitment: Commitment;
  contributor: Contributor[];
}

export interface SocialMediaChannels {
  forumTag: string;
  twitter: string;
  youtube: string;
  discord: string;
  linkedIn: string;
  website: string;
}

export interface CuAbout {
  id: string;
  code: string;
  name: string;
  image?: string;
  category: CuCategoryEnum[];
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
  socialMediaChannels: SocialMediaChannels[];
  cuMip: CuMip[];
  budgetStatements: BudgetStatement[];
  contributorCommitment?: ContributorCommitment[];
}
interface BudgetStatementFTEs {
  month: string;
  ftes: number;
}

export const GET_CU_ABOUT_BY_CODE = gql`
  query CoreUnit($filter: CoreUnitFilter) {
    coreUnit(filter: $filter) {
      id
      code
      name
      image
      category
      sentenceDescription
      paragraphDescription
      paragraphImage
      socialMediaChannels {
        discord
        forumTag
        linkedIn
        twitter
        website
        youtube
      }
      cuMip {
        mipTitle
        mipStatus
        accepted
        obsolete
        rejected
        rfc
        formalSubmission
        mipUrl
      }
      budgetStatements {
        budgetStatementFTEs {
          ftes
          month
        }
      }
      contributorCommitment {
        jobTitle
        commitment
        startDate
        contributor {
          name
          discordHandle
          email
          facilitatorImage
          forumHandle
          twitterHandle
        }
      }
    }
  }
`;

export const getLinksCoreUnit = (cu: CoreUnit) => {
  const links: LinkModel[] = [];
  if (cu.socialMediaChannels.length === 0) return links;
  const cont = cu.socialMediaChannels[0];
  if (cont.website) {
    links.push({
      linkType: LinkTypeEnum.WWW,
      href: cont.website,
    });
  }
  if (cont.forumTag) {
    links.push({
      linkType: LinkTypeEnum.Forum,
      href: cont.forumTag,
    });
  }
  if (cont.discord) {
    links.push({
      linkType: LinkTypeEnum.Discord,
      href: cont.discord,
    });
  }
  if (cont.twitter) {
    links.push({
      linkType: LinkTypeEnum.Twitter,
      href: cont.twitter,
    });
  }
  if (cont.youtube) {
    links.push({
      linkType: LinkTypeEnum.Youtube,
      href: cont.youtube,
    });
  }
  if (cont.linkedIn) {
    links.push({
      linkType: LinkTypeEnum.LinkedIn,
      href: cont.linkedIn,
    });
  }
  return links;
};
export const fetchCoreUnitByCode = async(code: string) => {
  const res = (await request(GRAPHQL_ENDPOINT, GET_CU_ABOUT_BY_CODE, {
    filter: {
      code,
    },
  })) as { coreUnit: CuAbout[] };
  return res.coreUnit[0];
};
