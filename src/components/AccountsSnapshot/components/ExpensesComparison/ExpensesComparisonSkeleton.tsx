import { styled, useMediaQuery } from '@mui/material';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import ExpensesComparisonRowCardSkeleton from '../Cards/ExpensesComparisonRowCard/ExpensesComparisonRowCardSkeleton';
import ComparisonTableSkeleton from './ComparisonTableSkeleton';
import type { Theme } from '@mui/material';

const ExpensesComparisonSkeleton: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('table_834'));

  return (
    <div>
      <TitleContainer>
        <TitleLine1Skeleton />
        <TitleLine2Skeleton />
      </TitleContainer>
      <SubtitleContainer>
        <SubtitleLine1Skeleton />
        <SubtitleLine2Skeleton />
        <SubtitleLine3Skeleton />
      </SubtitleContainer>

      {isMobile ? <ExpensesComparisonRowCardSkeleton /> : <ComparisonTableSkeleton />}
    </div>
  );
};

export default ExpensesComparisonSkeleton;

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,

  [theme.breakpoints.up('table_834')]: {
    gap: 11,
  },
}));

const TitleLine1Skeleton = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 314,
  height: 18,

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 190,
    height: 21,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    maxWidth: 248,
  },
}));

const TitleLine2Skeleton = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 122,
  height: 17.5,

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 408,
    height: 14,
  },
}));

const SubtitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 5.25,
  marginTop: 14.5,

  [theme.breakpoints.up('table_834')]: {
    display: 'none',
  },
}));

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
