import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import MdViewerContainer from './md-view-container';

export default {
  title: 'Components/CUAbout/MdViewerContainer',
  components: MdViewerContainer
} as ComponentMeta<typeof MdViewerContainer>;

const Template: ComponentStory<typeof MdViewerContainer> = (args) => <MdViewerContainer {...args} />;

const markdownText = `### About Sustainable Ecosystem Scaling Core Unit
Sustainable Ecosystem Scaling

### What we do

#### Mission  


Sustainably grow the Maker Protocol's moats by systematically removing barriers between the decentralized workforce, capital, and work.      

### Vision

To support a decentralized, effective, and scalable economy on top of the Maker Protocol that continues to push forward its growth in a sustainable manner.

This decentralized, effective, and scalable economy:
Has the best and most successful onboarding experience for new participants, with the highest retention rate in the industry.
Allows everyone to find the capital they need to work on the best projects which (1) optimally drive protocol growth and (2) are most fulfilling for its participants.
Has resilient safety mechanisms in place that prevent protocol failure while leaving ample space for rapid innovation and experimentation.


![The San Juan Mountains are beautiful!](https://ownsnap.com/wp-content/uploads/2021/10/dao1-1170x658-1.jpg "San Juan Mountains")`;

export const Default = Template.bind({});
Default.args = {
  markdown: markdownText
};
