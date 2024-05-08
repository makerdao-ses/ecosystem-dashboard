import styled from '@emotion/styled';
import { Divider, useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import lightTheme from '../../../../styles/theme/themes';
import { getMarkdownInformation } from '../../../core/businessLogic/coreUnitAbout';
import { getFTEsFromCoreUnit } from '../../../core/businessLogic/coreUnits';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { toAbsoluteURL } from '../../../core/utils/urls';
import BigButton from '../../components/Button/BigButton/BigButton';
import CardInfoMember from '../../components/CardInfoMember/CardInfoMember';
import { CoreUnitSummary } from '../../components/CoreUnitSummary/CoreUnitSummary';
import MdViewerContainer from '../../components/Markdown/MdViewerContainer';
import CardExpenses from '../../components/NavigationCard/CardExpenses';
import CardSomethingWrong from '../../components/NavigationCard/CardSomethingWrong';
import RelateMips from '../../components/RelateMips/RelateMips';
import { SEOHead } from '../../components/SEOHead/SEOHead';
import TeamMember from '../../components/TeamMember/TeamMember';
import { useCuAbout } from './useCuAbout';
import type { ContributorCommitment } from '@ses/core/models/interfaces/contributor';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { CuMip } from '@ses/core/models/interfaces/cuMip';

interface Props {
  coreUnits: CoreUnit[];
  cuAbout: CoreUnit;
  code: string;
}

const CuAboutContainer = ({ code, coreUnits, cuAbout }: Props) => {
  const router = useRouter();

  const { isLight } = useThemeContext();
  const [showThreeMIPs, setShowThreeMIPs] = useState<boolean>(true);

  const table834 = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const phone = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'table_834'));
  const LessPhone = useMediaQuery(lightTheme.breakpoints.down('mobile_375'));
  const lessDesktop1194 = useMediaQuery(lightTheme.breakpoints.down('desktop_1194'));

  const { onClickLessMips, relateMipsOrder, hasMipsNotAccepted, queryStrings, ref } = useCuAbout({
    cuAbout,
    code,
    router,
    showThreeMIPs,
    setShowThreeMIPs,
  });
  const { height, showHeader } = useHeaderSummary(ref, router.query.code as string);

  return (
    <ContainerAbout isLight={isLight}>
      <SEOHead
        title={`About ${cuAbout.name} Core Unit at MakerDAO`}
        description={`Learn about the ${cuAbout.name} Core Unit at MakerDAO: their mandate, vision, mission, strategy, and more.`}
        image={cuAbout.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={cuAbout.image ? 'summary' : 'summary_large_image'}
        canonicalURL={siteRoutes.coreUnitAbout(code)}
      />

      <CoreUnitSummary coreUnits={coreUnits} showDescription={true} ref={ref} showHeader={showHeader} />
      <Wrapper>
        <ContainerAllData marginTop={height}>
          <ContainerResponsive>
            <MarkdownContainer>
              <MdViewerContainer
                code={cuAbout.code}
                shortCode={cuAbout.shortCode}
                auditors={cuAbout.auditors}
                showButton={table834 || phone || LessPhone}
                sentenceDescription={getMarkdownInformation(cuAbout.sentenceDescription)}
                paragraphDescription={getMarkdownInformation(cuAbout.paragraphDescription)}
                paragraphImage={getMarkdownInformation(cuAbout.paragraphImage)}
                queryStrings={queryStrings}
              />
            </MarkdownContainer>
            <TeamMemberContainer>
              <TeamMemberTitle isLight={isLight}>Team Size</TeamMemberTitle>
              <TeamMember ftes={getFTEsFromCoreUnit(cuAbout)} />
            </TeamMemberContainer>
            {cuAbout.contributorCommitment.length > 0 && (
              <ContactInfoContainer>
                <ContactInfoTitle isLight={isLight}>Contact Information</ContactInfoTitle>
                <ContainerCards>
                  {cuAbout &&
                    cuAbout.contributorCommitment?.map((contributor: ContributorCommitment, index: number) => (
                      <CardInfoContainer key={index}>
                        <CardInfoMember contributorCommitment={contributor} />
                      </CardInfoContainer>
                    ))}
                </ContainerCards>
              </ContactInfoContainer>
            )}
            <Divider
              sx={{
                bgcolor: isLight ? '#D4D9E1' : '#405361',
                marginTop: !(cuAbout.contributorCommitment.length > 0) ? '32px' : '0px',
              }}
            />
            <CardRelateMipsContainer>
              <TitleRelateMips isLight={isLight}>Related MIPs (Maker Improvement Proposals)</TitleRelateMips>
              <RelateMipCards>
                {relateMipsOrder.map((mip: unknown, index: number) => (
                  <RelateMipCard key={index}>
                    <RelateMips relateMips={mip as CuMip} />
                  </RelateMipCard>
                ))}
                {cuAbout?.cuMip?.length === 0 && (
                  <ContainerNoRelateMIps>There are not related MIPs</ContainerNoRelateMIps>
                )}
              </RelateMipCards>
            </CardRelateMipsContainer>
            {hasMipsNotAccepted && (
              <ButtonContainer>
                <DividerStyle
                  sx={{
                    bgcolor: isLight ? '#D4D9E1' : '#405361',
                  }}
                />{' '}
                <BigButton
                  title={showThreeMIPs ? 'See more related MIPs' : 'See fewer MIPs'}
                  onClick={onClickLessMips}
                />
                <DividerStyle
                  sx={{
                    bgcolor: isLight ? '#D4D9E1' : '#405361',
                  }}
                />
              </ButtonContainer>
            )}
            {!hasMipsNotAccepted && lessDesktop1194 && (
              <ButtonContainer>
                <DividerStyle
                  sx={{
                    bgcolor: isLight ? '#D4D9E1' : '#405361',
                  }}
                />
              </ButtonContainer>
            )}
            {(table834 || phone || LessPhone) && (
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
                <ContainerCard>
                  <CardExpenses
                    queryStrings={queryStrings}
                    code={cuAbout.code}
                    shortCode={cuAbout.shortCode}
                    auditors={cuAbout.auditors}
                  />
                </ContainerCard>
                {!(table834 || phone || LessPhone) && (
                  <ContainerCard>
                    <CardSomethingWrong />
                  </ContainerCard>
                )}
              </ContainerScroll>
            </div>
          )}
        </ContainerAllData>
      </Wrapper>
    </ContainerAbout>
  );
};

