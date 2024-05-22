import _ from 'lodash';
import { DateTime, Interval } from 'luxon';
import { LinkTypeEnum } from '../enums/linkTypeEnum';
import { BudgetStatus } from '../models/dto/coreUnitDTO';
import { TeamStatus } from '../models/interfaces/types';
import { API_MONTH_FROM_FORMAT, API_MONTH_TO_FORMAT } from '../utils/date';
import type { LinkModel } from '../../stories/components/CuTableColumnLinks/CuTableColumnLinks';
import type { CustomChartItemModel } from '../models/customChartItemModel';
import type { BudgetStatement, BudgetStatementFTEs } from '../models/interfaces/budgetStatement';
import type { BudgetStatementComment } from '../models/interfaces/budgetStatementComment';
import type { CoreUnit } from '../models/interfaces/coreUnit';
import type { CuMip, Mip40, Mip40BudgetPeriod, Mip40Wallet } from '../models/interfaces/cuMip';
import type { WithActivityFeed } from '../models/interfaces/generics';

export const setCuMipStatusModifiedDate = (mip: CuMip, status: TeamStatus, date: string) => {
  let index = status.toLowerCase();

  if (status === TeamStatus.FormalSubmission) index = 'formalSubmission';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mip[index] = date;
};

export const getCuMipStatusModifiedDate = (mip: CuMip, status: TeamStatus) => {
  if (!mip) return '';
  let index = status.toLowerCase();
  if (status === TeamStatus.FormalSubmission) index = 'formalSubmission';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return mip[index];
};

export const getLatestMip39FromCoreUnit = (cu?: CoreUnit | null) => {
  if (!cu) return null;
  const mip39s = cu.cuMip?.filter((mip) => mip.mipCode?.indexOf('MIP39') > -1) ?? [];
  if (mip39s.length === 0) return null;

  return mip39s[mip39s.length - 1];
};

