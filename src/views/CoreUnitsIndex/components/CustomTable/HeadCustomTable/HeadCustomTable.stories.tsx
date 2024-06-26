import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns1024, headersSort } from '@ses/core/utils/tests';
import { HeadCustomTable } from './HeadCustomTable';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof HeadCustomTable> = {
  title: 'Fusion/Views/Core Units Index/HeadCustomTable',
  component: HeadCustomTable,
  parameters: {
    chromatic: {
      viewports: [1194, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    columns: columns1024,
    headersSort,
  },
];

export const [[Head, HeadDarkMode]] = createThemeModeVariants(HeadCustomTable, variantsArgs);

Head.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5232%3A92115&t=iDXzm6LhfULmvnWw-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A45401&t=iDXzm6LhfULmvnWw-4',
      1920: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A44666&t=iDXzm6LhfULmvnWw-4',
    },
    options: {
      style: {
        top: -20,
        left: -40,
      },
    },
  },
};

HeadDarkMode.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5232%3A92115&t=iDXzm6LhfULmvnWw-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A45401&t=iDXzm6LhfULmvnWw-4',
      1920: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4289%3A44666&t=iDXzm6LhfULmvnWw-4',
    },
    options: {
      style: {
        top: -20,
        left: -40,
      },
    },
  },
};
