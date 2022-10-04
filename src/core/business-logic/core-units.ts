import { DateTime, Interval } from 'luxon';
import { LinkModel } from '../../stories/components/cu-table-column-links/cu-table-column-links';
import { LinkTypeEnum } from '../enums/link-type.enum';
import {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto,
  CoreUnitDto,
  CuMipDto,
  Mip40BudgetPeriodDto,
  Mip40Dto,
  Mip40WalletDto,
} from '../models/dto/core-unit.dto';
import { CuStatusEnum } from '../enums/cu-status.enum';
import { RoadmapStatusEnum } from '../enums/roadmap-status.enum';
import { CustomChartItemModel } from '../models/custom-chart-item.model';
import _ from 'lodash';
import { API_MONTH_FROM_FORMAT, API_MONTH_TO_FORMAT } from '../utils/date.utils';

export const setCuMipStatusModifiedDate = (mip: CuMipDto, status: CuStatusEnum, date: string) => {
  let index = status.toLowerCase();

  if (status === CuStatusEnum.FormalSubmission) index = 'formalSubmission';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mip[index] = date;
};

export const getCuMipStatusModifiedDate = (mip: CuMipDto, status: CuStatusEnum) => {
  if (!mip) return '';
  let index = status.toLowerCase();
  if (status === CuStatusEnum.FormalSubmission) index = 'formalSubmission';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return mip[index];
};

export const getLatestMip39FromCoreUnit = (cu?: CoreUnitDto | null) => {
  if (!cu) return null;
  const mip39s = cu.cuMip?.filter((mip) => mip.mipCode?.indexOf('MIP39') > -1) ?? [];
  if (mip39s.length === 0) return null;

  return mip39s[mip39s.length - 1];
};

