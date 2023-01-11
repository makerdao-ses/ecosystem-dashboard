import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import styled from '@emotion/styled';
import { CardsWrapper, TableWrapper, Title } from '../transparency-report';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { Tabs } from '../../../components/tabs/tabs';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TextCell } from '../../../components/text-cell/text-cell';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { BudgetStatementDto, BudgetStatementLineItemDto } from '../../../../core/models/dto/core-unit.dto';
import { useTransparencyForecastMvvm } from './transparency-forecast.mvvm';
import { formatAddressForOutput } from '../../../../core/utils/string.utils';
import _ from 'lodash';
import { NumberCell } from '../../../components/number-cell/number-cell';
import { TransparencyCard } from '../../../components/transparency-card/transparency-card';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { TransparencyEmptyTable } from '../placeholders/transparency-empty-table';
import { useUrlAnchor } from '../../../../core/hooks/useUrlAnchor';

interface TransparencyForecastProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
  longCode: string;
}

export const TransparencyForecast = (props: TransparencyForecastProps) => {
  const [thirdIndex, setThirdIndex] = useState(0);
  const { isLight } = useThemeContext();

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

  const headerToId = (header: string): string => {
    const id = header.toLowerCase().trim().replaceAll(/ /g, '-');
    return `forecast-${id}`;
  };

  const [headerIds, setHeaderIds] = useState<string[]>([]);
  useEffect(() => {
    setHeaderIds(breakdownTabs.map((header) => headerToId(header)));
  }, [breakdownTabs]);

  const anchor = useUrlAnchor();
  const breakdownTitleRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (!scrolled && anchor && !_.isEmpty(headerIds) && headerIds.includes(anchor)) {
      setScrolled(true);
      let offset = (breakdownTitleRef?.current?.offsetTop || 0) - 260;
      const windowsWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      if (windowsWidth < 834) {
        offset += 90;
      }
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, Math.max(0, offset));
    }
  }, [anchor, headerIds, scrolled]);

  useEffect(() => {
    if (anchor && !_.isEmpty(headerIds)) {
      setThirdIndex(Math.max(headerIds.indexOf(anchor), 0));
    }
  }, [anchor, headerIds]);

  const forecastTableItems: JSX.Element[][] = useMemo(() => {
    const result: JSX.Element[][] = [];

    if (!props.budgetStatements || props.budgetStatements.length === 0) {
      return result;
    }

    let emptyWallets = 0;
    wallets.forEach((wallet) => {
      const numberCellData = [
        getForecastForMonthOnWalletOnBudgetStatement(
          props.budgetStatements,
          wallet?.address,
          props.currentMonth,
          firstMonth
        ),
        getForecastForMonthOnWalletOnBudgetStatement(
          props.budgetStatements,
          wallet?.address,
          props.currentMonth,
          secondMonth
        ),
        getForecastForMonthOnWalletOnBudgetStatement(
          props.budgetStatements,
          wallet?.address,
          props.currentMonth,
          thirdMonth
        ),
        getForecastSumOfMonthsOnWallet(props.budgetStatements, wallet?.address, props.currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ]),
        getBudgetCapForMonthOnWalletOnBudgetStatement(
          props.budgetStatements,
          wallet?.address,
          props.currentMonth,
          props.currentMonth
        ),
        getBudgetCapSumOfMonthsOnWallet(props.budgetStatements, wallet?.address, props.currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ]),
      ];
      if (numberCellData.every((n) => n === 0)) {
        emptyWallets++;
      }

      result.push([
        <WalletTableCell
          key={1}
          name={wallet.name}
          wallet={formatAddressForOutput(wallet.address ?? '')}
          address={wallet.address}
        />,
        <NumberCell key={2} value={numberCellData[0]} />,
        <NumberCell key={3} value={numberCellData[1]} />,
        <NumberCell key={4} value={numberCellData[2]} />,
        <NumberCell key={5} value={numberCellData[3]} />,
        <NumberCell key={6} value={numberCellData[4]} />,
        <NumberCell key={7} value={numberCellData[5]} />,
        <TextCell key={8} responsivePadding="0">
          <CustomLink
            fontSize={16}
            fontFamily={'Inter, sans-serif'}
            href={`https://etherscan.io/address/${wallet.address}`}
            style={{ marginRight: '16px' }}
          >
            Etherscan
          </CustomLink>
          <CustomLink
            fontSize={16}
            fontFamily={'Inter, sans-serif'}
            href={`https://gnosis-safe.io/app/eth:${wallet.address}`}
          >
            Gnosis
          </CustomLink>
        </TextCell>,
      ]);
    });

    result.push([
      <TextCell key={1}>
        <b>Total</b>
      </TextCell>,
      <NumberCell
        key={2}
        value={getForecastSumForMonth(props.budgetStatements, props.currentMonth, firstMonth)}
        bold
      />,
      <NumberCell
        key={3}
        value={getForecastSumForMonth(props.budgetStatements, props.currentMonth, secondMonth)}
        bold
      />,
      <NumberCell
        key={4}
        value={getForecastSumForMonth(props.budgetStatements, props.currentMonth, thirdMonth)}
        bold
      />,
      <NumberCell
        key={5}
        value={getForecastSumForMonths(props.budgetStatements, props.currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ])}
        bold
      />,
      <NumberCell
        key={6}
        value={getBudgetCapForMonthOnBudgetStatement(props.budgetStatements, props.currentMonth, props.currentMonth)}
        bold
      />,
      <NumberCell
        key={7}
        value={getTotalQuarterlyBudgetCapOnBudgetStatement(props.budgetStatements, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ])}
        bold
      />,
    ]);

    if (result.length - 1 === emptyWallets) {
      return [];
    }
    return result;
  }, [
    props.budgetStatements,
    props.currentMonth,
    wallets,
    getForecastSumForMonth,
    firstMonth,
    secondMonth,
    thirdMonth,
    getForecastSumForMonths,
    getBudgetCapForMonthOnBudgetStatement,
    getTotalQuarterlyBudgetCapOnBudgetStatement,
    getForecastForMonthOnWalletOnBudgetStatement,
    getForecastSumOfMonthsOnWallet,
    getBudgetCapForMonthOnWalletOnBudgetStatement,
    getBudgetCapSumOfMonthsOnWallet,
  ]);

  const hasGroups = useMemo(() => {
    const currentWallet = wallets[thirdIndex];

    return currentWallet?.budgetStatementLineItem?.some((item) => item.group && item.actual);
  }, [thirdIndex, wallets]);

  const breakdownHeaders = useMemo(() => {
    return [
      ...(hasGroups ? ['Group'] : []),
      'Budget Category',
      firstMonth.toFormat('MMMM'),
      secondMonth.toFormat('MMMM'),
      thirdMonth.toFormat('MMMM'),
      '3 Months',
      'Mthly Budget',
      'Qtly Budget',
    ];
  }, [hasGroups, firstMonth, secondMonth, thirdMonth]);

  const getBreakdownItemsForGroup = useMemo(() => {
    const getBreakdownItemsForGroup = (grouped: { [id: string]: BudgetStatementLineItemDto[] }) => {
      const result = [];
      const subTotal = {
        0: 'Sub-Total',
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
      };

      for (const groupedKey in grouped) {
        const groupedCategory = _.groupBy(grouped[groupedKey], (item) => item.budgetCategory);

        let i = 1;
        for (const groupedCatKey in groupedCategory) {
          if (
            Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth)) +
              Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth)) +
              Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth)) +
              Math.abs(
                getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [firstMonth, secondMonth, thirdMonth])
              ) +
              Math.abs(getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], props.currentMonth)) +
              Math.abs(
                getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
                  firstMonth,
                  secondMonth,
                  thirdMonth,
                ])
              ) ===
            0
          ) {
            continue;
          }

          subTotal[2] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth);

          subTotal[3] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth);

          subTotal[4] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth);

          subTotal[5] += getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [
            firstMonth,
            secondMonth,
            thirdMonth,
          ]);

          subTotal[6] += getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], props.currentMonth);

          subTotal[7] += getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
            firstMonth,
            secondMonth,
            thirdMonth,
          ]);

          result.push([
            ...(hasGroups ? [<TextCell key={`${groupedKey}-0`}>{i === 1 ? groupedKey : ''}</TextCell>] : []),
            <TextCell key={1}>{groupedCatKey}</TextCell>,
            <NumberCell key={2} value={getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth)} />,
            <NumberCell key={3} value={getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth)} />,
            <NumberCell key={4} value={getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth)} />,
            <NumberCell
              key={5}
              value={getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [
                firstMonth,
                secondMonth,
                thirdMonth,
              ])}
            />,
            <NumberCell
              key={6}
              value={getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], props.currentMonth)}
            />,
            <NumberCell
              key={7}
              value={getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
                firstMonth,
                secondMonth,
                thirdMonth,
              ])}
            />,
          ]);

          i++;
        }
      }

      result.push([
        <TextCell key={0}>{'Subtotal'}</TextCell>,
        ...(hasGroups ? [<TextCell key={1} />] : []),
        <NumberCell key={2} value={subTotal[2]} />,
        <NumberCell key={3} value={subTotal[3]} />,
        <NumberCell key={4} value={subTotal[4]} />,
        <NumberCell key={5} value={subTotal[5]} />,
        <NumberCell key={6} value={subTotal[6]} />,
        <NumberCell key={7} value={subTotal[7]} />,
      ]);

      return result;
    };
    return getBreakdownItemsForGroup;
  }, [
    firstMonth,
    getBudgetCapForMonthOnLineItem,
    getLineItemForecastSumForMonth,
    getLineItemForecastSumForMonths,
    getTotalQuarterlyBudgetCapOnLineItem,
    hasGroups,
    props.currentMonth,
    secondMonth,
    thirdMonth,
  ]);

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
      ...getLineItemsForWalletOnMonth(props.budgetStatements, props.currentMonth, firstMonth, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(props.budgetStatements, props.currentMonth, secondMonth, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(props.budgetStatements, props.currentMonth, thirdMonth, currentWalletAddress),
    ];

    result.push([
      <TextCell key={1}>
        <b>Headcount Expenses</b>
      </TextCell>,
    ]);

    const groupedHeadCount = _.groupBy(
      ungrouped.filter((x) => x.headcountExpense),
      (item) => item.group
    );

    result.push(...getBreakdownItemsForGroup(groupedHeadCount));

    result.push([
      <TextCell key={1}>
        <b>Non-Headcount Expenses</b>
      </TextCell>,
    ]);

    const groupedNonHeadCount = _.groupBy(
      ungrouped.filter((x) => !x.headcountExpense),
      (item) => item.group
    );

    result.push(...getBreakdownItemsForGroup(groupedNonHeadCount));

    result.push([
      <TextCell key={0}>
        <b>Total</b>
      </TextCell>,
      ...(hasGroups ? [<TextCell key={1} />] : []),
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
        value={getForecastSumOfMonthsOnWallet(props.budgetStatements, currentWalletAddress, props.currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ])}
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
        value={getBudgetCapSumOfMonthsOnWallet(props.budgetStatements, currentWalletAddress, props.currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ])}
        bold
      />,
    ]);

    return result;
  }, [
    props.budgetStatements,
    props.currentMonth,
    wallets,
    thirdIndex,
    getLineItemsForWalletOnMonth,
    firstMonth,
    secondMonth,
    thirdMonth,
    getBreakdownItemsForGroup,
    hasGroups,
    getForecastForMonthOnWalletOnBudgetStatement,
    getForecastSumOfMonthsOnWallet,
    getBudgetCapForMonthOnWalletOnBudgetStatement,
    getBudgetCapSumOfMonthsOnWallet,
  ]);

  const breakdownCards = useMemo(() => {
    const currentWalletAddress = wallets[thirdIndex]?.address ?? '';

    const ungrouped = [
      ...getLineItemsForWalletOnMonth(props.budgetStatements, props.currentMonth, firstMonth, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(props.budgetStatements, props.currentMonth, secondMonth, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(props.budgetStatements, props.currentMonth, thirdMonth, currentWalletAddress),
    ];

    const cardHeaders = breakdownHeaders.slice(2, 7);

    return (
      <>
        <Title isLight={isLight}>Headcount Expenses</Title>
        {getBreakdownItemsForGroup(
          _.groupBy(
            ungrouped.filter((x) => x.headcountExpense),
            (item) => item.group
          )
        ).map((item, i) => (
          <TransparencyCard
            key={i}
            header={
              <>
                {item[0]} {hasGroups && item[1]}
              </>
            }
            headers={cardHeaders}
            items={item.slice(hasGroups ? 2 : 1)}
          />
        ))}
        <Title isLight={isLight}>Non-Headcount Expenses</Title>
        {getBreakdownItemsForGroup(
          _.groupBy(
            ungrouped.filter((x) => !x.headcountExpense),
            (item) => item.group
          )
        ).map((item, i) => (
          <TransparencyCard
            key={i}
            header={
              <>
                {item[0]}
                {hasGroups && item[1]}
              </>
            }
            headers={cardHeaders}
            items={item.slice(hasGroups ? 2 : 1)}
          />
        ))}
        {getBreakdownItemsForGroup(
          _.groupBy(
            ungrouped.filter((x) => x.headcountExpense),
            (item) => item.budgetCategory
          )
        ).length +
          getBreakdownItemsForGroup(
            _.groupBy(
              ungrouped.filter((x) => !x.headcountExpense),
              (item) => item.budgetCategory
            )
          ).length >
          1 && (
          <TransparencyCard
            header={
              <TextCell key={1}>
                <b>Total</b>
              </TextCell>
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
        )}
      </>
    );
  }, [
    wallets,
    thirdIndex,
    getLineItemsForWalletOnMonth,
    props.budgetStatements,
    props.currentMonth,
    firstMonth,
    secondMonth,
    thirdMonth,
    breakdownHeaders,
    isLight,
    getBreakdownItemsForGroup,
    getForecastForMonthOnWalletOnBudgetStatement,
    getForecastSumOfMonthsOnWallet,
    getBudgetCapForMonthOnWalletOnBudgetStatement,
    getBudgetCapSumOfMonthsOnWallet,
    hasGroups,
  ]);

  return (
    <Container>
      <Title isLight={isLight} marginBottom={16}>
        {props.currentMonth.toFormat('MMM yyyy')} Totals
      </Title>

      {forecastTableItems.length - 1 <= 0 ? (
        <TransparencyEmptyTable longCode={props.longCode} />
      ) : (
        <>
          <TableWrapper>
            <InnerTable
              headers={forecastTableHeaders}
              items={forecastTableItems}
              minWidth={80}
              headersAlign={['left', 'right', 'right', 'right', 'right', 'right', 'right', 'left']}
              headerWidths={['190px', '141px', '141px', '141px', '141px', '141px', '141px', '141px']}
              headerStyles={[{}, {}, {}, {}, { paddingLeft: 0 }, { paddingLeft: 0 }, { paddingLeft: 0 }, {}]}
              style={{ marginBottom: '64px' }}
            />
          </TableWrapper>

          <CardsWrapper>
            {wallets.length > 1 && forecastTableItems.length > 1 && (
              <TransparencyCard
                header={forecastTableItems[forecastTableItems.length - 1][0]}
                headers={breakdownHeaders.slice(2, 7)}
                items={forecastTableItems[forecastTableItems.length - 1].slice(1, 7)}
              />
            )}
            {forecastTableItems.slice(0, forecastTableItems.length - 1).map((item, i) => (
              <TransparencyCard
                key={i}
                header={item[0]}
                headers={breakdownHeaders.slice(2, 7)}
                items={item.slice(1, 7)}
                footer={item[7]}
              />
            ))}
          </CardsWrapper>
        </>
      )}

      <Title isLight={isLight} marginBottom={24} ref={breakdownTitleRef}>
        {props.currentMonth.toFormat('MMM yyyy')} Breakdown
      </Title>

      {forecastTableItems.length - 1 <= 0 ? (
        <TransparencyEmptyTable breakdown longCode={props.longCode} />
      ) : (
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
              headers={breakdownHeaders}
              items={breakdownItems}
              minWidth={80}
              headerWidths={['338px', '141px', '141px', '141px', '141px', '141px', '141px', '141px']}
              headersAlign={[
                ...(hasGroups ? ['left'] : []),
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
