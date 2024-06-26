import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CuStatusEnum } from '@/core/enums/cuStatusEnum';
import type { CuMipDto } from '@/core/models/dto/coreUnitDTO';
import RelateMips from './RelateMips';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof RelateMips> = {
  title: 'Fusion/Views/Core Unit About/RelateMips',
  component: RelateMips,
  parameters: {
    chromatic: {
      viewports: [375, 768],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    relateMips: {
      mipTitle: 'MIP41c4-SP29:Facilitator Onboarding for Maker Talent Core Unit (MT-001)',
      mipUrl: 'https://mips.makerdao.com/mips/details/MIP39c2SP10',
      mipStatus: CuStatusEnum.Accepted,
      accepted: '2021-11-25',
      obsolete: '2021-11-25',
      rfc: '2021-11-11',
      cuId: '1',
      mipCode: 'MIP39c2-SP10',
      formalSubmission: '2021-11-11',
      rejected: '2021-11-11',
      dateMip: new Date(),
      mip40: [],
      mip41: [],
    } as CuMipDto,
  },
];

const [[WithDataLightMode, WithDataDarkMode]] = createThemeModeVariants(RelateMips, variantsArgs);
export { WithDataLightMode, WithDataDarkMode };

WithDataLightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1237:23692&t=pe1fVI3DderPnVw1-4',

        options: {
          style: {
            left: -12,
            top: -10,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1020:18791&t=pe1fVI3DderPnVw1-4',

        options: {
          style: {
            left: -12,
            top: -10,
          },
        },
      },
    },
  },
};