export const getStatusMip39AcceptedOrObsolete = (cu?: CoreUnit | null): TeamStatus => {
  const lastMip39 = getLatestMip39FromCoreUnit(cu);
  const mipCode = lastMip39?.mipCode;
  const mipStatus = lastMip39?.mipStatus || TeamStatus.Accepted;
  return mipCode?.includes('MIP39c3') && mipStatus === 'Accepted' ? TeamStatus.Obsolete : mipStatus;
};
export const getSubmissionDateFromCuMip = (mip: CuMip | null) => {
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

export const getLinksFromCoreUnit = (cu: CoreUnit) => {
  const result = [] as LinkModel[];
  if (!cu.socialMediaChannels) return result;
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

const getLatestBudgetStatementWithFTE = (budgetStatements: BudgetStatement[]): BudgetStatementFTEs | null => {
  if (!budgetStatements || budgetStatements.length === 0) return null;
  const filtered = budgetStatements.filter((bs: BudgetStatement) => bs.budgetStatementFTEs.length > 0);
  const arrayItemsFts: BudgetStatementFTEs[] = [];

  filtered.forEach((item: BudgetStatement) => {
    item.budgetStatementFTEs.forEach((budgetStatementFTEs: BudgetStatementFTEs) => {
      arrayItemsFts.push({
        ftes: budgetStatementFTEs.ftes,
        month: budgetStatementFTEs.month,
      });
    });
  });

  const orderBudget = _.orderBy(arrayItemsFts, 'month');
  return orderBudget.length > 0 ? orderBudget[orderBudget.length - 1] : null;
};

export const getFTEsFromCoreUnit = (cu: CoreUnit) => {
  if (cu.budgetStatements?.length === 0) return 0;

  return getLatestBudgetStatementWithFTE(cu.budgetStatements as BudgetStatement[])?.ftes ?? 0;
};

export const getFacilitatorsFromCoreUnit = (cu: CoreUnit) =>
  cu?.contributorCommitment?.filter((cc) => cc.jobTitle === 'Facilitator');

const checkDateOnPeriod = (period: Mip40BudgetPeriod, date: DateTime) => {
  if (!period) return false;
  const start = DateTime.fromFormat(period.budgetPeriodStart, 'y-MM-dd');
  const end = DateTime.fromFormat(period.budgetPeriodEnd, 'y-MM-dd');
  const interval = Interval.fromDateTimes(start, end);

  return interval.contains(date);
};

const findMip40 = (cu: CoreUnit, date: DateTime): Mip40 | null => {
  const cuMips = cu.cuMip?.filter((mip) => mip.mipStatus === TeamStatus.Accepted || TeamStatus.Obsolete) ?? [];

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

const sumLineItems = (wallet: Mip40Wallet) => wallet.mip40BudgetLineItem.reduce((p, c) => (c.budgetCap ?? 0) + p, 0);

export const getBudgetCapsFromCoreUnit = (cu: CoreUnit) => {
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

const sumAllLineItemsFromBudgetStatement = (budgetStatement: BudgetStatement, month: DateTime) => {
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

export const getExpenditureValueFromCoreUnit = (cu: CoreUnit) => {
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

export const getExpenditureAmountFromCoreUnit = (cu: CoreUnit) => {
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

export const getPercentFromCoreUnit = (cu: CoreUnit) => {
  const value = getExpenditureValueFromCoreUnit(cu);
  const budgetCap = _.sum(getBudgetCapsFromCoreUnit(cu));

  if (value === 0) return 0;
  if (budgetCap === 0) return 0;

  return (value / budgetCap) * 100;
};

export const getLast3ExpenditureValuesFromCoreUnit = (cu: CoreUnit) => {
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

export const getCurrentOrLastMonthWithData = (budgetStatements: BudgetStatement[]) => {
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

export const getLastMonthWithActualOrForecast = (budgetStatements: BudgetStatement[], ascending?: boolean) => {
  // The budget statements should be provided in a descending date order but
  // it's better to order it client side to avoid future issues
  const orderedStatements = ascending
    ? _.sortBy(budgetStatements, (bs) => bs.month)
    : _.sortBy(budgetStatements, (bs) => bs.month).reverse();

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

export const getLastMonthWithData = (cu: CoreUnit) => {
  if (cu.lastActivity?.created_at) {
    return DateTime.fromISO(cu.lastActivity?.created_at);
  }

  return undefined;
};

export const getLastUpdateForBudgetStatement = (element: WithActivityFeed, budgetStatementId: string) => {
  const activityFeed = element?.activityFeed?.filter(
    (af) => Number(af.params.budgetStatementId) === Number(budgetStatementId)
  );

  if (!activityFeed?.length) return undefined;

  _.sortBy(activityFeed, (af) => af.created_at).reverse();

  return DateTime.fromISO(activityFeed[0].created_at);
};

export const getLast3MonthsWithData = (budgetStatements: BudgetStatement[]) => {
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

export const getLast3MonthsWithDataFormatted = (cu: CoreUnit) => {
  const dates = getLast3MonthsWithData(cu.budgetStatements);
  return dates.map((date) => date.toString());
};

export const getMipUrlFromCoreUnit = (cu: CoreUnit) => {
  const mipStatus = getStatusMip39AcceptedOrObsolete(cu);
  if (cu?.cuMip.length === 0) return '';
  return mipStatus === TeamStatus.Obsolete ? cu.cuMip[cu.cuMip.length - 1].mipUrl : cu.cuMip[0].mipUrl;
};

export const getAllCommentsBudgetStatementLine = (budgetStatement?: BudgetStatement) => {
  const commentsWithDate = [] as (BudgetStatementComment & { date: DateTime })[];

  if (!budgetStatement?.comments?.length) return commentsWithDate;
  budgetStatement.comments.forEach((comment) => {
    commentsWithDate.push({
      ...comment,
      date: DateTime.fromISO(comment.timestamp),
    });
  });
  commentsWithDate.sort((a, b) => a.date.toMillis() - b.date.toMillis());

  const comments = commentsWithDate.map((comment, index, array) => {
    if (
      (index === 0 && comment.status !== BudgetStatus.Draft) ||
      (index !== 0 && array[index - 1].status !== comment.status)
    ) {
      // status change occurred
      if (comment.comment?.trim()) {
        return [
          {
            ...comment,
            id: `${comment.id}-change`,
            comment: '',
          },
          comment,
        ];
      }
    }

    return comment;
  });

  return comments.flat() as BudgetStatementComment[];
};
