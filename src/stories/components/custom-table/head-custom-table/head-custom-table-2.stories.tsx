import { SortEnum } from '@ses/core/enums/sort.enum';
import { withFigmaComparator } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { figmaComparatorCommonPaddingOptions } from '@ses/core/utils/storybook/utils';
import { HeadCustomTable } from './head-custom-table-2';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CuTable/HeadCustomTable',
  component: HeadCustomTable,
  parameters: {
    chromatic: {
      viewports: [1194, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof HeadCustomTable>;

const variantsArgs = [
  {
    columns: [
      {
        header: 'Core Unit',
        justifyContent: 'flex-start',
        style: { paddingLeft: '16px' },
        width: '400px',
        hasSort: true,
      },
      {
        header: 'Expenditure',
        justifyContent: 'flex-start',
        width: '215px',
        sortReverse: true,
        hasSort: true,
      },
      {
        header: 'Team Members',
        justifyContent: 'center',
        width: '205px',
        sortReverse: true,
        hasSort: true,
      },
      {
        header: 'Last Modified',
        justifyContent: 'flex-start',
        width: '122px',
        sortReverse: true,
        hasSort: true,
      },
      {
        header: '',
        justifyContent: 'center',
        width: '358px',
        responsiveWidth: '186px',
        hasSort: false,
      },
    ],
    headersSort: [SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Disabled],
  },
];

export const [[Head, HeadDarkMode]] = createThemeModeVariants(HeadCustomTable, variantsArgs);

Head.decorators = [
  withFigmaComparator(
    {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5232%3A92115&t=iDXzm6LhfULmvnWw-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A45401&t=iDXzm6LhfULmvnWw-4',
      1920: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A44666&t=iDXzm6LhfULmvnWw-4',
    },
    figmaComparatorCommonPaddingOptions
  ),
];

HeadDarkMode.decorators = [
  withFigmaComparator(
    {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5232%3A92115&t=iDXzm6LhfULmvnWw-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A45401&t=iDXzm6LhfULmvnWw-4',
      1920: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A44666&t=iDXzm6LhfULmvnWw-4',
    },
    figmaComparatorCommonPaddingOptions
  ),
];
