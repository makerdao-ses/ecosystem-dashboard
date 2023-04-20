import { LinkTypeEnum } from '../enums/linkTypeEnum';
import type { DelegateSocialDto, RecognizedDelegatesDto } from '../models/dto/delegatesDTO';
import type { LinkModel } from '@ses/components/CuTableColumnLinks/CuTableColumnLinks';

export const getLinksFromRecognizedDelegates = (del: RecognizedDelegatesDto): LinkModel[] => {
  const result = [] as LinkModel[];
  if (!del.socials) {
    return result;
  }

  const sm = del.socials as DelegateSocialDto;

  const linkTypeMap: Record<string, LinkTypeEnum> = {
    forumPlatform: LinkTypeEnum.Forum,
    twitter: LinkTypeEnum.Twitter,
    youtube: LinkTypeEnum.Youtube,
    forumProfile: LinkTypeEnum.ProfileForum,
    votingPortal: LinkTypeEnum.VotingSocialPortal,
  };

  for (const [property, linkType] of Object.entries(linkTypeMap)) {
    if (sm[property]) {
      result.push({
        href: sm[property] || '',
        linkType,
      });
    }
  }

  return result;
};
