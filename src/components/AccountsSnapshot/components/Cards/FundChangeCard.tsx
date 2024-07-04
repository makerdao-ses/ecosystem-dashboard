import { styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import Card from '@/components/Card/Card';
import DefaultCountUp from '../DefaultCountUp/DefaultCountUp';
import NumberWithSignCard from '../NumberWithSignCard/NumberWithSignCard';
import type { ValueColor } from '../NumberWithSignCard/NumberWithSignCard';

interface FundChangeCardProps {
  netChange?: number;
  leftValue?: number;
  leftValueColor?: ValueColor;
  leftText: string;
  rightValue?: number;
  rightValueColor?: ValueColor;
  rightText: string;
  dynamicChanges?: boolean;
}

const FundChangeCard: React.FC<FundChangeCardProps> = ({
  netChange,
  leftValue,
  leftValueColor = 'normal',
  leftText,
  rightValue,
  rightValueColor = 'normal',
  rightText,
  dynamicChanges = false,
}) => (
  <CardStat>
    <ChangeContainer>
      <LeftArrowContainer>
        <FillSpace position="left" />
        <Arrow direction="left" />
      </LeftArrowContainer>
      <ChangeContent>
        <Value>
          {netChange !== undefined ? (
            <>
              {netChange > 0 && '+'}
              {dynamicChanges ? (
                <DefaultCountUp end={Math.round(netChange)} formattingFn={usLocalizedNumber} />
              ) : (
                usLocalizedNumber(Math.round(netChange))
              )}
              <div>DAI</div>
            </>
          ) : (
            'N/A'
          )}
        </Value>
        <NetChangeMessage>Net Change</NetChangeMessage>
      </ChangeContent>
      <RightArrowContainer>
        <Arrow direction="right" />
        <FillSpace position="right" />
      </RightArrowContainer>
    </ChangeContainer>
    <ValuesContainer>
      <NumberWithSignCard
        dynamicChanges={dynamicChanges}
        value={leftValue}
        valueColor={leftValueColor}
        sign="positive"
        text={leftText}
      />
      <NumberWithSignCard
        dynamicChanges={dynamicChanges}
        value={rightValue}
        valueColor={rightValueColor}
        sign="negative"
        text={rightText}
      />
    </ValuesContainer>
  </CardStat>
);

export default FundChangeCard;

const CardStat = styled(Card)(({ theme }) => ({
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 340,
    maxWidth: 340,
    padding: '8px 8px 16px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 468,
    maxWidth: 468,
    padding: '8px 16px 16px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 584,
    maxWidth: 584,
    padding: '8px 32px 16px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 640,
    minWidth: 640,
    padding: '8px 32px 16px',
  },
}));

const ChangeContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
}));

const LeftArrowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 8,
    paddingBottom: 1,
  },
}));

const RightArrowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: 8,
    paddingBottom: 1,
  },
}));

const FillSpace = styled('div')<{ position: 'left' | 'right' }>(({ theme, position }) => ({
  minWidth: position === 'left' ? 85 : 65,
  height: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    minWidth: position === 'left' ? 85 : 65,
    height: '100%',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: position === 'left' ? 118 : 85,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: position === 'left' ? 155 : 120,
  },
}));

const Arrow = styled('div')<{ direction: 'left' | 'right' }>(({ theme, direction }) => {
  const margin = 16;
  const borderStyle = `2px solid ${
    theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[700]
  }`;

  return {
    position: 'relative',
    height: `calc(100% - ${margin}px)`,
    marginTop: margin,
    borderTop: borderStyle,
    width: '100%',

    ...(direction === 'left'
      ? {
          borderLeft: borderStyle,
          borderTopLeftRadius: 20,
        }
      : {
          borderRight: borderStyle,
          borderTopRightRadius: 20,
        }),

    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 1,
      ...(direction === 'left' ? { left: -7.4 } : { right: -7.4 }),

      width: 13,
      height: 13,
      borderTop: borderStyle,
      borderLeft: borderStyle,
      borderTopLeftRadius: 1,
      transform: 'rotate(225deg)',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: -8,
      ...(direction === 'left' ? { right: 0 } : { left: 0 }),
      width: 2,
      height: 14,
      background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[700],
      borderRadius: 1,
    },
  };
});

const ChangeContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 8px 8px',

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
    paddingBottom: 8,
    alignItems: 'center',
    padding: '0 0 8px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    paddingBottom: 16,
  },
}));

const Value = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: 'normal',
  letterSpacing: 0.4,
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],

  '& > div': {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '22px',
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
    marginLeft: 4,

    [theme.breakpoints.up('desktop_1024')]: {
      fontSize: 16,
      lineHeight: 'normal',
      fontWeight: 700,
      letterSpacing: 0.3,
    },
  },
}));

const NetChangeMessage = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
  color: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[600],
  whiteSpace: 'nowrap',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    lineHeight: 'normal',
  },
}));

const ValuesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 8,
  flexDirection: 'row',
  width: '100%',
  marginTop: 2,

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    gap: 32,
  },
}));
