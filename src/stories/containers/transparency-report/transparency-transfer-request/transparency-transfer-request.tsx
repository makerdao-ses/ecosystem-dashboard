import React, { useMemo } from 'react';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { InnerTable } from '../../../components/inner-table/inner-table';
import styled from '@emotion/styled';
import { NumberCell } from '../../../components/number-cell/number-cell';
import { DateTime } from 'luxon';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useTransparencyForecastMvvm } from '../transparency-forecast/transparency-forecast.mvvm';
import { useTransparencyTransferRequestMvvm } from './transparency-transfer-request.mvvm';
import { formatAddressForOutput } from '../../../../core/utils/string.utils';
import { CardsWrapper, TableWrapper } from '../transparency-report';
import { TransparencyCard } from '../../../components/transparency-card/transparency-card';
import { TransparencyEmptyTable } from '../placeholders/transparency-empty-table';
import { TextCell } from '../../../components/text-cell/text-cell';

interface TransparencyTransferRequestProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
  longCode: string;
}

const headers = ['Wallet', '3 Month Forecast', 'Current Balance', 'Transfer Request', 'External Links'];

export const TransparencyTransferRequest = (props: TransparencyTransferRequestProps) => {
  const { firstMonth, secondMonth, thirdMonth, getForecastSumOfMonthsOnWallet, getForecastSumForMonths, wallets } =
    useTransparencyForecastMvvm(props.currentMonth, props.budgetStatements);

  const {
    getCurrentBalanceForMonthOnWallet,
    getTransferRequestForMonth,
    getTransferRequestForMonthOnWallet,
    getCurrentBalanceForMonth,
  } = useTransparencyTransferRequestMvvm(props.currentMonth, props.budgetStatements);

  const mainItems = useMemo(() => {
    const result: JSX.Element[][] = [];

    wallets.forEach((wallet) => {
      result.push([
        <WalletTableCell
          wallet={formatAddressForOutput(wallet?.address ?? '')}
          name={wallet.name}
          address={wallet.address}
          key={1}
        />,
        <NumberCell
          key={2}
          value={getForecastSumOfMonthsOnWallet(props.budgetStatements, wallet?.address, props.currentMonth, [
            firstMonth,
            secondMonth,
            thirdMonth,
          ])}
        />,
        <NumberCell key={3} value={getCurrentBalanceForMonthOnWallet(wallet?.address)} />,
        <NumberCell key={4} value={getTransferRequestForMonthOnWallet(wallet?.address)} />,
        <TextCell key={5} responsivePadding="0">
          <CustomLink
            fontSize={16}
            fontFamily={'Inter, sans-serif'}
            href={`https://etherscan.io/address/${wallet.address}`}
            style={{ marginRight: '16px' }}
            lineHeight="19px"
          >
            Etherscan
          </CustomLink>
          <CustomLink
            fontSize={16}
            fontFamily={'Inter, sans-serif'}
            href={`https://gnosis-safe.io/app/eth:${wallet.address}`}
            lineHeight="19px"
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
        value={getForecastSumForMonths(props.budgetStatements, props.currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ])}
        bold
      />,
      <NumberCell key={3} value={getCurrentBalanceForMonth} bold />,
      <NumberCell key={4} value={getTransferRequestForMonth} bold />,
    ]);

    return result;
  }, [
    wallets,
    getForecastSumForMonths,
    props.budgetStatements,
    props.currentMonth,
    firstMonth,
    secondMonth,
    thirdMonth,
    getCurrentBalanceForMonth,
    getTransferRequestForMonth,
    getForecastSumOfMonthsOnWallet,
    getCurrentBalanceForMonthOnWallet,
    getTransferRequestForMonthOnWallet,
  ]);

  return (
    <Container>
      {mainItems.length - 1 <= 0 ? (
        <TransparencyEmptyTable longCode={props.longCode} />
      ) : (
        <>
          <TableWrapper>
            <InnerTable
              headers={headers}
              items={mainItems}
              headersAlign={['left', 'right', 'right', 'right', 'left']}
              headerWidths={['200px', '210px', '210px', '210px', '354px']}
            />
          </TableWrapper>

          <CardsWrapper>
            {wallets.length > 1 && mainItems.length > 1 && (
              <TransparencyCard
                header={mainItems[mainItems.length - 1][0]}
                headers={headers.slice(1, 4)}
                items={mainItems[mainItems.length - 1].slice(1)}
              />
            )}
            {mainItems.slice(0, mainItems.length - 1).map((item, i) => (
              <TransparencyCard
                key={i}
                header={item[0]}
                headers={headers.slice(1, 4)}
                items={item.slice(1)}
                footer={item[4]}
              />
            ))}
          </CardsWrapper>
        </>
      )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
