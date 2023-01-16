import { withFigmaComparator } from '@ses/core/utils/storybook/decorators';
import { figmaComparatorCommonPaddingOptions } from '@ses/core/utils/storybook/utils';
import React from 'react';
import { CustomLink } from './custom-link';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/CustomLink',
  component: CustomLink,
} as ComponentMeta<typeof CustomLink>;

const Template: ComponentStory<typeof CustomLink> = (args) => <CustomLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Custom link',
};

Default.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2108%3A17916&t=dMZEfODgYNIpeDoi-0',
    figmaComparatorCommonPaddingOptions
  ),
];
