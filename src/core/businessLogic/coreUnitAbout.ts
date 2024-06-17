import { CommitmentJob } from '../enums/commitmentJobEnum';
import { LinkTypeEnum } from '../enums/linkTypeEnum';
import { TeamStatus } from '../models/interfaces/types';
import { getCuMipStatusModifiedDate } from './coreUnits';
import type { LinkModel } from '../../stories/components/CuTableColumnLinks/CuTableColumnLinks';
import type { ContributorCommitmentDto } from '../models/dto/coreUnitDTO';
import type { CuMip } from '../models/interfaces/cuMip';

export const getMipsStatus = (mip: CuMip) => {
  if (!mip) return undefined;
  switch (mip.mipStatus) {
    case TeamStatus.Accepted:
      return mip.accepted;
    case TeamStatus.FormalSubmission:
      return mip.formalSubmission;
    case TeamStatus.Rejected:
      return mip.rejected;
    case TeamStatus.RFC:
      return mip.rfc;
    case TeamStatus.Obsolete:
      return mip.obsolete;
    default:
      return undefined;
  }
};

export const getMarkdownInformation = (text: string | undefined) => text || '';

export const getLinksFromContributor = (contributor: ContributorCommitmentDto) => {
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
      cu.mipStatus === TeamStatus.Accepted
        ? 2
        : cu.mipStatus === TeamStatus.FormalSubmission || cu.mipStatus === TeamStatus.RFC
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
