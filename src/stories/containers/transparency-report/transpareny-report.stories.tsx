import React from 'react';
import { TransparencyReport } from './transparency-report';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { SummarizedCoreUnit } from '../../components/core-unit-summary/core-unit-summary.mvvm';

export default {
  title: 'Containers/TransparencyReport',
  component: TransparencyReport,
} as ComponentMeta<typeof TransparencyReport>;

const Template: ComponentStory<typeof TransparencyReport> = () => (
  <TransparencyReport
    coreUnits={[] as SummarizedCoreUnit[]}
    coreUnit={{} as CoreUnitDto}
  />
);

export const Default = Template.bind({});
Default.args = {};
