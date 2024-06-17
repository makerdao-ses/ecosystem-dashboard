import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CuStatusEnum } from '../../../core/enums/cuStatusEnum';
import RelateMips from './RelateMips';
import type { CuMipDto } from '../../../core/models/dto/coreUnitDTO';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof RelateMips> = {
  title: 'Fusion/CUAbout/RelateMips',
  component: RelateMips,
};
export default meta;

const variantsArgs = [
  {
    relateMips: {
      mipTitle: 'MIP40c3-SP1:Modify Core Unit Budget - Real-World Finance (RWF-001)',
      mipUrl: 'https://mips.makerdao.com/mips/details/MIP39c2SP10',
      mipStatus: CuStatusEnum.Accepted,
      accepted: '2019-06-11',
      obsolete: '2019-06-11',
      rfc: '2019-06-11',
      cuId: '1',
      mipCode: 'MIP39c2-SP10',
      formalSubmission: '2019-06-11',
      rejected: '2019-06-11',
      dateMip: new Date(),
      mip40: [],
      mip41: [],
    } as CuMipDto,
  },
  {
    relateMips: {
      mipTitle:
        'MIP40c3-SP1:Modify Core Unit Budget - Real-World Finance (RWF-001) Other Data Here Real-World Finance (RWF-001) Other Data HereReal-World Finance (RWF-001) Other Data HereReal-World Finance (RWF-001) Other Data HereReal-World Finance (RWF-001) Other Data Here',
      mipUrl: 'https://mips.makerdao.com/mips/details/MIP39c2SP10 ',
      mipStatus: CuStatusEnum.Accepted,
      accepted: '2019-06-11',
      obsolete: '2019-06-11',
      rfc: '2019-06-11',
      cuId: '1',
      mipCode: 'MIP39c2-SP10',
      formalSubmission: '2019-06-11',
      rejected: '2019-06-11',
      dateMip: new Date(),
      mip40: [],
      mip41: [],
    } as CuMipDto,
  },
];

const [[WithDataLightMode, WithDataDarkMode], [WithLargeTextLightMode, WithLargeTextDarkMode]] =
  createThemeModeVariants(RelateMips, variantsArgs, false);
export { WithDataLightMode, WithDataDarkMode, WithLargeTextLightMode, WithLargeTextDarkMode };
