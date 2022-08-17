import React, { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import styled from '@emotion/styled';
import { CardsWrapper, TableWrapper, Title } from '../transparency-report';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { Tabs } from '../../../components/tabs/tabs';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TableCell } from '../../../components/table-cell/table-cell';
import { CustomLink } from '../../../components/custom-link/custom-link';
import {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
} from '../../../../core/models/dto/core-unit.dto';
import { useTransparencyForecastMvvm } from './transparency-forecast.mvvm';
import { formatAddressForOutput } from '../../../../core/utils/string.utils';
import _ from 'lodash';
import { NumberCell } from '../../../components/number-cell/number-cell';
import { TransparencyCard } from '../../../components/transparency-card/transparency-card';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { TransparencyEmptyTable } from '../placeholders/transparency-empty-table';

interface TransparencyForecastProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
}

export const TransparencyForecast = (props: TransparencyForecastProps) => {
  const [thirdIndex, setThirdIndex] = useState(0);
  const isLight = useThemeContext().themeMode === 'light';

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
    breakdownTabs,
    getLineItemsForWalletOnMonth,
    getLineItemForecastSumForMonth,
    getLineItemForecastSumForMonths,
    getBudgetCapForMonthOnLineItem,
    getTotalQuarterlyBudgetCapOnLineItem,
    wallets,
  } = useTransparencyForecastMvvm(props.currentMonth, props.budgetStatements);

  const forecastTableItems: JSX.Element[][] = useMemo(() => {
    const result: JSX.Element[][] = [];

    if (!props.budgetStatements || props.budgetStatements.length === 0) {
      return result;
    }

    wallets.forEach((wallet) => {
      result.push([
        <WalletTableCell
          key={1}
          name={wallet.name}
          wallet={formatAddressForOutput(wallet.address ?? '')}
          address={wallet.address}
        />,
        <NumberCell
          key={2}
          value={getForecastForMonthOnWalletOnBudgetStatement(
            props.budgetStatements,
            wallet?.address,
            props.currentMonth,
            firstMonth
          )}
        />,
        <NumberCell
          key={3}
          value={getForecastForMonthOnWalletOnBudgetStatement(
            props.budgetStatements,
            wallet?.address,
            props.currentMonth,
            secondMonth
          )}
        />,
        <NumberCell
          key={4}
          value={getForecastForMonthOnWalletOnBudgetStatement(
            props.budgetStatements,
            wallet?.address,
            props.currentMonth,
            thirdMonth
          )}
        />,
        <NumberCell
          key={5}
          value={getForecastSumOfMonthsOnWallet(
            props.budgetStatements,
            wallet?.address,
            props.currentMonth,
            [firstMonth, secondMonth, thirdMonth]
          )}
        />,
        <NumberCell
          key={6}
          value={getBudgetCapForMonthOnWalletOnBudgetStatement(
            props.budgetStatements,
            wallet?.address,
            props.currentMonth,
            props.currentMonth
          )}
        />,
        <NumberCell
          key={7}
          value={getBudgetCapSumOfMonthsOnWallet(
            props.budgetStatements,
            wallet?.address,
            props.currentMonth,
            [firstMonth, secondMonth, thirdMonth]
          )}
        />,
        <TableCell key={8} responsivePadding="0">
          <CustomLink
            fontSize={16}
            fontFamily={'SF Pro Display, sans-serif'}
            href={`https://etherscan.io/address/${wallet.address}`}
            style={{ marginRight: '16px' }}
          >
            Etherscan
          </CustomLink>
          <CustomLink
            fontSize={16}
            fontFamily={'SF Pro Display, sans-serif'}
            href={`https://gnosis-safe.io/app/eth:${wallet.address}`}
          >
            Gnosis
          </CustomLink>
        </TableCell>,
      ]);
    });

    result.push([
      <TableCell key={1}>
        <b>Total</b>
      </TableCell>,
      <NumberCell
        key={2}
        value={getForecastSumForMonth(
          props.budgetStatements,
          props.currentMonth,
          firstMonth
        )}
        bold
      />,
      <NumberCell
        key={3}
        value={getForecastSumForMonth(
          props.budgetStatements,
          props.currentMonth,
          secondMonth
        )}
        bold
      />,
      <NumberCell
        key={4}
        value={getForecastSumForMonth(
          props.budgetStatements,
          props.currentMonth,
          thirdMonth
        )}
        bold
      />,
      <NumberCell
        key={5}
        value={getForecastSumForMonths(
          props.budgetStatements,
          props.currentMonth,
          [firstMonth, secondMonth, thirdMonth]
        )}
        bold
      />,
      <NumberCell
        key={6}
        value={getBudgetCapForMonthOnBudgetStatement(
          props.budgetStatements,
          props.currentMonth,
          props.currentMonth
        )}
        bold
      />,
      <NumberCell
        key={7}
        value={getTotalQuarterlyBudgetCapOnBudgetStatement(
          props.budgetStatements,
          [firstMonth, secondMonth, thirdMonth]
        )}
        bold
      />,
    ]);

    return result;
  }, [props.currentMonth, props.budgetStatements]);

  const breakdownHeaders = useMemo(() => {
    return [
      'Budget Category',
      firstMonth.toFormat('MMMM'),
      secondMonth.toFormat('MMMM'),
      thirdMonth.toFormat('MMMM'),
      '3 Months',
      'Monthly Budget',
      'Quarterly Budget Cap',
    ];
  }, [props.currentMonth, props.budgetStatements]);

  const getBreakdownItemsForGroup = (grouped: {
    [id: string]: BudgetStatementLineItemDto[];
  }) => {
    const result = [];
    for (const groupedKey in grouped) {
      if (
        Math.abs(
          getLineItemForecastSumForMonth(grouped[groupedKey], firstMonth)
        ) +
          Math.abs(
            getLineItemForecastSumForMonth(grouped[groupedKey], secondMonth)
          ) +
          Math.abs(
            getLineItemForecastSumForMonth(grouped[groupedKey], thirdMonth)
          ) +
          Math.abs(
            getLineItemForecastSumForMonths(grouped[groupedKey], [
              firstMonth,
              secondMonth,
              thirdMonth,
            ])
          ) +
          Math.abs(
            getBudgetCapForMonthOnLineItem(
              grouped[groupedKey],
              props.currentMonth
            )
          ) +
          Math.abs(
            getTotalQuarterlyBudgetCapOnLineItem(grouped[groupedKey], [
              firstMonth,
              secondMonth,
              thirdMonth,
            ])
          ) ===
        0
      ) {
        continue;
      }
      result.push([
        <TableCell key={1}>{groupedKey}</TableCell>,
        <NumberCell
          key={2}
          value={getLineItemForecastSumForMonth(
            grouped[groupedKey],
            firstMonth
          )}
        />,
        <NumberCell
          key={3}
          value={getLineItemForecastSumForMonth(
            grouped[groupedKey],
            secondMonth
          )}
        />,
        <NumberCell
          key={4}
          value={getLineItemForecastSumForMonth(
            grouped[groupedKey],
            thirdMonth
          )}
        />,
        <NumberCell
          key={5}
          value={getLineItemForecastSumForMonths(grouped[groupedKey], [
            firstMonth,
            secondMonth,
            thirdMonth,
          ])}
        />,
        <NumberCell
          key={6}
          value={getBudgetCapForMonthOnLineItem(
            grouped[groupedKey],
            props.currentMonth
          )}
        />,
        <NumberCell
          key={7}
          value={getTotalQuarterlyBudgetCapOnLineItem(grouped[groupedKey], [
            firstMonth,
            secondMonth,
            thirdMonth,
          ])}
        />,
      ]);
    }

    return result;
  };

  const breakdownItems = useMemo(() => {
    const result: JSX.Element[][] = [];

    if (!props.budgetStatements || props.budgetStatements.length === 0) {
      return result;
    }
    if (!wallets.length) {
      return result;
    }

    const currentWalletAddress = wallets[thirdIndex]?.address ?? '';

    const ungrouped = [
      ...getLineItemsForWalletOnMonth(
        props.budgetStatements,
        props.currentMonth,
        firstMonth,
        currentWalletAddress
      ),
      ...getLineItemsForWalletOnMonth(
        props.budgetStatements,
        props.currentMonth,
        secondMonth,
        currentWalletAddress
      ),
      ...getLineItemsForWalletOnMonth(
        props.budgetStatements,
        props.currentMonth,
        thirdMonth,
        currentWalletAddress
      ),
    ];

    result.push([
      <TableCell key={1}>
        <b>Headcount Expenses</b>
      </TableCell>,
    ]);

    const groupedHeadCount = _.groupBy(
      ungrouped.filter((x) => x.headcountExpense),
      (item) => item.budgetCategory
    );

    result.push(...getBreakdownItemsForGroup(groupedHeadCount));

    result.push([
      <TableCell key={1}>
        <b>Non-Headcount Expenses</b>
      </TableCell>,
    ]);

    const groupedNonHeadCount = _.groupBy(
      ungrouped.filter((x) => !x.headcountExpense),
      (item) => item.budgetCategory
    );

    result.push(...getBreakdownItemsForGroup(groupedNonHeadCount));

    result.push([
      <TableCell key={1}>
        <b>Total</b>
      </TableCell>,
      <NumberCell
        key={2}
        value={getForecastForMonthOnWalletOnBudgetStatement(
          props.budgetStatements,
          currentWalletAddress,
          props.currentMonth,
          firstMonth
        )}
        bold
      />,
      <NumberCell
        key={3}
        value={getForecastForMonthOnWalletOnBudgetStatement(
          props.budgetStatements,
          currentWalletAddress,
          props.currentMonth,
          secondMonth
        )}
        bold
      />,
      <NumberCell
        key={4}
        value={getForecastForMonthOnWalletOnBudgetStatement(
          props.budgetStatements,
          currentWalletAddress,
          props.currentMonth,
          thirdMonth
        )}
        bold
      />,
      <NumberCell
        key={5}
        value={getForecastSumOfMonthsOnWallet(
          props.budgetStatements,
          currentWalletAddress,
          props.currentMonth,
          [firstMonth, secondMonth, thirdMonth]
        )}
        bold
      />,
      <NumberCell
        key={6}
        value={getBudgetCapForMonthOnWalletOnBudgetStatement(
          props.budgetStatements,
          currentWalletAddress,
          props.currentMonth,
          props.currentMonth
        )}
        bold
      />,
      <NumberCell
        key={7}
        value={getBudgetCapSumOfMonthsOnWallet(
          props.budgetStatements,
          currentWalletAddress,
          props.currentMonth,
          [firstMonth, secondMonth, thirdMonth]
        )}
        bold
      />,
    ]);

    return result;
  }, [props.currentMonth, props.budgetStatements, thirdIndex]);

  const breakdownCards = useMemo(() => {
    const currentWalletAddress = wallets[thirdIndex]?.address ?? '';

    const ungrouped = [
      ...getLineItemsForWalletOnMonth(
        props.budgetStatements,
        props.currentMonth,
        firstMonth,
        currentWalletAddress
      ),
      ...getLineItemsForWalletOnMonth(
        props.budgetStatements,
        props.currentMonth,
        secondMonth,
        currentWalletAddress
      ),
      ...getLineItemsForWalletOnMonth(
        props.budgetStatements,
        props.currentMonth,
        thirdMonth,
        currentWalletAddress
      ),
    ];

    const cardHeaders = breakdownHeaders.slice(1, 7);

    return (
      <>
        <Title isLight={isLight}>Headcount Expenses</Title>
        {getBreakdownItemsForGroup(
          _.groupBy(
            ungrouped.filter((x) => x.headcountExpense),
            (item) => item.budgetCategory
          )
        ).map((item) => (
          <TransparencyCard
            header={item[0]}
            headers={cardHeaders}
            items={item.slice(1)}
          />
        ))}
        <Title isLight={isLight}>Non-Headcount Expenses</Title>
        {getBreakdownItemsForGroup(
          _.groupBy(
            ungrouped.filter((x) => !x.headcountExpense),
            (item) => item.budgetCategory
          )
        ).map((item) => (
          <TransparencyCard
            header={item[0]}
            headers={cardHeaders}
            items={item.slice(1)}
          />
        ))}
        <TransparencyCard
          header={
            <TableCell key={1}>
              <b>Total</b>
            </TableCell>
          }
          headers={cardHeaders}
          items={[
            <NumberCell
              key={2}
              value={getForecastForMonthOnWalletOnBudgetStatement(
                props.budgetStatements,
                currentWalletAddress,
                props.currentMonth,
                firstMonth
              )}
              bold
            />,
            <NumberCell
              key={3}
              value={getForecastForMonthOnWalletOnBudgetStatement(
                props.budgetStatements,
                currentWalletAddress,
                props.currentMonth,
                secondMonth
              )}
              bold
            />,
            <NumberCell
              key={4}
              value={getForecastForMonthOnWalletOnBudgetStatement(
                props.budgetStatements,
                currentWalletAddress,
                props.currentMonth,
                thirdMonth
              )}
              bold
            />,
            <NumberCell
              key={5}
              value={getForecastSumOfMonthsOnWallet(
                props.budgetStatements,
                currentWalletAddress,
                props.currentMonth,
                [firstMonth, secondMonth, thirdMonth]
              )}
              bold
            />,
            <NumberCell
              key={6}
              value={getBudgetCapForMonthOnWalletOnBudgetStatement(
                props.budgetStatements,
                currentWalletAddress,
                props.currentMonth,
                props.currentMonth
              )}
              bold
            />,
            <NumberCell
              key={7}
              value={getBudgetCapSumOfMonthsOnWallet(
                props.budgetStatements,
                currentWalletAddress,
                props.currentMonth,
                [firstMonth, secondMonth, thirdMonth]
              )}
              bold
            />,
          ]}
        />
      </>
    );
  }, [props.currentMonth, props.budgetStatements, thirdIndex]);

  return (
    <Container>
      <Title isLight={isLight} marginBottom={24}>
        {props.currentMonth.toFormat('MMM yyyy')} Totals
      </Title>

      {!forecastTableItems.length
        ? (
        <TransparencyEmptyTable />
          )
        : (
        <>
          <TableWrapper>
            <InnerTable
              headers={forecastTableHeaders}
              items={forecastTableItems}
              minWidth={80}
              headersAlign={[
                'left',
                'right',
                'right',
                'right',
                'right',
                'right',
                'right',
                'left',
              ]}
              headerWidths={[
                '190px',
                '105px',
                '105px',
                '105px',
                '116px',
                '140px',
                '200px',
                '224px',
              ]}
              headerStyles={[
                {},
                {},
                {},
                {},
                { paddingLeft: 0 },
                { paddingLeft: 0 },
                { paddingLeft: 0 },
                {},
              ]}
              style={{ marginBottom: '64px' }}
            />
          </TableWrapper>

          <CardsWrapper>
            {forecastTableItems.map((item) => (
              <TransparencyCard
                header={item[0]}
                headers={breakdownHeaders.slice(1, 7)}
                items={item.slice(1, 7)}
                footer={item[7]}
              />
            ))}
          </CardsWrapper>
        </>
          )}

      <Title isLight={isLight} marginBottom={24}>
        {props.currentMonth.toFormat('MMM yyyy')} Breakdown
      </Title>

      {!forecastTableItems.length
        ? (
        <TransparencyEmptyTable breakdown />
          )
        : (
        <>
          <Tabs
            items={breakdownTabs}
            currentIndex={thirdIndex}
            onChange={setThirdIndex}
            style={{
              marginBottom: '32px',
            }}
          />

          <TableWrapper>
            <InnerTable
              headers={breakdownHeaders}
              items={breakdownItems}
              minWidth={80}
              headerWidths={[
                '260px',
                '141px',
                '141px',
                '141px',
                '116px',
                '141px',
                '241px',
                '219px',
              ]}
              headersAlign={[
                'left',
                'right',
                'right',
                'right',
                'right',
                'right',
                'right',
              ]}
            />
          </TableWrapper>

          <CardsWrapper>{breakdownCards}</CardsWrapper>
        </>
          )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
