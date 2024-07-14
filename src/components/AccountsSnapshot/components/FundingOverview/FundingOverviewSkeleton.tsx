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
          <PageTitleWrapper>
            <TitleSkeleton />
            <IconSkeleton />
          </PageTitleWrapper>

          <SubtitleContainer>
            <SubtitleLine1 />
            <SubtitleLine2 />
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

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const HeaderContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 0,
    marginBottom: 0,
  },
}));

const TitleWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    width: '100%',
  },
}));

const PageTitleWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 8,
}));

const TitleSkeleton = styled(BaseSkeleton)(() => ({
  maxWidth: 287,
  height: 24,
}));

const IconSkeleton = styled(BaseSkeleton)(() => ({
  maxWidth: 16,
  height: 16,
}));

const SubtitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 6,
  },
}));

const SubtitleLine = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: '100%',
  width: '100%',
  height: 20,

  [theme.breakpoints.up('tablet_768')]: {
    height: 22,
  },
}));

const SubtitleLine1 = styled(SubtitleLine)(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 423,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 675,
    marginBottom: 2,
  },
}));

const SubtitleLine2 = styled(SubtitleLine)(({ theme }) => ({
  maxWidth: 264,

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 321,
    display: 'none',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const CurrencyPicker = styled(BaseSkeleton)(({ theme }) => ({
  marginTop: 12.75,
  maxWidth: 107,
  height: 34,
  borderRadius: 20,
  marginLeft: 'auto',

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 8,
    marginLeft: 0,
    maxWidth: 129,
    height: 48,
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

  [theme.breakpoints.up('tablet_768')]: {
    flexWrap: 'nowrap',
    gap: 24,

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

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 24,
    marginTop: -2,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));
