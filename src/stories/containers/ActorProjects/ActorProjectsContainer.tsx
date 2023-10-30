import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ActorSummary from '../ActorsAbout/components/ActorSummary/ActorSummary';
import PageSubheader from './components/PageSubheader/PageSubheader';
import ProjectList from './components/ProjectList/ProjectList';
import useActorProjectsContainer from './useActorProjectsContainer';
import type { Project } from '@ses/core/models/interfaces/projects';
import type { Team } from '@ses/core/models/interfaces/team';

interface ActorProjectsContainerProps {
  actors: Team[];
  actor: Team;
  projects: Project[];
}

const ActorProjectsContainer: React.FC<ActorProjectsContainerProps> = ({ actor, actors, projects }) => {
  const {
    height,
    ref,
    showHeader,
    isMobile,
    isFilterCollapsedOnMobile,
    handleToggleFilterOnMobile,
    statuses,
    activeStatuses,
    handleStatusChange,
    searchQuery,
    handleSearchChange,
    handleResetFilters,
    filteredProjects,
  } = useActorProjectsContainer(projects);

  return (
    <PageWrapper hasImageBackground>
      <SEOHead
        title={'MakerDAO Ecosystem Actors | Projects'}
        description={
          "MakerDAO Ecosystem Actors Projects page provides a comprehensive overview of Ecosystem Actor's" +
          ' ongoing work activities, their status, and progress.'
        }
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        canonicalURL={siteRoutes.ecosystemActorProjects(actor.shortCode)}
      />
      <ActorSummary actors={actors} showHeader={showHeader} ref={ref} trailingAddress={['Projects']} />
      <Container>
        <ContainerAllData marginTop={height}>
          <ContainerResponsive>
            <PageSubheader
              isMobile={isMobile}
              statuses={statuses}
              activeStatuses={activeStatuses}
              handleStatusChange={handleStatusChange}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              handleResetFilters={handleResetFilters}
              isFilterCollapsedOnMobile={isFilterCollapsedOnMobile}
              handleToggleFilterOnMobile={handleToggleFilterOnMobile}
            />

            <ProjectList projects={filteredProjects} />
          </ContainerResponsive>
        </ContainerAllData>
      </Container>
    </PageWrapper>
  );
};

export default ActorProjectsContainer;

const PageWrapper = styled(PageContainer)({
  paddingTop: 0,
});

const ContainerAllData = styled.div<{ marginTop: number }>(({ marginTop }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  zIndex: -1,
  marginTop,
}));

const ContainerResponsive = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 96,

  [lightTheme.breakpoints.down('desktop_1194')]: {
    width: '100%',
    marginTop: 100,
  },
});
