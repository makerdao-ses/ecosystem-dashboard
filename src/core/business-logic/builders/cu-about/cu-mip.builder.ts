// import { CuMip } from '../../../../stories/containers/cu-about/cu-about.api';
import { CuMip } from '../../../../stories/containers/cu-about/cu-about.api';
import { CuStatusEnum } from '../../../enums/cu-status.enum';
// import { CuStatusEnum } from '../../../enums/cu-status.enum';

export class CuMipAboutBuilder {
  private readonly _cuMip: CuMip;

  constructor() {
    this._cuMip = {
      mipTitle: '',
      mipCode: '',
      cuId: '',
      rfc: '',
      formalSubmission: '',
      accepted: '',
      rejected: '',
      obsolete: '',
      mipStatus: '' as CuStatusEnum,
      mipUrl: '',
    } as CuMip;
  }

  withStatus(status: CuStatusEnum): CuMipAboutBuilder {
    this._cuMip.mipStatus = status;
    return this;
  }

  build(): CuMip {
    return this._cuMip;
  }
}
