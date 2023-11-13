import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { BudgetType } from '@ses/core/models/interfaces/projects';

interface BudgetTypeBadgeProps {
  budgetType: BudgetType;
}

const BudgetTypeBadge: React.FC<BudgetTypeBadgeProps> = ({ budgetType }) => {
  const { isLight } = useThemeContext();
  const color = '#5D48FF';
  const background = isLight ? 'rgba(247, 245, 255, 0.50)' : 'rgba(93, 72, 255, 0.15)';

  return (
    <BudgetBadge color={color} background={background}>
      {budgetType}
    </BudgetBadge>
  );
};

export default BudgetTypeBadge;

const BudgetBadge = styled.span<{ color: string; background: string }>(({ color, background }) => ({
  borderRadius: 6,
  padding: '3px 7px',
  border: `1px solid ${color}`,
  background,
  color,
  fontSize: 11,
  lineHeight: 'normal',
}));
