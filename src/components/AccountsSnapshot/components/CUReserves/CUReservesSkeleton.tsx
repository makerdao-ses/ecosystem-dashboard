import { styled } from '@mui/material';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import FundChangeCardSkeleton from '../Cards/FundChangeCardSkeleton';
import ReserveCardSkeleton from '../Cards/ReserveCardSkeleton';
import SimpleStatCardSkeleton from '../Cards/SimpleStatCardSkeleton';
import { CardsContainer as FundingCardsContainer } from '../FundingOverview/FundingOverviewSkeleton';

const CUReservesSkeleton: React.FC = () => (
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

      <CheckboxContainer>
        <CheckboxLabel />
        <CheckboxIcon />
      </CheckboxContainer>
    </HeaderContainer>

    <CardsContainer>
      <SimpleStatCardSkeleton />
      <FundChangeCardSkeleton />
      <SimpleStatCardSkeleton withEquals />
    </CardsContainer>

    <SectionTitleContainer>
      <PageTitleWrapper>
        <TitleSkeleton />
        <IconSkeleton />
      </PageTitleWrapper>
      <SectionSubtitleSkeleton />
    </SectionTitleContainer>

    <ReservesList>
      <ReserveCardSkeleton isGroup />
      <ReserveCardSkeleton />
      <ReserveCardSkeleton isGroup />
    </ReservesList>

    <OffChainWrapper>
      <SectionTitleContainer>
        <PageTitleWrapper>
          <TitleSkeleton />
          <IconSkeleton />
        </PageTitleWrapper>
        <SectionSubtitleSkeleton />
      </SectionTitleContainer>
      <ReservesList>
        <ReserveCardSkeleton isGroup />
        <ReserveCardSkeleton isGroup />
      </ReservesList>
    </OffChainWrapper>
  </Container>
);

export default CUReservesSkeleton;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const HeaderContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    justifyContent: 'space-between',
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
  maxWidth: 197,
  height: 24,
}));

const IconSkeleton = styled(BaseSkeleton)(() => ({
  maxWidth: 16,
  height: 16,
}));

const SubtitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const SubtitleLine = styled(BaseSkeleton)({
  width: '100%',
  height: 20,
});

const SubtitleLine1 = styled(SubtitleLine)(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 408,
    height: 22,
  },
}));

const SubtitleLine2 = styled(SubtitleLine)(({ theme }) => ({
  maxWidth: 102,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const CheckboxContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  justifyContent: 'flex-end',
  marginTop: 8,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
    alignItems: 'flex-end',
  },
}));

const CheckboxLabel = styled(SubtitleLine)(({ theme }) => ({
  maxWidth: 208,
  height: 22,

  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 208,
    marginTop: 4,
  },
}));

const CheckboxIcon = styled(BaseSkeleton)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: 4,

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 2,
  },
}));

const CardsContainer = styled(FundingCardsContainer)(({ theme }) => ({
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

const OffChainWrapper = styled('div')(() => ({
  opacity: 0.3,
}));

const SectionTitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
  },
}));

const SectionSubtitleSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 260,
  height: 20,

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 323,
    height: 22,
  },
}));

const ReservesList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 10,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
  },
}));
