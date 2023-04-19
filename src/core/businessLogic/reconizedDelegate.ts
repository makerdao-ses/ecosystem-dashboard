import { LinkTypeEnum } from '../enums/linkTypeEnum';
import type { DelegateSocialDto, RecognizedDelegatesDto } from '../models/dto/delegatesDTO';
import type { LinkModel } from '@ses/components/CuTableColumnLinks/CuTableColumnLinks';

export const getLinksFromRecognizedDelegates = (del: RecognizedDelegatesDto): LinkModel[] => {
  const result = [] as LinkModel[];
  if (!del.socials || del.socials.length === 0) {
    return result;
  }

  const sm = del.socials[0] as DelegateSocialDto;

  const linkTypeMap: Record<string, LinkTypeEnum> = {
    twitter: LinkTypeEnum.Twitter,
    youtube: LinkTypeEnum.Youtube,
    forumPlatform: LinkTypeEnum.Forum,
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
