import styled from '@emotion/styled';
import React from 'react';
import AccordionCategory from './ArrowAccordionCategory';
import type { ParsedExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
interface Props {
  isOpen?: boolean;
  onChange?: () => void;
  className?: string;
  category: ParsedExpenseCategory;
}

const CategoryItem: React.FC<Props> = ({ category, className }) => (
  <Container className={className}>
    <AccordionCategory category={category} />
  </Container>
);

export default CategoryItem;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
