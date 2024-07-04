import { styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { colorPalette } from '@ses/styles/theme/colorPalette';
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
            <rect
              x="10"
              width="4"
              height="24"
              rx="2"
              fill={isLight ? colorPalette.purple[100] : colorPalette.charcoal[700]}
            />
            <rect
              y="14"
              width="4"
              height="24"
              rx="2"
              transform="rotate(-90 0 14)"
              fill={isLight ? colorPalette.purple[100] : colorPalette.charcoal[700]}
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
              fill={isLight ? colorPalette.purple[100] : colorPalette.charcoal[700]}
            />
          </MinusSVG>
        )}
      </SignContainer>
      <Card sign={sign}>
        <Text>{text}</Text>
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

  [theme.breakpoints.up('desktop_1024')]: {
    marginRight: 8,
  },
}));

const PlusSVG = styled('svg')(({ theme }) => ({
  width: 16,
  height: 16,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 24,
    height: 24,
  },
}));

const MinusSVG = styled('svg')(({ theme }) => ({
  width: 16,
  height: 4,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 24,
    height: 4,
  },
}));

const Card = styled('div')<{ sign: 'positive' | 'negative' }>(({ theme, sign }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  padding: '3px 3px 7px 7px',
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],

  [theme.breakpoints.up('tablet_768')]: {
    padding: '3px 3px 7px 7px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: sign === 'positive' ? 176 : 176,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '3px 15px 7px',
  },
}));

const Value = styled('div')<{ valueColor: ValueColor }>(({ theme, valueColor }) => {
  let color = theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50]; // normal
  if (valueColor === 'green') {
    color = theme.palette.isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900];
  }

  return {
    display: 'flex',
    alignItems: 'baseline',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color,
    textAlign: 'center',

    [theme.breakpoints.up('desktop_1024')]: {
      fontWeight: 700,
      fontSize: 20,
      lineHeight: '120%',
    },

    [theme.breakpoints.up('desktop_1280')]: {
      fontSize: 24,
    },

    '& div': {
      marginLeft: 4,
      fontWeight: 600,
      fontSize: 14,
      lineHeight: '22px',
      color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],

      [theme.breakpoints.up('desktop_1024')]: {
        fontSize: 16,
        lineHeight: '24px',
      },
    },
  };
});

const Text = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 8,
  },
}));
