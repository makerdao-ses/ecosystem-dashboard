import React, { useMemo } from 'react';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TableCell } from '../../../components/table-cell/table-cell';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { InnerTable } from '../../../components/inner-table/inner-table';
import styled from '@emotion/styled';
import { NumberCell } from '../../../components/number-cell/number-cell';
import { DateTime } from 'luxon';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useTransparencyForecastMvvm } from '../transparency-forecast/transparency-forecast.mvvm';
import { useTransparencyTransferRequestMvvm } from './transparency-transfer-request.mvvm';
import { formatAddressForOutput } from '../../../../core/utils/string.utils';

interface TransparencyTransferRequestProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatementDto[];
}

export const TransparencyTransferRequest = (props: TransparencyTransferRequestProps) => {
  const {
    firstMonth,
    secondMonth,
    thirdMonth,
    getForecastSumOfMonthsOnWallet,
    wallets
  } = useTransparencyForecastMvvm(props.currentMonth, props.budgetStatements);

  const {
    getCurrentBalanceForMonthOnWallet,
    getTransferRequestForMonthOnWallet
  } = useTransparencyTransferRequestMvvm(props.currentMonth, props.budgetStatements);

  const mainItems = useMemo(() => {
    const result: JSX.Element[][] = [];

    wallets.forEach(wallet => {
      result.push([
        <WalletTableCell wallet={formatAddressForOutput(wallet?.address ?? '')} name={wallet.name} address={wallet.address} key={1}/>,
        <NumberCell key={2}>{getForecastSumOfMonthsOnWallet(props.budgetStatements, wallet?.address, props.currentMonth, [firstMonth, secondMonth, thirdMonth]).toLocaleString()}</NumberCell>,
        <NumberCell key={3}>{getCurrentBalanceForMonthOnWallet(wallet?.address).toLocaleString()}</NumberCell>,
        <NumberCell key={4}>{getTransferRequestForMonthOnWallet(wallet?.address).toLocaleString()}</NumberCell>,
        <TableCell key={5}>
          <CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={`https://etherscan.io/address/${wallet.address}`} style={{ marginRight: '16px' }}>Etherscan</CustomLink>
          <CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={`https://gnosis-safe.io/app/eth:${wallet.address}`}>Gnosis</CustomLink>
        </TableCell>,
      ]);
    });

    return result;
  }, [props.currentMonth, props.budgetStatements]);

  return <Container>
    <InnerTable
      headers={['Wallet', '3 Month Forecast', 'current Balance', 'Transfer Request', 'Multi Sig Address']}
      items={mainItems}
      headersAlign={['left', 'right', 'right', 'right', 'left']}
      headerWidths={['200px', '210px', '210px', '210px', '354px']}
      style={{ marginBottom: '64px' }}
    />
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});
