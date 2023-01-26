import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { SortEnum } from '../../../core/enums/sort.enum';
import { CustomTableHeader } from './custom-table-header';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CuTable/CustomTableHeader',
  components: CustomTableHeader,
} as ComponentMeta<typeof CustomTableHeader>;

const variantsArgs = [
  {
    title: 'Core Units',
    state: SortEnum.Asc,
    align: 'flex-start',
    style: { marginLeft: '62px' },
  },
];

export const [[Header, HeaderDarkMode]] = createThemeModeVariants(CustomTableHeader, variantsArgs);
