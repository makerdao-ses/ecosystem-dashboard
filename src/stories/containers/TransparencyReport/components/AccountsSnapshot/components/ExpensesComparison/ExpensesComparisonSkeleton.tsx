import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import ExpensesComparisonRowCardSkeleton from '../Cards/ExpensesComparisonRowCard/ExpensesComparisonRowCardSkeleton';
import ComparisonTableSkeleton from './ComparisonTableSkeleton';

const ExpensesComparisonSkeleton: React.FC = () => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  return (
    <div>
      <TitleContainer>
        <TitleLine1Skeleton isLight={isLight} />
        <TitleLine2Skeleton isLight={isLight} />
      </TitleContainer>
      <SubtitleContainer>
        <SubtitleLine1Skeleton isLight={isLight} />
        <SubtitleLine2Skeleton isLight={isLight} />
        <SubtitleLine3Skeleton isLight={isLight} />
      </SubtitleContainer>

      {isMobile ? <ExpensesComparisonRowCardSkeleton /> : <ComparisonTableSkeleton />}
    </div>
  );
};

export default ExpensesComparisonSkeleton;

const TitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,

  [lightTheme.breakpoints.up('table_834')]: {
    gap: 11,
  },
});

const TitleLine1Skeleton = styled(BaseSkeleton)({
  maxWidth: 314,
  height: 18,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 190,
    height: 21,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    maxWidth: 248,
  },
});

const TitleLine2Skeleton = styled(BaseSkeleton)({
  maxWidth: 122,
  height: 17.5,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 408,
    height: 14,
  },
});

const SubtitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 5.25,
  marginTop: 14.5,

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

const SubtitleLine1Skeleton = styled(BaseSkeleton)({
  maxWidth: 236,
  height: 12.25,
});

const SubtitleLine2Skeleton = styled(BaseSkeleton)({
  maxWidth: 210,
  height: 12.25,
});

const SubtitleLine3Skeleton = styled(BaseSkeleton)({
  maxWidth: 200,
  height: 12.25,
});
