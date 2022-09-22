import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CategoryChip } from './category-chip';

export default {
  title: 'Components/General/CategoryChip',
  component: CategoryChip,
} as ComponentMeta<typeof CategoryChip>;

const Template: ComponentStory<typeof CategoryChip> = (args) => <CategoryChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  category: CuCategoryEnum.Finance,
};
