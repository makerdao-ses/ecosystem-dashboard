import { withFigmaComparator } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { figmaComparatorCommonPaddingOptions } from '@ses/core/utils/storybook/utils';
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

Header.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=6646%3A61302&t=iDXzm6LhfULmvnWw-4',
    figmaComparatorCommonPaddingOptions
  ),
];

HeaderDarkMode.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=6646%3A61302&t=iDXzm6LhfULmvnWw-4',
    figmaComparatorCommonPaddingOptions
  ),
];