export default CuAboutContainer;

const ContainerAbout = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '64px',
  width: '100%',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingBottom: '128px',
  [lightTheme.breakpoints.down('mobile_375')]: {
    width: '100%',
    minWidth: '360px',
  },
}));

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

const MarkdownContainer = styled.div({
  marginTop: '32px',
});
const TeamMemberContainer = styled.div({
  display: 'flex',
  justifyContent: 'row',
  alignItems: 'center',
  marginTop: '32px',
});

const TeamMemberTitle = styled.h2<{ isLight: boolean }>(({ isLight }) => ({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '19px',
  marginRight: '8px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 0,
  marginBottom: 0,
  fontFamily: 'Inter, sans-serif',
  [lightTheme.breakpoints.down('table_834')]: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: 700,
  },
  [lightTheme.breakpoints.between(835, 'desktop_1194')]: {
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0.4px',
  },
}));

const ContactInfoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '182px',
  marginTop: '32px',
});

const ContactInfoTitle = styled.h2<{ isLight: boolean }>(({ isLight }) => ({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 0,
  marginBottom: '32px',
  fontFamily: 'Inter, sans-serif',
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
  },
}));

const ContainerCards = styled.div({
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '715px',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  padding: '0px',
  marginBottom: '32px',
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    flexDirection: 'row',
    minWidth: '100%',
  },
  [lightTheme.breakpoints.down('mobile_375')]: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const CardRelateMipsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '40px',
  marginBottom: '40px',
  width: '715px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: '100%',
  },
  [lightTheme.breakpoints.between('mobile_375', 835)]: {
    width: '100%',
  },
  [lightTheme.breakpoints.down('mobile_375')]: {
    width: '100%',
  },
});

const TitleRelateMips = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  marginBottom: '32px',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('table_834')]: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19.2px',
  },
}));

const RelateMipCards = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const RelateMipCard = styled.div({
  marginBottom: '24px',
});

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',

  [lightTheme.breakpoints.down('desktop_1194')]: {
    marginBottom: '32px',
  },
});

const ContainerNoRelateMIps = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const ContainerAllData = styled.div<{ marginTop: number }>(({ marginTop }) => ({
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginRight: '64px',
  marginLeft: '64px',
  marginTop,
  [lightTheme.breakpoints.up('desktop_1920')]: {
    marginRight: '0px',
    marginLeft: '0px',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    marginRight: '48px',
    marginLeft: '48px',
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1280')]: {
    marginRight: '32px',
    marginLeft: '32px',
  },
  [lightTheme.breakpoints.down('table_834')]: {
    marginRight: '16px',
    marginLeft: '16px',
  },
}));

export const DividerStyle = styled(Divider)({
  width: '100%',
});

const ContainerScroll = styled.div({
  position: 'sticky',
  top: 250,
  paddingTop: '34px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    position: 'relative',
    top: 0,
  },
});

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',

  [lightTheme.breakpoints.up('desktop_1920')]: {
    maxWidth: '1312px',
    marginLeft: '0px',
    marginRight: '0px',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    marginRight: '0px',
    marginLeft: '0px',
  },
  [lightTheme.breakpoints.down('mobile_375')]: {
    width: '100%',
  },
});

const ContainerResponsive = styled.div({
  width: '60.39%',
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.down('desktop_1194')]: {
    width: '100%',
  },
});

const CardInfoContainer = styled.div({
  marginBottom: '32px',
  [lightTheme.breakpoints.down('mobile_375')]: {
    width: '100%',
  },
});
