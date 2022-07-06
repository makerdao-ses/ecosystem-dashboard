import React from 'react';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TableCell } from '../../../components/table-cell/table-cell';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { InnerTable } from '../../../components/inner-table/inner-table';
import styled from '@emotion/styled';
import { NumberCell } from '../../../components/number-cell/number-cell';

const firstTableItems = [
  [<WalletTableCell key={1} name={'Permanent Team'} wallet={'0x232b…8482'}/>, <NumberCell key={1}>134,468</NumberCell>, <NumberCell key={1}>132,897</NumberCell>, <NumberCell key={1}>1,571</NumberCell>, <NumberCell key={1}>138,754</NumberCell>, <NumberCell key={1}><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'}>Gnosis</CustomLink></NumberCell>],
  [<WalletTableCell key={1} name={'Incubation Program'} wallet={'0x232b…8482'}/>, <NumberCell key={1}>134,468</NumberCell>, <NumberCell key={1}>132,897</NumberCell>, <NumberCell key={1} negative>5,571</NumberCell>, <NumberCell key={1}>138,754</NumberCell>, <NumberCell key={1}><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'}>Gnosis</CustomLink></NumberCell>],
  [<WalletTableCell key={1} name={'Grants Program'} wallet={'0x232b…8482'}/>, <NumberCell key={1}>134,468</NumberCell>, <NumberCell key={1}>132,897</NumberCell>, <NumberCell key={1}>1,571</NumberCell>, <NumberCell key={1}>138,754</NumberCell>, <NumberCell key={1}><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'}>Gnosis</CustomLink></NumberCell>],
  [<TableCell key={1}><b>Total</b></TableCell>, <NumberCell key={2}><b>260,344</b></NumberCell>, <NumberCell key={3}><b>260,344</b></NumberCell>, <NumberCell key={4}><b>260,344</b></NumberCell>, <NumberCell key={5}><b>260,344</b></NumberCell>, <NumberCell key={6}/>]
];

export const TransparencyTransferRequest = () => {
  return <Container>
    <InnerTable
      headers={['Wallet', '3 Month Forecast', 'current Balance', 'Transfer Request', 'Multi Sig Address']}
      items={firstTableItems}
      headersAlign={['left', 'right', 'right', 'right', 'right', 'left']}
      style={{ marginBottom: '64px' }}
    />
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});
