import { styled, useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization, usLocalizedNumber } from '@ses/core/utils/humanization';
import HorizontalBudgetBar from '@/components/HorizontalBudgetBar/HorizontalBudgetBar';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import Information from '@/components/icons/information';
import { formatDateStringToQuarter } from '../../utils';
import type { Theme } from '@mui/material';

interface StatsDataProps {
  minimal?: boolean;
  targetDate: string;
}

const StatsData: React.FC<StatsDataProps> = ({ minimal, targetDate }) => {
  const { isLight } = useThemeContext();
  const is1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const humanizedActuals = threeDigitsPrecisionHumanization(20252244);
  const humanizedBudgetCap = threeDigitsPrecisionHumanization(45225544);

  return (
    <OutlinedCard>
      <Row>
        <Label>
          Target date
          <SESTooltip content="Target dates are meant as internal project management indicators. They are subject to change without notice and offer no guarantee for the delivery time of the milestone">
            <IconWrapper>
              <Information />
            </IconWrapper>
          </SESTooltip>
        </Label>
        <Value>{formatDateStringToQuarter(targetDate, true)}</Value>
      </Row>
      {!minimal && (
        <Row>
          <Label>{is1024 ? 'Est.' : 'Estimated'} Budget Cap</Label>
          <Value>
            {usLocalizedNumber(12927312, 0)} <span>DAI</span>
          </Value>
        </Row>
      )}

      {!minimal && (
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
      )}
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
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#31424E'}`,

  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 0,
    border: 'none',
    gap: 24,
  },
}));

const Row = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 16,
  lineHeight: 'normal',
  marginTop: -3,
}));

const Label = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: theme.palette.isLight ? '#434358' : '#B6BCC2',
  alignSelf: 'normal',
}));

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  justifyContent: 'flex-start',
  width: 24,
  height: 24,
  paddingLeft: 2,
  alignItems: 'center',
  cursor: 'pointer',

  [theme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 4,
  },
}));

const Value = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  alignSelf: 'normal',
  gap: 4,
  fontSize: 14,
  fontWeight: 700,
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },

  '& span': {
    fontSize: 16,
    fontWeight: 700,
    color: theme.palette.isLight ? '#9FAFB9' : '#B6BCC2',
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
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  fontVariantNumeric: 'lining-nums tabular-nums',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
  },
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
  color: theme.palette.isLight ? '#231536' : '#EDEFFF',
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
