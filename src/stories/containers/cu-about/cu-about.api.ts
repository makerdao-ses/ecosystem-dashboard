import { request, gql } from 'graphql-request';
import { GraphQlEndpoint } from '../../../config/endpoint';
import {
  LinkModel,
  LinkType,
} from '../../components/cutable-column-links/cutable-column-links';

export enum CuMipStatus {
  RFC = 'RFC',
  FORMAL = 'Formal',
  SUBMISSION = 'Submission',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Obsolete = 'Obsolete',
}

type SocialMediaChannels = {
  cuCode: string;
  forumTag: string;
  twitter: string;
  youtube: string;
  discord: string;
  linkedIn: string;
  website: string;
};

export type CuMip = {
  mipCode: string;
  cuId: string;
  rfc: string;
  formalSubmission: string;
  accepted: string;
  rejected: string;
  obsolete: string;
  mipStatus: CuMipStatus;
  url: string;
  mip39: [];
  mip40: [];
  mip41: [];
};

export interface CoreUnit {
  code: string;
  name: string;
  image: string;
  category: [];
  cuMip: CuMip;
  budgetStatements: [];
  socialMediaChannels: SocialMediaChannels[];
  contributorCommitment: [];
  cuGithubContribution: [];
  roadMap: [];
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

export const getMipsStatus = (mip: CuMip) => {
  switch (mip.mipStatus) {
    case CuMipStatus.Accepted:
      return CuMipStatus.Accepted;
    case CuMipStatus.Obsolete:
      return CuMipStatus.Obsolete;
    case CuMipStatus.FORMAL:
      return CuMipStatus.FORMAL;
    case CuMipStatus.Rejected:
      return CuMipStatus.Rejected;
    case CuMipStatus.RFC:
      return CuMipStatus.RFC;
    default:
      return CuMipStatus.Rejected;
  }
};

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
};

export const GET_CU_ABOUT_BY_CODE = gql`
  query CoreUnit($filter: CoreUnitFilter) {
    coreUnit(filter: $filter) {
      id
      code
      category
      name
      socialMediaChannels {
        discord
        forumTag
        linkedIn
        twitter
        website
        youtube
        linkedIn
      }
    }
  }
`;

interface CuAboutCodeByCode {
  code: string;
}

export const fetchCoreUnitByCode = async({ code }: CuAboutCodeByCode) => {
  const data = await request(GraphQlEndpoint, GET_CU_ABOUT_BY_CODE, {
    filter: {
      code,
    },
  });
  return (data.coreUnit as CoreUnit[]) || [];
};
