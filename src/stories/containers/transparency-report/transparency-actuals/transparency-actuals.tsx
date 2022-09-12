import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { Tabs } from '../../../components/tabs/tabs';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TextCell } from '../../../components/text-cell/text-cell';
import { DateTime } from 'luxon';
import {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
} from '../../../../core/models/dto/core-unit.dto';
import _ from 'lodash';
import { useTransparencyActualsMvvm } from './transparency-actuals.mvvm';
import { formatAddressForOutput } from '../../../../core/utils/string.utils';
import { NumberCell } from '../../../components/number-cell/number-cell';
import { TransparencyCard } from '../../../components/transparency-card/transparency-card';
import { CardsWrapper, TableWrapper, Title } from '../transparency-report';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { TransparencyEmptyTable } from '../placeholders/transparency-empty-table';
import { useUrlAnchor } from '../../../../core/hooks/useUrlAnchor';

interface TransparencyActualsProps {
  currentMonth: DateTime;
  budgetStatements?: BudgetStatementDto[];
  code: string;
}

const mainTableHeaders = [
  'Budget',
  'Forecast',
  'Actuals',
  'Difference',
  'Payments',
  'External Links',
];

const cardHeaders = ['Forecast', 'Actuals', 'Difference', 'Payments'];

export const TransparencyActuals = (props: TransparencyActualsProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const anchor = useUrlAnchor();
  const breakdownTitleRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const {
    currentBudgetStatement,
    getWalletForecast,
    getWalletActual,
    getWalletDifference,
    getWalletPayment,
    budgetTotalForecast,
    budgetTotalActual,
    budgetTotalDifference,
    budgetTotalPayment,
    getGroupForecast,
    getGroupActual,
    getGroupDifference,
    getGroupPayment,
    breakdownTabs,
    wallets,
  } = useTransparencyActualsMvvm(
    props.currentMonth,
    props.budgetStatements,
    props.code
  );

  const [headerIds, setHeaderIds] = useState<string[]>([]);

  const thirdIndex = useMemo(() => {
    return Math.max(headerIds?.indexOf(anchor ?? ''), 0);
  }, [headerIds, anchor]);

  const currentWallet = useMemo(
    () => wallets[thirdIndex],
    [thirdIndex, wallets]
  );

  const hasGroups = useMemo(() => {
    const currentWallet = wallets[thirdIndex];

    return currentWallet?.budgetStatementLineItem?.some((item) => {
      return item.group && item.actual;
    });
  }, [thirdIndex, currentBudgetStatement]);

  const headerToId = (header: string): string => {
    const id = header.toLowerCase().trim().replaceAll(/ /g, '-');
    return `actuals-${id}`;
  };

  useEffect(() => {
    setHeaderIds(breakdownTabs.map((header) => headerToId(header)));
  }, [breakdownTabs]);

  useEffect(() => {
    if (
      !scrolled &&
      anchor &&
      !_.isEmpty(headerIds) &&
      headerIds.includes(anchor)
    ) {
      setScrolled(true);
      let offset = (breakdownTitleRef?.current?.offsetTop || 0) - 260;
      const windowsWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      if (windowsWidth < 834) {
        offset += 90;
      }
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, Math.max(0, offset));
    }
  }, [anchor, headerIds]);

  const mainTableItems = useMemo(() => {
    const result: JSX.Element[][] = [];
    if (currentBudgetStatement) {
      let emptyWallets = 0;
      wallets.forEach((wallet) => {
        const numberCellData = [
          getWalletForecast(wallet),
          getWalletActual(wallet),
          getWalletDifference(wallet),
          getWalletPayment(wallet),
        ];

        if (numberCellData.every((n) => n === 0)) {
          emptyWallets++;
        }

        result.push([
          <WalletTableCell
            key={1}
            name={wallet.name}
            wallet={formatAddressForOutput(wallet.address)}
            address={wallet.address}
          />,
          <NumberCell key={2} value={numberCellData[0]} />,
          <NumberCell key={3} value={numberCellData[1]} />,
          <NumberCell key={3} value={numberCellData[2]} />,
          <NumberCell key={5} value={numberCellData[3]} />,
          <TextCell key={6} responsivePadding="0">
            <CustomLink
              fontFamily={'SF Pro Display, sans-serif'}
              href={`https://etherscan.io/address/${wallet.address}`}
              style={{ marginRight: '16px' }}
              fontSize={16}
              fontSizeMobile={14}
            >
              Etherscan
            </CustomLink>
            <CustomLink
              fontFamily={'SF Pro Display, sans-serif'}
              href={`https://gnosis-safe.io/app/eth:${wallet.address}`}
              fontSize={16}
              fontSizeMobile={14}
            >
              Gnosis
            </CustomLink>
          </TextCell>,
        ]);
      });

      if (result.length === emptyWallets) {
        return [];
      }
    }

    result.push([
      <TextCell key={1}>
        <b>Total</b>
      </TextCell>,
      <NumberCell key={2} value={budgetTotalForecast} bold />,
      <NumberCell key={3} value={budgetTotalActual} bold />,
      <NumberCell key={4} value={budgetTotalDifference} bold />,
      <NumberCell key={5} value={budgetTotalPayment} bold />,
    ]);

    return result;
  }, [currentBudgetStatement]);

  const getBreakdownItems = (
    items: BudgetStatementLineItemDto[],
    card = false
  ) => {
    const result: JSX.Element[][] = [];
    const grouped = _.groupBy(items, (item) => item.group);

    for (const groupedKey in grouped) {
      if (
        Math.abs(getGroupForecast(grouped[groupedKey])) +
          Math.abs(getGroupActual(grouped[groupedKey])) ===
        0
      ) {
        continue;
      }

      const groupedCategory = _.groupBy(
        grouped[groupedKey],
        (item) => item.budgetCategory
      );

      let i = 1;
      for (const groupedCatKey in groupedCategory) {
        if (
          Math.abs(getGroupForecast(groupedCategory[groupedCatKey])) +
            Math.abs(getGroupActual(groupedCategory[groupedCatKey])) ===
          0
        ) {
          continue;
        }

        result.push([
          ...(hasGroups || card
            ? [
                <TextCell key={`${groupedKey}-0`}>
                  {i === 1 ? groupedKey : ''}
                </TextCell>,
              ]
            : []),
          <TextCell key={`${groupedKey}-1`}>
            {groupedCategory[groupedCatKey][0].budgetCategory}
          </TextCell>,
          <NumberCell
            key={`${groupedKey}-2`}
            value={getGroupForecast(groupedCategory[groupedCatKey])}
          />,
          <NumberCell
            key={`${groupedKey}-3`}
            value={getGroupActual(groupedCategory[groupedCatKey])}
          />,
          <NumberCell
            key={`${groupedKey}-4`}
            value={getGroupDifference(groupedCategory[groupedCatKey])}
          />,
          <NumberCell
            key={`${groupedKey}-6`}
            value={getGroupPayment(groupedCategory[groupedCatKey])}
          />,
        ]);

        i++;
      }
    }

    return result;
  };

  const getLineItemsSubtotal = (
    items: BudgetStatementLineItemDto[],
    title: string,
    card = false
  ) => {
    return (
      items?.reduce(
        (prv, curr) =>
          curr.month === currentBudgetStatement?.month
            ? {
                group: !card ? title : '',
                budgetCategory: !hasGroups || card ? title : '',
                actual: prv.actual + curr.actual,
                forecast: (prv?.forecast ?? 0) + (curr?.forecast ?? 0),
                payment: (prv?.payment ?? 0) + (curr?.payment ?? 0),
                month: currentBudgetStatement?.month,
              }
            : prv,
        {
          actual: 0,
          forecast: 0,
          payment: 0,
        }
      ) ?? {}
    );
  };

  const hasExpenses = (headCount = true) =>
    currentWallet?.budgetStatementLineItem
      ?.filter((item) =>
        headCount ? item.headcountExpense : !item.headcountExpense
      )
      .some(
        (x) =>
          (x.actual || x.forecast) && x.month === currentBudgetStatement?.month
      );

  const breakdownTableItems = useMemo(() => {
    const result: JSX.Element[][] = [];
    if (!wallets) {
      return result;
    }

    if (hasExpenses(true)) {
      result.push([
        <TextCell key={1}>
          <b>Headcount Expenses</b>
        </TextCell>,
      ]);
    }

    result.push(
      ...getBreakdownItems(
        currentWallet?.budgetStatementLineItem?.filter(
          (item) => item.headcountExpense
        )
      )
    );

    result.push(
      ...getBreakdownItems([
        getLineItemsSubtotal(
          currentWallet?.budgetStatementLineItem?.filter(
            (item) => item.headcountExpense
          ),
          'Sub-Total'
        ),
      ])
    );

    if (hasExpenses(false)) {
      result.push([
        <TextCell key={1}>
          <b>Non-Headcount Expenses</b>
        </TextCell>,
      ]);
    }

    result.push(
      ...getBreakdownItems(
        currentWallet?.budgetStatementLineItem?.filter(
          (item) => !item.headcountExpense
        )
      )
    );

    result.push(
      ...getBreakdownItems([
        getLineItemsSubtotal(
          currentWallet?.budgetStatementLineItem?.filter(
            (item) => !item.headcountExpense
          ),
          'Sub-Total'
        ),
      ])
    );

    result.push([
      <TextCell key={0}>
        <b>Total</b>
      </TextCell>,
      ...(hasGroups ? [<TextCell key={1} />] : []),
      <NumberCell key={2} value={getWalletForecast(currentWallet)} bold />,
      <NumberCell key={3} value={getWalletActual(currentWallet)} bold />,
      <NumberCell key={4} value={getWalletDifference(currentWallet)} bold />,
      <NumberCell key={6} value={getWalletPayment(currentWallet)} bold />,
    ]);

    return result;
  }, [currentBudgetStatement, thirdIndex, headerToId, anchor]);

  const breakdownCardItems = useMemo(() => {
    const currentWallet = wallets[thirdIndex];

    return (
      <>
        {hasExpenses(true) && (
          <Title fontSize="14px" isLight={isLight}>
            Headcount Expenses
          </Title>
        )}
        {getBreakdownItems(
          currentWallet?.budgetStatementLineItem?.filter(
            (item) => item.headcountExpense
          ),
          true
        ).map((item, i) => (
          <TransparencyCard
            key={`item-${i}`}
            header={
              <>
                {item[0]}
                {item[1]}
              </>
            }
            headers={cardHeaders}
            items={item.slice(2, 6)}
          />
        ))}
        {hasExpenses(true) &&
          getBreakdownItems(
            [
              getLineItemsSubtotal(
                currentWallet?.budgetStatementLineItem?.filter(
                  (item) => item.headcountExpense
                ),
                'Sub Total',
                true
              ),
            ],
            true
          ).map((item, i) => (
            <TransparencyCard
              key={`item-${i}`}
              header={
                <>
                  {item[0]}
                  {item[1]}
                </>
              }
              headers={cardHeaders}
              items={item.slice(2, 6)}
            />
          ))}
        {hasExpenses(false) && (
          <Title isLight={isLight} fontSize="14px">
            Non-Headcount Expenses
          </Title>
        )}
        {getBreakdownItems(
          currentWallet?.budgetStatementLineItem?.filter(
            (item) => !item.headcountExpense
          ),
          true
        ).map((item, i) => (
          <TransparencyCard
            key={`item-${i}`}
            header={
              <>
                {item[0]}
                {item[1]}
              </>
            }
            headers={cardHeaders}
            items={item.slice(2, 6)}
          />
        ))}
        {hasExpenses(false) &&
          getBreakdownItems(
            [
              getLineItemsSubtotal(
                currentWallet?.budgetStatementLineItem?.filter(
                  (item) => !item.headcountExpense
                ),
                'Sub Total'
              ),
            ],
            true
          ).map((item, i) => (
            <TransparencyCard
              key={`item-${i}`}
              header={
                <>
                  {item[0]}
                  {item[1]}
                </>
              }
              headers={cardHeaders}
              items={item.slice(2, 6)}
            />
          ))}
        {(hasExpenses(true) || hasExpenses(false)) && (
          <TransparencyCard
            header={
              <TextCell>
                <b>Total</b>
              </TextCell>
            }
            headers={cardHeaders}
            items={[
              <NumberCell
                key={1}
                value={getWalletForecast(currentWallet)}
                bold
              />,
              <NumberCell
                key={2}
                value={getWalletActual(currentWallet)}
                bold
              />,
              <NumberCell
                key={3}
                value={getWalletDifference(currentWallet)}
                bold
              />,
              <TextCell key={4} />,
            ]}
          />
        )}
      </>
    );
  }, [currentBudgetStatement, thirdIndex]);

  return (
    <Container>
      <Title isLight={isLight} responsiveMarginBottom={16}>
        {props.currentMonth.toFormat('MMM yyyy')} Totals
      </Title>

      {mainTableItems.length - 1 <= 0
        ? (
        <TransparencyEmptyTable />
          )
        : (
        <>
          <TableWrapper>
            <InnerTable
              headers={mainTableHeaders}
              items={mainTableItems}
              headersAlign={[
                'left',
                'right',
                'right',
                'right',
                'right',
                'left',
              ]}
              minWidth={120}
              headerWidths={[
                '234px',
                '160px',
                '160px',
                '160px',
                '160px',
                '310px',
              ]}
              style={{ marginBottom: '64px' }}
            />
          </TableWrapper>

          <CardsWrapper>
            {wallets.length > 1 && mainTableItems.length > 1 && (
              <TransparencyCard
                header={mainTableItems[mainTableItems.length - 1][0]}
                headers={mainTableHeaders.slice(1, 5)}
                items={mainTableItems[mainTableItems.length - 1].slice(1, 5)}
                footer={mainTableItems[mainTableItems.length - 1][5]}
              />
            )}
            {mainTableItems
              .slice(0, mainTableItems.length - 1)
              .map((item, i) => (
                <TransparencyCard
                  key={`item-${i}`}
                  header={item[0]}
                  headers={mainTableHeaders.slice(1, 5)}
                  items={item.slice(1, 5)}
                  footer={item[5]}
                />
              ))}
          </CardsWrapper>
        </>
          )}

      <Title isLight={isLight} ref={breakdownTitleRef}>
        {props.currentMonth.toFormat('MMM yyyy')} Breakdown
      </Title>

      {mainTableItems.length - 1 <= 0
        ? (
        <TransparencyEmptyTable breakdown />
          )
        : (
        <>
          <Tabs
            items={breakdownTabs.map((header, i) => {
              return {
                item: header,
                id: headerIds[i],
              };
            })}
            currentIndex={thirdIndex}
            style={{
              marginBottom: '32px',
            }}
          />

          <TableWrapper>
            <InnerTable
              headers={[
                ...(hasGroups ? ['Group'] : []),
                'Budget Category',
                'Forecast',
                'Actuals',
                'Difference',
                'Payments',
              ]}
              items={breakdownTableItems}
              headerWidths={[
                hasGroups ? '20%' : '31%',
                '205px',
                '205px',
                '205px',
                '205px',
                '205px',
              ]}
              headersAlign={[
                ...(hasGroups ? ['left'] : []),
                'left',
                'right',
                'right',
                'right',
                'right',
              ]}
              minWidth={100}
            />
          </TableWrapper>

          <CardsWrapper>{breakdownCardItems}</CardsWrapper>
        </>
          )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
