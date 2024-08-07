import { styled } from '@mui/material';
import FinancesBarChartCard from '../FinancesBarChartCard/FinancesBarChartCard';
import FinancesLineChartCard from '../FinancesLineChartCard/FinancesLineChartCard';
import { SectionTitle } from '../FinancesSectionTitle/FinancesSectionTitle';
import type { FormattedFinancesData } from '../../api/finances';
import type { RevenueAndSpendingRecords } from '../../api/revenueAndSpending';

interface FinancesSectionProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  financesData: FormattedFinancesData;
}

const FinancesSection: React.FC<FinancesSectionProps> = ({ revenueAndSpendingData, financesData }) => (
  <>
    <SectionTitle>Finances</SectionTitle>
    <Text>*All values are converted to DAI</Text>
    <Finances>
      <FinancesBarChartCard revenueAndSpendingData={revenueAndSpendingData} />
      <FinancesLineChartCard financesData={financesData} />
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

const Text = styled('span')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.colors.slate[200],
}));
