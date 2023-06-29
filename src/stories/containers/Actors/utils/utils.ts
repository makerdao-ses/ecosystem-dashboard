import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import type { LinkModel } from '@ses/components/CuTableColumnLinks/CuTableColumnLinks';
import type { ActorSocialDto, EcosystemActor } from '@ses/core/models/dto/teamsDTO';

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

export const getLinksFromRecognizedActors = (
  actor: EcosystemActor,
  linkTypeMap?: Record<string, LinkTypeEnum>
): LinkModel[] => {
  let delegateLinkTypeMap: Record<string, LinkTypeEnum> = {};
  const result = [] as LinkModel[];
  if (!actor.socialMediaChannels) {
    return result;
  }

  const sm = actor.socialMediaChannels[0] as ActorSocialDto;
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
