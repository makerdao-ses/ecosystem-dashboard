import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CategoryChip } from './category-chip';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';

export default {
  title: 'Components/General/CategoryChip',
  components: CategoryChip,
} as ComponentMeta<typeof CategoryChip>;

const Template: ComponentStory<typeof CategoryChip> = (args) => <CategoryChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  category: CuCategoryEnum.Finance,
};

export const FormalSubmission = Template.bind({});
FormalSubmission.args = {
  category: CuCategoryEnum.Growth,
};
