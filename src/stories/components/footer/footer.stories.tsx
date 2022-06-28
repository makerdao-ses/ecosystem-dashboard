/* eslint-disable storybook/prefer-pascal-case */
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Footer from './footer';
import { developer, governesses, products } from './iconsData';

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
