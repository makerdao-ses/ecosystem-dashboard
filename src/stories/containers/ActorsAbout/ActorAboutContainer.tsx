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
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import React from 'react';
import ActorMdViewer from './ActorMdViewer/ActorMdViewer';
import ActorSummary from './ActorSummary/ActorSummary';
import useActorAbout from './useActorAbout';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  actors: EcosystemActor[];
  actor: EcosystemActor;
}

export const ActorAboutContainer: React.FC<Props> = ({ actors, actor }) => {
  const router = useRouter();
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();

  const { queryStrings, phone, LessPhone, table834 } = useActorAbout(router.query);

  return (
    <PageWrapper isLight={isLight}>
      <SEOHead
        title={`About ${actor.name} Ecosystem Actor at MakerDAO`}
        description={` Learn about the ${actor.name} Ecosystem Actor at MakerDAO: their mandate, scope, vision, strategy, and more.`}
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
        canonicalURL={siteRoutes.ecosystemActorAbout(actor.shortCode)}
      />
      <ActorSummary actors={actors} cutTextTooLong={actor.name.length > 20} />
      <Container>
        <ContainerAllData>
          <ContainerResponsive>
            <MarkdownContainer>
              <ActorMdViewer
                subTitle={`${actor.name}: Who we are`}
                code={actor.code}
                auditors={actor.auditors}
                showButton={table834 || phone || LessPhone}
                sentenceDescription={getMarkdownInformation(actor.sentenceDescription)}
                paragraphDescription={getMarkdownInformation(actor.paragraphDescription)}
                queryStrings={queryStrings}
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
              {isEnabled('FEATURE_CARD_NAVIGATION_ACTOR_ABOUT_PAGE') && (
                <ContainerCard>
                  <CardExpenses
                    isCoreUnit={false}
                    queryStrings={queryStrings}
                    code={actor.code}
                    auditors={actor.auditors}
                    titleCard={`View all expenses of the ${actor.shortCode} Ecosystem Actor`}
                    auditorMessage={`The ${actor.shortCode} Ecosystem Actor is currently working without auditor`}
                  />
                </ContainerCard>
              )}

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
  marginTop: 100,

  width: '60.39%',
  display: 'flex',
  flexDirection: 'column',

  [lightTheme.breakpoints.down('desktop_1194')]: {
    width: '100%',
  },
});

const ContainerScroll = styled.div({
  position: 'sticky',
  top: 320,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    top: 322,
    marginTop: 100,
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

const ContainerAllData = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const WrapperCardSomethingWrongMobile = styled.div({
  display: 'flex',
  marginTop: 48,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
});

const ContainerCardSomethingWrongDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    width: '39.61%',
  },
});
