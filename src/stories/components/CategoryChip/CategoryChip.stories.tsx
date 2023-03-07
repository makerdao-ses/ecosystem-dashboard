import React from 'react';
import { CuCategoryEnum } from '../../../core/enums/cuCategoryEnum';
import { CategoryChip } from './CategoryChip';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/CategoryChip',
  component: CategoryChip,
} as ComponentMeta<typeof CategoryChip>;

const Template: ComponentStory<typeof CategoryChip> = (args) => <CategoryChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  category: CuCategoryEnum.Finance,
};
