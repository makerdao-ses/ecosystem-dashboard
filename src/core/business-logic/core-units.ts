import { DateTime, Interval } from 'luxon';
import { LinkModel } from '../../stories/components/cu-table-column-links/cu-table-column-links';
import { LinkTypeEnum } from '../enums/link-type.enum';
import { FacilitatorModel } from '../../stories/components/cu-table-column-team-member/cu-table-column-team-member';
import { BudgetStatementDao, CoreUnitDao, CuMipDao, Mip40Dao } from '../../stories/containers/cu-table/cu-table.api';
import { CustomChartItem } from '../../stories/components/custom-bar-chart/custom-bar-chart';
import { CuStatusEnum } from '../enums/cu-status.enum';
import { RoadmapStatusEnum } from '../enums/roadmap-status.enum';

export const setCuMipStatusModifiedDate = (mip: CuMipDao, status: CuStatusEnum, date: string) => {
  let index = status.toLowerCase();

  if (status === CuStatusEnum.FormalSubmission) index = 'formalSubmission';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mip[index] = date;
};

export const getCuMipStatusModifiedDate = (mip: CuMipDao, status: CuStatusEnum) => {
  let index = status.toLowerCase();

  if (status === CuStatusEnum.FormalSubmission) index = 'formalSubmission';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return mip[index];
};

export const getMipFromCoreUnit = (cu: CoreUnitDao) => {
  if (cu.cuMip?.length === 0) return null;

  return cu.cuMip[cu.cuMip.length - 1];
};

export const getSubmissionDateFromCuMip = (mip: CuMipDao | null) => {
  if (!mip) return null;

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const date = getCuMipStatusModifiedDate(mip, mip.mipStatus);
    if (!date) return null;
    return DateTime.fromFormat(date, 'yyyy-MM-dd').toJSDate();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const countInitiativesFromCoreUnit = (cu: CoreUnitDao) => {
  if (cu.roadMap.length === 0) return 0;

  return cu.roadMap.reduce((pv, cv) => {
    return pv + (cv.ownerCuId === cu.id && cv.roadmapStatus === RoadmapStatusEnum.InProgress ? 1 : 0);
  }, 0);
};

export const getLinksFromCoreUnit = (cu: CoreUnitDao) => {
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
      href: sm.forumTag
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

export const getFTEsFromCoreUnit = (cu: CoreUnitDao) => {
  if (cu.budgetStatements?.length === 0) return 0;
  if (!cu.budgetStatements[0]?.budgetStatementFTEs || cu.budgetStatements[0]?.budgetStatementFTEs?.length === 0) return 0;

  return cu.budgetStatements[0].budgetStatementFTEs[0].ftes;
};

export const getFacilitatorsFromCoreUnit = (cu: CoreUnitDao) => {
  const result = [] as FacilitatorModel[];

  if (cu.cuMip?.length === 0) return result;

  if (cu.cuMip?.every(x => !x.mip41 || x.mip41?.length === 0)) return result;

  result.push(...cu.cuMip[cu.cuMip.length - 1]?.mip41?.map(facilitator => ({
    name: facilitator.facilitatorName,
    id: facilitator.contributorId
  }) as FacilitatorModel));

  return result;
};

const getBudgetCapForMip40onMonth = (mip40: Mip40Dao, month: DateTime) => {
  const budgetPeriod = mip40?.mip40BudgetPeriod?.find(bp => {
    const start = DateTime.fromFormat(bp.budgetPeriodStart, 'y-MM-dd');
    const end = DateTime.fromFormat(bp.budgetPeriodEnd, 'y-MM-dd');
    const interval = Interval.fromDateTimes(start, end);
    return interval.contains(month);
  });

  let result = 0;
  if (!budgetPeriod) return result;

  // eslint-disable-next-line no-return-assign
  budgetPeriod.mip40BudgetLineItem.forEach((lineItem) => result += lineItem.budgetCap);

  return result;
};

export const getBudgetCapFromCoreUnit = (cu: CoreUnitDao) => {
  let result = 0;
  if (cu.cuMip.length === 0) return result;

  let dateToCheck = DateTime.now();
  let divisor = 0;
  for (let i = 0; i < 3; i++) {
    dateToCheck = dateToCheck.minus({ months: 1 });
    result += cu.cuMip[cu.cuMip.length - 1]?.mip40.reduce((p, c) => {
      const value = getBudgetCapForMip40onMonth(c, dateToCheck);
      if (value > 0) divisor += 1;
      return value + p;
    }, 0);
  }

  if (divisor === 0) return 0;
  return result / divisor;
};

const sumAllLineItemsFromBudgetStatement = (budgetStatement: BudgetStatementDao) => {
  let result = 0;

  budgetStatement?.budgetStatementWallet.forEach(wallet => {
    wallet.budgetStatementLineItem.forEach(lineItem => {
      result += lineItem?.actual ?? 0;
    });
  });

  return result;
};

export const getExpenditureValueFromCoreUnit = (cu: CoreUnitDao) => {
  let result = 0;
  if (cu.budgetStatements.length === 0) return result;

  let dateToCheck = DateTime.now();
  for (let i = 0; i < 3; i++) {
    dateToCheck = dateToCheck.minus({ months: 1 });
    const temp = cu.budgetStatements.find(bs => bs.month.indexOf(dateToCheck.toFormat('y-MM')) > -1);
    if (temp) {
      result += sumAllLineItemsFromBudgetStatement(temp);
    }
  }

  return result;
};

export const getExpenditureAmountFromCoreUnit = (cu: CoreUnitDao) => {
  let result = 0;
  if (cu.budgetStatements.length === 0) return result;

  let dateToCheck = DateTime.now();
  for (let i = 0; i < 3; i++) {
    dateToCheck = dateToCheck.minus({ months: 1 });
    const temp = cu.budgetStatements.find(bs => bs.month.indexOf(dateToCheck.toFormat('y-MM')) > -1);
    if (temp) {
      result += 1;
    }
  }

  return result;
};

export const getPercentFromCoreUnit = (cu: CoreUnitDao) => {
  const value = getExpenditureValueFromCoreUnit(cu);
  const budgetCap = getBudgetCapFromCoreUnit(cu) * getExpenditureAmountFromCoreUnit(cu);

  if (value === 0) return 0;
  if (budgetCap === 0) return null;

  return value / budgetCap * 100;
};

export const getLast3ExpenditureValuesFromCoreUnit = (cu: CoreUnitDao) => {
  const result = [] as CustomChartItem[];
  if (cu.budgetStatements.length === 0) return result;

  let dateToCheck = DateTime.now();
  for (let i = 0; i < 3; i++) {
    dateToCheck = dateToCheck.minus({ months: 1 });
    const temp = cu.budgetStatements.find(bs => bs.month.indexOf(dateToCheck.toFormat('y-MM')) > -1);
    if (temp) {
      result.push({ value: sumAllLineItemsFromBudgetStatement(temp) });
    } else {
      result.push({ value: 0 });
    }
  }

  return result.reverse();
};

export const getMipUrlFromCoreUnit = (cu: CoreUnitDao) => {
  if (cu?.cuMip.length === 0) return '';
  return cu?.cuMip[0].mipUrl ?? '';
};
