/* eslint-disable storybook/prefer-pascal-case */
import React from 'react';
import Footer from './footer';
import { developer, governesses, products } from './iconsData';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/Footer',
  components: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});

Default.args = {
  developer,
  governesses,
  products,
};
