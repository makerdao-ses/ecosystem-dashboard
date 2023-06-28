import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ActorTable from './components/ActorTable/ActorTable';
import { useActors } from './useActors';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  actors: EcosystemActor[];
  stories?: boolean;
}

const ActorsContainer: React.FC<Props> = ({ actors, stories = false }) => {
  const { readMore, handleRead, showTextDesk, isLessPhone, filtersActive } = useActors(actors, stories);

  const { isLight } = useThemeContext();

  return (
    <ExtendedPageContainer isLight={isLight}>
      <Container>
        <ContainerText>
          <Title isLight={isLight}>Ecosystem Actors</Title>
          <SubTitle isLight={isLight}>What are Ecosystem Actors? </SubTitle>
          <Description isLight={isLight}>
            <StyledParagraphOne readMore={readMore}>
              Ecosystem Actors serve as external entities offering valuable services to both Maker Core and SubDAOs.
              {!showTextDesk && isLessPhone && <br />}
              <span>
                These actors are further classified into two categories: Advisory Ecosystem Actors and Active Ecosystem
                Actors.
              </span>
            </StyledParagraphOne>
            {showTextDesk && (
              <StyledParagraph>
                Active Ecosystem Actors work according to the specifications of Scope Alignment Artifacts to receive
                funding for performing specific projects such as developing new features, data collection, marketing,
                growth, and other operational activities that benefit the Maker Ecosystem.
              </StyledParagraph>
            )}
            {showTextDesk && (
              <StyledParagraphThere>
                In contrast, Advisory Council Member Ecosystem Actors engage in research and offer guidance to the DAO,
                contributing to the refinement of Scopes Artifacts and their underlying procedures.
              </StyledParagraphThere>
            )}
          </Description>
        </ContainerText>
        <ContainerReadMore>
          <ReadMore onClick={handleRead} isLight={isLight}>
            {!readMore ? 'Read more' : 'Read less'}
          </ReadMore>
        </ContainerReadMore>
        <ContainerList>
          <ActorTable actors={filtersActive} />
        </ContainerList>
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
  fontSize: 20,
  lineHeight: '24px',
  letterSpacing: '0.4px',
  marginTop: 0,
  marginBottom: 0,
  color: isLight ? '#231536' : '#D2D4EF',
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 24,
    lineHeight: '29px',
  },
}));

const SubTitle = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: ' normal',
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
}));

const Description = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: ' normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '22px',
    marginTop: 0,
  },
}));

const ContainerText = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 24,
  marginBottom: 8,
  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 6,
  },
});

const ContainerList = styled.div({
  marginBottom: 64,
  // TODO:Remove this margin when add filter
  marginTop: 32,
});

const StyledParagraphOne = styled.p<{ readMore: boolean }>(({ readMore }) => ({
  width: 343,
  marginTop: 0,
  marginBottom: 0,
  display: !readMore ? '-webkit-box' : 'unset',
  overflow: 'hidden',
  WebkitLineClamp: !readMore ? 3 : 'unset',
  WebkitBoxOrient: !readMore ? 'vertical' : 'unset',
  '> span': {
    marginLeft: 4,
  },
  [lightTheme.breakpoints.up(376)]: {
    marginTop: 0,
    marginBottom: 0,
    display: 'inline-block',
    WebkitLineClamp: 'unset',
    width: '100%',
  },
}));

const StyledParagraph = styled.p({
  marginTop: 22,
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 18,
  },
});
const StyledParagraphThere = styled(StyledParagraph)({
  marginTop: 22,
  marginBottom: 0,
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 20,
  },
});

const ReadMore = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 32,
  cursor: 'pointer',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const ContainerReadMore = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
});
