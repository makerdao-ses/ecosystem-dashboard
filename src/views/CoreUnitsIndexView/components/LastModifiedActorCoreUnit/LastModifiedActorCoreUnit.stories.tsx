import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { DateTime } from 'luxon';

import LastModifiedActorCoreUnit from './LastModifiedActorCoreUnit';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof LastModifiedActorCoreUnit> = {
  title: 'Fusion/Views/Core Units Index/LastModifiedActorCoreUnit',
  component: LastModifiedActorCoreUnit,
  parameters: {
    chromatic: {
      viewports: [1194, 375],
    },
    date: new Date('2022-12-26T09:08:34.123'),
  },
};
export default meta;

const variantsArgs = [
  {
    code: 'SES',
    date: DateTime.fromISO('2024-12-26T09:08:34.123'),
    href: '',
  },
  {
    code: 'SES',
    date: DateTime.fromISO('2024-12-26T09:08:34.123'),
    href: '',
  },
];

const [[ModifiedData, ModifiedDataDark], [ModifiedWithoutData, ModifiedWithoutDataDark]] = createThemeModeVariants(
  LastModifiedActorCoreUnit,
  variantsArgs
);
export { ModifiedData, ModifiedDataDark, ModifiedWithoutData, ModifiedWithoutDataDark };
