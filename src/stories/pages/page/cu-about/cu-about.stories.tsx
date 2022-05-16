import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CuAbout from './cu-about';

export default {
  title: 'Pages/CuAbout',
  component: CuAbout,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CuAbout>;

const Template: ComponentStory<typeof CuAbout> = () => <CuAbout />;

export const CuAboutPage = Template.bind({});
CuAboutPage.args = {};
