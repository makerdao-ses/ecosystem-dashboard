import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getMarkdownInformation, getRelateMipObjectFromCoreUnit } from '../../../core/business-logic/core-unit-about';
import { getFTEsFromCoreUnit } from '../../../core/business-logic/core-units';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { RootState } from '../../../core/store/store';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import BigButton from '../../components/button/big-button/big-button';
import CardInfoMember from '../../components/card-info-member/card-info-member';
import MdViewerContainer from '../../components/markdown/md-view-container';
import InsidePagination from '../../components/pagination/InsidePagination';
import RelateMips from '../../components/relate-mips/relate-mips';
import TeamMember from '../../components/team-members/team-member';
import TitleNavigationCuAbout from '../../components/title-navigation-cu-about/title-navigation-cu-about';
import { CoreUnitDao } from '../cu-table/cu-table.api';
import { loadCuTableItemsAsync, selectCuTableItems } from '../cu-table/cu-table.slice';
import { ContributorCommitment } from './cu-about-contributor';
import { contributorCommitmentSelector, cuAboutSelector, loadCoreUnitABout, status } from './cu-about-slice';
import { CuMip } from './cu-about.api';
import _ from 'lodash';
import BreadCrumb from '../../components/pagination/bread-crumb';
import NavigationCard from '../../components/card-navegation/card-navigation';

const CuAboutContainer = () => {
  const [filters] = useSearchParams();
  const [showThreeMIPs, setShowThreeMIPs] = useState<boolean>(true);
  const data: Array<CoreUnitDao> = useSelector((state: RootState) => selectCuTableItems(state));
  const navigate = useNavigate();
  const { code: coreUnitCode } = useParams();
  const dispatch = useAppDispatch();
  const { cuAbout, statusCoreUnit } = useSelector((state: RootState) => cuAboutSelector(state));
  const contributors = useSelector((state: RootState) => contributorCommitmentSelector(state));

  useEffect(() => {
    dispatch(loadCuTableItemsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCoreUnitABout(coreUnitCode || ''));
    setShowThreeMIPs(true);
  }, [dispatch, coreUnitCode]);

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', filters), [filters]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', filters), [filters]);
  const searchText = useMemo(() => getStringParam('searchText', filters), [filters]);

  const filteredData = useMemo(() =>
    filterData({
      data,
      filteredStatuses,
      filteredCategories,
      searchText
    }), [data, filteredCategories, filteredStatuses, searchText]);

  const page = useMemo(() => filteredData.findIndex(item => item.code === coreUnitCode) + 1, [coreUnitCode, filteredData]);

  const changeCoreUnitCode = useCallback(
    (direct: -1 | 1) => () => {
      const index = filteredData.findIndex(item => item.code === coreUnitCode);
      const newIndex = index + direct;
      if (newIndex >= 0 && newIndex < filteredData.length) {
        navigate(`/about/${filteredData[newIndex].code}?${filters.toString()}`);
      }
    },
    [coreUnitCode, filteredData, filters, navigate],
  );

  const onClickLessMips = () => {
    setShowThreeMIPs(!showThreeMIPs);
  };

  const relateMipsOrder = useMemo(() => {
    const buildNewArray = cuAbout.cuMip.map((mip: CuMip) => getRelateMipObjectFromCoreUnit(mip));
    const order = _.sortBy(buildNewArray, ['orderBy', 'dateMip']).reverse();
    const resultArrayThreeElements = order.length > 3 && showThreeMIPs ? order.slice(0, 3) : order;
    return resultArrayThreeElements;
  }, [cuAbout.cuMip, showThreeMIPs]);

  const list = ['Overview', 'Transparency Reports', 'Onchain Setup', 'Budget Governance'];
  const description = 'View all Finances of the (SES-01) Sustainable Ecosystem Scaling';

  if (statusCoreUnit === status.loading) {
    return <div>Loading...</div>;
  }
  if (statusCoreUnit === status.failed) {
    return <div>Failed...</div>;
  }

  return (
    <ContainerAbout>
      <div style={{
        position: 'fixed',
        top: 63,
        width: '100%',
        backgroundImage: 'url(/assets/img/Subheader.png)',
        backgroundSize: 'cover',
        zIndex: 4,
      }}>
        <NavigationHeader>
          <BreadCrumb count={filteredData.length} breadcrumbs={[cuAbout.name] || []} isCoreUnit />
          <InsidePagination count={filteredData.length} page={page} onClickLeft={changeCoreUnitCode(-1)} onClickRight={changeCoreUnitCode(1)} />
        </NavigationHeader>
        <ContainerTitle>
          <TitleNavigationCuAbout coreUnitAbout={cuAbout} />
          <Typography fontSize={16} lineHeight='19px' sx={{
            marginTop: '16px'
          }}>{cuAbout.sentenceDescription || ''}</Typography>
        </ContainerTitle>
      </div>
      <ContainerAllData>
        <div style={{
          width: '60.39%',
          display: 'flex',
          flexDirection: 'column',
          marginTop: 210,
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
              {contributors.map((contributor: ContributorCommitment, index: number) => {
                return (
                  <div key={index} style={{ marginBottom: '32px' }}>
                    <CardInfoMember contributorCommitment={contributor} />
                  </div>
                );
              })
              }
            </ContainerCards>
            {contributors.length === 0 && <ContainerNoData>No data to Show</ContainerNoData>}
          </ContactInfoContainer>
          <Divider sx={{ marginTop: '32px' }} />
          <CardRelateMipsContainer>
            <TitleRelateMips>Related MIPs (Maker Improvement Proposals)</TitleRelateMips>
            <RelateMipCards>
              {relateMipsOrder.map((mip: CuMip, index: number) => {
                return (
                  <RelateMipCard key={index}>
                    <RelateMips relateMips={mip} />
                  </RelateMipCard>

                );
              })}
              {cuAbout.cuMip.length === 0 && <ContainerNoRelateMIps>There are not related MIPs</ContainerNoRelateMIps>}
            </RelateMipCards>
          </CardRelateMipsContainer>
          {cuAbout.cuMip.length > 3 && <ButtonContainer>
            <DividerStyle /> <BigButton title={showThreeMIPs ? 'See more related MIPs' : 'See fewer MIPs'} onClick={onClickLessMips} />
            <DividerStyle />
          </ButtonContainer>}
        </div>
        <div style={{
          width: '39.61%',
        }}>
          <div style={{
            position: 'fixed',
            top: 300,
          }}>
            <ContainerCard>
              <NavigationCard description={description} image='/assets/img/card-initiatives.png' list={list} titleLinkPage='View All' title='Initiatives' />
            </ContainerCard>
            <ContainerCard>
              <NavigationCard description={description} image='/assets/img/card-finances.png' list={list} titleLinkPage='View All' title='Finances' />
            </ContainerCard>
          </div>
        </div>
      </ContainerAllData>
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
});

const ContainerCard = styled.div({
  marginBottom: '32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end'
});

const NavigationHeader = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '74px',
  paddingLeft: '32px',
  paddingRight: '32px',
});

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '128px',
  paddingRight: '128px',
  paddingBottom: '24px',
  height: '135px',
  borderBottom: '1px solid #B6EDE7',
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
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '19px',
  marginRight: '16px',
  color: '#000000',
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
  fontSize: '14px',
  lineHeight: '17px',
  color: '#000000',
  marginBottom: '32px',
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

});

const TitleRelateMips = styled.div({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  marginBottom: '32px',
  color: '#000000',
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

const ContainerNoData = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
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
