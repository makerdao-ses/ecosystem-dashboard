import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { TablePlaceholder } from '@ses/components/CustomTable/TablePlaceholder';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ActorFilters from './components/ActorFilters/ActorFilters';
import ActorTable from './components/ActorTable/ActorTable';
import { useActors } from './useActors';
import type { Team } from '@ses/core/models/interfaces/team';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  actors: Team[];
  stories?: boolean;
}

const ActorsContainer: React.FC<Props> = ({ actors, stories = false }) => {
  const {
    readMore,
    handleRead,
    showTextDesk,
    isLessPhone,
    filtersActive,
    columns,
    categoriesCount,
    clearFilters,
    handleChangeUrlFilterArrays,
    filteredCategories,
    onSortClick,
    queryStrings,
    filteredScopes,
    scopeCount,
  } = useActors(actors, stories);

  const { isLight } = useThemeContext();

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
        <ContainerReadMore>
          <ReadMore onClick={handleRead} isLight={isLight}>
            {!readMore ? 'Read more' : 'Read less'}
          </ReadMore>
        </ContainerReadMore>

        <FilterContainer>
          <ActorFilters
            filteredScopes={filteredScopes}
            readMore={readMore}
            handleResetFilter={clearFilters}
            categoriesCount={categoriesCount}
            filteredCategories={filteredCategories}
            scopeCount={scopeCount}
            onChange={(value: string[]) => {
              handleChangeUrlFilterArrays('filteredCategories')(value);
            }}
            onChangeScope={(value: string[]) => {
              handleChangeUrlFilterArrays('filteredScopes')(value);
            }}
          />
        </FilterContainer>

        {filtersActive.length > 0 ? (
          <ContainerList>
            <ActorTable actors={filtersActive} columns={columns} sortClick={onSortClick} queryStrings={queryStrings} />
          </ContainerList>
        ) : (
          <TablePlaceholder description="There are no ecosystem actors available for this filter." />
        )}
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
  [lightTheme.breakpoints.up('tablet_768')]: {
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
  [lightTheme.breakpoints.up('tablet_768')]: {
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
  [lightTheme.breakpoints.up('tablet_768')]: {
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
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 0,
  },
});

const ContainerList = styled.div({
  marginBottom: 64,
  marginTop: -2,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 1,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 1,
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
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 18,
  },
});
const StyledParagraphThere = styled(StyledParagraph)({
  marginTop: 22,
  marginBottom: 0,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 20,
  },
});

const ReadMore = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 600,

  cursor: 'pointer',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 32,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 6,
    marginBottom: 30,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 16,
    marginBottom: 28,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 6,
    marginBottom: 30,
  },
  ':hover': {
    color: isLight ? 'rgba(35, 21, 54, 0.8)' : 'rgba(210, 212, 239, 0.8)',
  },
}));

const ContainerReadMore = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
});

const FilterContainer = styled.div({
  height: 34,
  marginBottom: 27,
  marginTop: -4,
  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 48,
    marginBottom: 34,
    marginTop: -1,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 26,
  },
});
