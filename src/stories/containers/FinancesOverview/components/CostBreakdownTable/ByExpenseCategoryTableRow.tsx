import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import { TABLE_COLUMN_SIZE_CATEGORY } from '../../utils/tableColumnSizes';
import RelativeBudgetBar from '../RelativeBudgetBar/RelativeBudgetBar';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ByExpenseCategoryTableRowProps {
  name: string;
  total: number;
}

const ByExpenseCategoryTableRow: React.FC<ByExpenseCategoryTableRowProps> = ({ name, total }) => {
  const { isLight } = useThemeContext();

  return (
    <Row>
      <Cell width={TABLE_COLUMN_SIZE_CATEGORY[0]}>
        <Name isLight={isLight}>{name}</Name>
      </Cell>
      <Cell width={TABLE_COLUMN_SIZE_CATEGORY[1]} align={'right'}>
        <TotalBarContainer>
          <RelativeBudgetBar budgetCap={20} actuals={14} prediction={16} />
          <TotalPercentage isLight={isLight}>32%</TotalPercentage>
        </TotalBarContainer>
      </Cell>
      <Cell width={TABLE_COLUMN_SIZE_CATEGORY[2]} align={'right'}>
        <TotalNumber isLight={isLight}>{usLocalizedNumber(total)} DAI</TotalNumber>
      </Cell>
    </Row>
  );
};

export default ByExpenseCategoryTableRow;

const Row = styled.div({
  padding: 16,
  display: 'flex',
  alignItems: 'center',
});

const Cell = styled.div<{ width: string | number; align?: 'left' | 'right' | 'center' }>(
  ({ width, align = 'left' }) => ({
    textAlign: align,
    ...(typeof width === 'number'
      ? {
          width,
          minWidth: width,
        }
      : { width }),
  })
);

const Name = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '22px',
  color: isLight ? '#231536' : 'red',
}));

const TotalBarContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const TotalPercentage = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '15px',
  textAlign: 'right',
  color: isLight ? '#231536' : 'red',
  width: 34,
  minWidth: 34,
  marginLeft: 4,
}));

const TotalNumber = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '19px',
  letterSpacing: '0.03px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : 'red',
}));
