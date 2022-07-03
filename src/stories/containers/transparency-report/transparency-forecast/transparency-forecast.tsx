import React, { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import styled from '@emotion/styled';
import { Title } from '../transparency-report';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { Tabs } from '../../../components/tabs/tabs';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TableCell } from '../../../components/table-cell/table-cell';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useTransparencyForecastMvvm } from './transparency-forecast.mvvm';
import { formatAddressForOutput } from '../../../../core/utils/string.utils';

const secondTableItems = [
  [<TableCell key={1}><b>Headcount Expenses Subtotal</b></TableCell>, '', '', '', '', ''],
  [<TableCell key={1}>Contractor Fees</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>109,669</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>109,669</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>109,669</TableCell>, <TableCell key={5}>Lower exchange rate costs.</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={6}>109,669</TableCell>],
  [<TableCell key={1}><b>Non-Headcount Expenses Subtotal</b></TableCell>, '', '', '', '', ''],
  [<TableCell key={1}>Contingency Buffer</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>0</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>0</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, '', <TableCell fontFamily={'SF Pro Display, sans-serif'} key={6}>0</TableCell>],
  [<TableCell key={1}><b>Total</b></TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}><b>134,468</b></TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}><b>134,468</b></TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}><b>134,468</b></TableCell>, '', <TableCell fontFamily={'SF Pro Display, sans-serif'} key={5}><b>134,468</b></TableCell>]
];

const thirdTableItems = [
  [<TableCell key={1}><b>Headcount Expenses Subtotal</b></TableCell>, '', '', '', '', '', ''],
  [<TableCell key={1}>Chaos Labs</TableCell>, <TableCell key={2}>Contractor Fees</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>109,669</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>109,669</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>109,669</TableCell>, <TableCell key={5}>Lower exchange rate costs.</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={6}>109,669</TableCell>],
  [<TableCell key={1}><b>Non-Headcount Expenses Subtotal</b></TableCell>, '', '', '', '', '', ''],
  [<TableCell key={1}>Contingency Buffer</TableCell>, '', <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>0</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>0</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, '', <TableCell fontFamily={'SF Pro Display, sans-serif'} key={6}>0</TableCell>],
  [<TableCell key={1}><b>Total</b></TableCell>, '', <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}><b>134,468</b></TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}><b>134,468</b></TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}><b>134,468</b></TableCell>, '', <TableCell fontFamily={'SF Pro Display, sans-serif'} key={5}><b>134,468</b></TableCell>]
];

interface TransparencyForecastProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
}

