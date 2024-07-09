import { useTheme } from '@mui/material';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import HeaderToolTip from './TooltipHeader';
import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Fusion/Components/Budget Statements/HeaderToolTip',
  component: HeaderToolTip,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    description: '1 Month Budget Cap',
    link: '#',
    name: 'MIP39c2-SP1:Adding Core Unit (Real-World Finance)',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants((props) => {
  const theme = useTheme();
  return (
    <div
      style={{
        width: 327,
        backgroundColor: theme.palette.isLight ? '#F3F5F7' : theme.palette.colors.charcoal[800],
        borderRadius: 12,
      }}
    >
      <HeaderToolTip {...props} />
    </div>
  );
}, variantsArgs);
export { LightMode, DarkMode };
LightMode.parameters = {
  figma: {
    component: {
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2414:23773&m=dev',
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
DarkMode.parameters = {};
