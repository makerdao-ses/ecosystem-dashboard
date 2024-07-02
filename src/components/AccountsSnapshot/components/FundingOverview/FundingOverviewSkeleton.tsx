import { styled } from '@mui/material';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import FundChangeCardSkeleton from '../Cards/FundChangeCardSkeleton';
import SimpleStatCardSkeleton from '../Cards/SimpleStatCardSkeleton';
import TransactionHistorySkeleton from '../TransactionHistory/TransactionHistorySkeleton';

const FundingOverviewSkeleton: React.FC = () => {
  const [isEnabled] = useFlagsActive();
  const enableCurrencyPicker = isEnabled('FEATURE_ACCOUNT_SNAPSHOT_CURRENCY_PICKER');

  return (
    <Container>
      <HeaderContainer>
        <TitleWrapper>
          <TitleSkeleton />
          <SubtitleContainer>
            <SubtitleLine1 />
            <SubtitleLine2 />
            <SubtitleLine3 />
          </SubtitleContainer>
        </TitleWrapper>

        {enableCurrencyPicker && <CurrencyPicker />}
      </HeaderContainer>

      <CardsContainer>
        <SimpleStatCardSkeleton />
        <FundChangeCardSkeleton />
        <SimpleStatCardSkeleton withEquals={true} />
      </CardsContainer>

      <TransactionHistorySkeleton />
    </Container>
  );
};

export default FundingOverviewSkeleton;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

const HeaderContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('table_834')]: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    marginTop: 0,
    marginBottom: 0,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    marginBottom: 8,
  },
}));

const TitleWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('table_834')]: {
    width: '100%',
  },
}));

const TitleSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 293,
  height: 17.5,
  marginBottom: 14.5,

  [theme.breakpoints.up('desktop_1194')]: {
    maxWidth: 248,
    height: 21,
    marginBottom: 21,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 386,
    marginBottom: 13,
  },
}));

const SubtitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 5.25,

  [theme.breakpoints.up('table_834')]: {
    gap: 6,
  },
}));

const SubtitleLine = styled(BaseSkeleton)(({ theme }) => ({
  height: 12.25,

  [theme.breakpoints.up('table_834')]: {
    height: 14,
  },
}));

const SubtitleLine1 = styled(SubtitleLine)(({ theme }) => ({
  maxWidth: 329,

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 423,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    maxWidth: 408,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 666,
  },
}));

const SubtitleLine2 = styled(SubtitleLine)(({ theme }) => ({
  maxWidth: 221,

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 321,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
}));

const SubtitleLine3 = styled(SubtitleLine)(({ theme }) => ({
  maxWidth: 230,

  [theme.breakpoints.up('table_834')]: {
    display: 'none',
  },
}));

const CurrencyPicker = styled(BaseSkeleton)(({ theme }) => ({
  marginTop: 12.75,
  maxWidth: 107,
  height: 34,
  borderRadius: 20,
  marginLeft: 'auto',

  [theme.breakpoints.up('table_834')]: {
    marginTop: 8,
    marginLeft: 0,
    maxWidth: 129,
    height: 48,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    marginTop: 0,
  },
}));

export const CardsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',

  '& > div:nth-of-type(1)': {
    order: 1,
    width: 'calc(50% - 4px)',
  },
  '& > div:nth-of-type(2)': {
    order: 3,
  },
  '& > div:nth-of-type(3)': {
    order: 2,
    width: 'calc(50% - 4px)',
  },

  [theme.breakpoints.up('table_834')]: {
    flexWrap: 'nowrap',

    '& > div:nth-of-type(1)': {
      order: 1,
      width: '100%',
    },
    '& > div:nth-of-type(2)': {
      order: 2,
    },
    '& > div:nth-of-type(3)': {
      order: 3,
      width: '100%',
    },
  },

  [theme.breakpoints.up('desktop_1194')]: {
    gap: 24,
    marginTop: -2,
  },
}));
