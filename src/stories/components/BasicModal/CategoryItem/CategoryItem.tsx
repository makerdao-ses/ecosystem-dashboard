import styled from '@emotion/styled';
import React from 'react';
import AccordionCategory from './ArrowAccordionCategory';
interface Props {
  category: string;
  isOpen?: boolean;
  onChange?: () => void;
  className?: string;
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
  width: 416,
  alignItems: 'center',
});
