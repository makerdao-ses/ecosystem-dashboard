import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CustomTableHeader, CustomTableHeaderProps } from './custom-table-header';
import { SortEnum } from '../../../core/enums/sort.enum';

export default {
  title: 'Components/General/CustomTableHeader',
  components: CustomTableHeader,
} as ComponentMeta<typeof CustomTableHeader>;

const Template: ComponentStory<typeof CustomTableHeader> = (args: CustomTableHeaderProps) => (
  <CustomTableHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Some header',
  state: SortEnum.Neutral,
  align: 'flex-start',
};
