import { ThemeProvider } from '@mui/material';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import lightTheme, { darkTheme } from '@ses/styles/theme/themes';
import SecondaryButton from './SecondaryButton';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof SecondaryButton> = {
  title: 'Fusion/Components/SecondaryButton',
  component: SecondaryButton,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    onClick: () => null,
    title: 'Finances',
  },
  {
    onClick: () => null,
    title: 'Finances',
    disabled: true,
  },
];

const [[LightMode, DarkMode], [LightDisabled, DarkDisabled]] = createThemeModeVariants(SecondaryButton, variantsArgs);
export { LightMode, DarkMode, LightDisabled, DarkDisabled };

// Hover state light
export const HoverStateLight = () => (
  <ThemeProvider theme={lightTheme}>
    <SecondaryButton title="Hover Light" />
  </ThemeProvider>
);
HoverStateLight.parameters = {
  pseudo: {
    hover: true,
  },
};
// Active state light
export const ActiveStateLight = () => (
  <ThemeProvider theme={lightTheme}>
    <SecondaryButton title="Active Light" />
  </ThemeProvider>
);

ActiveStateLight.parameters = {
  pseudo: {
    active: true,
  },
};

// Hover state dark
export const HoverStateDark = () => (
  <ThemeProvider theme={darkTheme}>
    <SecondaryButton title="Hover Light" />
  </ThemeProvider>
);
HoverStateDark.parameters = {
  pseudo: {
    hover: true,
  },
};
// Active state dark
export const ActiveStateDark = () => (
  <ThemeProvider theme={darkTheme}>
    <SecondaryButton title="Hover Light" />
  </ThemeProvider>
);
ActiveStateDark.parameters = {
  pseudo: {
    active: true,
  },
};
