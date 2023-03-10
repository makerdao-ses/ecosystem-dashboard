import styled from '@emotion/styled';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import Link from 'next/link';
import React from 'react';
import { TABLE_COLUMN_SIZE_BUDGET } from '../../utils/tableColumnSizes';
import RelativeBudgetBar from '../RelativeBudgetBar/RelativeBudgetBar';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ByBudgetTableRowProps {
  shortCode: string;
  name: string;
  total: number;
}

const ByBudgetTableRow: React.FC<ByBudgetTableRowProps> = ({ shortCode, name, total }) => {
  const { isLight } = useThemeContext();

  return (
    <Row>
      <Cell width={TABLE_COLUMN_SIZE_BUDGET[0]}>
        <ShortCode isLight={isLight}>{shortCode}</ShortCode>
        <Name isLight={isLight}>{name}</Name>
      </Cell>
      <Cell width={TABLE_COLUMN_SIZE_BUDGET[1]} align={'right'}>
        <TotalBarContainer>
          <RelativeBudgetBar budgetCap={20} actuals={14} prediction={16} />
          <TotalPercentage isLight={isLight}>32%</TotalPercentage>
        </TotalBarContainer>
      </Cell>
      <Cell width={TABLE_COLUMN_SIZE_BUDGET[2] - 8} align={'right'}>
        <TotalNumber isLight={isLight}>{usLocalizedNumber(total)} DAI</TotalNumber>
      </Cell>
      <Cell width={TABLE_COLUMN_SIZE_BUDGET[3] + 16} align={'center'}>
        <Link href={siteRoutes.coreUnitReports(shortCode)}>
          <ViewLink isLight={isLight}>View</ViewLink>
        </Link>
      </Cell>
    </Row>
  );
};

export default ByBudgetTableRow;

const Row = styled.div({
  padding: '16px 0 16px 16px',
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

const ShortCode = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '22px',
  color: isLight ? '#9FAFB9' : 'red',
  marginRight: 3,
}));

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

const ViewLink = styled.a<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  color: isLight ? '#1AAB9B' : 'red',
}));
