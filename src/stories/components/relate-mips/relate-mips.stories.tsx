import React from 'react';
import RelateMips, { RelateMipType } from './relate-mips';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CuStatusEnum } from '../../../core/enums/cu-status-enum';

export default {
  title: 'Components/CUAbout/RelateMips',
  component: RelateMips
} as ComponentMeta<typeof RelateMips>;

const Template: ComponentStory<typeof RelateMips> = (args) => <RelateMips {...args} />;
export const Default = Template.bind({});
Default.args = {
  relateMips: {
    status: CuStatusEnum.Accepted,
    statusModified: new Date(),
  } as RelateMipType,

};

export const WithData = Template.bind({});
WithData.args = {
  relateMips: {
    status: CuStatusEnum.Accepted,
    statusModified: new Date(),
    mipTitle: 'MIP40c3-SP1: Modify Core Unit Budget - Real-World Finance (RWF-001)',
    href: '#',
  } as RelateMipType,
};
