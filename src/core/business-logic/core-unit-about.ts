import { LinkModel } from '../../stories/components/cu-table-column-links/cu-table-column-links';
import {
  ContributorCommitment,
  CuMip,
} from '../../stories/containers/cu-about/cu-about.api';
import { CuStatusEnum } from '../enums/cu-status.enum';
import { LinkTypeEnum } from '../enums/link-type.enum';
import { getCuMipStatusModifiedDate } from './core-units';

export const getMipsStatus = (mip: CuMip) => {
  if (!mip) return undefined;
  switch (mip.mipStatus) {
    case CuStatusEnum.Accepted:
      return mip.accepted;
    case CuStatusEnum.FormalSubmission:
      return mip.formalSubmission;
    case CuStatusEnum.Rejected:
      return mip.rejected;
    case CuStatusEnum.RFC:
      return mip.rfc;
    case CuStatusEnum.Obsolete:
      return mip.obsolete;
    default:
      return undefined;
  }
};

export const getMarkdownInformation = (text: string | undefined) => {
  return text || '';
};

export const getLinksFromContributor = (contributor: ContributorCommitment) => {
  const links: LinkModel[] = [];
  if (!contributor) return links;
  if (contributor && contributor.contributor.length === 0) return links;
  const cont =
    contributor && contributor.contributor && contributor.contributor[0];
  if (cont.email) {
    links.push({
      linkType: LinkTypeEnum.Gmail,
      href: cont.email,
    });
  }
  if (cont.forumHandle) {
    links.push({
      linkType: LinkTypeEnum.Forum,
      href: cont.forumHandle,
    });
  }
  if (cont.discordHandle) {
    links.push({
      linkType: LinkTypeEnum.Discord,
      href: cont.discordHandle,
    });
  }
  if (cont.twitterHandle) {
    links.push({
      linkType: LinkTypeEnum.Twitter,
      href: cont.twitterHandle,
    });
  }
  return links;
};
export const getRelateMipObjectFromCoreUnit = (cu: CuMip) => {
  const dateMip = getCuMipStatusModifiedDate(cu, cu.mipStatus);
  return {
    ...cu,
    mipTitle: cu.mipTitle,
    mipStatus: cu.mipStatus,
    dateMip,
    mipUrl: cu.mipUrl,
    orderBy: cu.mipStatus === CuStatusEnum.FormalSubmission || cu.mipStatus === CuStatusEnum.RFC || cu.mipStatus === CuStatusEnum.Accepted ? 1 : 0,
  } as CuMip;
};
