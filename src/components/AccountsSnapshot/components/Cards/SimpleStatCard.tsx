import { styled, useMediaQuery } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { DateTime } from 'luxon';
import Card from '@/components/Card/Card';
import DefaultCountUp from '../DefaultCountUp/DefaultCountUp';
import EqualSign from '../SVG/Equals';
import type { Theme } from '@mui/material';

interface SimpleStatCardProps {
  date?: string;
  value?: number;
  caption: string;
  hasEqualSign?: boolean;
  dynamicChanges?: boolean;
}

const SimpleStatCard: React.FC<SimpleStatCardProps> = ({
  date,
  value,
  caption,
  hasEqualSign = false,
  dynamicChanges = false,
}) => {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));

  return (
    <CardStat>
      <Date>{date ? DateTime.fromISO(date).toFormat('d MMM y') : 'N/A'}</Date>

      <ContentWrapper>
        {hasEqualSign && (
          <EqualSignContainer>
            <EqualSign width={isTablet ? 16 : 24} height={isTablet ? 10 : 15} />
          </EqualSignContainer>
        )}
        <Wrapper>
          <Caption>{caption}</Caption>
          <Value>
            {value !== undefined ? (
              <>
                {dynamicChanges ? (
                  <DefaultCountUp end={Math.round(value)} formattingFn={usLocalizedNumber} />
                ) : (
                  usLocalizedNumber(Math.round(value))
                )}
                <span>DAI</span>
              </>
            ) : (
              'N/A'
            )}
          </Value>
        </Wrapper>
      </ContentWrapper>
    </CardStat>
  );
};

export default SimpleStatCard;

const CardStat = styled(Card)(({ theme }) => ({
  padding: 8,

  [theme.breakpoints.up('tablet_768')]: {
    padding: '16px 8px',
    minWidth: 158,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 32px',
  },
}));

const Date = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
}));

const ContentWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 8,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 'auto',
    gap: 4,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 0,
  },
}));

const EqualSignContainer = styled('div')(({ theme }) => ({
  marginTop: -3,
  marginRight: 6,

  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 'auto',
    marginTop: 0,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginRight: 16,
    marginTop: 7,
  },
}));

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '3px 7px 7px',
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  width: '100%',

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '3px 15px 7px',
  },
}));

const Value = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontWeight: 700,
    fontSize: 20,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 24,
    lineHeight: '120%',
  },

  '& > span:last-of-type': {
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
}));

const Caption = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 8,
  },
}));
