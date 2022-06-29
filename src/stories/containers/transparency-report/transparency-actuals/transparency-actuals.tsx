import React, { useState } from 'react';
import styled from '@emotion/styled';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { Tabs } from '../../../components/tabs/tabs';
import { Title } from '../transparency-report';
import { CustomLink } from '../../../components/custom-link/custom-link';
import { WalletTableCell } from '../../../components/wallet-table-cell/wallet-table-cell';
import { TableCell } from '../../../components/table-cell/table-cell';

const firstTableItems = [
  [<WalletTableCell key={1} name={'Permanent Team'} wallet={'0x232b…8482'} walletUrl={'#'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1}>1,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'}>Gnosis</CustomLink></TableCell>],
  [<WalletTableCell key={1} name={'Incubation Program'} wallet={'0x232b…8482'} walletUrl={'#'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1} negative>5,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'}>Gnosis</CustomLink></TableCell>],
  [<WalletTableCell key={1} name={'Grants Program'} wallet={'0x232b…8482'} walletUrl={'#'}/>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1}>1,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink fontSize={16} fontFamily={'SF Pro Display, sans-serif'} href={'#'}>Gnosis</CustomLink></TableCell>],
  [<TableCell key={1}><b>Total</b></TableCell>, <TableCell key={2}><b>260,344</b></TableCell>, <TableCell key={3}><b>260,344</b></TableCell>, <TableCell key={4}><b>260,344</b></TableCell>, <TableCell key={5}><b>260,344</b></TableCell>, <TableCell key={6}/>]
];

const secondTableItems = [
  [<TableCell key={1}><b>Headcount Expenses Subtotal</b></TableCell>, '', '', '', '', ''],
  [<TableCell key={1}>Contractor Fees</TableCell>, <TableCell key={2}>109,669</TableCell>, <TableCell key={3}>109,669</TableCell>, <TableCell key={4}>109,669</TableCell>, <TableCell key={5}>Lower exchange rate costs.</TableCell>, <TableCell key={6}>109,669</TableCell>],
  [<TableCell key={1}><b>Non-Headcount Expenses Subtotal</b></TableCell>, '', '', '', '', ''],
  [<TableCell key={1}>Contingency Buffer</TableCell>, <TableCell key={2}>0</TableCell>, <TableCell key={3}>0</TableCell>, <TableCell key={4}>0</TableCell>, '', <TableCell key={6}>0</TableCell>],
  [<TableCell key={1}><b>Total</b></TableCell>, <TableCell key={2}><b>134,468</b></TableCell>, <TableCell key={3}><b>134,468</b></TableCell>, <TableCell key={4}><b>134,468</b></TableCell>, '', <TableCell key={5}><b>134,468</b></TableCell>]
];

const thirdTableItems = [
  [<TableCell key={1}><b>Headcount Expenses Subtotal</b></TableCell>, '', '', '', '', '', ''],
  [<TableCell key={1}>Chaos Labs</TableCell>, <TableCell key={2}>Contractor Fees</TableCell>, <TableCell key={2}>109,669</TableCell>, <TableCell key={3}>109,669</TableCell>, <TableCell key={4}>109,669</TableCell>, <TableCell key={5}>Lower exchange rate costs.</TableCell>, <TableCell key={6}>109,669</TableCell>],
  [<TableCell key={1}><b>Non-Headcount Expenses Subtotal</b></TableCell>, '', '', '', '', '', ''],
  [<TableCell key={1}>Contingency Buffer</TableCell>, '', <TableCell key={2}>0</TableCell>, <TableCell key={3}>0</TableCell>, <TableCell key={4}>0</TableCell>, '', <TableCell key={6}>0</TableCell>],
  [<TableCell key={1}><b>Total</b></TableCell>, '', <TableCell key={2}><b>134,468</b></TableCell>, <TableCell key={3}><b>134,468</b></TableCell>, <TableCell key={4}><b>134,468</b></TableCell>, '', <TableCell key={5}><b>134,468</b></TableCell>]
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
      headersAlign={['left', 'right', 'right', 'right', 'right', 'left']}
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

    {thirdIndex === 0 && <InnerTable
      headers={['Budget Category', 'Forecast', 'Actuals', 'Difference', 'Diff. Reason', 'Payments']}
      items={secondTableItems}
      style={{ marginBottom: '64px' }}
      headersAlign={['left', 'right', 'right', 'right', 'left', 'right']}
    />}

    {thirdIndex === 1 && <InnerTable
        headers={['Group', 'budget category', 'forecast', 'actuals', 'difference', 'diff. reason', 'payments']}
        headersAlign={['left', 'left', 'right', 'right', 'right', 'left', 'right']}
        items={thirdTableItems}
        minWidth={80}
        style={{ marginBottom: '64px' }}
    />}

    {thirdIndex === 2 && <InnerTable
        headers={['Group', 'budget category', 'forecast', 'actuals', 'difference', 'diff. reason', 'payments']}
        headersAlign={['left', 'left', 'right', 'right', 'right', 'left', 'right']}
        minWidth={80}
        items={thirdTableItems}
        style={{ marginBottom: '64px' }}
    />}
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});
