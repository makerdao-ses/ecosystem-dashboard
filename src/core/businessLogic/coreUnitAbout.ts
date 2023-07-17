import { CommitmentJob } from '../enums/commitmentJobEnum';
import { LinkTypeEnum } from '../enums/linkTypeEnum';
import { CuMipStatus } from '../models/interfaces/types';
import { getCuMipStatusModifiedDate } from './coreUnits';
import type { LinkModel } from '../../stories/components/CuTableColumnLinks/CuTableColumnLinks';
import type { ContributorCommitment } from '../models/interfaces/contributor';
import type { CuMip } from '../models/interfaces/cuMip';

export const getMipsStatus = (mip: CuMip) => {
  if (!mip) return undefined;
  switch (mip.mipStatus) {
    case CuMipStatus.Accepted:
      return mip.accepted;
    case CuMipStatus.FormalSubmission:
      return mip.formalSubmission;
    case CuMipStatus.Rejected:
      return mip.rejected;
    case CuMipStatus.RFC:
      return mip.rfc;
    case CuMipStatus.Obsolete:
      return mip.obsolete;
    default:
      return undefined;
  }
};

export const getMarkdownInformation = (text: string | undefined) => text || '';

export const getLinksFromContributor = (contributor: ContributorCommitment) => {
  const links: LinkModel[] = [];
  if (!contributor) return links;
  if (contributor && contributor.contributor.length === 0) return links;
  const cont = contributor && contributor.contributor && contributor.contributor[0];
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
export const getRelateMipObjectFromCoreUnit = (cu: CuMip) => {
  const dateMip = getCuMipStatusModifiedDate(cu, cu.mipStatus);
  return {
    ...cu,
    mipTitle: cu.mipTitle,
    mipStatus: cu.mipStatus,
    dateMip,
    mipUrl: cu.mipUrl,
    orderBy:
      cu.mipStatus === CuMipStatus.Accepted
        ? 2
        : cu.mipStatus === CuMipStatus.FormalSubmission || cu.mipStatus === CuMipStatus.RFC
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
