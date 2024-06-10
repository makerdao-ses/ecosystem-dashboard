import { ThemeProvider } from '@emotion/react';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import lightTheme, { darkTheme } from '@ses/styles/theme/themes';
import FilterButtonTab from './FilterButtonTab';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof FilterButtonTab> = {
  title: 'fusion/components/FilterButtonTab/FilterButtonTab',
  tags: ['autodocs'],
};
export default meta;

const variantsArgs = [
  {
    label: 'Net Expenses On-chain',
    handleChange: () => null,
    isSelect: false,
  },
  {
    label: 'Budget Cap',
    handleChange: () => null,
    isSelect: true,
  },
];

const [[DefaultMode, DefaultDarkMode], [SelectMode, SelectModeDark]] = createThemeModeVariants(
  FilterButtonTab,
  variantsArgs
);

export { DefaultMode, DefaultDarkMode, SelectMode, SelectModeDark };

DefaultMode.parameters = {
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=208:27262&t=4CmkzB0HrlfIVhV8-4',
        options: {
          style: {
            top: 0,
            left: 0,
          },
        },
      },
    },
  } as FigmaParams,
};
DefaultDarkMode.parameters = {};

// Hover state light
export const HoverStateLight = () => (
  <ThemeProvider theme={lightTheme}>
    <FilterButtonTab label="Hover Light" handleChange={() => null} />
  </ThemeProvider>
);
HoverStateLight.parameters = {
  pseudo: {
    hover: true,
  },
};
// Active state light
export const HoverStateDark = () => (
  <ThemeProvider theme={darkTheme}>
    <FilterButtonTab label="Hover Dark" handleChange={() => null} />
  </ThemeProvider>
);

HoverStateDark.parameters = {
  pseudo: {
    hover: true,
  },
};
