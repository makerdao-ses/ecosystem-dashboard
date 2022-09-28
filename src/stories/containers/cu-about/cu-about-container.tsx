import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Divider, useMediaQuery } from '@mui/material';
import { getMarkdownInformation, getRelateMipObjectFromCoreUnit } from '../../../core/business-logic/core-unit-about';
import { getFTEsFromCoreUnit } from '../../../core/business-logic/core-units';
import { getArrayParam, getStringParam } from '../../../core/utils/filters';
import BigButton from '../../components/button/big-button/big-button';
import CardInfoMember from '../../components/card-info-member/card-info-member';
import RelateMips from '../../components/relate-mips/relate-mips';
import TeamMember from '../../components/team-members/team-member';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { CoreUnitSummary } from '../../components/core-unit-summary/core-unit-summary';
import CardExpenses from '../../components/card-navegation/card-expenses';
import CardSomeThingWrong from '../../components/card-navegation/card-somethig-wrong';
import lightTheme from '../../../../styles/theme/light';
import { useFlagsActive } from '../../../core/hooks/useFlagsActive';
import { getShortCode } from '../../../core/utils/string.utils';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SEOHead } from '../../components/seo-head/seo-head';
import { buildQueryString, toAbsoluteURL } from '../../../core/utils/url.utils';
import MdViewerContainer from '../../components/markdown/md-view-container';
import { ContributorCommitmentDto, CoreUnitDto, CuMipDto } from '../../../core/models/dto/core-unit.dto';
interface Props {
  coreUnits: CoreUnitDto[];
  cuAbout: CoreUnitDto;
  code: string;
}

const CuAboutContainer = ({ code, coreUnits, cuAbout }: Props) => {
  const [isEnabled] = useFlagsActive();
  const isLight = useThemeContext().themeMode === 'light';
  const router = useRouter();
  const [showThreeMIPs, setShowThreeMIPs] = useState<boolean>(true);

  const table834 = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const phone = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const LessPhone = useMediaQuery(lightTheme.breakpoints.down('table_375'));
  const lessDesktop1194 = useMediaQuery(lightTheme.breakpoints.down('desktop_1194'));

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);

  const onClickLessMips = () => {
    setShowThreeMIPs(!showThreeMIPs);
  };
  const relateMipsOrder = useMemo(() => {
    const buildNewArray = cuAbout.cuMip.map((mip: CuMipDto) => getRelateMipObjectFromCoreUnit(mip));
    const order = _.sortBy(buildNewArray, ['orderBy', 'dateMip']).reverse();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countNumberAccepted = order.filter((mip: any) => mip.mipStatus === CuStatusEnum.Accepted);
    const resultArrayThreeElements = showThreeMIPs ? order.slice(0, countNumberAccepted.length) : order;
    return resultArrayThreeElements;
  }, [cuAbout.cuMip, showThreeMIPs]);

  const hasMipsNotAccepted = useMemo(() => {
    const buildNewArray = cuAbout.cuMip.map((mip: CuMipDto) => getRelateMipObjectFromCoreUnit(mip));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return buildNewArray.some((mip: any) => mip.mipStatus !== CuStatusEnum.Accepted);
  }, [cuAbout.cuMip]);

  const onClickFinances = useCallback(() => {
    const queryStrings = buildQueryString({
      filteredStatuses,
      filteredCategories,
      searchText,
    });
    router.push(`/core-unit/${code}/finances/reports${queryStrings}`);
  }, [filteredCategories, filteredStatuses, router, searchText, code]);
  const onClickActivity = useCallback(() => {
    const queryStrings = buildQueryString({
      filteredStatuses,
      filteredCategories,
      searchText,
    });
    router.push(`/core-unit/${code}/activity-feed${queryStrings}`);
  }, [filteredCategories, filteredStatuses, router, searchText, code]);

  return (
    <ContainerAbout isLight={isLight}>
      <SEOHead
        title={`About ${cuAbout.name} Core Unit at MakerDAO`}
        description={`Learn about the ${cuAbout.name} Core Unit at MakerDAO: their mandate, vision, mission, strategy, and more.`}
        image={cuAbout.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={cuAbout.image ? 'summary' : 'summary_large_image'}
      />

      <CoreUnitSummary coreUnits={coreUnits} />
      <Wrapper>
        <ContainerAllData>
          <ContainerResponsive>
            <MarkdownContainer>
              <MdViewerContainer
                showButton={table834 || phone || LessPhone}
                sentenceDescription={getMarkdownInformation(cuAbout.sentenceDescription)}
                paragraphDescription={getMarkdownInformation(cuAbout.paragraphDescription)}
                paragraphImage={getMarkdownInformation(cuAbout.paragraphImage)}
                onClickActivity={onClickActivity}
                onClickFinances={onClickFinances}
              />
            </MarkdownContainer>
            <TeamMemberContainer>
              <TeamMemberTitle isLight={isLight}>Team Size</TeamMemberTitle>
              <TeamMember fte={getFTEsFromCoreUnit(cuAbout)} />
            </TeamMemberContainer>
            <ContactInfoContainer>
              <ContactInfoTitle isLight={isLight}>Contact Information</ContactInfoTitle>
              <ContainerCards>
                {cuAbout &&
                  cuAbout.contributorCommitment?.map((contributor: ContributorCommitmentDto, index: number) => {
                    return (
                      <CardInfoContainer key={index}>
                        <CardInfoMember contributorCommitment={contributor} />
                      </CardInfoContainer>
                    );
                  })}
              </ContainerCards>
            </ContactInfoContainer>
            <Divider
              sx={{
                bgcolor: isLight ? '#D4D9E1' : '#405361',
              }}
            />
            <CardRelateMipsContainer>
              <TitleRelateMips isLight={isLight}>Related MIPs (Maker Improvement Proposals)</TitleRelateMips>
              <RelateMipCards>
                {relateMipsOrder.map((mip: unknown, index: number) => {
                  return (
                    <RelateMipCard key={index}>
                      <RelateMips relateMips={mip as CuMipDto} />
                    </RelateMipCard>
                  );
                })}
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
              <CardSomeThingWrong width={table834 || phone ? '770px' : 'fit-content'} />
            )}
          </ContainerResponsive>

          {!(table834 || phone || LessPhone) && (
            <div
              style={{
                width: '39.61%',
              }}
            >
              {isEnabled('FEATURE_CARD_NAVIGATION') && (
                <ContainerScroll>
                  <ContainerCard>
                    <CardExpenses
                      code={getShortCode(cuAbout.code)}
                      onClickActivity={onClickActivity}
                      onClickFinances={onClickFinances}
                    />
                  </ContainerCard>
                  <ContainerCard>
                    <CardSomeThingWrong />
                  </ContainerCard>
                </ContainerScroll>
              )}
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
  marginTop: '64px',
  width: '100%',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingBottom: '128px',
  [lightTheme.breakpoints.down('table_375')]: {
    width: '100%',
    minWidth: '360px',
  },
}));

