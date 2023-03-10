import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import { TABLE_COLUMN_SIZE_BUDGET } from '../../utils/tableColumnSizes';
import type { CostBreakdownFilterValue } from '../../financesOverviewTypes';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TableFooterProps {
  mode: CostBreakdownFilterValue;
  total: number;
}

const TableFooter: React.FC<TableFooterProps> = ({ mode, total = 0 }) => {
  const { isLight } = useThemeContext();

  return (
    <TableFooterContainer isLight={isLight}>
      <Total isLight={isLight}>Total </Total>
      <TotalNumber isLight={isLight} extraPadding={mode === 'By budget'}>
        {usLocalizedNumber(total)} DAI
      </TotalNumber>
    </TableFooterContainer>
  );
};

export default TableFooter;

const TableFooterContainer = styled.div<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#ECF1F3' : 'red',
  padding: '14px 16px',
  display: 'flex',
  justifyContent: 'space-between',
}));

const Total = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: isLight ? '#000000' : 'blue',
}));

const TotalNumber = styled.div<WithIsLight & { extraPadding: boolean }>(({ isLight, extraPadding }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: isLight ? '#231536' : 'blue',
  textAlign: 'right',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  paddingRight: extraPadding ? TABLE_COLUMN_SIZE_BUDGET[3] + 8 : 0,
}));
