import { ThemeProvider } from '@emotion/react';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import lightTheme, { darkTheme } from '@ses/styles/theme/themes';
import InternalLinkButton from './InternalLinkButton';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof InternalLinkButton> = {
  title: 'fusion/components/InternalLinkButton/InternalLinkButton',
  tags: ['autodocs'],
  parameters: {
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    label: 'Phase 1  Progress',
    showIcon: true,
    href: '/roadmaps/endgame-phase-1',
  },
  {
    label: 'Phase 1  Progress',
    showIcon: true,
    href: '/roadmaps/endgame-phase-1',
    buttonType: 'secondary',
  },
];

const [[DefaultMode, DefaultDarkMode], [Secondary, SecondaryDark]] = createThemeModeVariants(
  InternalLinkButton,
  variantsArgs
);

export { DefaultMode, DefaultDarkMode, Secondary, SecondaryDark };

DefaultMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=208-28377&t=5RvUCO874XXf5SYr-4',
        options: {
          componentStyle: {
            width: 343,
          },
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
    <InternalLinkButton label="Hover Light" showIcon href="#" />
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
    <InternalLinkButton label="Active Light" showIcon href="#" />
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
    <InternalLinkButton label="Hover Dark" showIcon href="#" />
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
    <InternalLinkButton label="Active Dark" showIcon href="#" />
  </ThemeProvider>
);
ActiveStateDark.parameters = {
  pseudo: {
    active: true,
  },
};

Secondary.parameters = {};
SecondaryDark.parameters = {};

// Hover state dark
export const SecondaryHover = () => (
  <ThemeProvider theme={lightTheme}>
    <InternalLinkButton label="Hover Secondary" showIcon href="#" buttonType="secondary" />
  </ThemeProvider>
);

SecondaryHover.parameters = {
  pseudo: {
    hover: true,
  },
};

// Active state dark
export const SecondaryActive = () => (
  <ThemeProvider theme={lightTheme}>
    <InternalLinkButton label="Active Secondary" showIcon href="#" buttonType="secondary" />
  </ThemeProvider>
);

SecondaryHover.parameters = {
  pseudo: {
    active: true,
  },
};
