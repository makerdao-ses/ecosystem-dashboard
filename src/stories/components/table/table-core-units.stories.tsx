import React from 'react';
import TableCoreUnits from '../../../components/Table/TableCoreUnits';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Table/Table',
  component: TableCoreUnits,
} as ComponentMeta<typeof TableCoreUnits>;

const Template: ComponentStory<typeof TableCoreUnits> = () => (
  <TableCoreUnits />
);

export const Main = Template.bind({});
Main.args = {};
