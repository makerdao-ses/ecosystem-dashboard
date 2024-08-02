import { styled } from '@mui/material';
import FinancesBarChartCard from '../FinancesBarChartCard/FinancesBarChartCard';
import FinancesLineChartCard from '../FinancesLineChartCard/FinancesLineChartCard';
import { SectionTitle } from '../FinancesSectionTitle/FinancesSectionTitle';
import type { RevenueAndSpendingRecords } from '../../api/queries';

interface FinancesSectionProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
}

const FinancesSection: React.FC<FinancesSectionProps> = ({ revenueAndSpendingData }) => (
  <>
    <SectionTitle>Finances</SectionTitle>

    <Finances>
      <FinancesBarChartCard revenueAndSpendingData={revenueAndSpendingData} />
      <FinancesLineChartCard />
    </Finances>
  </>
);

export default FinancesSection;

const Finances = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 24,

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    gap: 32,
  },
}));
