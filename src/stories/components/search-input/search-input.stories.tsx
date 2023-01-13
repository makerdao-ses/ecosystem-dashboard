import React from 'react';
import { SearchInput } from './search-input';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder',
};
