import NavigationCard from './NavigationCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NavigationCard> = {
  title: 'Fusion/Views/CuAbout/NavigationCard',
  component: NavigationCard,
};
export default meta;

type Story = StoryObj<typeof NavigationCard>;

export const Initiatives: Story = {
  args: {
    list: ['Education & Onboarding', 'Dashboard & API', 'Legal Risk Mitigation', 'MakerDAO Resiliency (strategic)'],
    description: 'View all Initiatives of the (SES-01) Sustainable Ecosystem Scaling',
    image: '/assets/img/card-initiatives.png',
    title: 'Initiatives',
    titleLinkPage: 'View all',
  },
};

export const Finances: Story = {
  args: {
    list: ['Overview', 'Transparency Reports', 'Onchain Setup', 'Budget Governance'],
    description: 'View all Finances of the (SES-01) Sustainable Ecosystem Scaling',
    image: '/assets/img/card-finances.png',
  },
};
