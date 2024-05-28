import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import { DateTime } from 'luxon';
import type { LinkModel } from '@ses/components/CuTableColumnLinks/CuTableColumnLinks';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';
import type { Team } from '@ses/core/models/interfaces/team';

export const ScopeChipText = (scope: string) => {
  if (!scope) return '';
  const threeFirstLetter = scope.slice(3).toLocaleUpperCase;
  return `${threeFirstLetter} ${scope}`;
};

export const ActorsLinkType: Record<string, LinkTypeEnum> = {
  website: LinkTypeEnum.WWW,
  forumTag: LinkTypeEnum.Forum,
  discord: LinkTypeEnum.Discord,
  twitter: LinkTypeEnum.Twitter,
  github: LinkTypeEnum.Github,
  linkedIn: LinkTypeEnum.LinkedIn,
  youtube: LinkTypeEnum.Youtube,
};

export const getLinksFromRecognizedActors = (actor: Team, linkTypeMap?: Record<string, LinkTypeEnum>): LinkModel[] => {
  let delegateLinkTypeMap: Record<string, LinkTypeEnum> = {};
  const result = [] as LinkModel[];
  if (!actor) {
    return result;
  }

  const sm = actor.socialMediaChannels[0] || [];
  if (!linkTypeMap) {
    delegateLinkTypeMap = {
      forumTag: LinkTypeEnum.Forum,
      forumProfile: LinkTypeEnum.ProfileForum,
      votingPortal: LinkTypeEnum.VotingSocialPortal,
      twitter: LinkTypeEnum.TwitterFooter,
      youtube: LinkTypeEnum.Youtube,
      linkedIn: LinkTypeEnum.LinkedIn,
      github: LinkTypeEnum.Github,
      discord: LinkTypeEnum.Discord,
    };
  } else {
    delegateLinkTypeMap = linkTypeMap;
  }

  const descriptionOfTooltip: Record<string, string> = {
    twitter: 'Twitter',
    youtube: 'Youtube',
    forumTag: 'Forum',
    forumProfile: 'Profile',
    votingPortal: 'Voting Portal',
    linkedIn: 'LinkedIn',
    website: 'Website',
    discord: 'Discord',
    github: 'Github',
  };

  for (const [property, linkType] of Object.entries(delegateLinkTypeMap)) {
    if (sm[property as keyof SocialMediaChannels]) {
      result.push({
        href: sm[property as keyof SocialMediaChannels] || '',
        linkType,
        toolTipDescription: descriptionOfTooltip[property],
      });
    }
  }

  return result;
};
const filtersScopes = (lowerCaseScopes: string[], data: Team) =>
  lowerCaseScopes.length === 0 ||
  data.scopes?.some((scope) => lowerCaseScopes.indexOf(scope.name.replace(/\s+/g, '')) > -1);

const filterCategories = (lowerCaseCategories: string[], data: Team) =>
  lowerCaseCategories.length === 0 || data.category?.some((x) => lowerCaseCategories.indexOf(x.toLowerCase()) > -1);

const filterText = (text: string, data: Team) =>
  text.trim().length === 0 ||
  data.name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
  data.code.toLowerCase().indexOf(text.toLowerCase()) > -1;
export const filterDataActors = ({
  filteredCategories = [],
  data = [],
}: {
  filteredCategories?: string[];
  data: Team[];
}) => {
  const lowerCaseCategories = filteredCategories.map((x) => x.toLowerCase());
  return {
    filteredCategoryData:
      data?.filter((data) => {
        let filterResult = true;
        filterResult = filterResult && filterCategories(lowerCaseCategories, data);
        return filterResult;
      }) ?? [],
  };
};

export const filterDataScopeActors = ({
  filteredScopes = [],
  data = [],
}: {
  filteredScopes?: string[];
  data: Team[];
}) => {
  const lowerCaseCategories = filteredScopes.map((x) => x);
  return {
    filteredScopeData:
      data?.filter((data) => {
        let filterResult = true;
        filterResult = filterResult && filtersScopes(lowerCaseCategories, data);
        return filterResult;
      }) ?? [],
  };
};

export const filterActorsText = ({ text = '', data = [] }: { text?: string; data: Team[] }) => {
  const lowerCase = text.toLowerCase();
  console.log(lowerCase);
  return data?.filter((data) => filterText(lowerCase, data)) ?? [];
};
export const defaultSocials = {
  twitter: '#',
  forumProfile: '#',
  forumPlatform: '#',
  youtube: '#',
  votingPortal: '#',
  forumTag: '#',
  github: '#',
  discord: '#',
  website: '#',
  linkedIn: '#',
} as SocialMediaChannels;
export const getActorLastMonthWithData = (actor: Team) => {
  if (actor.lastActivity?.created_at) {
    return DateTime.fromISO(actor.lastActivity?.created_at);
  }

  return undefined;
};
