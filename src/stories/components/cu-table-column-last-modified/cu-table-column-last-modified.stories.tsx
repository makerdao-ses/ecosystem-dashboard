import React from 'react';
import { CuTableColumnLastModified } from './cu-table-column-last-modified';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUTable/LastModified',
  component: CuTableColumnLastModified,
} as ComponentMeta<typeof CuTableColumnLastModified>;

const Template: ComponentStory<typeof CuTableColumnLastModified> = (args) => <CuTableColumnLastModified {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithZero = Template.bind({});
WithZero.args = {};
