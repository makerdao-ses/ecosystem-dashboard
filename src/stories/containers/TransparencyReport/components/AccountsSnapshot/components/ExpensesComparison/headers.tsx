import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import Information from '@ses/components/svg/information';
import lightTheme from '@ses/styles/theme/light';
import type { RowProps } from '@ses/components/AdvanceTable/types';

const HeaderWithIcon = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 6.5,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    gap: 10,
  },
});

const InfoWrapper = styled.div({
  display: 'flex',
  cursor: 'pointer',
});

const NetExpenseTransactions = () => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  return (
    <HeaderWithIcon>
      Net {isMobile ? 'Exp' : 'Expense'} transactions
      <SESTooltip
        content={
          'On-Chain view offers valuable insights into On-Chain dynamics, but excludes external (off-chain) transactions.'
        }
        placement="bottom-start"
        enterTouchDelay={0}
        leaveTouchDelay={15000}
      >
        <InfoWrapper>
          <Information />
        </InfoWrapper>
      </SESTooltip>
    </HeaderWithIcon>
  );
};

export const EXPENSES_COMPARISON_TABLE_HEADER = [
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
        cellPadding: {
          table_834: '16px 16px 18px',
          desktop_1194: '16px',
        },
        alignment: 'center',
      },
    ],
  },
  {
    cellPadding: {
      table_834: '23px 8px 23px 0',
      desktop_1194: '23px 16px',
    },
    cells: [
      {
        isHidden: true,
        border: {
          right: true,
        },
        width: {
          desktop_1194: '16.463%',
          table_834: '12%',
        },
      },
      {
        isHidden: true,
        border: {
          right: true,
        },
        alignment: 'right',
        width: {
          desktop_1194: '16.463%',
          table_834: '18.463%',
        },
      },
      {
        value: (
          <HeaderWithIcon>
            On-Chain Only
            <SESTooltip
              content={
                'On-Chain view offers valuable insights into On-Chain dynamics, but excludes external (off-chain) transactions.'
              }
              placement="bottom-start"
              enterTouchDelay={0}
              leaveTouchDelay={15000}
            >
              <InfoWrapper>
                <Information />
              </InfoWrapper>
            </SESTooltip>
          </HeaderWithIcon>
        ),
        alignment: 'right',
        width: {
          desktop_1194: '22.027%',
          table_834: '19.5%',
        },
        cellPadding: {
          table_834: '23px 13px 23px 0',
          desktop_1194: '23px 16px',
        },
      },
      {
        value: 'difference',
        alignment: 'right',
        width: {
          desktop_1194: '11.28%',
          table_834: '11.28%',
        },
        border: {
          right: true,
        },
      },
      {
        value: (
          <HeaderWithIcon>
            Including off-chain
            <SESTooltip
              content={'Enhance financial tracking and expense analysis by including off-chain transactions.'}
              placement="bottom-start"
              enterTouchDelay={0}
              leaveTouchDelay={15000}
            >
              <InfoWrapper>
                <Information />
              </InfoWrapper>
            </SESTooltip>
          </HeaderWithIcon>
        ),
        alignment: 'right',
        width: {
          desktop_1194: '22.027%',
          table_834: '26%',
        },
        cellPadding: {
          table_834: '23px 13px 23px 0',
          desktop_1194: '23px 16px',
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

export const EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN = [
  {
    cellPadding: {
      table_834: '23px 8px 23px 0',
      desktop_1194: '23px 16px',
    },
    cells: [
      {
        isHidden: true,
        border: {
          right: true,
        },
        width: {
          desktop_1440: '16.5%',
          desktop_1280: '18.25%',
          desktop_1194: '19.1%',
          table_834: '25.5%',
        },
      },
      {
        isHidden: true,
        border: {
          right: true,
        },
        alignment: 'right',
        width: {
          desktop_1440: '16.5%',
          desktop_1280: '18.25%',
          desktop_1194: '19.2%',
          table_834: '25.4%',
        },
      },
      {
        value: 'Reported actuals',
        colSpan: 2,
        border: {
          right: true,
        },
        alignment: 'right',
      },
      {
        value: <NetExpenseTransactions />,
        alignment: 'right',
        width: {
          desktop_1440: '33.5%',
          desktop_1280: '31.8%',
          desktop_1194: '30.8%',
          table_834: '33.5%',
        },
        cellPadding: {
          table_834: '23px 13px 23px 0',
          desktop_1194: '23px 16px',
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
