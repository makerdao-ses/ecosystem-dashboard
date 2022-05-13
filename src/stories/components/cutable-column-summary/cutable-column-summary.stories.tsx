import React from 'react';
import { CutableColumnSummary } from './cutable-column-summary';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';

export default {
  title: 'Components/CUTable/ColumnSummary',
  component: CutableColumnSummary
} as ComponentMeta<typeof CutableColumnSummary>;

const Template: ComponentStory<typeof CutableColumnSummary> = (args) => <CutableColumnSummary {...args} />;

export const WithImage = Template.bind({});
WithImage.args = {
  title: 'SES Sustainable Ecosystem Scaling',
  status: CuStatusEnum.Accepted,
  statusModified: new Date(),
  imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/53/92/77/53927729-28a4-b94a-40d9-9abbc9583078/source/512x512bb.jpg'
};

export const NoImage = Template.bind({});
NoImage.args = {
  title: 'Lorem Ipsum Name',
  status: CuStatusEnum.FormalSubmission,
  statusModified: new Date(),
};
