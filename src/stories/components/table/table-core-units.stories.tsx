import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TableCoreUnits from './TableCoreUnits';

export default {
  title: 'Components/Table/Table',
  component: TableCoreUnits,
} as ComponentMeta<typeof TableCoreUnits>;

const Template: ComponentStory<typeof TableCoreUnits> = () => (
  <TableCoreUnits />
);

export const Main = Template.bind({});
Main.args = {};
