import { DateTime } from 'luxon';
import { LinkModel } from '../../components/cutable-column-links/cutable-column-links';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';
import { FacilitatorModel } from '../../components/cutable-column-team-member/cutable-column-team-member';
import { CoreUnitDAO, cuMipDao } from './cutable.api';
import { CustomChartItem } from '../../components/custom-bar-chart/custom-bar-chart';

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
      linkType: LinkTypeEnum.WWW,
      href: sm.website
    });
  }
  if (sm.forumTag) {
    result.push({
      linkType: LinkTypeEnum.Forum,
      href: `https://forum.makerdao.com/search?q=${sm.forumTag}`
    });
  }
  if (sm.discord) {
    result.push({
      linkType: LinkTypeEnum.Discord,
      href: sm.discord
    });
  }
  if (sm.twitter) {
    result.push({
      linkType: LinkTypeEnum.Twitter,
      href: sm.twitter
    });
  }
  if (sm.youtube) {
    result.push({
      linkType: LinkTypeEnum.Youtube,
      href: sm.youtube
    });
  }
  if (sm.linkedIn) {
    result.push({
      linkType: LinkTypeEnum.LinkedIn,
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

  // TODO: Make sure to obtain the latest Mip41 to be able to obtain the proper value here
  result.push(...cu.cuMip[2].mip41.map(facilitator => ({
    name: facilitator.facilitatorName,
    id: facilitator.contributorId
  }) as FacilitatorModel));

  return result;
};

export const getBudgetCapFromCoreUnit = (cu: CoreUnitDAO) => {
  let result = 0;
  if (cu.cuMip.length === 0) return result;

  // TODO: Make sure to obtain the latest Mip40 to be able to obtain the proper value here
  for (let i = 0; i < 3; i++) {
    result += cu.cuMip[0]?.mip40[0]?.mip40BudgetPeriod[0]?.mip40BudgetLineItem[i]?.budgetCap ?? 0;
  }

  return result / 3;
};

export const getValueFromCoreUnit = (cu: CoreUnitDAO) => {
  let result = 0;
  if (cu.cuMip.length === 0) return result;

  // TODO: Make sure to obtain the latest budget statement to obtain the proper value here
  for (let i = 0; i < 3; i++) {
    result += cu.budgetStatements[0]?.budgetStatementWallet[0]?.budgetStatementLineItem[i]?.actual ?? 0;
  }

  return result / 3;
};

export const getPercentFromCoreUnit = (cu: CoreUnitDAO) => {
  const value = getValueFromCoreUnit(cu);
  const budgetCap = getBudgetCapFromCoreUnit(cu);

  if (value === 0) return 0;
  if (budgetCap === 0) return null;

  return value / budgetCap * 100;
};

export const getExpenditureValuesFromCoreUnit = (cu: CoreUnitDAO) => {
  const result = [] as CustomChartItem[];
  if (cu.cuMip.length === 0) return result;

  // TODO: Make sure to obtain the latest budget statement to obtain the proper value here
  for (let i = 0; i < 3; i++) {
    result.push({ value: cu.budgetStatements[0]?.budgetStatementWallet[0]?.budgetStatementLineItem[i]?.actual ?? 0 });
  }
  console.log(result);
  return result;
};
