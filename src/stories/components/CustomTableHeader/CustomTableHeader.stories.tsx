import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { SortEnum } from '../../../core/enums/sort.enum';
import { CustomTableHeader } from './CustomTableHeader';
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

Header.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=6646%3A61302&t=iDXzm6LhfULmvnWw-4',
  },
};

HeaderDarkMode.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=6646%3A61302&t=iDXzm6LhfULmvnWw-4',
  },
};
