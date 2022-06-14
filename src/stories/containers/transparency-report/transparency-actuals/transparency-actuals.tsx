import React, { useState } from 'react';
import styled from '@emotion/styled';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { Tabs } from '../../../components/tabs/tabs';
import { Title } from '../transparency-report';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TableCell } from '../../../components/table-cell/table-cell';
import { TableTotalCell } from '../../../components/table-total-cell/table-total-cell';

const firstTableItems = [
  [<WalletTableCell key={1} name={'Permanent Team'} wallet={'0x232b…8482'} walletUrl={'#'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1}>1,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink href={'#'}>Gnosis</CustomLink></TableCell>],
  [<WalletTableCell key={1} name={'Incubation Program'} wallet={'0x232b…8482'} walletUrl={'#'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1} negative>5,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink href={'#'}>Gnosis</CustomLink></TableCell>],
  [<WalletTableCell key={1} name={'Grants Program'} wallet={'0x232b…8482'} walletUrl={'#'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1}>1,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink href={'#'}>Gnosis</CustomLink></TableCell>],
];

const secondTableItems = [
  [<WalletTableCell key={1} name={'Permanent Team'} wallet={'0x232b…8482'} walletUrl={'#'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1}>1,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink href={'#'}>Gnosis</CustomLink></TableCell>],
  [<WalletTableCell key={1} name={'Incubation Program'} wallet={'0x232b…8482'} walletUrl={'#'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1} negative>5,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink href={'#'}>Gnosis</CustomLink></TableCell>],
  [<WalletTableCell key={1} name={'Grants Program'} wallet={'0x232b…8482'} walletUrl={'#'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1}>1,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink href={'#'}>Gnosis</CustomLink></TableCell>],
  [<TableTotalCell key={1}>Total</TableTotalCell>, <TableTotalCell key={2}>134,468</TableTotalCell>, <TableTotalCell key={3}>134,468</TableTotalCell>, <TableTotalCell key={4}>134,468</TableTotalCell>, <TableTotalCell key={5}>134,468</TableTotalCell>, <TableTotalCell key={5} style={{ textAlign: 'right' }}>134,468</TableTotalCell>]
];

export const TransparencyActuals = () => {
  const [thirdIndex, setThirdIndex] = useState(0);

  return <Container>
    <Title style={{
      marginBottom: '32px'
    }}>
      May 2022 Total
    </Title>

    <InnerTable
      headers={['Budget', 'Forecast', 'Actuals', 'Difference', 'Payments', 'External Links']}
      items={firstTableItems}
      style={{ marginBottom: '62px' }}
    />

    <Title style={{
      marginBottom: '32px'
    }}>
      May 2022 Breakdown
    </Title>

    <Tabs
      items={['Permanent team', 'Incubation', 'Grants']}
      currentIndex={thirdIndex}
      onChange={setThirdIndex}
      style={{
        marginBottom: '32px',
      }}
    />

    <InnerTable
      headers={['Permanent', 'Forecast', 'Actuals', 'Difference', 'Payments', 'External Links']}
      items={secondTableItems}
      style={{ marginBottom: '62px' }}
      lastRowStyle={{ background: '#434358' }}
    />
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});
