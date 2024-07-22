import { styled, useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization, usLocalizedNumber } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import { colorPalette } from '@ses/styles/theme/colorPalette';
import Card from '@/components/Card/Card';
import HorizontalBudgetBar from '@/components/HorizontalBudgetBar/HorizontalBudgetBar';
import type { Theme } from '@mui/material';

export type QuarterCardProps = {
  paymentsOnChain: number;
  budgetCap: number;
};

const BudgetUtilizationCard: React.FC<QuarterCardProps> = ({ paymentsOnChain, budgetCap }) => {
  const { isLight } = useThemeContext();
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));

  const humanizedActuals = threeDigitsPrecisionHumanization(paymentsOnChain);
  const humanizedBudgetCap = threeDigitsPrecisionHumanization(budgetCap);
  const percent = usLocalizedNumber(percentageRespectTo(paymentsOnChain, budgetCap), 0);

  return (
    <CardContainer>
      <PredictionWrapper>
        <TotalActual>
          <PredictionNumber>{humanizedActuals.value}</PredictionNumber>
          <PredictionUnits>
            <PredictionSymbol>DAI</PredictionSymbol>
            <NumberSuffix>{humanizedActuals.suffix}</NumberSuffix>
          </PredictionUnits>
        </TotalActual>
        <DividerActualsBudgetCap>/</DividerActualsBudgetCap>
        <TotalBudgeCap>
          <PredictionNumber>{humanizedBudgetCap.value}</PredictionNumber>
          <PredictionUnits>
            <PredictionSymbol>DAI</PredictionSymbol>
            <NumberSuffix>{humanizedBudgetCap.suffix}</NumberSuffix>
          </PredictionUnits>
        </TotalBudgeCap>
      </PredictionWrapper>
      <Description>Budget Utilization</Description>
      <DividerCardChart />
      <Percent isRightPartZero={budgetCap === 0}>{budgetCap === 0 ? '-- ' : percent}%</Percent>
      <BarWrapper>
        <HorizontalBudgetBarStyled actuals={paymentsOnChain} prediction={0} budgetCap={budgetCap} />
      </BarWrapper>
      <Legend>
        <LegendItem dotColor={isLight ? colorPalette.green[600] : colorPalette.green[900]}>
          Net {isDesktop1024 ? 'Exp' : 'Expenses'} On-chain
        </LegendItem>
        <LegendItem dotColor={colorPalette.red[900]}>Budget Cap</LegendItem>
      </Legend>
    </CardContainer>
  );
};

export default BudgetUtilizationCard;

const CardContainer = styled(Card)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '13px 32px',

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 32px',
  },
}));

const PredictionWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  marginTop: 0,
  marginLeft: -1,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginTop: -1,
  },
}));

const TotalActual = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  marginLeft: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: 8,
  },
}));
const TotalBudgeCap = styled(TotalActual)(({ theme }) => ({
  marginLeft: 6,

  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: 8,
  },
}));

const PredictionNumber = styled('div')({
  fontSize: 32,
  fontWeight: 600,
  lineHeight: '120%',
  marginRight: 8,
});

const PredictionUnits = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '15px',
  textTransform: 'uppercase',
});

const PredictionSymbol = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[50],
}));

const NumberSuffix = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
}));

const BarWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginTop: 4,
  marginBottom: 4,
}));

const Legend = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingLeft: 1,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 1,
    marginTop: 1,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 0,
    paddingLeft: 1,
  },
}));

const LegendItem = styled('div')<{ dotColor: string }>(({ theme, dotColor }) => ({
  position: 'relative',
  fontSize: 12,
  fontWeight: 700,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  paddingLeft: 12,
  display: 'flex',
  alignItems: 'flex-start ',
  height: 'fit-content',

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 'calc(50% - 4px)',
    left: 0,
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: dotColor,
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  textAlign: 'center',
  color: theme.palette.colors.gray[500],
}));

const Percent = styled('div')<{ isRightPartZero: boolean }>(({ theme, isRightPartZero }) => ({
  fontSize: 20,
  fontWeight: 700,
  lineHeight: '120%',
  textAlign: 'center',
  color: isRightPartZero
    ? theme.palette.isLight
      ? '#9FAFB9'
      : '#708390'
    : theme.palette.isLight
    ? theme.palette.colors.gray[900]
    : theme.palette.colors.gray[50],
}));

const DividerActualsBudgetCap = styled('div')(({ theme }) => ({
  marginLeft: 8,
  marginRight: 2,
  fontSize: 32,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.4px',
  fontVariantNumeric: 'lining-nums tabular-nums',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[500],
}));

const DividerCardChart = styled('div')(({ theme }) => ({
  margin: '10px -11px',
  borderBottom: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.slate[500]
  }`,

  [theme.breakpoints.up('desktop_1024')]: {
    margin: '10px -32px',
  },
}));

const HorizontalBudgetBarStyled = styled(HorizontalBudgetBar)({
  height: 16,
});
