import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { Auditor } from '@/core/models/interfaces/users';
import Auditors from './Auditors';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Auditors> = {
  title: 'Fusion/Actor About/Auditors',
  component: Auditors,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    auditors: [
      {
        id: '1',
        username: 'Dracaena27',
      },
    ] as Auditor[],
    auditorTitle: '',
  },
  {
    auditors: [] as Auditor[],
    auditorTitle: 'The Powerhouse is working without auditor.',
  },
];

const [[LightWithAuditor, DarkWithAuditor], [WithoutAuditor, WithoutAuditorDark]] = createThemeModeVariants(
  Auditors,
  variantsArgs
);
export { LightWithAuditor, DarkWithAuditor, WithoutAuditor, WithoutAuditorDark };
