import React from 'react';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TableCell } from '../../../components/table-cell/table-cell';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { InnerTable } from '../../../components/inner-table/inner-table';
import styled from '@emotion/styled';

const firstTableItems = [
  [<WalletTableCell key={1} name={'Permanent Team'} wallet={'0x232b…8482'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1}>1,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'}>Gnosis</CustomLink></TableCell>],
  [<WalletTableCell key={1} name={'Incubation Program'} wallet={'0x232b…8482'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1} negative>5,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'}>Gnosis</CustomLink></TableCell>],
  [<WalletTableCell key={1} name={'Grants Program'} wallet={'0x232b…8482'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1}>1,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'}>Gnosis</CustomLink></TableCell>],
  [<TableCell key={1}><b>Total</b></TableCell>, <TableCell key={2}><b>260,344</b></TableCell>, <TableCell key={3}><b>260,344</b></TableCell>, <TableCell key={4}><b>260,344</b></TableCell>, <TableCell key={5}><b>260,344</b></TableCell>, <TableCell key={6}/>]
];

export const TransparencyTransferRequest = () => {
  return <Container>
    <InnerTable
      headers={['Wallet', '3 Month Forecast', 'current Balance', 'Transfer Request', 'Multi Sig Address']}
      items={firstTableItems}
      headersAlign={['left', 'right', 'right', 'right', 'right', 'left']}
      style={{ marginBottom: '62px' }}
    />
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});
