import React from 'react';
import AccordionCategory from './ArrowAccordionCategory';
import type { ParsedExpenseCategoryWithExpanded } from '@ses/core/models/dto/expenseCategoriesDTO';
interface Props {
  isOpen?: boolean;
  className?: string;
  category: ParsedExpenseCategoryWithExpanded;
  expanded: boolean;
  handleChangeItemAccordion: (id: string, expanded: boolean) => void;
}

const CategoryItem: React.FC<Props> = ({ category, expanded, handleChangeItemAccordion }) => (
  <AccordionCategory category={category} expanded={expanded} handleChangeItemAccordion={handleChangeItemAccordion} />
);

export default CategoryItem;
