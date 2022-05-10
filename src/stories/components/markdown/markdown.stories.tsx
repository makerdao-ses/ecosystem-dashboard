import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import MdViewerContainer from './md-view-container';

export default {
  title: 'Components/CUAbout/MdViewerContainer',
  components: MdViewerContainer
} as ComponentMeta<typeof MdViewerContainer>;

const Template: ComponentStory<typeof MdViewerContainer> = (args) => <MdViewerContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  url: 'https://raw.githubusercontent.com/mact200590/Proyectos/master/example.md',
};
