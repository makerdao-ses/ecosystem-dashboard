import { styled } from '@mui/material';
import ArrowRight from '@ses/components/svg/ArrowRight';
import { useBudgetMetricsModalContext } from '@ses/core/context/BudgetMetricsModalContext';
import { useThemeContext } from '@ses/core/context/ThemeContext';

const BudgetMetricButtonModalTrigger: React.FC = () => {
  const { isLight } = useThemeContext();
  const { handleOpenModal } = useBudgetMetricsModalContext();

  return (
    <ContainerOpenModal onClick={handleOpenModal}>
      <Text>Learn about budget metrics</Text>
      <ArrowRight fill={isLight ? '#231536' : '#D2D4EF'} />
    </ContainerOpenModal>
  );
};

export default BudgetMetricButtonModalTrigger;

const ContainerOpenModal = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  cursor: 'pointer',
  height: 34,
  justifyContent: 'space-between',
  alignItems: 'center',
  background: theme.palette.mode === 'light' ? '#F6F8F9' : '#343442',
  border: theme.palette.mode === 'light' ? '1px solid #D4D9E1' : '1px solid #48495F',
  borderRadius: '6px',
  padding: '8px 16px 8px 16px',
  marginTop: -2,
  marginBottom: 24,

  [theme.breakpoints.up('tablet_768')]: {
    width: 240,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 32,
  },
}));

const Text = styled('span')(({ theme }) => ({
  fontWeight: 400,
  fontSize: 13,
  lineHeight: '18px',
  color: theme.palette.mode === 'light' ? '#231635' : '#D2D4EF',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
  },
}));
