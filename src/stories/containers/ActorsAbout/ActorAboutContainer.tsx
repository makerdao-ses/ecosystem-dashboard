import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import CardExpenses from '@ses/components/NavigationCard/CardExpenses';
import CardSomethingWrong from '@ses/components/NavigationCard/CardSomethingWrong';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { getMarkdownInformation } from '@ses/core/businessLogic/coreUnitAbout';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { removeAtlasFromPath } from '@ses/core/utils/string';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import ActorMdViewer from './components/ActorMdViewer/ActorMdViewer';
import ActorSummary from './components/ActorSummary/ActorSummary';
import CardProjects from './components/CardProjects/CardProjects';
import useActorAbout from './useActorAbout';
import { removeDuplicateNames } from './utils';
import type { Team } from '@ses/core/models/interfaces/team';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  actors: Team[];
  actor: Team;
}

export const ActorAboutContainer: React.FC<Props> = ({ actors, actor }) => {
  const router = useRouter();
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();
  const ref = useRef<HTMLDivElement>(null);
  const { queryStrings, phone, LessPhone, table834 } = useActorAbout(router.query);

  const { height, showHeader } = useHeaderSummary(ref, router.query.code as string);
  const routeToFinances = removeAtlasFromPath(actor.budgetPath);
  const removeDuplicateNamesBudgetPath = removeDuplicateNames(routeToFinances);
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
        canonicalURL={siteRoutes.ecosystemActorAbout(actor.shortCode)}
      />
      <ActorSummary actors={actors} showHeader={showHeader} ref={ref} />
      <Container>
        <ContainerAllData marginTop={height}>
          <ContainerResponsive>
            <MarkdownContainer>
              <ActorMdViewer
                subTitle={`${actor.name}: Who we are`}
                code={actor.code}
                shortCode={actor.shortCode}
                actorName={actor.name}
                auditors={actor.auditors}
                showButton={table834 || phone || LessPhone}
                sentenceDescription={getMarkdownInformation(actor.sentenceDescription)}
                paragraphDescription={getMarkdownInformation(actor.paragraphDescription)}
                queryStrings={queryStrings}
                budgetPath={routeToFinances}
              />
            </MarkdownContainer>
            <WrapperCardSomethingWrongMobile>
              <CardSomethingWrong
                width={table834 || phone ? '770px' : 'fit-content'}
                title="Are you part of this Ecosystem Actor? "
                linkText="Join Powerhouse discord #dashboard-reporting channel"
              />
            </WrapperCardSomethingWrongMobile>
          </ContainerResponsive>
          <ContainerCardSomethingWrongDesk>
            <ContainerScroll>
              <ContainerCard>
                {isEnabled('FEATURE_TEAM_PROJECTS') && (
                  <CardProjects actorName={actor.name} shortCode={actor.shortCode} />
                )}
                <CardExpenses
                  showMakerburnLink={false}
                  resource={ResourceType.EcosystemActor}
                  queryStrings={queryStrings}
                  code={actor.code}
                  shortCode={actor.shortCode}
                  auditors={actor.auditors}
                  titleCard={`View all expenses of the ${actor.name} Ecosystem Actor.`}
                  auditorMessage={`${actor.name} is working without auditor.`}
                  makerburnCustomMessage={`View On-Chain transfers to ${actor.name} on makerburn.com`}
                  budgetPath={removeDuplicateNamesBudgetPath}
                />
              </ContainerCard>

              <ContainerCard>
                <CardSomethingWrong
                  title="Are you part of this Ecosystem Actor?"
                  linkText="Join Powerhouse discord #dashboard-reporting channel"
                />
              </ContainerCard>
            </ContainerScroll>
          </ContainerCardSomethingWrongDesk>
        </ContainerAllData>
      </Container>
    </PageWrapper>
  );
};

export default ActorAboutContainer;

const PageWrapper = styled(PageContainer)<WithIsLight>(({ isLight }) => ({
  backgroundImage: isLight ? '#FFFFFF' : 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 16, 32, 0.4) 100%)',
  paddingTop: 0,
}));

const MarkdownContainer = styled.div();

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

const ContainerScroll = styled.div({
  [lightTheme.breakpoints.up('desktop_1194')]: {
    position: 'sticky',
    height: 'fit-content',
    top: 322,
  },
});

const ContainerCard = styled.div({
  marginBottom: '32px',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '68px',
  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: '16px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: '64px',
  },
});

const ContainerAllData = styled.div<{ marginTop: number }>(({ marginTop }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  zIndex: -1,
  marginTop,
}));

const WrapperCardSomethingWrongMobile = styled.div({
  display: 'flex',
  marginTop: 48,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
});

const ContainerCardSomethingWrongDesk = styled.div({
  display: 'none',
  marginTop: 90,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    marginTop: 96,
    width: '39.61%',
  },
});
