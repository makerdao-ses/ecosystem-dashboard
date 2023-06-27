import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ActorFilters from './components/ActorFilters/ActorFilters';
import { useActors } from './useActors';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  actors: EcosystemActor[];
  // only for stories
  stories?: boolean;
}

const ActorsContainer: React.FC<Props> = ({ actors, stories }) => {
  const {
    readMore,
    handleRead,
    showTextDesk,
    isLessPhone,
    selectElements,
    clearFilters,
    handleSelectChange,
    activeElements,
  } = useActors(actors, stories);

  const { isLight } = useThemeContext();

  console.log('actors', actors);
  return (
    <ExtendedPageContainer isLight={isLight}>
      <SEOHead
        title={'MakerDAO Ecosystem Actors | Endgame Overview'}
        description={
          'MakerDAO Ecosystem Actors provides a centralized directory of ecosystem actors and their roles for a clear understanding of who is involved in the ecosystem'
        }
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
      />
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
        <ReadMore onClick={handleRead}>{!readMore ? 'Read more' : 'Read less'}</ReadMore>
        <FilterContainer>
          <ActorFilters
            activeElements={activeElements}
            handleResetFilter={clearFilters}
            handleSelectChange={handleSelectChange}
            selectElements={selectElements}
            readMore={readMore}
          />
        </FilterContainer>
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
  color: isLight ? '#231536' : 'red',
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
  color: isLight ? '#231536' : 'red',
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
  color: isLight ? '#231536' : 'red',
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

const FilterContainer = styled.div({
  height: 34,
  marginBottom: 24,
  marginTop: -4,
  [lightTheme.breakpoints.up('table_834')]: {
    height: 48,
    marginBottom: 12,
    marginTop: -2,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 32,
    marginBottom: 32,
  },
});

const StyledParagraphOne = styled.p<{ readMore: boolean }>(({ readMore }) => ({
  width: 343,
  marginTop: -8,
  marginBottom: 8,
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

const ReadMore = styled.div({
  textAlign: 'end',
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 600,
  marginTop: 1,
  marginBottom: 32,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
});
