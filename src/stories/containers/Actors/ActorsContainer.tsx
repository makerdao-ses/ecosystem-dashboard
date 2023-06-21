import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  actors: EcosystemActor[];
}

const ActorsContainer: React.FC<Props> = ({ actors }) => {
  // TODO:delete this commit when implement
  console.log(actors);
  const { isLight } = useThemeContext();
  return (
    <ExtendedPageContainer isLight={isLight}>
      <Container>
        <ContainerText>
          <Title isLight={isLight}>Ecosystem Actors</Title>
          <SubTitle isLight={isLight}>What are Ecosystem Actors? </SubTitle>
          <Description isLight={isLight}>
            Ecosystem Actors serve as external entities offering valuable services to both Maker Core and SubDAOs. These
            actors are further classified into two categories: Advisory Ecosystem Actors and Active Ecosystem Actors.
            Active Ecosystem Actors work according to the specifications of Scope Alignment Artifacts to receive funding
            for performing specific projects such as developing new features, data collection, marketing, growth, and
            other operational activities that benefit the Maker Ecosystem. In contrast, Advisory Council Member
            Ecosystem Actors engage in research and offer guidance to the DAO, contributing to the refinement of Scopes
            Artifacts and their underlying procedures.
          </Description>
        </ContainerText>
        <div>Filter</div>
        <div>List of Actores</div>
      </Container>
    </ExtendedPageContainer>
  );
};

export default ActorsContainer;

const ExtendedPageContainer = styled(PageContainer)<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
}));

const Title = styled.h1<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: ' normal',
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  letterSpacing: '0.4px',
  marginTop: 0,
  marginBottom: 0,
  color: isLight ? '#231536' : 'red',
}));

const SubTitle = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: ' normal',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '19px',
  color: isLight ? '#231536' : 'red',
}));

const Description = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: ' normal',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  color: isLight ? '#231536' : 'red',
}));

const ContainerText = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 24,
  marginBottom: 32,
});
