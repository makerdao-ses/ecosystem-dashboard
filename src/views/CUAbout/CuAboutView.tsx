import { Divider, styled, useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { removeAtlasFromPath } from '@ses/core/utils/string';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getMarkdownInformation } from '@/core/businessLogic/coreUnitAbout';
import { getFTEsFromCoreUnit } from '@/core/businessLogic/coreUnits';
import { useThemeContext } from '@/core/context/ThemeContext';
import { ResourceType } from '@/core/models/interfaces/types';
import { toAbsoluteURL } from '@/core/utils/urls';
import CardInfoMember from '@/stories/components/CardInfoMember/CardInfoMember';
import { CoreUnitSummary } from '@/stories/components/CoreUnitSummary/CoreUnitSummary';
import { SEOHead } from '@/stories/components/SEOHead/SEOHead';
import TeamMember from '@/stories/components/TeamMember/TeamMember';
import MdViewerContainer from '@/views/CUAbout/Markdown/MdViewerContainer';
import BigButton from './Button/BigButton/BigButton';
import CardExpenses from './NavigationCard/CardExpenses';
import CardSomethingWrong from './NavigationCard/CardSomethingWrong';
import RelateMips from './RelateMips/RelateMips';
import { useCuAboutView } from './useCuAboutView';
import type { Theme } from '@mui/material';
import type { ContributorCommitment } from '@ses/core/models/interfaces/contributor';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { CuMip } from '@ses/core/models/interfaces/cuMip';

interface Props {
  coreUnits: CoreUnit[];
  cuAbout: CoreUnit;
  code: string;
}

const CuAboutView = ({ code, coreUnits, cuAbout }: Props) => {
  const router = useRouter();

  const { isLight } = useThemeContext();
  const [showThreeMIPs, setShowThreeMIPs] = useState<boolean>(true);

  const table768 = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const phone = useMediaQuery((theme: Theme) => theme.breakpoints.between('mobile_375', 'tablet_768'));
  const LessPhone = useMediaQuery((theme: Theme) => theme.breakpoints.down('mobile_375'));
  const lessDesktop1194 = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));

  const { onClickLessMips, relateMipsOrder, hasMipsNotAccepted, queryStrings, ref } = useCuAboutView({
    cuAbout,
    code,
    router,
    showThreeMIPs,
    setShowThreeMIPs,
  });
  const { height, showHeader } = useHeaderSummary(ref, router.query.code as string);
  const routeToFinances = removeAtlasFromPath(cuAbout.budgetPath);

  return (
    <ContainerAbout>
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
                type={ResourceType.CoreUnit}
                code={cuAbout.code}
                shortCode={cuAbout.shortCode}
                auditors={cuAbout.auditors}
                showButton={table768 || phone || LessPhone}
                sentenceDescription={getMarkdownInformation(cuAbout.sentenceDescription)}
                paragraphDescription={getMarkdownInformation(cuAbout.paragraphDescription)}
                paragraphImage={getMarkdownInformation(cuAbout.paragraphImage)}
                queryStrings={queryStrings}
                budgetPath={routeToFinances}
              />
            </MarkdownContainer>
            <TeamMemberContainer>
              <TeamMemberTitle>Team Size</TeamMemberTitle>
              <TeamMember ftes={getFTEsFromCoreUnit(cuAbout)} />
            </TeamMemberContainer>
            {cuAbout.contributorCommitment.length > 0 && (
              <ContactInfoContainer>
                <ContactInfoTitle>Contact Information</ContactInfoTitle>
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
                bgcolor: (theme) => (theme.palette.isLight ? '#D8E0E3' : theme.palette.colors.charcoal[800]),
                marginTop: !(cuAbout.contributorCommitment.length > 0) ? '32px' : '0px',
              }}
            />
            <CardRelateMipsContainer>
              <TitleRelateMips>Related MIPs (Maker Improvement Proposals)</TitleRelateMips>
              <RelateMipCards>
                {relateMipsOrder.map((mip: unknown, index: number) => (
                  <RelateMips relateMips={mip as CuMip} key={index} />
                ))}
                {cuAbout?.cuMip?.length === 0 && (
                  <ContainerNoRelateMIps>There are not related MIPs</ContainerNoRelateMIps>
                )}
              </RelateMipCards>
            </CardRelateMipsContainer>
            {hasMipsNotAccepted && (
              <ButtonContainer>
                <LineStyledBorder />
                <BigButton
                  title={showThreeMIPs ? 'See more related MIPs' : 'See fewer MIPs'}
                  onClick={onClickLessMips}
                />
                <LineStyledBorder />
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
            {(table768 || phone || LessPhone) && (
              <CardSomethingWrong width={table768 || phone ? '770px' : 'fit-content'} />
            )}
          </ContainerResponsive>
          {!(phone || LessPhone) && (
            <ContainerCardTableDesk>
              <ContainerScroll>
                <ContainerCard>
                  <CardExpenses
                    queryStrings={queryStrings}
                    code={cuAbout.code}
                    shortCode={cuAbout.shortCode}
                    auditors={cuAbout.auditors}
                    budgetPath={routeToFinances}
                  />
                </ContainerCard>
                {!(phone || LessPhone) && (
                  <ContainerCard>
                    <CardSomethingWrong />
                  </ContainerCard>
                )}
              </ContainerScroll>
            </ContainerCardTableDesk>
          )}
        </ContainerAllData>
      </Wrapper>
    </ContainerAbout>
  );
};

export default CuAboutView;

const ContainerAbout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '64px',
  width: '100%',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.background.dm,
  backgroundImage: theme.palette.isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingBottom: '128px',
  [theme.breakpoints.down('mobile_375')]: {
    width: '100%',
    minWidth: '360px',
  },
}));