export const getSubmissionDateFromCuMip = (mip: CuMipDto | null) => {
  if (!mip) return null;

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const date = getCuMipStatusModifiedDate(mip, mip.mipStatus);
    if (!date) return null;
    return DateTime.fromFormat(date, API_MONTH_FROM_FORMAT).toJSDate();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const countInitiativesFromCoreUnit = (cu: CoreUnitDto) => {
  if (cu.roadMap.length === 0) return 0;

  return cu.roadMap.reduce((pv, cv) => {
    return pv + (cv.ownerCuId === cu.id && cv.roadmapStatus === RoadmapStatusEnum.InProgress ? 1 : 0);
  }, 0);
};

export const getLinksFromCoreUnit = (cu: CoreUnitDto) => {
  const result = [] as LinkModel[];

  if (cu.socialMediaChannels.length === 0) return result;

  const sm = cu.socialMediaChannels[0];

  if (sm.website) {
    result.push({
      linkType: LinkTypeEnum.WWW,
      href: sm.website,
    });
  }
  if (sm.forumTag) {
    result.push({
      linkType: LinkTypeEnum.Forum,
      href: sm.forumTag,
    });
  }
  if (sm.discord) {
    result.push({
      linkType: LinkTypeEnum.Discord,
      href: sm.discord,
    });
  }
  if (sm.twitter) {
    result.push({
      linkType: LinkTypeEnum.Twitter,
      href: sm.twitter,
    });
  }
  if (sm.github) {
    result.push({
      linkType: LinkTypeEnum.Github,
      href: sm.github,
    });
  }
  if (sm.youtube) {
    result.push({
      linkType: LinkTypeEnum.Youtube,
      href: sm.youtube,
    });
  }
  if (sm.linkedIn) {
    result.push({
      linkType: LinkTypeEnum.LinkedIn,
      href: sm.linkedIn,
    });
  }

  return result;
};

const getLatestBudgetStatementWithFTE = (budgetStatements: BudgetStatementDto[]): BudgetStatementDto | null => {
  if (!budgetStatements || budgetStatements.length === 0) return null;
  const filtered = budgetStatements.filter((bs) => bs.budgetStatementFTEs.length > 0);
  return filtered.length ? filtered[filtered.length - 1] : null;
};

export const getFTEsFromCoreUnit = (cu: CoreUnitDto) => {
  if (cu.budgetStatements?.length === 0) return 0;

  return (
    getLatestBudgetStatementWithFTE(cu.budgetStatements as BudgetStatementDto[])?.budgetStatementFTEs[0]?.ftes ?? 0
  );
};

export const getFacilitatorsFromCoreUnit = (cu: CoreUnitDto) => {
  return cu?.contributorCommitment?.filter((cc) => cc.jobTitle === 'Facilitator');
};

const checkDateOnPeriod = (period: Mip40BudgetPeriodDto, date: DateTime) => {
  if (!period) return false;
  const start = DateTime.fromFormat(period.budgetPeriodStart, 'y-MM-dd');
  const end = DateTime.fromFormat(period.budgetPeriodEnd, 'y-MM-dd');
  const interval = Interval.fromDateTimes(start, end);

  return interval.contains(date);
};

const findMip40 = (cu: CoreUnitDto, date: DateTime): Mip40Dto | null => {
  const cuMips = cu.cuMip?.filter((mip) => mip.mipStatus === CuStatusEnum.Accepted) ?? [];

  for (const mip of cuMips) {
    for (const mip40 of mip.mip40.filter((mip) => !mip.mkrOnly)) {
      for (const period of mip40.mip40BudgetPeriod) {
        if (checkDateOnPeriod(period, date)) {
          return mip40;
        }
      }
    }
  }

  return null;
};

const sumLineItems = (wallet: Mip40WalletDto) => {
  return wallet.mip40BudgetLineItem.reduce((p, c) => (c.budgetCap ?? 0) + p, 0);
};

export const getBudgetCapsFromCoreUnit = (cu: CoreUnitDto) => {
  const result: number[] = [];
  if (cu.cuMip.length === 0) return result;

  let mip40;
  for (const dateToCheck of getLast3MonthsWithData(cu.budgetStatements)) {
    // Check the period found before to avoid re-surfing the array
    if (!mip40 || !checkDateOnPeriod(mip40.mip40BudgetPeriod[0], dateToCheck)) {
      mip40 = findMip40(cu, dateToCheck);
    }
    result.push(mip40?.mip40Wallet?.reduce((p, c) => (sumLineItems(c) ?? 0) + p, 0) ?? 0);
  }

  return result;
};

const sumAllLineItemsFromBudgetStatement = (budgetStatement: BudgetStatementDto, month: DateTime) => {
  let result = 0;

  budgetStatement?.budgetStatementWallet.forEach((wallet) => {
    wallet.budgetStatementLineItem
      .filter((x) => x.month === month.toFormat(API_MONTH_TO_FORMAT))
      .forEach((lineItem) => {
        result += lineItem?.actual ?? 0;
      });
  });

  return result;
};

export const getExpenditureValueFromCoreUnit = (cu: CoreUnitDto) => {
  let result = 0;
  if (cu.budgetStatements.length === 0) return result;

  for (const dateToCheck of getLast3MonthsWithData(cu.budgetStatements)) {
    const temp = cu.budgetStatements?.find((bs) => bs.month === dateToCheck.toFormat(API_MONTH_TO_FORMAT));
    if (temp) {
      result += sumAllLineItemsFromBudgetStatement(temp, dateToCheck);
    }
  }

  return result;
};

export const getExpenditureAmountFromCoreUnit = (cu: CoreUnitDto) => {
  let result = 0;
  if (cu.budgetStatements.length === 0) return result;

  for (const dateToCheck of getLast3MonthsWithData(cu.budgetStatements)) {
    const temp = cu.budgetStatements?.find((bs) => bs.month === dateToCheck.toFormat(API_MONTH_TO_FORMAT));
    if (temp) {
      result += 1;
    }
  }

  return result;
};

export const getPercentFromCoreUnit = (cu: CoreUnitDto) => {
  const value = getExpenditureValueFromCoreUnit(cu);
  const budgetCap = _.sum(getBudgetCapsFromCoreUnit(cu));

  if (value === 0) return 0;
  if (budgetCap === 0) return 0;

  return (value / budgetCap) * 100;
};

export const getLast3ExpenditureValuesFromCoreUnit = (cu: CoreUnitDto) => {
  const result = [] as CustomChartItemModel[];
  if (cu.budgetStatements.length === 0) return new Array(3).fill({ value: 0 });

  for (const dateToCheck of getLast3MonthsWithData(cu.budgetStatements)) {
    const temp = cu.budgetStatements?.find((bs) => bs.month === dateToCheck.toFormat(API_MONTH_TO_FORMAT));

    if (temp) {
      result.push({ value: sumAllLineItemsFromBudgetStatement(temp, dateToCheck) });
    } else {
      result.push({ value: 0 });
    }
  }

  return result;
};

export const getCurrentOrLastMonthWithData = (budgetStatements: BudgetStatementDto[]) => {
  const currentMonth = DateTime.now().startOf('month');

  const orderedStatements = _.sortBy(budgetStatements, (bs) => bs.month).reverse();

  for (const bs of orderedStatements) {
    for (const wallet of bs.budgetStatementWallet) {
      for (const item of wallet.budgetStatementLineItem.filter((li) => li.month === bs.month)) {
        if (item.actual) {
          const itemMonth = DateTime.fromFormat(bs.month, API_MONTH_FROM_FORMAT);

          if (itemMonth.toMillis() <= currentMonth.toMillis()) {
            return itemMonth;
          }
        }
      }
    }
  }

  return currentMonth;
};

export const getLastMonthWithActualOrForecast = (budgetStatements: BudgetStatementDto[]) => {
  // The budget statements should be provided in a descending date order but
  // it's better to order it client side to avoid future issues
  const orderedStatements = _.sortBy(budgetStatements, (bs) => bs.month).reverse();

  for (const bs of orderedStatements) {
    for (const wallet of bs.budgetStatementWallet) {
      for (const item of wallet.budgetStatementLineItem.filter((li) => li.month === bs.month)) {
        if (item.actual || item.forecast) {
          return DateTime.fromFormat(bs.month, API_MONTH_FROM_FORMAT);
        }
      }
    }
  }

  return DateTime.now();
};

export const getLastMonthWithData = (cu: CoreUnitDto) => {
  if (cu.lastActivity?.created_at) {
    return DateTime.fromISO(cu.lastActivity?.created_at);
  }

  return undefined;
};

export const getLast3MonthsWithData = (budgetStatements: BudgetStatementDto[]) => {
  // The budget statements should be provided in a descending date order but
  // it's better to order it client side to avoid future issues
  const orderedStatements = _.sortBy(budgetStatements, (bs) => bs.month).reverse();

  for (const bs of orderedStatements) {
    for (const wallet of bs.budgetStatementWallet) {
      for (const item of wallet.budgetStatementLineItem.filter((li) => li.month === bs.month)) {
        if (item.actual) {
          const date = DateTime.fromFormat(bs.month, API_MONTH_FROM_FORMAT);

          return [date, date.minus({ months: 1 }), date.minus({ months: 2 })].reverse();
        }
      }
    }
  }

  return [DateTime.now(), DateTime.now().minus({ months: 1 }), DateTime.now().minus({ months: 2 })].reverse();
};

export const getLast3MonthsWithDataFormatted = (cu: CoreUnitDto) => {
  const dates = getLast3MonthsWithData(cu.budgetStatements);

  return dates.map((date) => date.toFormat('MMMM'));
};

export const getMipUrlFromCoreUnit = (cu: CoreUnitDto) => {
  if (cu?.cuMip.length === 0) return '';
  return cu?.cuMip[0].mipUrl ?? '';
};

export const getNumberComments = (cu: CoreUnitDto) => {
  let totalComments = 0;
  if (!cu) return totalComments;
  if (cu.budgetStatements.length === 0) return totalComments;
  cu.budgetStatements?.forEach((budgetStatement: BudgetStatementDto) => {
    budgetStatement?.budgetStatementWallet?.forEach((statementWallet: BudgetStatementWalletDto) => {
      statementWallet?.budgetStatementLineItem?.forEach((budgetStatementLineItem: BudgetStatementLineItemDto) => {
        if (typeof budgetStatementLineItem.comments !== 'object' && budgetStatementLineItem.comments !== '') {
          totalComments += 1;
        }
      });
    });
  });
  return totalComments;
};
