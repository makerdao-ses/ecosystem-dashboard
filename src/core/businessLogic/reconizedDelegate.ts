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
