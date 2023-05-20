import AdvanceTable from '@ses/components/AdvanceTable/AdvanceTable';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import React from 'react';
import type { RowProps } from '@ses/components/AdvanceTable/types';
import type { NextPage } from 'next';

const TestingPage: NextPage = () => {
  console.log('testing');
  const header = [
    {
      cells: [
        {
          value: 'Reported actuals',
          rowSpan: 2,
          colSpan: 2,
          border: {
            right: true,
          },
          alignment: 'right',
        },
        {
          value: 'Net Expense Transactions',
          defaultRenderer: 'boldText',
          colSpan: 4,
          border: {
            bottom: true,
          },
          alignment: 'center',
        },
      ],
    },
    {
      cells: [
        {
          isHidden: true,
          border: {
            right: true,
          },
          width: {
            desktop_1440: 216,
            desktop_1280: 195,
            desktop_1194: 186,
            table_834: 91,
          },
        },
        {
          isHidden: true,
          border: {
            right: true,
          },
          alignment: 'right',
          width: {
            desktop_1440: 216,
            desktop_1280: 195,
            desktop_1194: 186,
            table_834: 142,
          },
        },
        {
          value: 'On-Chain Only',
          alignment: 'right',
          width: {
            desktop_1440: 289,
            desktop_1280: 261,
            desktop_1194: 249,
            table_834: 151,
          },
        },
        {
          value: 'difference',
          alignment: 'right',
          border: {
            right: true,
          },
        },
        {
          value: 'Including off-chain',
          alignment: 'right',
          width: {
            desktop_1440: 289,
            desktop_1280: 261,
            desktop_1194: 249,
            table_834: 151,
          },
        },
        {
          value: 'difference',
          alignment: 'right',
        },
      ],
      border: {
        bottom: true,
      },
    },
  ] as RowProps[];

  const body = [
    {
      render: ({ children }) => <tr style={{ background: 'rgba(236, 239, 249, 0.5)' }}>{children}</tr>,
      cells: [
        {
          value: 'MAY-2023',
          defaultRenderer: 'boldText',
          inherit: header[1].cells[0],
        },
        {
          value: '221,503.00 DAI',
          inherit: header[1].cells[1],
        },
        {
          value: '240,000.00 DAI',
          inherit: header[1].cells[2],
        },
        {
          value: '8.35%',
          inherit: header[1].cells[3],
        },
        {
          value: '221,504.00 DAI',
          inherit: header[1].cells[4],
        },
        {
          value: '0.00%',
          inherit: header[1].cells[5],
        },
      ],
    },
    {
      cells: [
        {
          value: 'APR-2023',
          defaultRenderer: 'boldText',
          inherit: header[1].cells[0],
        },
        {
          value: '171,503.00 DAI',
          inherit: header[1].cells[1],
        },
        {
          value: '170,000.00 DAI',
          inherit: header[1].cells[2],
        },
        {
          value: '-0.88%',
          inherit: header[1].cells[3],
        },
        {
          value: '171,500,00 DAI',
          inherit: header[1].cells[4],
        },
        {
          value: '0.00%',
          inherit: header[1].cells[5],
        },
      ],
    },
    {
      cells: [
        {
          value: 'MAR-2023',
          defaultRenderer: 'boldText',
          inherit: header[1].cells[0],
        },
        {
          value: '288,503.00 DAI',
          inherit: header[1].cells[1],
        },
        {
          value: '280,000.00 DAI',
          inherit: header[1].cells[2],
        },
        {
          value: '-2,95%',
          inherit: header[1].cells[3],
        },
        {
          value: '288,300.00 DAI',
          inherit: header[1].cells[4],
        },
        {
          value: '-0.07%',
          inherit: header[1].cells[5],
        },
      ],
    },
    {
      cells: [
        {
          value: 'Totals',
          inherit: header[1].cells[0],
        },
        {
          value: '681,509.00 DAI',
          inherit: header[1].cells[1],
        },
        {
          value: '681,509.00 DAI',
          inherit: header[1].cells[2],
        },
        {
          value: '1.25%',
          inherit: header[1].cells[3],
        },
        {
          value: '681,304.25 DAI',
          inherit: header[1].cells[4],
        },
        {
          value: '-0.03%',
          inherit: header[1].cells[5],
        },
      ],
      cellDefaultRenderer: 'boldText',
      border: {
        top: true,
      },
    },
  ] as RowProps[];

  return (
    <PageContainer hasImageBackground={true}>
      <Container>
        <h1>testing</h1>

        <div style={{ marginTop: 20 }}>
          <AdvanceTable header={header} body={body} />
        </div>
      </Container>
    </PageContainer>
  );
};

export default TestingPage;
