import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getMarkdownInformation, getRelateMipObjectFromCoreUnit } from '../../../core/business-logic/core-unit-about';
import { getFTEsFromCoreUnit } from '../../../core/business-logic/core-units';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { RootState } from '../../../core/store/store';
import { getArrayParam, getStringParam } from '../../../core/utils/filters';
import BigButton from '../../components/button/big-button/big-button';
import CardInfoMember from '../../components/card-info-member/card-info-member';
import MdViewerContainer from '../../components/markdown/md-view-container';
import RelateMips from '../../components/relate-mips/relate-mips';
import TeamMember from '../../components/team-members/team-member';
import { loadCuTableItemsAsync } from '../cu-table/cu-table.slice';
import { ContributorCommitment } from './cu-about-contributor';
import { contributorCommitmentSelector, cuAboutSelector, loadCoreUnitAbout, status } from './cu-about-slice';
import { CuMip } from './cu-about.api';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { CoreUnitSummary } from '../../components/core-unit-summary/core-unit-summary';
import CardExpenses from '../../components/card-navegation/card-expenses';
import CardSomeThingWrong from '../../components/card-navegation/card-somethig-wrong';
import { useFlagsActive } from '../../../core/hooks/useFlagsActive';

const CuAboutContainer = () => {
  const [isEnabled] = useFlagsActive();
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;
  const [showThreeMIPs, setShowThreeMIPs] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { cuAbout, statusCoreUnit } = useSelector((state: RootState) => cuAboutSelector(state));
  const contributors = useSelector((state: RootState) => contributorCommitmentSelector(state));
  useEffect(() => {
    dispatch(loadCuTableItemsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (code) {
      dispatch(loadCoreUnitAbout(code || ''));
      setShowThreeMIPs(true);
    }
  }, [dispatch, code]);

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);

  const onClickLessMips = () => {
    setShowThreeMIPs(!showThreeMIPs);
  };

  const relateMipsOrder = useMemo(() => {
    const buildNewArray = cuAbout.cuMip.map((mip: CuMip) => getRelateMipObjectFromCoreUnit(mip));
    const order = _.sortBy(buildNewArray, ['orderBy', 'dateMip']).reverse();
    const resultArrayThreeElements = order.length > 3 && showThreeMIPs ? order.slice(0, 3) : order;
    return resultArrayThreeElements;
  }, [cuAbout.cuMip, showThreeMIPs]);

  const descriptionLength = cuAbout.sentenceDescription.length || 0;

  const onClickFinances = useCallback(() => {
    router.push(`/core-unit/${code}/finances/transparency?filteredStatuses=${filteredStatuses}&filteredCategories=${filteredCategories}&searchText=${searchText}`);
  }, [filteredCategories, filteredStatuses, router, searchText, code]);

  if (statusCoreUnit === status.loading) {
    return <div>Loading...</div>;
  }
  if (statusCoreUnit === status.failed) {
    return <div>Failed...</div>;
  }

  return (
    <ContainerAbout>
      <CoreUnitSummary />
      <Wrapper>
        <ContainerAllData>
          <div style={{
            width: '60.39%',
            display: 'flex',
            flexDirection: 'column',
          }}>

            <MarkdownContainer>
              <MdViewerContainer sentenceDescription={getMarkdownInformation(cuAbout.sentenceDescription)} paragraphDescription={getMarkdownInformation(cuAbout.paragraphDescription)} paragraphImage={getMarkdownInformation(cuAbout.paragraphImage)} />
            </MarkdownContainer>
            <TeamMemberContainer>
              <TeamMemberTitle>Team Size</TeamMemberTitle><TeamMember fte={getFTEsFromCoreUnit(cuAbout)} />
            </TeamMemberContainer>
            <ContactInfoContainer>
              <ContactInfoTitle>Contact Information</ContactInfoTitle>
              <ContainerCards>
                {contributors && contributors.map((contributor: ContributorCommitment, index: number) => {
                  return (
                    <div key={index} style={{ marginBottom: '32px' }}>
                      <CardInfoMember contributorCommitment={contributor} />
                    </div>
                  );
                })
                }
              </ContainerCards>
            </ContactInfoContainer>
            <Divider sx={{ marginTop: '32px' }} />
            <CardRelateMipsContainer>
              <TitleRelateMips>Related MIPs (Maker Improvement Proposals)</TitleRelateMips>
              <RelateMipCards>
                {relateMipsOrder.map((mip: unknown, index: number) => {
                  return (
                    <RelateMipCard key={index}>
                      <RelateMips relateMips={mip as CuMip} />
                    </RelateMipCard>

                  );
                })}
                {cuAbout && cuAbout.cuMip && cuAbout.cuMip.length === 0 && <ContainerNoRelateMIps>There are not related MIPs</ContainerNoRelateMIps>}
              </RelateMipCards>
            </CardRelateMipsContainer>
            {cuAbout && cuAbout.cuMip && cuAbout.cuMip.length > 3 && <ButtonContainer>
              <DividerStyle /> <BigButton title={showThreeMIPs ? 'See more related MIPs' : 'See fewer MIPs'} onClick={onClickLessMips} />
              <DividerStyle />
            </ButtonContainer>}
          </div>
          <div style={{
            width: '39.61%',
          }}>
            {isEnabled('FEATURE_CARD_NAVIGATION') && <ContainerScroll descriptionLength={descriptionLength}>
              <ContainerCard>
                <CardExpenses onClick={onClickFinances} />
              </ContainerCard>
              <ContainerCard>
                <CardSomeThingWrong />
              </ContainerCard>
            </ContainerScroll>}
          </div>
        </ContainerAllData>
      </Wrapper>
    </ContainerAbout >
  );
};

export default CuAboutContainer;

const ContainerAbout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '64px',
  width: '100%',
  background: 'url(/assets/img/bg-page.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  marginBottom: '130px'
});

const ContainerCard = styled.div({
  marginBottom: '32px',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '64px',
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

const TeamMemberTitle = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '19px',
  marginRight: '8px',
  color: '#231536',
  fontFamily: 'FT Base, sans-serif'
});

const ContactInfoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '182px',
  marginTop: '36px',
  marginBottom: '32px',
});

const ContactInfoTitle = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#231536',
  marginBottom: '32px',
  fontFamily: 'FT Base, sans-serif'
});

const ContainerCards = styled.div({
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '715px',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  padding: '0px',
});

const CardRelateMipsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '32px',
  marginBottom: '64px',
  width: '715px'

});

const TitleRelateMips = styled.div({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  marginBottom: '32px',
  color: '#231536',
});

const RelateMipCards = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '24px',

});

const RelateMipCard = styled.div({
  marginBottom: '24px',
});

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '44px',
  overflow: 'hidden',
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
});

const DividerStyle = styled(Divider)({
  width: '100%',
  bgcolor: '#D4D9E1',
});

const ContainerScroll = styled.div<{ descriptionLength: number }>(({ descriptionLength }) => ({
  position: 'sticky',
  top: 250,
  paddingTop: '36px',
  height: '620px',
  scrollbarWidth: 'none',
  scrollbarColor: 'transparent',
  '&:: -webkit-scrollbar': {
    width: '0px',
    background: 'transparent',
  },
  overflowY: 'auto',
}));

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
});
