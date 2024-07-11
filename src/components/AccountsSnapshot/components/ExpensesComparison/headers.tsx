import { styled, useMediaQuery } from '@mui/material';
import InfoOutlined from 'public/assets/svg/info_outlined.svg';
import type { RowProps } from '@/components/AdvanceTable/types';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import type { Theme } from '@mui/material';

const HeaderWithIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 6.5,

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 10,
  },
}));

const InfoWrapper = styled('div')({
  display: 'flex',
  cursor: 'pointer',
});

const NetExpenseTransactions = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

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
          <InfoOutlined width={16} height={16} />
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
          tablet_768: '16px 16px 18px',
          desktop_1024: '16px',
        },
        alignment: 'center',
      },
    ],
  },
  {
    cellPadding: {
      tablet_768: '23px 8px 23px 0',
      desktop_1024: '23px 16px',
    },
    cells: [
      {
        isHidden: true,
        border: {
          right: true,
        },
        width: {
          desktop_1024: '16.463%',
          tablet_768: '12%',
        },
      },
      {
        isHidden: true,
        border: {
          right: true,
        },
        alignment: 'right',
        width: {
          desktop_1024: '16.463%',
          tablet_768: '18.463%',
        },
      },
      {
        value: (
          <HeaderWithIcon>
            On-chain only
            <SESTooltip
              content={
                'On-Chain view offers valuable insights into On-Chain dynamics, but excludes external (off-chain) transactions.'
              }
              placement="bottom-start"
              enterTouchDelay={0}
              leaveTouchDelay={15000}
            >
              <InfoWrapper>
                <InfoOutlined width={16} height={16} />
              </InfoWrapper>
            </SESTooltip>
          </HeaderWithIcon>
        ),
        alignment: 'right',
        width: {
          desktop_1024: '22.027%',
          tablet_768: '19.5%',
        },
        cellPadding: {
          tablet_768: '23px 13px 23px 0',
          desktop_1024: '23px 16px',
        },
      },
      {
        value: 'Difference',
        alignment: 'right',
        width: {
          desktop_1024: '11.28%',
          tablet_768: '11.28%',
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
                <InfoOutlined width={16} height={16} />
              </InfoWrapper>
            </SESTooltip>
          </HeaderWithIcon>
        ),
        alignment: 'right',
        width: {
          desktop_1024: '22.027%',
          tablet_768: '26%',
        },
        cellPadding: {
          tablet_768: '23px 13px 23px 0',
          desktop_1024: '23px 16px',
        },
      },
      {
        value: 'Difference',
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
      tablet_768: '23px 8px 23px 0',
      desktop_1024: '23px 16px',
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
          desktop_1024: '19.1%',
          tablet_768: '25.5%',
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
          desktop_1024: '19.2%',
          tablet_768: '25.4%',
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
          desktop_1024: '30.8%',
          tablet_768: '33.5%',
        },
        cellPadding: {
          tablet_768: '23px 13px 23px 0',
          desktop_1024: '23px 16px',
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
