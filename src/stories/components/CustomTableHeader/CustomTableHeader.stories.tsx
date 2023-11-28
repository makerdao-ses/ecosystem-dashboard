import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { SortEnum } from '../../../core/enums/sortEnum';
import { CustomTableHeader } from './CustomTableHeader';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CustomTableHeader> = {
  title: 'Components/CuTable/CustomTableHeader',
  component: CustomTableHeader,
};
export default meta;

const variantsArgs = [
  {
    title: 'Core Units',
    state: SortEnum.Asc,
    align: 'flex-start',
    style: { marginLeft: '62px' },
  },
];

const [[Header, HeaderDarkMode]] = createThemeModeVariants(CustomTableHeader, variantsArgs);
export { Header, HeaderDarkMode };

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
