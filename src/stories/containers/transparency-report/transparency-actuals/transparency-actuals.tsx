import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { Tabs } from '../../../components/tabs/tabs';
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

export const TransparencyActuals = (props: TransparencyActualsProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const [thirdIndex, setThirdIndex] = useState(0);

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
    getCommentsFromCategory,
    breakdownHeaders,
    wallets,
  } = useTransparencyActualsMvvm(
    thirdIndex,
    setThirdIndex,
    props.currentMonth,
    props.budgetStatements,
    props.code
  );

  const headerToId = (header: string): string => {
    const id = header.toLowerCase().trim().replaceAll(/ /g, '-');
    return `actuals-${id}`;
  };

  const [headerIds, setHeaderIds] = useState<string[]>([]);
  useEffect(() => {
    setHeaderIds(breakdownHeaders.map((header) => headerToId(header)));
  }, [breakdownHeaders]);

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
  }, [anchor, headerIds]);

  useEffect(() => {
    if (anchor && !_.isEmpty(headerIds)) {
      const index = headerIds.indexOf(anchor);
      if (index > 0) {
        setThirdIndex(index);
      }
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
          getWalletPayment(wallet)
        ];
        if (numberCellData.every(n => n === 0)) {
          emptyWallets++;
        }

        result.push([
          <WalletTableCell
            key={1}
            name={wallet.name}
            wallet={formatAddressForOutput(wallet.address)}
            address={wallet.address}
          />,
          <NumberCell key={2} value={numberCellData[0]}/>,
          <NumberCell key={3} value={numberCellData[1]}/>,
          <NumberCell key={3} value={numberCellData[2]}/>,
          <NumberCell key={5} value={numberCellData[3]}/>,
          <TableCell key={6} responsivePadding="0">
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
          </TableCell>,
        ]);
      });

      if (result.length === emptyWallets) {
        return [];
      }
    }

    result.push([
      <TableCell key={1}>
        <b>Total</b>
      </TableCell>,
      <NumberCell key={2} value={budgetTotalForecast} bold/>,
      <NumberCell key={3} value={budgetTotalActual} bold/>,
      <NumberCell key={4} value={budgetTotalDifference} bold/>,
      <NumberCell key={5} value={budgetTotalPayment} bold/>,
    ]);

    return result;
  }, [currentBudgetStatement]);

  const getBreakdownItems = (items: BudgetStatementLineItemDto[]) => {
    const result: JSX.Element[][] = [];
    const grouped = _.groupBy(items, (item) => item.budgetCategory);

    for (const groupedKey in grouped) {
      if (
        Math.abs(getGroupForecast(grouped[groupedKey])) +
          Math.abs(getGroupActual(grouped[groupedKey])) +
          Math.abs(getGroupDifference(grouped[groupedKey])) ===
        0
      ) {
        continue;
      }

      result.push([
        <TableCell key={1}>{grouped[groupedKey][0].budgetCategory}</TableCell>,
        <NumberCell key={2} value={getGroupForecast(grouped[groupedKey])}/>,
        <NumberCell key={3} value={getGroupActual(grouped[groupedKey])}/>,
        <NumberCell key={4} value={getGroupDifference(grouped[groupedKey])}/>,
        <TableCell key={5}>
          {getCommentsFromCategory(grouped[groupedKey])}
        </TableCell>,
        <NumberCell key={6} value={getGroupPayment(grouped[groupedKey])}/>,
      ]);
    }

    return result;
  };

  const breakdownTableItems = useMemo(() => {
    const result: JSX.Element[][] = [];
    if (!wallets) {
      return result;
    }

    const currentWallet = wallets[thirdIndex];

    result.push([
      <TableCell key={1}>
        <b>Headcount Expenses</b>
      </TableCell>,
    ]);

    result.push(
      ...getBreakdownItems(
        currentWallet?.budgetStatementLineItem?.filter(
          (item) => item.headcountExpense
        )
      )
    );

    result.push([
      <TableCell key={1}>
        <b>Non-Headcount Expenses</b>
      </TableCell>,
    ]);

    result.push(
      ...getBreakdownItems(
        currentWallet?.budgetStatementLineItem?.filter(
          (item) => !item.headcountExpense
        )
      )
    );

    result.push([
      <TableCell key={1}>
        <b>Total</b>
      </TableCell>,
      <NumberCell key={2} value={getWalletForecast(currentWallet)} bold />,
      <NumberCell key={3} value={getWalletActual(currentWallet)} bold />,
      <NumberCell key={4} value={getWalletDifference(currentWallet)} bold />,
      <TableCell key={5} />,
      <NumberCell key={6} value={getWalletPayment(currentWallet)} bold />,
    ]);

    return result;
  }, [currentBudgetStatement, thirdIndex]);

  const breakdownCardItems = useMemo(() => {
    const currentWallet = wallets[thirdIndex];

    return (
      <>
        <Title fontSize="14px" isLight={isLight}>
          Headcount Expenses
        </Title>
        {getBreakdownItems(
          currentWallet?.budgetStatementLineItem?.filter(
            (item) => item.headcountExpense
          ),
        ).map((item, i) => (
          <TransparencyCard
            key={`item-${i}`}
            header={item[0]}
            headers={['Forecast', 'Actuals', 'Difference', 'Diff. Reason']}
            items={item.slice(1)}
          />
        ))}
        <Title isLight={isLight} fontSize="14px">
          Non-Headcount Expenses
        </Title>
        {getBreakdownItems(
          currentWallet?.budgetStatementLineItem?.filter(
            (item) => !item.headcountExpense
          ),
        ).map((item, i) => (
          <TransparencyCard
            key={`item-${i}`}
            header={item[0]}
            headers={['Forecast', 'Actuals', 'Difference', 'Diff. Reason']}
            items={item.slice(1)}
          />
        ))}
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
            {mainTableItems.map((item, i) => (
              <TransparencyCard
                key={`item-${i}`}
                header={item[0]}
                headers={mainTableHeaders.slice(1, 5)}
                items={item.slice(1)}
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
            items={breakdownHeaders.map((header, i) => {
              return {
                item: header,
                id: headerIds[i]
              };
            })}
            currentIndex={thirdIndex}
            onChange={setThirdIndex}
            style={{
              marginBottom: '32px',
            }}
          />

          <TableWrapper>
            <InnerTable
              headers={[
                'Budget Category',
                'Forecast',
                'Actuals',
                'Difference',
                'Diff. Reason',
                'Payments',
              ]}
              items={breakdownTableItems}
              headerWidths={[
                '260px',
                '160px',
                '160px',
                '160px',
                '286px',
                '158px',
              ]}
              headersAlign={[
                'left',
                'right',
                'right',
                'right',
                'left',
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
