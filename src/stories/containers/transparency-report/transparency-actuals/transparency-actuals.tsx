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
  BudgetStatementWalletDto
} from '../../../../core/models/dto/core-unit.dto';
import _ from 'lodash';

interface TransparencyActualsProps {
  currentMonth: DateTime;
  budgetStatements?: BudgetStatementDto[];
}
export const TransparencyActuals = (props: TransparencyActualsProps) => {
  const [thirdIndex, setThirdIndex] = useState(0);

  const getWalletForecast = (wallet: BudgetStatementWalletDto) => {
    return _.sumBy(wallet?.budgetStatementLineItem, i => i.forecast ?? 0);
  };

  const getWalletActual = (wallet: BudgetStatementWalletDto) => {
    return _.sumBy(wallet?.budgetStatementLineItem, i => i.actual ?? 0);
  };

  const getWalletDifference = (wallet: BudgetStatementWalletDto) => {
    return (getWalletForecast(wallet) - getWalletActual(wallet));
  };

  const currentBudgetStatement = useMemo(() => {
    const currentMonth = props.currentMonth.toFormat('yyyy-MM-01');
    setThirdIndex(0);
    return props.budgetStatements?.find(x => x.month === currentMonth) ?? null;
  }, [props.currentMonth]);

  const breakdownHeaders = useMemo(() => {
    return currentBudgetStatement?.budgetStatementWallet?.map(wallet => wallet.name);
  }, [currentBudgetStatement]);

  const budgetTotalForecast = useMemo(() => {
    return _.sumBy(currentBudgetStatement?.budgetStatementWallet, wallet => _.sumBy(wallet.budgetStatementLineItem, item => item?.forecast ?? 0));
  }, [currentBudgetStatement]);

  const budgetTotalActual = useMemo(() => {
    return _.sumBy(currentBudgetStatement?.budgetStatementWallet, wallet => _.sumBy(wallet.budgetStatementLineItem, item => item?.actual ?? 0));
  }, [currentBudgetStatement]);

  const budgetTotalDifference = useMemo(() => {
    return budgetTotalForecast - budgetTotalActual;
  }, [currentBudgetStatement]);

  const formatAddressForOutput = (address: string | undefined) => {
    if (!address) { return ''; }
    return `${address.slice(0, 5)}..${address.slice(address.length - 5, address.length - 1)}`;
  };

  const mainTableItems = useMemo(() => {
    const result: JSX.Element[][] = [];
    if (currentBudgetStatement) {
      currentBudgetStatement.budgetStatementWallet?.forEach(wallet => {
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
        <TableCell key={2}><b>{Math.abs(budgetTotalForecast).toLocaleString()}</b></TableCell>,
        <TableCell key={3}><b>{Math.abs(budgetTotalActual).toLocaleString()}</b></TableCell>,
        <TableCell key={4}><b>{Math.abs(budgetTotalDifference).toLocaleString()}</b></TableCell>,
        <TableCell key={5}><b>0</b></TableCell>,
        <TableCell key={6}/>,
      ]);
    }

    return result;
  }, [currentBudgetStatement]);

  const getGroupForecast = (group: BudgetStatementLineItemDto[]) => {
    return _.sumBy(group, item => item.forecast ?? 0);
  };

  const getGroupActual = (group: BudgetStatementLineItemDto[]) => {
    return _.sumBy(group, item => item.actual ?? 0);
  };

  const getGroupDifference = (group: BudgetStatementLineItemDto[]) => {
    return getGroupForecast(group) - getGroupActual(group);
  };

  const getCommentsFromCategory = (group: BudgetStatementLineItemDto[]) => {
    return group.reduce((current, next) => `${current} ${next.comments}`, '');
  };

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
    if (!currentBudgetStatement?.budgetStatementWallet?.length) { return result; }

    const currentWallet = currentBudgetStatement?.budgetStatementWallet[thirdIndex];

    result.push([
      <TableCell key={1}><b>Headcount Expenses Subtotal</b></TableCell>,
    ]);

    addBreakdownItemsToArray(result, currentWallet.budgetStatementLineItem.filter(item => item.headcountExpense));

    result.push([
      <TableCell key={1}><b>Non-Headcount Expenses Subtotal</b></TableCell>,
    ]);

    addBreakdownItemsToArray(result, currentWallet.budgetStatementLineItem.filter(item => !item.headcountExpense));

    result.push([
        <TableCell key={1}><b>Total</b></TableCell>,
        <TableCell key={2} negative={getWalletActual(currentWallet) < 0}><b>{Math.abs(getWalletForecast(currentWallet)).toLocaleString()}</b></TableCell>,
        <TableCell key={3} negative={getWalletActual(currentWallet) < 0}><b>{Math.abs(getWalletActual(currentWallet)).toLocaleString()}</b></TableCell>,
        <TableCell key={4} negative={getWalletDifference(currentWallet) < 0}><b>{Math.abs(getWalletDifference(currentWallet)).toLocaleString()}</b></TableCell>,
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
      {props.currentMonth.toFormat('MMM yyyy')} Total
    </Title>

      <InnerTable
      headers={['Budget', 'Forecast', 'Actuals', 'Difference', 'Payments', 'External Links']}
      items={mainTableItems}
      headersAlign={['left', 'right', 'right', 'right', 'right', 'left']}
      minWidth={120}
      headerWidths={['200px', 'unset', 'unset', 'unset', 'unset', '30%']}
      style={{ marginBottom: '62px' }}
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
        style={{ marginBottom: '62px' }}
        headersAlign={['left', 'right', 'right', 'right', 'left', 'right']}
      />
    </>}
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});
