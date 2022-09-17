import { LinkModel } from '../../stories/components/cu-table-column-links/cu-table-column-links';
import { CuStatusEnum } from '../enums/cu-status.enum';
import { LinkTypeEnum } from '../enums/link-type.enum';
import { getCuMipStatusModifiedDate } from './core-units';
import {
  ContributorCommitmentDto,
  CuMipDto,
} from '../models/dto/core-unit.dto';
import { CommitmentJob } from '../enums/CommitmentJob.enum';

export const getMipsStatus = (mip:CuMipDto) => {
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

export const getLinksFromContributor = (
  contributor: ContributorCommitmentDto
) => {
  const links: LinkModel[] = [];
  if (!contributor) return links;
  if (contributor && contributor.contributor.length === 0) return links;
  const cont =
    contributor && contributor.contributor && contributor.contributor[0];
  if (cont.email) {
    links.push({
      linkType: LinkTypeEnum.Gmail,
      href: `mailto:${cont.email}`,
    });
  }
  if (cont.forumHandle) {
    links.push({
      linkType: LinkTypeEnum.Forum,
      href: `https://forum.makerdao.com/u/${cont.forumHandle}`,
    });
  }
  if (cont.twitterHandle) {
    links.push({
      linkType: LinkTypeEnum.Twitter,
      href: `https://twitter.com/${cont.twitterHandle}`,
    });
  }
  if (cont.discordHandle) {
    links.push({
      linkType: LinkTypeEnum.Discord,
      href: cont.discordHandle,
    });
  }
  return links;
};
export const getRelateMipObjectFromCoreUnit = (cu: CuMipDto) => {
  const dateMip = getCuMipStatusModifiedDate(cu, cu.mipStatus);
  return {
    ...cu,
    mipTitle: cu.mipTitle,
    mipStatus: cu.mipStatus,
    dateMip,
    mipUrl: cu.mipUrl,
    orderBy:
      cu.mipStatus === CuStatusEnum.Accepted
        ? 2
        : cu.mipStatus === CuStatusEnum.FormalSubmission ||
          cu.mipStatus === CuStatusEnum.RFC
          ? 1
          : 0,
  } as unknown;
};

export const getContributorCommitment = (commitment: string) => {
  if (commitment === '') return '';
  switch (commitment) {
    case CommitmentJob.Fulltime:
      return 'Full-Time';
    case CommitmentJob.PartTime:
      return 'Part-Time';
    case CommitmentJob.Inactive:
      return 'Inactive';
    case CommitmentJob.Variable:
      return 'Variable';
    default:
      return '';
  }
};
