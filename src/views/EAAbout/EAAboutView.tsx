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
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import { SES_DASHBOARD, TYPE_FORM } from '@/core/utils/const';
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
                auditorTitle={`${actor.name} is working without auditor.`}
              />
            </MarkdownContainer>
            <WrapperCardSomethingWrongMobile>
              <CardSomethingWrong
                title="Are you part of this Ecosystem Actor? "
                linkText="Join Powerhouse discord #dashboard-reporting channel"
              >
                <ContainerLinks>
                  <LabelLinks>Important Links</LabelLinks>
                  <ContainerLinksButton>
                    <ButtonLinkStyled href={`${SES_DASHBOARD}`}>#dashboard-reporting channel</ButtonLinkStyled>
                    <ButtonLinkStyled href={`${TYPE_FORM}`}>Fill Typeform</ButtonLinkStyled>
                  </ContainerLinksButton>
                </ContainerLinks>
              </CardSomethingWrong>
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
                >
                  <ContainerLinks>
                    <LabelLinks>Important Links</LabelLinks>
                    <ContainerLinksButton>
                      <ButtonLinkStyled href={`${SES_DASHBOARD}`}>#dashboard-reporting channel</ButtonLinkStyled>
                      <ButtonLinkStyled href={`${TYPE_FORM}`}>Fill Typeform</ButtonLinkStyled>
                    </ContainerLinksButton>
                  </ContainerLinks>
                </CardSomethingWrong>
              </SomethingWrongContainer>
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
  width: '100%',
  marginTop: 24,

  [theme.breakpoints.up('desktop_1024')]: {
    width: '57.39%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32,

    justifyContent: 'space-between',

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
    top: 322,
  },
}));

const ContainerCard = styled('div')(({ theme }) => ({
  gap: 32,
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
    marginTop: 32,
  },
}));

const LabelLinks = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19.36px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.gray[50],
}));

const ContainerLinksButton = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const ButtonLinkStyled = styled(ExternalLinkButton)(() => ({
  padding: '4px 15px 4px 23px',
  height: 32,
  display: 'flex',

  alignItems: 'center',
  fontSize: 16,

  letterSpacing: '-0.32px',
  '& > div': {
    width: 23,
    height: 21,
  },
}));

const ContainerLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 12,
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 16,
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
}));

const SomethingWrongContainer = styled('div')(({ theme }) => ({
  gap: 32,
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 0,
  marginTop: 32,
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
