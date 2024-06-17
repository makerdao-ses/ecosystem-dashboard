import type { TeamStatus } from '@/core/models/interfaces/types';
import { setCuMipStatusModifiedDate } from '../coreUnits';
import type { CuMip, Mip40, Mip41 } from '@ses/core/models/interfaces/cuMip';

export class CuMipBuilder {
  private readonly _cuMip: CuMip;

  constructor() {
    this._cuMip = {
      mipTitle: '',
      mipStatus: 'Accepted',
      mip40: [] as Mip40[],
      mip41: [] as Mip41[],
      accepted: '',
      rejected: '',
      rfc: '',
      formalSubmission: '',
      obsolete: '',
    } as CuMip;
  }

  withMipTitle(title: string): CuMipBuilder {
    this._cuMip.mipTitle = title;
    return this;
  }

  withStatus(status: TeamStatus, date: string): CuMipBuilder {
    this._cuMip.mipStatus = status;
    setCuMipStatusModifiedDate(this._cuMip, status, date);
    return this;
  }

  withFormalSubmission(formalSubmission: string): CuMipBuilder {
    this._cuMip.formalSubmission = formalSubmission;
    return this;
  }

  withMipCode(code: string): CuMipBuilder {
    this._cuMip.mipCode = code;
    return this;
  }

  addMip40(mip40: Mip40): CuMipBuilder {
    this._cuMip.mip40.push(mip40);
    return this;
  }

  addMip41(mip41: Mip41): CuMipBuilder {
    this._cuMip.mip41.push(mip41);
    return this;
  }

  build(): CuMip {
    return this._cuMip;
  }
}
