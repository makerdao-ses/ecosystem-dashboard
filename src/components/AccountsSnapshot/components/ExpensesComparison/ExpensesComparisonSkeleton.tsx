import { styled, useMediaQuery } from '@mui/material';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import ExpensesComparisonRowCardSkeleton from '../Cards/ExpensesComparisonRowCard/ExpensesComparisonRowCardSkeleton';
import ComparisonTableSkeleton from './ComparisonTableSkeleton';
import type { Theme } from '@mui/material';

const ExpensesComparisonSkeleton: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  return (
    <div>
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

      {isMobile ? <ExpensesComparisonRowCardSkeleton /> : <ComparisonTableSkeleton />}
    </div>
  );
};

export default ExpensesComparisonSkeleton;

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
  maxWidth: 233,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const SubtitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});
