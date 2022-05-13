import { gql, request } from 'graphql-request';
import { GraphQLEndpoint } from '../../../config/endpoints';
import { DateTime } from 'luxon';
import { LinkType } from '../../../core/enums/link-type.enum';
import { LinkModel } from '../../components/cutable-column-links/cutable-column-links';
import { FacilitatorModel } from '../../components/cutable-column-team-member/cutable-column-team-member';

export const GETCoreUnits = gql`
    query CoreUnits {
      coreUnits {
        id
        code
        name
        image
        cuMip {
          formalSubmission
          mipStatus
          accepted
          rfc
          rejected
          obsolete
          mip41 {
            facilitatorName
            contributorId
          }
        }
        roadMap {
          ownerCuId
        }
        socialMediaChannels {
          forumTag
          twitter
          youtube
          discord
          linkedIn
          website
        }
        budgetStatements {
          budgetStatementFTEs {
            month
            ftes
          }
          budgetStatus
        }
      }
    }
  `;

export interface cuMipDao {
  mipStatus: string,
  accepted: string,
  formalSubmission: string,
  rfc: string,
  rejected: string,
  obsolete: string,
  mip41: {
    facilitatorName: string,
    contributorId: string
  }[]
}

export interface CoreUnitDAO {
  id: string,
  code: string,
  name: string,
  image: string,
  cuMip: cuMipDao[]
  roadMap: {
    ownerCuId: string
  }[],
  socialMediaChannels: {
    forumTag: string,
    twitter: string,
    youtube: string,
    discord: string,
    linkedIn: string,
    website: string,
  }[],
  budgetStatements: {
    budgetStatus: string,
    budgetStatementFTEs: {
      month: string,
      ftes: number
    }[]
  }[]
}

export const fetchCoreUnits = async() => {
  const result = await request(GraphQLEndpoint, GETCoreUnits);
  return result.coreUnits;
};

export const getMipFromCoreUnit = (cu: CoreUnitDAO) => {
  if (cu.cuMip?.length === 0) return null;

  return cu.cuMip[cu.cuMip.length - 1];
};

export const getSubmissionDateFromCuMip = (mip: cuMipDao | null) => {
  if (!mip) return null;

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const date = mip[mip.mipStatus.toLowerCase()];
    return DateTime.fromFormat(date, 'yyyy-MM-dd').toJSDate();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const countInitiativesFromCoreUnit = (cu: CoreUnitDAO) => {
  if (cu.roadMap.length === 0) return 0;

  return cu.roadMap.reduce((pv, cv) => {
    return pv + (cv.ownerCuId === cu.id ? 1 : 0);
  }, 0);
};

export const getLinksFromCoreUnit = (cu: CoreUnitDAO) => {
  const result = [] as LinkModel[];

  if (cu.socialMediaChannels.length === 0) return result;

  const sm = cu.socialMediaChannels[0];

  if (sm.website) {
    result.push({
      linkType: LinkType.WWW,
      href: sm.website
    });
  }
  if (sm.forumTag) {
    result.push({
      linkType: LinkType.Forum,
      href: `https://forum.makerdao.com/search?q=${sm.forumTag}`
    });
  }
  if (sm.discord) {
    result.push({
      linkType: LinkType.Discord,
      href: sm.discord
    });
  }
  if (sm.twitter) {
    result.push({
      linkType: LinkType.Twitter,
      href: sm.twitter
    });
  }
  if (sm.youtube) {
    result.push({
      linkType: LinkType.Youtube,
      href: sm.youtube
    });
  }
  if (sm.linkedIn) {
    result.push({
      linkType: LinkType.LinkedIn,
      href: sm.linkedIn
    });
  }

  return result;
};

export const getFTEsFromCoreUnit = (cu: CoreUnitDAO) => {
  if (cu.budgetStatements.length === 0) return 0;
  if (!cu.budgetStatements[0].budgetStatementFTEs || cu.budgetStatements[0].budgetStatementFTEs.length === 0) return 0;

  return cu.budgetStatements[0].budgetStatementFTEs[0].ftes;
};

export const getFacilitatorsFromCoreUnit = (cu: CoreUnitDAO) => {
  const result = [] as FacilitatorModel[];

  if (cu.cuMip.length === 0) return result;
  if (cu.cuMip.every(x => x.mip41.length === 0)) return result;

  console.log(cu.cuMip[2]);
  return cu.cuMip[2].mip41.map(facilitator => ({
    name: facilitator.facilitatorName
  }) as FacilitatorModel);
};
