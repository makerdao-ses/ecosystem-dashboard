import forEach from 'lodash/forEach';
import groupBy from 'lodash/groupBy';
import { DateTime } from 'luxon';
import { LinkTypeEnum } from '../enums/linkTypeEnum';
import { getNameDelegates } from '../utils/string';
import type { DelegateSocialDto, RecognizedDelegatesDto } from '../models/dto/delegatesDTO';
import type { ExpenseDto } from '../models/dto/expensesDTO';
import type { LinkModel } from '@ses/containers/RecognizedDelegates/DelegateExpenseBreakdown/DelegateSocialLink';

export const getLinksFromRecognizedDelegates = (del: RecognizedDelegatesDto): LinkModel[] => {
  const result = [] as LinkModel[];
  if (!del.socials) {
    return result;
  }

  const sm = del.socials as DelegateSocialDto;

  const linkTypeMap: Record<string, LinkTypeEnum> = {
    forumPlatform: LinkTypeEnum.Forum,
    forumProfile: LinkTypeEnum.ProfileForum,
    votingPortal: LinkTypeEnum.VotingSocialPortal,
    twitter: LinkTypeEnum.TwitterFooter,
    youtube: LinkTypeEnum.Youtube,
  };
  const descriptionOfTooltip: Record<string, string> = {
    twitter: 'Twitter',
    youtube: 'Youtube',
    forumPlatform: 'Forum',
    forumProfile: 'Profile',
    votingPortal: 'Voting Portal',
  };

  for (const [property, linkType] of Object.entries(linkTypeMap)) {
    if (sm[property]) {
      result.push({
        href: sm[property] || '',
        linkType,
        toolTipDescription: descriptionOfTooltip[property],
      });
    }
  }

  return result;
};

export const delegateWithActuals = (delegates: RecognizedDelegatesDto[], delegatesNumbers: ExpenseDto[]) => {
  const delegatesWithActuals = delegates.map((delegate) => {
    const expense = delegatesNumbers.find((number) => getNameDelegates(number.budget) === delegate.name);
    return expense
      ? {
          ...delegate,
          actuals: expense.actuals || 0,
        }
      : delegate;
  });
  return delegatesWithActuals;
};

export const sumActualsByPeriod = (expenses: ExpenseDto[]): number[] => {
  const mapTotalDelegate: Record<string, number> = {};
  forEach(expenses, (expense) => {
    const { period, actuals } = expense;
    if (period in mapTotalDelegate) {
      mapTotalDelegate[period] += actuals;
    } else {
      mapTotalDelegate[period] = actuals;
    }
  });
  const totalMonthlyDelegates = Object.entries(mapTotalDelegate).map(([, value]) => value);
  return totalMonthlyDelegates;
};

const generateArrayDates = (startDate: DateTime, endDate: DateTime) => {
  const monthsArray = [];

  let currentDate = startDate;
  while (currentDate <= endDate) {
    const formattedDate = currentDate.toFormat('yyyy-MM');
    monthsArray.push(formattedDate);
    currentDate = currentDate.plus({ months: 1 });
  }
  return monthsArray;
};

const generateActualsArray = (expenses: ExpenseDto[]): number[] => {
  const allPeriodWithDataDelegate = expenses.map((delegate) => delegate.period);
  const resultActualsPerDelegateForDate: number[] = [];
  const startDate = DateTime.fromISO('2021-11-01');
  const endDate = DateTime.fromISO('2023-03-01');
  const monthlyArray = generateArrayDates(startDate, endDate);
  monthlyArray.forEach((monthlyArray) => {
    if (allPeriodWithDataDelegate.includes(monthlyArray)) {
      resultActualsPerDelegateForDate.push(expenses.find((item) => item.period === monthlyArray)?.actuals || 0);
    } else {
      resultActualsPerDelegateForDate.push(0);
    }
  });
  return resultActualsPerDelegateForDate;
};

export const filteredDelegatesChart = (expenses: ExpenseDto[], activeElements: string[]) => {
  const filteredDelegates = expenses.filter((delegate: ExpenseDto) =>
    activeElements.includes(getNameDelegates(delegate.budget))
  );

  const resultGroupEachDelegate = groupBy(filteredDelegates, 'budget');
  let sumArrayDelegate: number[] = [];
  for (const key in resultGroupEachDelegate) {
    sumArrayDelegate = sumArrayDelegate.length
      ? sumArrayDelegate.map((value, index) => value + generateActualsArray(resultGroupEachDelegate[key])[index])
      : generateActualsArray(resultGroupEachDelegate[key]);
  }

  return sumArrayDelegate;
};
