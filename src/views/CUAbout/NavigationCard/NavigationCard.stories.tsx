import React from 'react';
import NavigationCard from './NavigationCard';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Fusion/CuAbout/NavigationCard',
  components: NavigationCard,
} as ComponentMeta<typeof NavigationCard>;

const Template: ComponentStory<typeof NavigationCard> = (args) => <NavigationCard {...args} />;

export const Initiatives = Template.bind({});
Initiatives.args = {
  list: ['Education & Onboarding', 'Dashboard & API', 'Legal Risk Mitigation', 'MakerDAO Resiliency (strategic)'],
  description: 'View all Initiatives of the (SES-01) Sustainable Ecosystem Scaling',
  image: '/assets/img/card-initiatives.png',
  title: 'Initiatives',
  titleLinkPage: 'View all',
};

export const Finances = Template.bind({});
Finances.args = {
  list: ['Overview', 'Transparency Reports', 'Onchain Setup', 'Budget Governance'],
  description: 'View all Finances of the (SES-01) Sustainable Ecosystem Scaling',
  image: '/assets/img/card-finances.png',
};
