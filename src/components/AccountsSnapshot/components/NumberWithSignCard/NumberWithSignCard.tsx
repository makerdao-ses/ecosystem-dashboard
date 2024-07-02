import { styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { useThemeContext } from '@/core/context/ThemeContext';
import DefaultCountUp from '../DefaultCountUp/DefaultCountUp';

export type ValueColor = 'normal' | 'green';

interface NumberWithSignCardProps {
  value?: number;
  text: string;
  sign: 'positive' | 'negative';
  valueColor?: ValueColor;
  cardWidth?: string | number;
  dynamicChanges?: boolean;
}

const NumberWithSignCard: React.FC<NumberWithSignCardProps> = ({
  value,
  sign,
  text,
  valueColor = 'normal',
  dynamicChanges = false,
}) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <SignContainer>
        {sign === 'positive' ? (
          <PlusSVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" width="4" height="24" rx="2" fill={isLight ? '#ADAFD4' : '#48495F'} />
            <rect
              y="14"
              width="4"
              height="24"
              rx="2"
              transform="rotate(-90 0 14)"
              fill={isLight ? '#ADAFD4' : '#48495F'}
            />
          </PlusSVG>
        ) : (
          <MinusSVG viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              y="4"
              width="4"
              height="24"
              rx="2"
              transform="rotate(-90 0 4)"
              fill={isLight ? '#ADAFD4' : '#48495F'}
            />
          </MinusSVG>
        )}
      </SignContainer>
      <Card sign={sign}>
        <Value valueColor={valueColor}>
          {value !== undefined ? (
            <>
              {dynamicChanges ? (
                <DefaultCountUp end={Math.round(value)} formattingFn={usLocalizedNumber} />
              ) : (
                usLocalizedNumber(Math.round(value))
              )}
              <div>DAI</div>
            </>
          ) : (
            'N/A'
          )}
        </Value>
        <Text>{text}</Text>
      </Card>
    </Container>
  );
};

export default NumberWithSignCard;

const Container = styled('div')({
  display: 'flex',
  width: '100%',
});

const SignContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: 4,

  [theme.breakpoints.up('desktop_1194')]: {
    marginRight: 8,
  },
}));

const PlusSVG = styled('svg')(({ theme }) => ({
  width: 16,
  height: 16,

  [theme.breakpoints.up('desktop_1194')]: {
    width: 24,
    height: 24,
  },
}));

const MinusSVG = styled('svg')(({ theme }) => ({
  width: 16,
  height: 4,

  [theme.breakpoints.up('desktop_1194')]: {
    width: 24,
    height: 4,
  },
}));

const Card = styled('div')<{ sign: 'positive' | 'negative' }>(({ theme, sign }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 167,
  width: '100%',
  padding: 8,
  background: theme.palette.isLight ? 'rgba(236, 239, 249, 0.5)' : 'rgba(72, 73, 95, 0.25)',
  borderRadius: 6,

  [theme.breakpoints.up('table_834')]: {
    minWidth: sign === 'positive' ? 159 : 167,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    minWidth: sign === 'positive' ? 224 : 235,
  },
}));

const Value = styled('div')<{ valueColor: ValueColor }>(({ theme, valueColor }) => {
  let color = theme.palette.isLight ? '#231536' : '#EDEFFF'; // normal
  if (valueColor === 'green') {
    color = theme.palette.isLight ? '#1AAB9B' : '#2DC1B1';
  }

  return {
    display: 'flex',
    alignItems: 'baseline',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '19px',
    letterSpacing: 0.3,
    fontFeatureSettings: "'tnum' on, 'lnum' on",
    color,
    textAlign: 'center',

    [theme.breakpoints.up('table_834')]: {
      fontWeight: 600,
      fontSize: 20,
      lineHeight: '24px',
      letterSpacing: 0.4,
      fontFeatureSettings: 'normal',
    },

    [theme.breakpoints.up('desktop_1194')]: {
      fontWeight: 500,
      fontSize: 30,
      lineHeight: '36px',
    },

    '& div': {
      marginLeft: 4,
      fontWeight: 700,
      fontSize: 12,
      lineHeight: '15px',
      letterSpacing: 0.3,
      fontFeatureSettings: "'tnum' on, 'lnum' on",
      color: theme.palette.isLight ? '#9FAFB9' : '#708390',

      [theme.breakpoints.up('table_834')]: {
        fontSize: 16,
        lineHeight: '19px',
      },
    },
  };
});

const Text = styled('div')(({ theme }) => ({
  fontSize: 11,
  lineHeight: '13px',
  color: theme.palette.isLight ? '#708390' : '#708390',
  marginTop: 4,

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));
