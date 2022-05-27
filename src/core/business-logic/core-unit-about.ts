import { CuMip } from '../../stories/containers/cu-about/cu-about.api';
import { CuStatusEnum } from '../enums/cu-status.enum';

export const getMipsStatus = (mip: CuMip) => {
  switch (mip.mipStatus) {
    case CuStatusEnum.Accepted:
      return mip.accepted;
    case CuStatusEnum.FormalSubmission:
      return mip.formalSubmission;
    case CuStatusEnum.Rejected:
      return mip.rejected;
    case CuStatusEnum.RFC:
      return mip.rfc;
    default:
      return mip.rejected;
  }
};
