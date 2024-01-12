import { styled } from '@mui/material';
import HorizontalBudgetBar from '@ses/containers/FinancesOverview/components/HorizontalBudgetBar/HorizontalBudgetBar';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization, usLocalizedNumber } from '@ses/core/utils/humanization';

const StatsData: React.FC = () => {
  const { isLight } = useThemeContext();
  const humanizedActuals = threeDigitsPrecisionHumanization(20252244);
  const humanizedBudgetCap = threeDigitsPrecisionHumanization(45225544);

  return (
    <OutlinedCard>
      <Row>
        <Label>Target date</Label>
        <Value>Q4 2023</Value>
      </Row>
      <Row>
        <Label>Estimated Budget Cap</Label>
        <Value>
          {usLocalizedNumber(12927312, 0)} <span>DAI</span>
        </Value>
      </Row>

      <BudgetBox>
        <Percentage>58%</Percentage>
        <ExtendedHorizontalBudgetBar actuals={200} prediction={250} budgetCap={300} />
        <Legend>
          <LegendItem dotColor={isLight ? '#2DC1B1' : '#1AAB9B'}>
            <LegendNumberWrapper>
              <LegendNumber>{humanizedActuals.value}</LegendNumber>
              <LegendNumberSuffix>{humanizedActuals.suffix}</LegendNumberSuffix>
            </LegendNumberWrapper>
            <LegendLabel>Actuals</LegendLabel>
          </LegendItem>
          <LegendItem dotColor={'#F75524'}>
            <LegendNumberWrapper>
              <LegendNumber>{humanizedBudgetCap.value}</LegendNumber>
              <LegendNumberSuffix>{humanizedBudgetCap.suffix}</LegendNumberSuffix>
            </LegendNumberWrapper>
            <LegendLabel>Cap</LegendLabel>
          </LegendItem>
        </Legend>
      </BudgetBox>
    </OutlinedCard>
  );
};

export default StatsData;

const OutlinedCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 16,
  alignSelf: 'stretch',
  padding: 15,
  borderRadius: 6,
  border: `1px solid ${theme.palette.mode === 'light' ? '#D4D9E1' : 'red'}`,

  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 0,
    border: 'none',
  },
}));

const Row = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 16,
  lineHeight: 'normal',
}));

const Label = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: theme.palette.mode === 'light' ? '#434358' : 'red',
  alignSelf: 'normal',
}));

const Value = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  flexWrap: 'nowrap',
  alignSelf: 'normal',
  gap: 4,
  fontSize: 14,
  fontWeight: 700,
  color: theme.palette.mode === 'light' ? '#231536' : 'red',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },

  '& span': {
    fontSize: 16,
    fontWeight: 700,
    color: theme.palette.mode === 'light' ? '#9FAFB9' : 'red',
  },
}));

const BudgetBox = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 3,
  alignSelf: 'stretch',
}));

const Percentage = styled('div')(({ theme }) => ({
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,
  color: theme.palette.mode === 'light' ? '#231536' : 'red',
  fontVariantNumeric: 'lining-nums tabular-nums',
}));

const ExtendedHorizontalBudgetBar = styled(HorizontalBudgetBar)({
  height: 16,
  borderRadius: 8,

  '& > div': {
    borderRadius: 8,
  },
});

const Legend = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 5,
});

const LegendItem = styled('div')<{ dotColor: string }>(({ theme, dotColor }) => ({
  position: 'relative',
  fontSize: 14,
  lineHeight: 'normal',
  color: theme.palette.mode === 'light' ? '#231536' : '#EDEFFF',
  paddingRight: 10,
  display: 'flex',
  alignItems: 'baseline',
  height: 'fit-content',

  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 10,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    paddingRight: 12,
  },

  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 'calc(50% - 4px)',
    right: 0,
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: dotColor,

    [theme.breakpoints.up('tablet_768')]: {
      width: 8,
      height: 8,
      top: 'calc(50% - 4px)',
    },
  },
}));

const LegendNumberWrapper = styled('div')({
  display: 'flex',
  alignItems: 'baseline',
});

const LegendNumber = styled('div')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 'normal',
  fontVariantNumeric: 'lining-nums tabular-nums',
  letterSpacing: '0.3px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    letterSpacing: 'normal',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    letterSpacing: '0.3px',
    lineHeight: '18px',
  },
}));

const LegendNumberSuffix = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: 'normal',
  marginLeft: 1.1,
  letterSpacing: '1px',
  fontWeight: 600,

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 12,
    marginLeft: 0,
    letterSpacing: 'normal',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    letterSpacing: '1px',
  },
}));

const LegendLabel = styled('div')(({ theme }) => ({
  marginLeft: 3.1,

  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 6,
    fontSize: 14,
    lineHeight: '18px',
  },
}));
