import { styled, useMediaQuery } from '@mui/material';
import InfoOutlined from 'public/assets/svg/info_outlined.svg';
import type { RowProps } from '@/components/AdvanceTable/types';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import type { BreakpointOptions } from '../../utils/expenseComparisonUtils';
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

const InfoWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',

  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 4,
  },
}));

const NetExpenseTransactions = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  return (
    <HeaderWithIcon>
      Net {isMobile ? 'Exp' : 'Expense'} Transactions
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

export const expensesComparisonTableHeader = (breakpointOptions: BreakpointOptions) =>
  [
    {
      cells: [
        {
          value: 'Reported Actuals',
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
            tablet_768: '12px 16px 15px',
            desktop_1024: '13px 16px',
          },
          alignment: 'center',
        },
      ],
    },
    {
      cellPadding: {
        tablet_768: '18px 8px 18px 0',
        desktop_1024: '18px 16px',
      },
      cells: [
        {
          isHidden: true,
          border: {
            right: true,
          },
          width: {
            desktop_1280: '16.5%',
            desktop_1024: '14.375%',
            tablet_768: '13.5%',
          },
        },
        {
          isHidden: true,
          border: {
            right: true,
          },
          alignment: 'right',
          width: {
            desktop_1280: '16.42%',
            desktop_1024: '18.33%',
            tablet_768: '17.6%',
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
            desktop_1280: '22%',
            desktop_1024: '20.83%',
            tablet_768: '22.5%',
          },
          cellPadding: {
            tablet_768: '18px 11px 18px 0',
            desktop_1024: '18px 14px 18px 6px',
          },
        },
        {
          value: breakpointOptions.isTablet ? 'Diff' : 'Difference',
          alignment: 'right',
          width: {
            desktop_1280: '11.25%',
            desktop_1024: '12.81%',
            tablet_768: '11.9%',
          },
          border: {
            right: true,
          },
        },
        {
          value: (
            <HeaderWithIcon>
              {breakpointOptions.isTablet ? 'Incl.' : 'Including'} off-chain
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
            desktop_1280: '22%',
            desktop_1024: '20.83%',
            tablet_768: '22.5%',
          },
          cellPadding: {
            tablet_768: '18px 11px 18px 0',
            desktop_1024: '18px 14px 18px 6px',
          },
        },
        {
          value: breakpointOptions.isTablet ? 'Diff' : 'Difference',
          alignment: 'right',
        },
      ],
      border: {
        bottom: true,
      },
    },
  ] as RowProps[];

export const expensesComparisonTableHeaderWithoutOffChain = () =>
  [
    {
      cellPadding: {
        tablet_768: '20px 16px 18px 0',
        desktop_1024: '18px 16px',
      },
      cells: [
        {
          isHidden: true,
          border: {
            right: true,
          },
          width: {
            desktop_1440: '16.5%',
            desktop_1280: '18%',
            desktop_1024: '22.5%',
            tablet_768: '18.7%',
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
            desktop_1280: '18%',
            desktop_1024: '22.5%',
            tablet_768: '24.3%',
          },
        },
        {
          value: 'Reported Actuals',
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
            desktop_1280: '32%',
            desktop_1024: '27.5%',
            tablet_768: '38.2%',
          },
          cellPadding: {
            tablet_768: '20px 13px 18px 0',
            desktop_1024: '17px 14px 18px 0',
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
