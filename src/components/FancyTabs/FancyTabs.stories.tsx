import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BulletIcon from './BulletIcon';
import FancyTabs from './FancyTabs';
import ShadowWrapper from './ShadowWrapper';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof FancyTabs> = {
  title: 'Fusion/Components/Fancy Tabs',
  tags: ['autodocs'],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    tabs: [
      {
        id: '1',
        title: 'Popular',
      },
      {
        id: '2',
        title: 'Onboarding',
        icon: <BulletIcon color="charcoal" />,
      },
      {
        id: '3',
        title: 'Finances',
        icon: <BulletIcon color="green" />,
      },
      {
        id: '4',
        title: 'Governance',
        icon: <BulletIcon color="purple" />,
      },
      {
        id: '5',
        title: 'Atlas',
        icon: <BulletIcon color="orange" />,
      },
      {
        id: '6',
        title: 'Teams',
        icon: <BulletIcon color="blue" />,
      },
    ],
    activeTab: '1',
    onTabChange: () => null,
  },
];

const [[DefaultMode, DefaultDarkMode]] = createThemeModeVariants(
  (args) => (
    <ShadowWrapper>
      <FancyTabs {...args} />
    </ShadowWrapper>
  ),
  variantsArgs,
  false
);

export { DefaultMode, DefaultDarkMode };
