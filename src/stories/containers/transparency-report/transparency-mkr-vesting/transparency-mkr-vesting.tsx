import React from 'react';
import styled from '@emotion/styled';
import { Title } from '../transparency-report';
import { InnerTable } from '../../../components/inner-table/inner-table';
import { TableCell } from '../../../components/table-cell/table-cell';

const tableItems = [
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}>01 - Jun - 2022</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={2}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={3}>427.07 MKR</TableCell>, <TableCell fontFamily={'SF Pro Display, sans-serif'} key={4}>0</TableCell>, ''],
  [<TableCell key={1}><b>Total</b></TableCell>, <TableCell key={2}><b>1,666.71 MKR</b></TableCell>, <TableCell key={3}><b>1,666.71 MKR</b></TableCell>, <TableCell key={4}><b>0</b></TableCell>, ''],
];

export const TransparencyMkrVesting = () => {
  return <Container>
    <Title marginBottom={32}>MKR Vesting Overview</Title>
    <TotalFte>
      <span>Total FTE</span>
      <u>10</u>
    </TotalFte>
    <InnerTable
      headers={['Vesting Date', 'MKR Amount', 'Last month', 'difference', 'reason(s)']}
      headersAlign={['left', 'right', 'right', 'right', 'left']}
      headerStyles={[{}, {}, {}, {}, { paddingLeft: '38px' }]}
      items={tableItems}
      minWidth={200}
      headerWidths={['200px', '200px', '200px', '200px', '99%']}
      style={{ marginBottom: '32px' }}
    />
    <Text>
      This Overview is based on MIP40c3-SP17, SES’ MKR Incentive Proposal.
    </Text>
    <Text style={{ marginBottom: '90px' }}>
      The Difference column indicates any changes in the MKR vesting amounts compared to last month, with the Reason(s) column indicating why the amounts
      changed. Reasons may include: New hires, FTE changes, Promotions, or Terminations.
    </Text>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

const TotalFte = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  color: '#231536',
  marginBottom: '36px',
  '> span': {
    marginRight: '16px'
  },
  '> u': {
    fontSize: '20px',
    paddingBottom: '2px',
    lineHeight: '24px',
    textDecoration: 'none',
    color: '#25273D',
    borderBottom: '1px solid #231536'
  }
});

const Text = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 400,
  fontSize: '16px',
  color: '#231536',
  marginBottom: '16px'
});
