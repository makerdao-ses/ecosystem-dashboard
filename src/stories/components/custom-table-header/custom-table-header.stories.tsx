import React from 'react';
import { SortEnum } from '../../../core/enums/sort.enum';
import { CustomTableHeader } from './custom-table-header';
import type { CustomTableHeaderProps } from './custom-table-header';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

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
