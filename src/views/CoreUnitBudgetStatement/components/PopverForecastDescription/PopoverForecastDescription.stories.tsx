import { useTheme } from '@mui/material';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import PopoverForecastDescription from './PopoverForecastDescription';
import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Fusion/Components/Budget Statements/PopoverForecastDescription',
  component: PopoverForecastDescription,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    value: 124.6,
    relativeValue: 117,
    month: 'December',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants((props) => {
  const theme = useTheme();
  return (
    <div
      style={{
        border: `2px solid ${theme.palette.isLight ? ' #FBD9D7' : '#82302C'}`,
        width: 298,
        backgroundColor: theme.palette.isLight ? '#F3F5F7' : theme.palette.colors.charcoal[800],
        borderRadius: 12,
      }}
    >
      <PopoverForecastDescription {...props} />
    </div>
  );
}, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2414:23831&m=dev',
        options: {
          style: {
            left: -3,
            top: -2,
          },
          componentStyle: {
            width: 298,
          },
        },
      },
    },
  },
};
