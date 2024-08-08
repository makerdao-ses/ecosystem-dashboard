import { Button, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import FilterButtonTab from '@/components/FilterButtonTab/FilterButtonTab';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import { siteRoutes } from '@/config/routes';
import FinancesLineChart from '@/views/Home/components/FinancesLineChart/FinancesLineChart';
import useFinancesLineChart from '@/views/Home/components/FinancesLineChart/useFinancesLineChart';
import useFinancesLineChartCard, { ExpenseBreakdownFilterOptions } from './useFinancesLineChartCard';
import type { FormattedFinancesData, MetricKey } from '../../api/finances';
import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

interface TabButtonProps extends ButtonProps {
  isActive?: boolean;
}

interface FinancesLineChartCardProps {
  financesData: FormattedFinancesData;
}

const FinancesLineChartCard: FC<FinancesLineChartCardProps> = ({ financesData }) => {
  useFinancesLineChart();
  const { activeTab, handleActiveTab } = useFinancesLineChartCard();

  const [realizedExpensesFilter, setRealizedExpensesFilter] = useState<'Actuals' | 'Payments'>('Payments');
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('PaymentsOnChain');
  useEffect(() => {
    switch (activeTab) {
      case ExpenseBreakdownFilterOptions.REALIZED_EXPENSES:
        return setSelectedMetric(realizedExpensesFilter === 'Payments' ? 'PaymentsOnChain' : 'Actuals'); // or Actuals
      case ExpenseBreakdownFilterOptions.OPERATIONAL_RESERVES:
        // ProtocolNetOutFlow - PaymentsOffChainIncluded
        return setSelectedMetric('OperationalReserves');
      case ExpenseBreakdownFilterOptions.FORECAST:
        return setSelectedMetric('Forecast');
    }
  }, [activeTab, realizedExpensesFilter]);

  return (
    <Container>
      <FilterContainer>
        <TabButtonsContainer>
          <TabButton
            isActive={activeTab === ExpenseBreakdownFilterOptions.REALIZED_EXPENSES}
            disableRipple
            onClick={() => {
              handleActiveTab(ExpenseBreakdownFilterOptions.REALIZED_EXPENSES);
            }}
          >
            Realized Expenses
          </TabButton>
          <TabButton
            isActive={activeTab === ExpenseBreakdownFilterOptions.OPERATIONAL_RESERVES}
            disableRipple
            onClick={() => {
              handleActiveTab(ExpenseBreakdownFilterOptions.OPERATIONAL_RESERVES);
            }}
          >
            Operational Reserves
          </TabButton>
          <TabButton
            isActive={activeTab === ExpenseBreakdownFilterOptions.FORECAST}
            disableRipple
            onClick={() => {
              handleActiveTab(ExpenseBreakdownFilterOptions.FORECAST);
            }}
          >
            Forecast
          </TabButton>
        </TabButtonsContainer>

        <FilterGroupContainer
          style={{
            visibility: activeTab === ExpenseBreakdownFilterOptions.REALIZED_EXPENSES ? 'visible' : 'hidden',
          }}
        >
          <FilterButtonTabStyled
            label={'Actuals'}
            handleChange={() => setRealizedExpensesFilter('Actuals')}
            isSelect={realizedExpensesFilter === 'Actuals'}
          />
          <FilterButtonTabStyled
            label={'Payments'}
            handleChange={() => setRealizedExpensesFilter('Payments')}
            isSelect={realizedExpensesFilter === 'Payments'}
          />
        </FilterGroupContainer>
      </FilterContainer>

      <FinancesLineChart financesData={financesData} selectedMetric={selectedMetric} />

      <ExternalButtonContainer>
        <InternalLinkButton label="Realized Expenses" buttonType="primary" href={siteRoutes.finances('/scopes')} />
      </ExternalButtonContainer>
    </Container>
  );
};

export default FinancesLineChartCard;

const Container = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '0px 0px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 16px 24px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 24px 24px',
  },
}));

const FilterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
    marginBottom: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'column',
    gap: 8,
  },
}));

const TabButtonsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  borderRadius: '12px 12px 0px 0px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[800],
  boxShadow: '1px 0px 15px 0px rgba(117, 117, 117, 0.15)',

  [theme.breakpoints.up('tablet_768')]: {
    width: 'fit-content',
    gap: 24,
    borderRadius: 0,
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '100%',
    justifyContent: 'center',
    gap: 32,
  },
}));

const FilterGroupContainer = styled('div')(() => ({
  display: 'flex',
  gap: 8,
  marginLeft: 'auto',
  padding: '0 8px',
}));

const TabButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<TabButtonProps>(({ theme, isActive }) => ({
  width: '100%',
  height: 34,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: 8,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  textTransform: 'none',
  border: 'none',
  borderRadius: 0,
  color: theme.palette.colors.gray[500],
  backgroundColor: 'transparent',
  boxShadow: 'none',

  ...(isActive && {
    fontWeight: 700,
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[700],
  }),

  '&:first-of-type': {
    width: '90%',
    borderTopLeftRadius: 12,
  },

  '&:last-of-type': {
    width: '40%',
    borderTopRightRadius: 12,
  },

  '&:hover': {
    backgroundColor: isActive
      ? theme.palette.isLight
        ? theme.palette.colors.slate[50]
        : theme.palette.colors.charcoal[700]
      : 'transparent',
  },

  '&:active, &:focus': {
    fontWeight: 700,
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[700],
  },

  [theme.breakpoints.up('tablet_768')]: {
    width: 'auto',
    height: 22,
    padding: 0,
    fontSize: 14,
    lineHeight: '22px',
    color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400],

    ...(isActive && {
      fontWeight: 500,
      color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
      backgroundColor: 'transparent',
    }),

    '&:first-of-type': {
      width: 'auto',
      borderTopLeftRadius: 0,
    },

    '&:last-of-type': {
      width: 'auto',
      borderTopRightRadius: 0,
    },

    '&:hover': {
      ...(!isActive && {
        color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
      }),
      backgroundColor: 'transparent',
    },

    '&:active, &:focus': {
      fontWeight: 500,
      color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
      backgroundColor: 'transparent',
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    height: 24,
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const ExternalButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 24,

  '& > a': {
    padding: '2px 14px 2px 22px',
  },

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginTop: 16,
  },
}));

const FilterButtonTabStyled = styled(FilterButtonTab)({
  height: 32,
  '& div': {
    fontSize: 16,
    linHeight: '24px',
    letterSpacing: '-0.32px',
  },
});
