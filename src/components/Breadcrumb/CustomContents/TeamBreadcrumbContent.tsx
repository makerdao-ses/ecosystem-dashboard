import { styled, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import type { PagerArrowsProps } from '@/components/PagerArrows/PagerArrows';
import PagerArrows from '@/components/PagerArrows/PagerArrows';
import { ResourceType } from '@/core/models/interfaces/types';
import type { Theme } from '@mui/material';

interface TeamBreadcrumbContentProps {
  team: ResourceType;
  currentPage: number;
  totalPages: number;
  pagerProps: PagerArrowsProps;
}

const TeamBreadcrumbContent: React.FC<TeamBreadcrumbContentProps> = ({ team, currentPage, totalPages, pagerProps }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  const teamLabel = useMemo(() => {
    switch (team) {
      case ResourceType.CoreUnit:
        return isMobile ? 'CU' : 'Core Units';
      case ResourceType.EcosystemActor:
        return isMobile ? 'EA' : 'Ecosystem Actor';
      default:
        throw new Error('Unsupported team type');
    }
  }, [isMobile, team]);

  return (
    <ContentContainer>
      <Wrapper>
        <CurrentPage>{currentPage}</CurrentPage> of {totalPages} {teamLabel}
      </Wrapper>{' '}
      <PagerArrows {...pagerProps} />
    </ContentContainer>
  );
};

export default TeamBreadcrumbContent;

const ContentContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'stretch',
  flexWrap: 'nowrap',
  textWrap: 'nowrap',
  gap: 16,
  fontSize: 16,
  lineHeight: '18px',
  fontWeight: 400,
}));

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[500],
}));

const CurrentPage = styled('span')(({ theme }) => ({
  fontWeight: 700,
  marginRight: 8,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));
