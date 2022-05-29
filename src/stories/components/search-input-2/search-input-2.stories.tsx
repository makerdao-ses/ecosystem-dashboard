import React from 'react';
import { SearchInput2 } from './search-input-2';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/SearchInput2',
  component: SearchInput2
} as ComponentMeta<typeof SearchInput2>;

const Template: ComponentStory<typeof SearchInput2> = (args) => <SearchInput2 {...args}/>;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder'
};
