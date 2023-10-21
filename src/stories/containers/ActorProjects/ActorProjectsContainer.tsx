import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ActorSummary from '../ActorsAbout/components/ActorSummary/ActorSummary';
import useActorProjectsContainer from './useActorProjectsContainer';
import type { Team } from '@ses/core/models/interfaces/team';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ActorProjectsContainerProps {
  actors: Team[];
  actor: Team;
}

const ActorProjectsContainer: React.FC<ActorProjectsContainerProps> = ({ actor, actors }) => {
  const { height, isLight, ref, showHeader } = useActorProjectsContainer();

  return (
    <PageWrapper isLight={isLight}>
      <SEOHead
        title={`About ${actor.name} Ecosystem Actor at MakerDAO`}
        description={`Learn about the ${actor.name} Ecosystem Actor at MakerDAO: their mandate, scope, vision, strategy, and more.`}
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
          <ContainerResponsive>Projects</ContainerResponsive>
        </ContainerAllData>
      </Container>
    </PageWrapper>
  );
};

export default ActorProjectsContainer;

const PageWrapper = styled(PageContainer)<WithIsLight>(({ isLight }) => ({
  backgroundImage: isLight ? '#FFFFFF' : 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 16, 32, 0.4) 100%)',
  paddingTop: 0,
}));

const ContainerAllData = styled.div<{ marginTop: number }>(({ marginTop }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  zIndex: -1,
  marginTop,
}));

const ContainerResponsive = styled.div({
  width: '60.39%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 96,

  [lightTheme.breakpoints.down('desktop_1194')]: {
    width: '100%',
    marginTop: 100,
  },
});
