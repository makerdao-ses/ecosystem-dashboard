import { styled, useMediaQuery } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import DefaultCountUp from '../DefaultCountUp/DefaultCountUp';
import NumberWithSignCard from '../NumberWithSignCard/NumberWithSignCard';
import OutlinedCard from './OutlinedCard';
import type { ValueColor } from '../NumberWithSignCard/NumberWithSignCard';
import type { Theme } from '@mui/material';

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
}) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('table_834'));

  return (
    <Card>
      <ChangeContainer>
        <LeftArrowContainer>
          <FillSpace position="left" />
          {isMobile ? <MobileArrow position="top" /> : <Arrow direction="left" />}
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
          {isMobile ? <MobileArrow position="bottom" /> : <Arrow direction="right" />}
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
    </Card>
  );
};

export default FundChangeCard;

const Card = styled(OutlinedCard)(({ theme }) => ({
  padding: 15,
  display: 'flex',
  flexDirection: 'row-reverse',

  [theme.breakpoints.up('table_834')]: {
    minWidth: 390,
    padding: 7,
    flexDirection: 'column',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    minWidth: 579,
    padding: '16px 15px 15px',
  },
}));

const ChangeContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  [theme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
  },
}));

const LeftArrowContainer = styled('div')(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.up('table_834')]: {
    marginRight: 8,
    paddingBottom: 1,
    display: 'flex',
  },
}));

const RightArrowContainer = styled('div')(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.up('table_834')]: {
    marginLeft: 8,
    paddingBottom: 1,
    display: 'flex',
  },
}));

const FillSpace = styled('div')<{ position: 'left' | 'right' }>(({ theme, position }) => ({
  [theme.breakpoints.up('table_834')]: {
    minWidth: position === 'left' ? 100 : 84,
    height: '100%',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    minWidth: position === 'left' ? 141 : 112,
  },
}));

const MobileArrow = styled('div')<{ position: 'top' | 'bottom' }>(({ theme, position }) => {
  const borderStyle = `2px solid ${theme.palette.isLight ? '#ECEFF9' : 'rgba(72, 73, 95, 0.3)'}`;

  return {
    position: 'relative',
    height: position === 'top' ? 14 : 10,
    borderRight: borderStyle,
    marginLeft: 8,
    marginRight: 42,

    ...(position === 'top'
      ? {
          marginTop: 22,
          borderTop: borderStyle,
          borderTopRightRadius: 20,
        }
      : {
          marginBottom: 16,
          borderBottom: borderStyle,
          borderBottomRightRadius: 20,
        }),

    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      ...(position === 'top' ? { top: -7.4 } : { bottom: -7.4 }),

      width: 13,
      height: 13,
      borderTop: borderStyle,
      borderLeft: borderStyle,
      borderTopLeftRadius: 1,
      transform: 'rotate(-45deg)',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      right: -10,
      ...(position === 'top' ? { bottom: 0 } : { top: 0 }),
      width: 20,
      height: 2,
      background: theme.palette.isLight ? '#ECEFF9' : 'rgba(72, 73, 95, 0.3)',
      borderRadius: 1,
    },
  };
});

const Arrow = styled('div')<{ direction: 'left' | 'right' }>(({ theme, direction }) => {
  const margin = 16;
  const borderStyle = `2px solid ${theme.palette.isLight ? '#ECEFF9' : 'rgba(72, 73, 95, 0.3)'}`;

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
      background: theme.palette.isLight ? '#ECEFF9' : 'rgba(72, 73, 95, 0.3)',
      borderRadius: 1,
    },
  };
});

const ChangeContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginTop: 2,

  [theme.breakpoints.up('table_834')]: {
    marginTop: 0,
    paddingBottom: 8,
    alignItems: 'center',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    paddingBottom: 16,
  },
}));

const Value = styled('div')(({ theme }) => ({
  display: 'flex',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '17px',
  letterSpacing: 0.4,
  color: theme.palette.isLight ? '#9FAFB9' : '#546978',

  [theme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '19px',
  },

  '& > div': {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '17px',
    letterSpacing: 0.3,
    fontFeatureSettings: "'tnum' on, 'lnum' on",
    color: theme.palette.isLight ? '#9FAFB9' : '#31424E',
    marginLeft: 4,

    [theme.breakpoints.up('table_834')]: {
      fontSize: 16,
      lineHeight: '19px',
    },
  },
}));

const NetChangeMessage = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '15px',
  color: theme.palette.isLight ? '#D1DEE6' : '#405361',
  margin: '4px 10px 3px 0',
  whiteSpace: 'nowrap',

  [theme.breakpoints.up('table_834')]: {
    fontSize: 14,
    lineHeight: '17px',
    margin: 0,
  },
}));

const ValuesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 8,
  flexDirection: 'column',
  width: '100%',

  [theme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    gap: 24,
  },
}));
