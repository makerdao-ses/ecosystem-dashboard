import { request, gql } from 'graphql-request';
import { GraphQlEndpoint } from '../../../config/endpoint';
import { CuCategory } from '../../../core/enums/cu-category';
import {
  LinkModel,
  LinkType,
} from '../../components/cutable-column-links/cutable-column-links';
import { CoreUnit } from '../../components/title-navigation-cu-about/title-navigation-cu-about';

interface BudgetStatementFTEs {
  month: string;
  ftes: number;
}

interface BudgetStatement {
  budgetStatementFTEs: BudgetStatementFTEs[];
}

export enum CuMipStatus {
  RFC = 'RFC',
  FORMAL = 'Formal',
  SUBMISSION = 'Submission',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Obsolete = 'Obsolete',
}

export interface RelateMipsCuAbout {
  mipTitle: string;
  mipUrl: string;
  mipStatus: CuMipStatus;
  accepted?: string;
  obsolete?: string;
  rfc?: string;
  formalSubmission?: string;
  rejected?: string;
}

export interface CuMip {
  mipTitle: string;
  mipCode: string;
  cuId: string;
  rfc?: string;
  formalSubmission: string;
  accepted?: string;
  rejected?: string;
  obsolete?: string;
  mipStatus: CuMipStatus;
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
  jobTitle: string;
  commitment: Commitment;
  contributor: Contributor[];
}

export interface SocialMediaChannels {
  cuCode: string;
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
  category: CuCategory[];
  name: string;
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
  socialMediaChannels: SocialMediaChannels[];
  cuMip: CuMip[];
  budgetStatements: BudgetStatement[];
  contributorCommitment: ContributorCommitment[];
}
interface BudgetStatementFTEs {
  month: string;
  ftes: number;
}
interface BudgetStatement {
  budgetStatementFTEs: BudgetStatementFTEs[];
}

export const GET_CU_ABOUT_BY_CODE = gql`
  query CoreUnit($filter: CoreUnitFilter) {
    coreUnit(filter: $filter) {
      id
      code
      category
      name
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
        linkedIn
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
      linkType: LinkType.WWW,
      href: cont.website,
    });
  }
  if (cont.forumTag) {
    links.push({
      linkType: LinkType.Forum,
      href: cont.forumTag,
    });
  }
  if (cont.discord) {
    links.push({
      linkType: LinkType.Discord,
      href: cont.discord,
    });
  }
  if (cont.twitter) {
    links.push({
      linkType: LinkType.Twitter,
      href: cont.twitter,
    });
  }
  if (cont.youtube) {
    links.push({
      linkType: LinkType.Youtube,
      href: cont.youtube,
    });
  }
  if (cont.linkedIn) {
    links.push({
      linkType: LinkType.LinkedIn,
      href: cont.linkedIn,
    });
  }
  return links;
};

export const getFTEsFromCoreUnitAbout = (cu: CuAbout) => {
  if (cu.budgetStatements.length === 0) return 0;
  if (
    !cu.budgetStatements[0].budgetStatementFTEs ||
    cu.budgetStatements[0].budgetStatementFTEs.length === 0
  ) {
    return 0;
  }

  return cu.budgetStatements[0].budgetStatementFTEs[0].ftes;
};

// eslint-disable-next-line space-before-function-paren
export const fetchCoreUnitByCode = async (code: string) => {
  const res = (await request(GraphQlEndpoint, GET_CU_ABOUT_BY_CODE, {
    filter: {
      code,
    },
  })) as { coreUnit: CuAbout[] };
  return res.coreUnit[0];
};
