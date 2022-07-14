import { DateTime, Interval } from 'luxon';
import { LinkModel } from '../../stories/components/cu-table-column-links/cu-table-column-links';
import { LinkTypeEnum } from '../enums/link-type.enum';
import {
  BudgetStatementDto,
  CoreUnitDto,
  CuMipDto,
  Mip40BudgetPeriodDto,
  Mip40Dto,
  Mip40WalletDto
} from '../models/dto/core-unit.dto';
import { CuStatusEnum } from '../enums/cu-status.enum';
import { RoadmapStatusEnum } from '../enums/roadmap-status.enum';
import { FacilitatorModel } from '../models/facilitator.model';
import { CustomChartItemModel } from '../models/custom-chart-item.model';
import { BudgetStatement, CuAbout, CuMip } from '../../stories/containers/cu-about/cu-about.api';
import _ from 'lodash';
import { API_MONTH_FORMAT } from '../utils/date.utils';

export const setCuMipStatusModifiedDate = (mip: CuMipDto | CuMip, status: CuStatusEnum, date: string) => {
  let index = status.toLowerCase();

  if (status === CuStatusEnum.FormalSubmission) index = 'formalSubmission';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mip[index] = date;
};

export const getCuMipStatusModifiedDate = (mip: CuMipDto | CuMip | null, status: CuStatusEnum | string) => {
  if (!mip) return '';
  let index = status.toLowerCase();
  if (status === CuStatusEnum.FormalSubmission) index = 'formalSubmission';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return mip[index];
};

export const getLatestMip39FromCoreUnit = (cu?: CoreUnitDto | null) => {
  if (!cu) return null;
  const mip39s = cu.cuMip?.filter(mip => mip.mipCode?.indexOf('MIP39') > -1) ?? [];
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
    return DateTime.fromFormat(date, 'yyyy-MM-dd').toJSDate();
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

const getLatestBudgetStatementWithFTE = (budgetStatements: BudgetStatementDto[]): BudgetStatementDto | null => {
  if (!budgetStatements || budgetStatements.length === 0) return null;
  const filtered = budgetStatements.filter(bs => bs.budgetStatementFTEs.length > 0);
  return filtered.length ? filtered[0] : null;
};

export const getFTEsFromCoreUnit = (cu: CoreUnitDto | CuAbout) => {
  if (cu.budgetStatements?.length === 0) return 0;

  return getLatestBudgetStatementWithFTE(cu.budgetStatements as BudgetStatementDto[])?.budgetStatementFTEs[0]?.ftes ?? 0;
};

export const getFacilitatorsFromCoreUnit = (cu: CoreUnitDto) => {
  const result = [] as FacilitatorModel[];

  if (cu.cuMip?.length === 0) return result;

  if (cu.cuMip?.every(x => !x.mip41 || x.mip41?.length === 0)) return result;

  try {
    const mip41 = cu.cuMip[cu.cuMip.length - 1]?.mip41;
    const contributor = mip41 && mip41.length && mip41[0].contributor;

    if (contributor) {
      result.push(...contributor);
    }
  } catch (e) {
    console.log(e);
  }

  return result;
};

const checkDateOnPeriod = (period: Mip40BudgetPeriodDto, date: DateTime) => {
  if (!period) return false;
  const start = DateTime.fromFormat(period.budgetPeriodStart, 'y-MM-dd');
  const end = DateTime.fromFormat(period.budgetPeriodEnd, 'y-MM-dd');
  const interval = Interval.fromDateTimes(start, end);

  return interval.contains(date);
};

const findMip40 = (cu: CoreUnitDto, date: DateTime): Mip40Dto | null => {
  for (let i = 0; i < cu.cuMip?.length ?? 0; i++) {
    const mip = cu.cuMip[i];

    for (let j = 0; j < mip.mip40?.length ?? 0; j++) {
      const mip40 = mip.mip40[j];

      for (let k = 0; k < mip40.mip40BudgetPeriod?.length ?? 0; k++) {
        const period = mip40.mip40BudgetPeriod[k];

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

  let dateToCheck = DateTime.now();
  let mip40;
  for (let i = 0; i < 3; i++) {
    dateToCheck = dateToCheck.minus({ months: 1 });
    // Check the period found before to avoid re-surfing the array
    if (!mip40 || !checkDateOnPeriod(mip40.mip40BudgetPeriod[0], dateToCheck)) {
      mip40 = findMip40(cu, dateToCheck);
    }
    result.push(mip40?.mip40Wallet?.reduce((p, c) => (sumLineItems(c) ?? 0) + p, 0) ?? 0);
  }

  return result.reverse();
};

const sumAllLineItemsFromBudgetStatement = (budgetStatement: BudgetStatementDto, month: DateTime) => {
  let result = 0;

  budgetStatement?.budgetStatementWallet.forEach(wallet => {
    wallet.budgetStatementLineItem.filter(x => x.month === month.toFormat(API_MONTH_FORMAT)).forEach(lineItem => {
      result += lineItem?.actual ?? 0;
    });
  });

  return result;
};

export const getExpenditureValueFromCoreUnit = (cu: CoreUnitDto) => {
  let result = 0;
  if (cu.budgetStatements.length === 0) return result;

  let dateToCheck = DateTime.now();
  for (let i = 0; i < 3; i++) {
    dateToCheck = dateToCheck.minus({ months: 1 });
    const temp = cu.budgetStatements.find(bs => bs.month === dateToCheck.toFormat(API_MONTH_FORMAT));
    if (temp) {
      result += sumAllLineItemsFromBudgetStatement(temp, dateToCheck);
    }
  }

  return result;
};

export const getExpenditureAmountFromCoreUnit = (cu: CoreUnitDto) => {
  let result = 0;
  if (cu.budgetStatements.length === 0) return result;

  let dateToCheck = DateTime.now();
  for (let i = 0; i < 3; i++) {
    dateToCheck = dateToCheck.minus({ months: 1 });
    const temp = cu.budgetStatements.find(bs => bs.month === dateToCheck.toFormat(API_MONTH_FORMAT));
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

  return value / budgetCap * 100;
};

export const getLast3ExpenditureValuesFromCoreUnit = (cu: CoreUnitDto) => {
  const result = [] as CustomChartItemModel[];
  if (cu.budgetStatements.length === 0) return new Array(3).fill({ value: 0 });

  let dateToCheck = DateTime.now();
  for (let i = 0; i < 3; i++) {
    dateToCheck = dateToCheck.minus({ months: 1 });
    const temp = cu.budgetStatements.find(bs => bs.month === dateToCheck.toFormat(API_MONTH_FORMAT));

    if (temp) {
      result.push({ value: sumAllLineItemsFromBudgetStatement(temp, dateToCheck) });
    } else {
      result.push({ value: 0 });
    }
  }

  return result.reverse();
};

export const getMipUrlFromCoreUnit = (cu: CoreUnitDto) => {
  if (cu?.cuMip.length === 0) return '';
  return cu?.cuMip[0].mipUrl ?? '';
};
