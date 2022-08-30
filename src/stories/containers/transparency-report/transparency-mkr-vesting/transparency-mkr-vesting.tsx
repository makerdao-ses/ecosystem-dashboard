import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { CardsWrapper, TableWrapper, Title } from '../transparency-report';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { TableCell } from '../../../components/table-cell/table-cell';
import { DateTime } from 'luxon';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useTransparencyMkrVesting } from './transparency-mkr-vesting.mvvm';
import { NumberCell } from '../../../components/number-cell/number-cell';
import { TransparencyCard } from '../../../components/transparency-card/transparency-card';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { TransparencyEmptyTable } from '../placeholders/transparency-empty-table';
import { CustomPopover } from '../../../components/custom-popover/custom-popover';

interface TransparencyMkrVestingProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
}

const headers = [
  'Vesting Date',
  'MKR Amount',
  'Last month',
  'difference',
  'reason(s)',
];

export const TransparencyMkrVesting = (props: TransparencyMkrVestingProps) => {
  const { mkrVestings, totalAmount, totalOldAmount, FTEs } =
    useTransparencyMkrVesting(props.currentMonth, props.budgetStatements);
  const isLight = useThemeContext().themeMode === 'light';

  const items = useMemo(() => {
    const result: JSX.Element[][] = [];

    mkrVestings?.forEach((mkr) => {
      result.push([
        <TableCell>{mkr.vestingDate}</TableCell>,
        <NumberCell value={mkr.mkrAmount} />,
        <NumberCell value={mkr.mkrAmountOld} />,
        <NumberCell value={Number(mkr.mkrAmount) - Number(mkr.mkrAmountOld)} />,
        <TableCell style={{ paddingLeft: '36px' }}>{mkr.comments}</TableCell>,
      ]);
    });

    result.push([
      <TableCell>
        <b>Total</b>
      </TableCell>,
      <NumberCell value={Number(totalAmount)} bold />,
      <NumberCell value={Number(totalOldAmount)} bold />,
      <NumberCell value={Number(totalAmount) - Number(totalOldAmount)} bold />,
      <TableCell />,
    ]);

    return result;
  }, [props.currentMonth, props.budgetStatements]);

  return (
    <Container>
      <Title isLight={isLight} marginBottom={24}>
        MKR Vesting Overview
      </Title>
      <ContainerPopover>
        <CustomPopover
          title={'Full-Time Equivalents'}
          id={'popover-fulltime equivalent'}
        >
          <TotalFte isLight={isLight}>
            <span>Total FTEs</span>
            <u>{FTEs}</u>
          </TotalFte>
        </CustomPopover>
      </ContainerPopover>
      {items.length - 1 <= 0
        ? (
          <TransparencyEmptyTable />
          )
        : (
          <>
            <TableWrapper>
              <InnerTable
                headers={headers}
                headersAlign={['left', 'right', 'right', 'right', 'left']}
                headerStyles={[{}, {}, {}, {}, { paddingLeft: '38px' }]}
                items={items}
                minWidth={200}
                headerWidths={['200px', '210px', '210px', '210px', '354px']}
                style={{ marginBottom: '32px' }}
              />
            </TableWrapper>

            <CardsWrapper>
              {items.map((item) => (
                <TransparencyCard
                  header={item[0]}
                  headers={headers.slice(1)}
                  items={item.slice(1)}
                />
              ))}
            </CardsWrapper>

            <Text isLight={isLight}>
              This Overview is based on MIP40c3-SP17, SES’ MKR Incentive Proposal.
            </Text>

            <Text isLight={isLight} style={{ marginBottom: '90px' }}>
              The Difference column indicates any changes in the MKR vesting
              amounts compared to last month, with the Reason(s) column indicating
              why the amounts changed. Reasons may include: New hires, FTE
              changes, Promotions, or Terminations.
            </Text>
          </>
          )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const TotalFte = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',
  '> span': {
    marginRight: '16px',
  },
  '> u': {
    fontSize: '16px',
    paddingBottom: '2px',
    lineHeight: '19px',
    textDecoration: 'none',
    color: isLight ? '#25273D' : '#708390',
    borderBottom: '1px solid #231536',
  },
  '@media (min-width: 834px)': {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

const Text = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: '16px',
  '@media (min-width: 834px)': {
    fontSize: '16px',
    lineHeight: '19px',
  },
}));

const ContainerPopover = styled.div({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  cursor: 'pointer',
  marginBottom: '36px',
});
