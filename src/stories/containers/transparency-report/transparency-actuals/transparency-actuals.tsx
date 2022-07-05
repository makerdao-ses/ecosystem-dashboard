import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { Tabs } from '../../../components/tabs/tabs';
import { Title } from '../transparency-report';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TableCell } from '../../../components/table-cell/table-cell';
import { DateTime } from 'luxon';
import {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
} from '../../../../core/models/dto/core-unit.dto';
import _ from 'lodash';
import { useTransparencyActualsMvvm } from './transparency-actuals.mvvm';
import { formatAddressForOutput } from '../../../../core/utils/string.utils';

interface TransparencyActualsProps {
  currentMonth: DateTime;
  budgetStatements?: BudgetStatementDto[];
}
export const TransparencyActuals = (props: TransparencyActualsProps) => {
  const [thirdIndex, setThirdIndex] = useState(0);

  const {
    currentBudgetStatement,
    getWalletForecast,
    getWalletActual,
    getWalletDifference,
    budgetTotalForecast,
    budgetTotalActual,
    budgetTotalDifference,
    getGroupForecast,
    getGroupActual,
    getGroupDifference,
    getCommentsFromCategory,
    breakdownHeaders,
    wallets
  } = useTransparencyActualsMvvm(thirdIndex, setThirdIndex, props.currentMonth, props.budgetStatements);

  const mainTableItems = useMemo(() => {
    const result: JSX.Element[][] = [];
    if (currentBudgetStatement) {
      wallets.forEach(wallet => {
        result.push([
          <WalletTableCell key={1} name={wallet.name} wallet={formatAddressForOutput(wallet.address)}/>,
          <TableCell key={2}>{Math.abs(getWalletForecast(wallet)).toLocaleString()}</TableCell>,
          <TableCell key={3}>{Math.abs(getWalletActual(wallet)).toLocaleString()}</TableCell>,
          <TableCell key={3} negative={getWalletDifference(wallet) < 0}>{Math.abs(getWalletDifference(wallet)).toLocaleString()}</TableCell>,
          <TableCell key={5}>0</TableCell>,
          <TableCell key={6}>
            <CustomLink fontFamily={'SF Pro Display, sans-serif'} fontSize={16} href={`https://etherscan.io/address/${wallet.address}`} style={{ marginRight: '16px' }}>Etherscan</CustomLink>
            <CustomLink fontFamily={'SF Pro Display, sans-serif'} fontSize={16} href={`https://gnosis-safe.io/app/eth:${wallet.address}`}>Gnosis</CustomLink>
          </TableCell>
        ]);
      });

      result.push([
        <TableCell key={1}><b>Total</b></TableCell>,
        <TableCell key={2} fontFamily={'SF Pro Display, sans-serif'}><b>{Math.abs(budgetTotalForecast).toLocaleString()}</b></TableCell>,
        <TableCell key={3} fontFamily={'SF Pro Display, sans-serif'}><b>{Math.abs(budgetTotalActual).toLocaleString()}</b></TableCell>,
        <TableCell key={4} fontFamily={'SF Pro Display, sans-serif'}><b>{Math.abs(budgetTotalDifference).toLocaleString()}</b></TableCell>,
        <TableCell key={5} fontFamily={'SF Pro Display, sans-serif'}><b>0</b></TableCell>,
        <TableCell key={6}/>,
      ]);
    }

    return result;
  }, [currentBudgetStatement]);

  const addBreakdownItemsToArray = (result: JSX.Element[][], items: BudgetStatementLineItemDto[]) => {
    const grouped = _.groupBy(items, item => item.budgetCategory);

    for (const groupedKey in grouped) {
      result.push([
        <TableCell key={1}>{grouped[groupedKey][0].budgetCategory}</TableCell>,
        <TableCell key={2} negative={getGroupForecast(grouped[groupedKey]) < 0}>{Math.abs(getGroupForecast(grouped[groupedKey])).toLocaleString()}</TableCell>,
        <TableCell key={3} negative={getGroupActual(grouped[groupedKey]) < 0}>{Math.abs(getGroupActual(grouped[groupedKey])).toLocaleString()}</TableCell>,
        <TableCell key={4} negative={getGroupDifference(grouped[groupedKey]) < 0}>{Math.abs(getGroupDifference(grouped[groupedKey])).toLocaleString()}</TableCell>,
        <TableCell key={5}>{getCommentsFromCategory(grouped[groupedKey])}</TableCell>,
        <TableCell key={6}>0</TableCell>
      ]);
    }
  };

  const breakdownTableItems = useMemo(() => {
    const result: JSX.Element[][] = [];
    if (!wallets) {
      return result;
    }

    const currentWallet = wallets[thirdIndex];

    result.push([
      <TableCell key={1}><b>Headcount Expenses Subtotal</b></TableCell>,
    ]);

    addBreakdownItemsToArray(result, currentWallet?.budgetStatementLineItem?.filter(item => item.headcountExpense));

    result.push([
      <TableCell key={1}><b>Non-Headcount Expenses Subtotal</b></TableCell>,
    ]);

    addBreakdownItemsToArray(result, currentWallet?.budgetStatementLineItem?.filter(item => !item.headcountExpense));

    result.push([
      <TableCell key={1}><b>Total</b></TableCell>,
      <TableCell key={2}
                 negative={getWalletActual(currentWallet) < 0}><b>{Math.abs(getWalletForecast(currentWallet)).toLocaleString()}</b></TableCell>,
      <TableCell key={3}
                 negative={getWalletActual(currentWallet) < 0}><b>{Math.abs(getWalletActual(currentWallet)).toLocaleString()}</b></TableCell>,
      <TableCell key={4}
                 negative={getWalletDifference(currentWallet) < 0}><b>{Math.abs(getWalletDifference(currentWallet)).toLocaleString()}</b></TableCell>,
      <TableCell key={5}/>,
      <TableCell key={6}><b>0</b></TableCell>,
    ]);

    return result;
  }, [currentBudgetStatement, thirdIndex]);

  return <Container>
    {!!mainTableItems.length && <>
      <Title style={{
        marginBottom: '32px'
      }}>
      {props.currentMonth.toFormat('MMM yyyy')} Totals
    </Title>

      <InnerTable
      headers={['Budget', 'Forecast', 'Actuals', 'Difference', 'Payments', 'External Links']}
      items={mainTableItems}
      headersAlign={['left', 'right', 'right', 'right', 'right', 'left']}
      minWidth={120}
      headerWidths={['210px', 'unset', 'unset', 'unset', 'unset', '30%']}
      style={{ marginBottom: '64px' }}
      />
    </>}

    {!!mainTableItems.length && <>
      <Title style={{
        marginBottom: '32px'
      }}>
        {props.currentMonth.toFormat('MMM yyyy')} Breakdown
      </Title>

      <Tabs
        items={breakdownHeaders}
        currentIndex={thirdIndex}
        onChange={setThirdIndex}
        style={{
          marginBottom: '32px',
        }}
      />

      <InnerTable
        headers={['Budget Category', 'Forecast', 'Actuals', 'Difference', 'Diff. Reason', 'Payments']}
        items={breakdownTableItems}
        style={{ marginBottom: '64px' }}
        headersAlign={['left', 'right', 'right', 'right', 'left', 'right']}
      />
    </>}
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});
