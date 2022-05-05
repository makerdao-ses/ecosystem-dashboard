import React from 'react';
import RelateMips from './relate-mips';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CuStatusEnum } from '../cutable-column-summary/cutable-column-summary';

export default {
  title: 'Components/CUAbout/RelateMips',
  component: RelateMips
} as ComponentMeta<typeof RelateMips>;

const Template: ComponentStory<typeof RelateMips> = (args) => <RelateMips {...args} />;
export const Default = Template.bind({});
Default.args = {
  status: CuStatusEnum.Rejected,
  statusModified: new Date(),
};

export const WithData = Template.bind({});
WithData.args = {
  status: CuStatusEnum.Accepted,
  statusModified: new Date(),
  mipTitle: 'MIP-123: SES Sustainable Ecosystem Scaling'
};
