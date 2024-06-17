import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import FundChangeCardSkeleton from '../Cards/FundChangeCardSkeleton';
import ReserveCardSkeleton from '../Cards/ReserveCardSkeleton';
import SimpleStatCardSkeleton from '../Cards/SimpleStatCardSkeleton';
import { CardsContainer as FundingCardsContainer } from '../FundingOverview/FundingOverviewSkeleton';

const CUReservesSkeleton: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <HeaderContainer>
        <TitleWrapper>
          <TitleSkeleton isLight={isLight} />
          <SubtitleContainer>
            <SubtitleLine1 isLight={isLight} />
            <SubtitleLine2 isLight={isLight} />
            <SubtitleLine3 isLight={isLight} />
          </SubtitleContainer>
        </TitleWrapper>

        <Checkbox isLight={isLight} />
      </HeaderContainer>

      <CardsContainer>
        <SimpleStatCardSkeleton />
        <FundChangeCardSkeleton />
        <SimpleStatCardSkeleton withEquals />
      </CardsContainer>

      <SectionTitleContainer>
        <SectionTitleSkeleton isLight={isLight} />
        <SectionSubtitleSkeleton isLight={isLight} />
      </SectionTitleContainer>
      <ReservesList>
        <ReserveCardSkeleton isGroup />
        <ReserveCardSkeleton />
        <ReserveCardSkeleton isGroup />
      </ReservesList>

      <SectionTitleContainer>
        <SectionTitleSkeleton isLight={isLight} />
        <SectionSubtitleSkeleton isLight={isLight} />
      </SectionTitleContainer>
      <ReservesList>
        <ReserveCardSkeleton isGroup />
        <ReserveCardSkeleton isGroup />
      </ReservesList>
    </Container>
  );
};

export default CUReservesSkeleton;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

const HeaderContainer = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const TitleWrapper = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    width: '100%',
  },
});

const TitleSkeleton = styled(BaseSkeleton)({
  maxWidth: 248,
  height: 17.5,
  marginBottom: 14.5,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 190,
    height: 21,
    marginBottom: 11,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    maxWidth: 248,
  },
});

const SubtitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 5.25,
});

const SubtitleLine = styled(BaseSkeleton)({
  height: 12.25,
});

const SubtitleLine1 = styled(SubtitleLine)({
  maxWidth: 266,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 408,
    height: 14,
  },
});

const SubtitleLine2 = styled(SubtitleLine)({
  maxWidth: 269,

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

const SubtitleLine3 = styled(SubtitleLine)({
  maxWidth: 194,
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

const Checkbox = styled(SubtitleLine)({
  maxWidth: 182,
  marginTop: 16.25,
  marginLeft: 'auto',

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 261,
    height: 14,
    marginTop: 4,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 32,
  },
});

const CardsContainer = styled(FundingCardsContainer)({
  marginTop: 8.25,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 8,
  },
});

const SectionTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 15.5,
  marginTop: 2.5,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 0,
    gap: 11,
  },
});

const SectionTitleSkeleton = styled(BaseSkeleton)({
  maxWidth: 149,
  height: 14,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 190,
    height: 21,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    maxWidth: 248,
  },
});

const SectionSubtitleSkeleton = styled(BaseSkeleton)({
  maxWidth: 296,
  height: 12,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 408,
    height: 14,
  },
});

const ReservesList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 10,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 8,
  },
});
