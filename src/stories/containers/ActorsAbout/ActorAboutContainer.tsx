import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';

import CardExpenses from '@ses/components/NavigationCard/CardExpenses';
import CardSomethingWrong from '@ses/components/NavigationCard/CardSomethingWrong';
import { getMarkdownInformation } from '@ses/core/businessLogic/coreUnitAbout';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { getShortCode } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import React from 'react';
import ActorMdViewer from './ActorMdViewer/ActorMdViewer';
import ActorSummary from './SummaryActor/ActorSummary';
import actorsMockData from './SummaryActor/moment';
import useActorAbout from './useActorAbout';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  actors: EcosystemActor[];
  actor: EcosystemActor;
  code: string;
}

export const ActorAboutContainer: React.FC<Props> = ({ actors, actor, code }) => {
  const router = useRouter();
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();
  const table834 = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const phone = useMediaQuery(lightTheme.breakpoints.between('table_375', 833));
  const LessPhone = useMediaQuery(lightTheme.breakpoints.down('table_375'));
  const { queryStrings } = useActorAbout({
    router,
    code,
  });
  console.log('actors', actor.paragraphDescription);
  return (
    <PageWrapper isLight={isLight}>
      <ActorSummary actors={actors} showDescription={true} />
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
                paragraphDescription={getMarkdownInformation(actorsMockData[0].paragraphDescription)}
                queryStrings={queryStrings}
              />
            </MarkdownContainer>

            {(table834 || phone || LessPhone) && isEnabled('FEATURE_CARD_NAVIGATION_ACTOR_ABOUT_PAGE') && (
              <CardSomethingWrong width={table834 || phone ? '770px' : 'fit-content'} />
            )}
          </ContainerResponsive>
          {!(table834 || phone || LessPhone) && (
            <div
              style={{
                width: '39.61%',
              }}
            >
              <ContainerScroll>
                {isEnabled('FEATURE_CARD_NAVIGATION_ACTOR_ABOUT_PAGE') && (
                  <ContainerCard>
                    <CardExpenses
                      isCoreUnit={false}
                      queryStrings={queryStrings}
                      code={actor.code}
                      auditors={actor.auditors}
                      titleCard={`View all expenses of the ${getShortCode(code)} Ecosystem Actor`}
                      auditorMessage={`The ${getShortCode(code)} Ecosystem Actor is currently working without auditor`}
                    />
                  </ContainerCard>
                )}
                {!(table834 || phone || LessPhone) && (
                  <ContainerCard>
                    <CardSomethingWrong />
                  </ContainerCard>
                )}
              </ContainerScroll>
            </div>
          )}
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

const MarkdownContainer = styled.div({
  // marginTop: '32px',
});

const ContainerResponsive = styled.div({
  marginTop: 100,
  // marginTop: 32,
  width: '60.39%',
  display: 'flex',
  flexDirection: 'column',

  // [lightTheme.breakpoints.down('table_834')]: {
  //   marginTop: 37,
  // },
  [lightTheme.breakpoints.down('desktop_1194')]: {
    width: '100%',
    // marginTop: 32,
  },
});

const ContainerScroll = styled.div({
  position: 'sticky',
  top: 320,

  // top: 250,

  // paddingTop: '34px',
  // paddingTop: '64px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    position: 'relative',
    top: 0,
  },
});

const ContainerCard = styled.div({
  marginBottom: '32px',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '68px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginLeft: '16px',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    marginLeft: '32px',
  },
});

const ContainerAllData = styled.div({
  maxWidth: '100%',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});
