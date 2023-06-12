import styled from '@emotion/styled';
import React from 'react';
import AccordionCategory from './ArrowAccordionCategory';
import type { ParsedExpenseCategoryWithExpanded } from '@ses/core/models/dto/expenseCategoriesDTO';
interface Props {
  isOpen?: boolean;
  onChange?: () => void;
  className?: string;
  category: ParsedExpenseCategoryWithExpanded;
  expanded: boolean;
  handleChangeItemAccordion: (id: string, expanded: boolean) => void;
}

const CategoryItem: React.FC<Props> = ({ category, className, expanded, handleChangeItemAccordion }) => (
  <Container className={className}>
    <AccordionCategory category={category} expanded={expanded} handleChangeItemAccordion={handleChangeItemAccordion} />
  </Container>
);

export default CategoryItem;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
