import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { getMarkdownInformation } from '@ses/core/businessLogic/coreUnitAbout';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { removeAtlasFromPath } from '@ses/core/utils/string';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import CardExpenses from '../CUAbout/NavigationCard/CardExpenses';
import CardSomethingWrong from '../CUAbout/NavigationCard/CardSomethingWrong';
import ActorMdViewer from './components/ActorMdViewer/ActorMdViewer';
import ActorSummary from './components/ActorSummary/ActorSummary';
import CardProjects from './components/CardProjects/CardProjects';
import useEAAboutView from './useEAAboutView';
import { removeDuplicateNames } from './utils';
import type { Team } from '@ses/core/models/interfaces/team';

interface Props {
  actors: Team[];
  actor: Team;
}

export const EAAboutView: React.FC<Props> = ({ actors, actor }) => {
  // TODO: move all the logic to the hook
  const router = useRouter();
  const [isEnabled] = useFlagsActive();
  const ref = useRef<HTMLDivElement>(null);
  const { queryStrings, phone, LessPhone, table834 } = useEAAboutView(router.query);
  const { height, showHeader } = useHeaderSummary(ref, router.query.code as string);
  const routeToFinances = removeAtlasFromPath(actor.budgetPath);
  const removeDuplicateNamesBudgetPath = removeDuplicateNames(routeToFinances) ?? ' ';

  return (
    <PageContainer>
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
    </PageContainer>
  );
};

export default EAAboutView;

const MarkdownContainer = styled('div')();

const ContainerResponsive = styled('div')(({ theme }) => ({
  width: '60.39%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 96,

  [theme.breakpoints.down('desktop_1194')]: {
    width: '100%',
    marginTop: 100,
  },
}));

const ContainerScroll = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('desktop_1194')]: {
    position: 'sticky',
    height: 'fit-content',
    top: 322,
  },
}));

const ContainerCard = styled('div')(({ theme }) => ({
  marginBottom: 32,
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 68,

  [theme.breakpoints.up('table_834')]: {
    marginLeft: 16,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    marginLeft: 64,
  },
}));

const ContainerAllData = styled('div')<{ marginTop: number }>(({ marginTop }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  zIndex: -1,
  marginTop,
}));

const WrapperCardSomethingWrongMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: 48,

  [theme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
}));

const ContainerCardSomethingWrongDesk = styled('div')(({ theme }) => ({
  display: 'none',
  marginTop: 90,

  [theme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    marginTop: 96,
    width: '39.61%',
  },
}));