const ContainerCard = styled.div({
  marginBottom: '32px',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '68px',
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
  lineHeight: '24px',
  marginRight: '8px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 0,
  marginBottom: 0,
  fontFamily: 'Inter, sans-serif',

  [lightTheme.breakpoints.down('table_834')]: {
    fontSize: '16px',
    fontWeight: 700,
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
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
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
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
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  [lightTheme.breakpoints.down('table_375')]: {
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
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: '100%',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    width: '100%',
  },
});

const TitleRelateMips = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
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
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: '100%',
  },
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

const ContainerAllData = styled.div({
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginRight: '128px',
  marginLeft: '128px',
  [lightTheme.breakpoints.up('desktop_1920')]: {
    marginRight: '0px',
    marginLeft: '0px',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    marginRight: '48px',
    marginLeft: '48px',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    marginRight: '32px',
    marginLeft: '32px',
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginRight: '32px',
    marginLeft: '32px',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    marginRight: '16px',
    marginLeft: '16px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    marginRight: '16px',
    marginLeft: '16px',
  },
});

const DividerStyle = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  width: '100%',
});

const ContainerScroll = styled.div({
  position: 'sticky',
  top: 250,
  paddingTop: '34px',
});

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  [lightTheme.breakpoints.up('desktop_1920')]: {
    maxWidth: '1184px',
    marginLeft: '0px',
    marginRight: '0px',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    marginRight: '0px',
    marginLeft: '0px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    width: '100%',
  },
});

const ContainerResponsive = styled.div({
  width: '60.39%',
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: '100%',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: '100%',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    width: '100%',
  },
});

const CardInfoContainer = styled.div({
  marginBottom: '32px',
  [lightTheme.breakpoints.down('table_375')]: {
    width: '100%',
  },
});
