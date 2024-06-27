import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { getMarkdownInformation } from '@ses/core/businessLogic/coreUnitAbout';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { removeAtlasFromPath } from '@ses/core/utils/string';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import TeamBreadcrumbContent from '@/components/Breadcrumb/CustomContents/TeamBreadcrumbContent';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import TeamHeader from '@/components/TeamHeader/TeamHeader';
import CardExpenses from '../CoreUnitAbout/components/NavigationCard/CardExpenses';
import CardSomethingWrong from '../CoreUnitAbout/components/NavigationCard/CardSomethingWrong';
import ActorMdViewer from './components/ActorMdViewer/ActorMdViewer';
import CardProjects from './components/CardProjects/CardProjects';
import useEcosystemActorAboutView from './useEcosystemActorAboutView';
import { removeDuplicateNames } from './utils';
import type { Team } from '@ses/core/models/interfaces/team';

interface Props {
  actors: Team[];
  actor: Team;
}

export const EcosystemActorAboutView: React.FC<Props> = ({ actors, actor }) => {
  // TODO: move all the logic to the hook
  const [isEnabled] = useFlagsActive();
  const { queryStrings, phone, LessPhone, table834, pager } = useEcosystemActorAboutView(actors, actor);
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
      <BreadcrumbStyled
        items={[
          {
            label: 'Contributors',
            href: siteRoutes.contributors,
          },
          {
            label: 'Ecosystem Actors',
            href: siteRoutes.ecosystemActors,
            number: actors.length,
          },
          {
            label: actor.name,
            href: siteRoutes.ecosystemActorAbout(actor.shortCode),
          },
        ]}
        rightContent={
          <TeamBreadcrumbContent
            team={ResourceType.EcosystemActor}
            currentPage={pager.currentPage}
            totalPages={pager.totalPages}
            pagerProps={{
              hasNext: pager.hasNext,
              hasPrevious: pager.hasPrevious,
              onNext: pager.onNext,
              onPrevious: pager.onPrevious,
            }}
          />
        }
      />
      <TeamHeaderStyled team={actor} />

      <Container>
        <ContainerAllData>
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
                auditorTitle={`${actor.name} is working without auditor.`}
              />
            </MarkdownContainer>
            <WrapperCardSomethingWrongMobile>
              <CardSomethingWrong
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

              <SomethingWrongContainer>
                <CardSomethingWrong
                  title="Are you part of this Ecosystem Actor?"
                  linkText="Join Powerhouse discord #dashboard-reporting channel"
                />
              </SomethingWrongContainer>
            </ContainerScroll>
          </ContainerCardSomethingWrongDesk>
        </ContainerAllData>
      </Container>
    </PageContainer>
  );
};

export default EcosystemActorAboutView;

const MarkdownContainer = styled('div')();

const ContainerResponsive = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: 16,
  [theme.breakpoints.up('desktop_1024')]: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('desktop_1280')]: {
      width: 789,
    },
    [theme.breakpoints.up('desktop_1440')]: {
      width: 864,
    },
  },
}));

const ContainerScroll = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('desktop_1024')]: {
    position: 'sticky',
    height: 'fit-content',
    top: 16,
  },
}));

const ContainerCard = styled('div')(({ theme }) => ({
  gap: 24,
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    width: 340,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 386,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 379,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 416,
  },
}));

const ContainerAllData = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  zIndex: -1,
}));

const WrapperCardSomethingWrongMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: 48,
  '& > div': {
    width: '100%',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const ContainerCardSomethingWrongDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    marginTop: 16,
    marginLeft: 24,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    marginLeft: 32,
  },
}));

const SomethingWrongContainer = styled('div')(({ theme }) => ({
  gap: 32,
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 0,
  marginTop: 24,
  width: 340,
  [theme.breakpoints.up('desktop_1024')]: {
    width: 386,
    float: 'left',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 379,
    minWidth: 379,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 416,
    minWidth: 416,
  },
}));
const BreadcrumbStyled = styled(Breadcrumb)(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    top: 98,
  },
}));

const TeamHeaderStyled = styled(TeamHeader)({
  marginTop: 40,
});
