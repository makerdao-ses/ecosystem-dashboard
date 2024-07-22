import { styled } from '@mui/material';
import CircleInfo from 'public/assets/svg/circle_info.svg';
import type { BreadcrumbItem } from '@/components/Breadcrumb/Breadcrumb';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import { useBudgetMetricsModalContext } from '@/core/context/BudgetMetricsModalContext';

interface BreadcrumbYearNavigationProps {
  years: string[];
  handleChange: (value: string) => void;
  selectedValue: string;
  breakdownItems: BreadcrumbItem[];
}
const BreadcrumbYearNavigation: React.FC<BreadcrumbYearNavigationProps> = ({
  years,
  handleChange,
  selectedValue,
  breakdownItems,
}) => {
  const { handleOpenModal } = useBudgetMetricsModalContext();

  return (
    <Breadcrumb
      items={breakdownItems}
      rightContent={
        <RightContentContainer>
          <BudgetButton onClick={handleOpenModal}>
            <span>Budget Metrics</span>
            <CircleInfo width={24} height={24} />
          </BudgetButton>
          <Select
            label="Year"
            options={years.map((year) => ({
              label: year,
              value: year,
            }))}
            onChange={(value) => handleChange(value as string)}
            selected={selectedValue}
          />
        </RightContentContainer>
      }
    />
  );
};

export default BreadcrumbYearNavigation;

const RightContentContainer = styled('div')(() => ({
  display: 'flex',
  gap: 16,
}));

const BudgetButton = styled('button')(({ theme }) => ({
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.charcoal[700]}`,
  borderRadius: 8,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[800],
  color: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.gray[300],
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  letterSpacing: -0.32,
  display: 'flex',
  gap: 8,
  padding: 3,

  '& > span': {
    display: 'none',

    [theme.breakpoints.up('tablet_768')]: {
      display: 'inline',
      whiteSpace: 'nowrap',
    },
  },

  '& path': {
    fill: theme.palette.colors.blue[800],
  },

  '&:hover': {
    border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[400] : theme.palette.colors.charcoal[600]}`,
    background: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[700],
    color: theme.palette.isLight ? theme.palette.colors.gray[800] : theme.palette.colors.gray[100],
  },

  [theme.breakpoints.up('tablet_768')]: {
    padding: '3px 15px',
  },
}));

const Select = styled(CustomSelect)(() => ({
  minWidth: 97,
}));
