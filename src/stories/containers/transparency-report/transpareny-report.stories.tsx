import React from 'react';
import { TransparencyReport } from './transparency-report';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

export default {
  title: 'Containers/TransparencyReport',
  component: TransparencyReport,
} as ComponentMeta<typeof TransparencyReport>;

const Template: ComponentStory<typeof TransparencyReport> = () => <TransparencyReport coreUnit={{} as CoreUnitDto}/>;

export const Default = Template.bind({});
Default.args = {
};
