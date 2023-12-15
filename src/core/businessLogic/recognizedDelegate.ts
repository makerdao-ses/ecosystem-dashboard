import { LinkTypeEnum } from '../enums/linkTypeEnum';
import type { DelegateSocialDto, RecognizedDelegatesDto } from '../models/dto/delegatesDTO';
import type { LinkModel } from '@ses/components/SocialMediaComponent/SocialMediaComponent';

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
