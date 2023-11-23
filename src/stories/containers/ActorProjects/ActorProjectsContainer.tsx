import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import Information from '@ses/components/svg/information';
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
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ActorProjectsContainerProps {
  actors: Team[];
  actor: Team;
  projects: Project[];
}

const ActorProjectsContainer: React.FC<ActorProjectsContainerProps> = ({ actor, actors, projects }) => {
  const {
    isLight,
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
    filteredSupporterProjects,
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

            {/* TODO: instead of `projects.length` it should be `supportedProjects.length` once it is integrated with the API */}
            {(filteredProjects.length > 0 || filteredSupporterProjects.length > 0) && projects.length > 0 && (
              <>
                <SupportedProjects isLight={isLight}>
                  <span>Projects supported by {actor.name}</span>
                  <SESTooltip
                    content="Contributory Projects: This highlights the ecosystem actor's role as a contributor rather than the primary owner."
                    enterTouchDelay={0}
                    leaveTouchDelay={15000}
                    placement="bottom-start"
                    fallbackPlacements={['bottom-end']}
                  >
                    <IconContainer>
                      <Information />
                    </IconContainer>
                  </SESTooltip>
                </SupportedProjects>

                <ProjectList projects={filteredSupporterProjects} isSupportedProjects />
              </>
            )}
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

const SupportedProjects = styled.h2<WithIsLight>(({ isLight }) => ({
  margin: '32px 0 16px',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,
  color: isLight ? '#231536' : '#D2D4EF',
  display: 'flex',
  justifyContent: 'space-between',

  '& .MuiTooltip-tooltip': {
    marginLeft: 0,
    marginRight: 0,
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    justifyContent: 'normal',
    alignItems: 'flex-end',
    gap: 8,
    fontSize: 24,
    margin: '56px 0 32px',
  },
}));

const IconContainer = styled.span({
  cursor: 'pointer',
  padding: 4.5,
  width: 24,
  height: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
