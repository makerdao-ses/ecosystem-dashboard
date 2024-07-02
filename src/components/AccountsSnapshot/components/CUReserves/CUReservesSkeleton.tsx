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
        <TitleSkeleton />
        <SubtitleContainer>
          <SubtitleLine1 />
          <SubtitleLine2 />
          <SubtitleLine3 />
        </SubtitleContainer>
      </TitleWrapper>

      <Checkbox />
    </HeaderContainer>

    <CardsContainer>
      <SimpleStatCardSkeleton />
      <FundChangeCardSkeleton />
      <SimpleStatCardSkeleton withEquals />
    </CardsContainer>

    <SectionTitleContainer>
      <SectionTitleSkeleton />
      <SectionSubtitleSkeleton />
    </SectionTitleContainer>
    <ReservesList>
      <ReserveCardSkeleton isGroup />
      <ReserveCardSkeleton />
      <ReserveCardSkeleton isGroup />
    </ReservesList>

    <SectionTitleContainer>
      <SectionTitleSkeleton />
      <SectionSubtitleSkeleton />
    </SectionTitleContainer>
    <ReservesList>
      <ReserveCardSkeleton isGroup />
      <ReserveCardSkeleton isGroup />
    </ReservesList>
  </Container>
);

export default CUReservesSkeleton;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

const HeaderContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('table_834')]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const TitleWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('table_834')]: {
    width: '100%',
  },
}));

const TitleSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 248,
  height: 17.5,
  marginBottom: 14.5,

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 190,
    height: 21,
    marginBottom: 11,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    maxWidth: 248,
  },
}));

const SubtitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 5.25,
});

const SubtitleLine = styled(BaseSkeleton)({
  height: 12.25,
});

const SubtitleLine1 = styled(SubtitleLine)(({ theme }) => ({
  maxWidth: 266,

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 408,
    height: 14,
  },
}));

const SubtitleLine2 = styled(SubtitleLine)(({ theme }) => ({
  maxWidth: 269,

  [theme.breakpoints.up('table_834')]: {
    display: 'none',
  },
}));

const SubtitleLine3 = styled(SubtitleLine)(({ theme }) => ({
  maxWidth: 194,

  [theme.breakpoints.up('table_834')]: {
    display: 'none',
  },
}));

const Checkbox = styled(SubtitleLine)(({ theme }) => ({
  maxWidth: 182,
  marginTop: 16.25,
  marginLeft: 'auto',

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 261,
    height: 14,
    marginTop: 4,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    marginTop: 32,
  },
}));

const CardsContainer = styled(FundingCardsContainer)(({ theme }) => ({
  marginTop: 8.25,

  [theme.breakpoints.up('desktop_1194')]: {
    marginTop: 8,
  },
}));

const SectionTitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15.5,
  marginTop: 2.5,

  [theme.breakpoints.up('table_834')]: {
    marginTop: 0,
    gap: 11,
  },
}));

const SectionTitleSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 149,
  height: 14,

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 190,
    height: 21,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    maxWidth: 248,
  },
}));

const SectionSubtitleSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 296,
  height: 12,

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 408,
    height: 14,
  },
}));

const ReservesList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 10,

  [theme.breakpoints.up('table_834')]: {
    marginTop: 8,
  },
}));