const ContainerCard = styled('div')(({ theme }) => ({
  marginBottom: '32px',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '68px',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginLeft: '16px',
  },
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    marginLeft: '32px',
  },
}));

const MarkdownContainer = styled('div')({
  marginTop: '32px',
});
const TeamMemberContainer = styled('div')({
  display: 'flex',
  justifyContent: 'row',
  alignItems: 'center',
  marginTop: '32px',
});

const TeamMemberTitle = styled('h2')(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 18,
  lineHeight: '21.6px',
  marginRight: '8px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  marginTop: 0,
  marginBottom: 0,
  fontFamily: 'Inter, sans-serif',
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const ContactInfoContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '182px',
  marginTop: '32px',
});

const ContactInfoTitle = styled('h2')(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  marginTop: 0,
  marginBottom: '32px',
  fontFamily: 'Inter, sans-serif',
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
  },
}));

const ContainerCards = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '715px',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  padding: '0px',
  marginBottom: '32px',
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    flexDirection: 'row',
    minWidth: '100%',
  },
  [theme.breakpoints.down('mobile_375')]: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const CardRelateMipsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '40px',
  marginBottom: '40px',
  gap: 16,
  [theme.breakpoints.up('mobile_375')]: {
    width: '100%',
  },
}));

const TitleRelateMips = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',

  fontSize: 14,
  fontWeight: 700,
  lineHeight: '16.94px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '19.36px',
  },
}));

const RelateMipCards = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    width: 640,
  },
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('desktop_1024')]: {
    marginBottom: '32px',
  },
  ':hover': {
    '& > div:nth-of-type(1) , div:nth-of-type(2)': {
      borderTop: `1px solid ${
        theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
      }`,
    },
    '& > button': {
      background: 'none',
      border: `1px solid ${
        theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
      }`,
      color: theme.palette.isLight ? theme.palette.colors.slate[300] : theme.palette.colors.charcoal[600],
    },
  },
}));

const ContainerNoRelateMIps = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const ContainerAllData = styled('div')<{ marginTop: number }>(({ marginTop, theme }) => ({
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginRight: '64px',
  marginLeft: '64px',
  marginTop,
  [theme.breakpoints.up('desktop_1920')]: {
    marginRight: '0px',
    marginLeft: '0px',
  },
  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    marginRight: '48px',
    marginLeft: '48px',
  },
  [theme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    marginRight: '32px',
    marginLeft: '32px',
  },
  [theme.breakpoints.down('tablet_768')]: {
    marginRight: '16px',
    marginLeft: '16px',
  },
}));

export const DividerStyle = styled(Divider)({
  width: '100%',
});

const ContainerScroll = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: 250,
  paddingTop: '34px',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    position: 'relative',
    top: 0,
  },
}));

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',

  [theme.breakpoints.up('desktop_1920')]: {
    maxWidth: '1312px',
    marginLeft: '0px',
    marginRight: '0px',
    margin: '0 auto',
  },
  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    marginRight: '0px',
    marginLeft: '0px',
  },
  [theme.breakpoints.down('mobile_375')]: {
    width: '100%',
  },
}));

const ContainerResponsive = styled('div')(({ theme }) => ({
  width: '60.39%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('tablet_768')]: {
    width: '100%',
  },
}));

const CardInfoContainer = styled('div')(({ theme }) => ({
  marginBottom: '32px',
  [theme.breakpoints.down('mobile_375')]: {
    width: '100%',
  },
}));

const ContainerCardTableDesk = styled('div')(() => ({
  width: '39.61%',
}));

const LineStyledBorder = styled('div')(({ theme }) => ({
  display: 'flex',
  borderTop: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
}));