export const TransparencyForecast = (props: TransparencyForecastProps) => {
  const [thirdIndex, setThirdIndex] = useState(0);

  const {
    getForecastForMonthOnWalletOnBudgetStatement,
    getBudgetCapForMonthOnWalletOnBudgetStatement,
    getForecastSumOfMonthsOnWallet,
    getBudgetCapSumOfMonthsOnWallet,
    getForecastSumForMonth,
    getForecastSumForMonths,
    getBudgetCapForMonthOnBudgetStatement,
    getTotalQuarterlyBudgetCapOnBudgetStatement,
    forecastTableHeaders,
    firstMonth,
    secondMonth,
    thirdMonth,
  } = useTransparencyForecastMvvm(props.currentMonth);

  const forecastTableItems: JSX.Element[][] = useMemo(() => {
    const result: JSX.Element[][] = [];

    if (!props.budgetStatements || props.budgetStatements.length === 0) return result;

    props.budgetStatements[0].budgetStatementWallet.forEach(wallet => {
      result.push([
          <WalletTableCell key={1} name={wallet.name} wallet={formatAddressForOutput(wallet.address ?? '')}/>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>{getForecastForMonthOnWalletOnBudgetStatement(props.budgetStatements, wallet?.address ?? '', firstMonth).toLocaleString()}</TableCell>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>{getForecastForMonthOnWalletOnBudgetStatement(props.budgetStatements, wallet?.address ?? '', secondMonth).toLocaleString()}</TableCell>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>{getForecastForMonthOnWalletOnBudgetStatement(props.budgetStatements, wallet?.address ?? '', thirdMonth).toLocaleString()}</TableCell>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={5}>{getForecastSumOfMonthsOnWallet(props.budgetStatements, wallet?.address ?? '', [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</TableCell>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={6}>{getBudgetCapForMonthOnWalletOnBudgetStatement(props.budgetStatements, wallet?.address ?? '', props.currentMonth).toLocaleString()}</TableCell>,
          <TableCell fontFamily={'SF Pro Display, sans-serif'} key={7}>{getBudgetCapSumOfMonthsOnWallet(props.budgetStatements, wallet?.address ?? '', [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</TableCell>,
          <TableCell key={8}>
            <CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={`https://etherscan.io/address/${wallet.address}`} style={{ marginRight: '16px' }}>Etherscan</CustomLink>
            <CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={`https://gnosis-safe.io/app/eth:${wallet.address}`}>Gnosis</CustomLink>
          </TableCell>
      ]);
    });

    result.push([
      <TableCell key={1}><b>Total</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}><b>{getForecastSumForMonth(props.budgetStatements, firstMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}><b>{getForecastSumForMonth(props.budgetStatements, secondMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}><b>{getForecastSumForMonth(props.budgetStatements, thirdMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={5}><b>{getForecastSumForMonths(props.budgetStatements, [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={6}><b>{getBudgetCapForMonthOnBudgetStatement(props.budgetStatements, props.currentMonth).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={7}><b>{getTotalQuarterlyBudgetCapOnBudgetStatement(props.budgetStatements, [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</b></TableCell>,
      <TableCell fontFamily={'SF Pro Display, sans-serif'} key={8}/>,
    ]);

    return result;
  }, [props.currentMonth, props.budgetStatements]);

  return <Container>
    <Title style={{
      marginBottom: '32px'
    }}>
      {props.currentMonth.toFormat('MMM yyyy')} Totals
    </Title>

    <InnerTable
      headers={forecastTableHeaders}
      items={forecastTableItems}
      minWidth={80}
      headersAlign={['left', 'right', 'right', 'right', 'right', 'right', 'right', 'left']}
      headerWidths={['unset', 'unset', 'unset', 'unset', 'unset', 'unset', 'unset', '224px']}
      headerStyles={[{}, {}, {}, {}, { paddingLeft: 0 }, { paddingLeft: 0 }, { paddingLeft: 0 }, {}]}
      style={{ marginBottom: '64px' }}
    />

    <Title style={{
      marginBottom: '32px'
    }}>
      {props.currentMonth.toFormat('MMM yyyy')} Breakdown
    </Title>

    <Tabs
      items={['Permanent team', 'Incubation', 'Grants']}
      currentIndex={thirdIndex}
      onChange={setThirdIndex}
      style={{
        marginBottom: '32px',
      }}
    />

    {thirdIndex === 0 && <InnerTable
        headers={['Budget Category', 'Forecast', 'Actuals', 'Difference', 'Diff. Reason', 'Payments']}
        items={secondTableItems}
        style={{ marginBottom: '64px' }}
        headersAlign={['left', 'right', 'right', 'right', 'left', 'right']}
    />}

    {thirdIndex === 1 && <InnerTable
        headers={['Group', 'budget category', 'forecast', 'actuals', 'difference', 'diff. reason', 'payments']}
        headersAlign={['left', 'left', 'right', 'right', 'right', 'left', 'right']}
        items={thirdTableItems}
        minWidth={80}
        style={{ marginBottom: '64px' }}
    />}

    {thirdIndex === 2 && <InnerTable
        headers={['Group', 'budget category', 'forecast', 'actuals', 'difference', 'diff. reason', 'payments']}
        headersAlign={['left', 'left', 'right', 'right', 'right', 'left', 'right']}
        minWidth={80}
        items={thirdTableItems}
        style={{ marginBottom: '64px' }}
    />}
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});
