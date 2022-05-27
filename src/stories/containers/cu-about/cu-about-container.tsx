import styled from '@emotion/styled';
import { Divider, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { RootState } from '../../../core/store/store';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import BigButton from '../../components/button/big-button/big-button';
import SmallButton from '../../components/button/small-button/small-button';
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
import { CuMip, getFTEsFromCoreUnitAbout } from './cu-about.api';

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

  const handleGoBack = useCallback(
    () => {
      navigate(`/?${filters.toString()}`);
    },
    [filters, navigate],
  );

  const resultMips = useMemo(() => {
    const result = cuAbout.cuMip.length > 3 && showThreeMIPs ? cuAbout.cuMip.slice(0, 3) : cuAbout.cuMip;
    return result;
  }, [cuAbout.cuMip, showThreeMIPs]);

  const onClickLessMips = () => {
    setShowThreeMIPs(!showThreeMIPs);
  };

  if (statusCoreUnit === status.loading) {
    return <div>Loading...</div>;
  }
  if (statusCoreUnit === status.failed) {
    return <div>Failed...</div>;
  }

  return (
    <ContainerAbout>
      <NavigationHeader>
        <SmallButton onClick={handleGoBack} /> <PaddingComponent><InsidePagination count={filteredData.length} page={page} onClickLeft={changeCoreUnitCode(-1)} onClickRight={changeCoreUnitCode(1)} /></PaddingComponent>
      </NavigationHeader>
      <ContainerTitle>
        <TitleNavigationCuAbout coreUnitAbout={cuAbout} />
      </ContainerTitle>
      <MarkdownContainer>
        <MdViewerContainer sentenceDescription={cuAbout.sentenceDescription} paragraphDescription={cuAbout.paragraphDescription} paragraphImage={cuAbout.paragraphImage} />
      </MarkdownContainer>
      <TeamMemberContainer>
        <TeamMemberTitle>Team Size</TeamMemberTitle><TeamMember fte={getFTEsFromCoreUnitAbout(cuAbout)} />
      </TeamMemberContainer>
      <ContactInfoContainer>
        <ContactInfoTitle>Contact Information</ContactInfoTitle>
        <ContainerCards className='cards'>
          {contributors.map((contributor: ContributorCommitment, index: number) => {
            return (
              <CardContainer key={index}>
                <CardInfoMember contributorCommitment={contributor} />
              </CardContainer>
            );
          })
          }
        </ContainerCards>
        {contributors.length === 0 && <ContainerNoData>No data to Show</ContainerNoData>}
      </ContactInfoContainer>
      <Divider light sx={{
        marginBottom: '32px',
        marginTop: '32px',
        color: '#D8E0E3',
        marginLeft: '32px',
        marginRight: '32px'
      }} variant='fullWidth' />
      <CardRelateMipsContainer>
        <TitleRelateMips>Related MIPs (Maker Improvement Proposals)</TitleRelateMips>
        <RelateMipCards>
          {resultMips.map((mip: CuMip, index: number) => {
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
        <BigButton title={showThreeMIPs ? 'See more related MIPs' : 'See fewer MIPs'} onClick={onClickLessMips} />
      </ButtonContainer>}
    </ContainerAbout>
  );
};

export default CuAboutContainer;

const ContainerAbout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '64px',
  backgroundColor: '#F9F9F9',
});

const NavigationHeader = styled.div({
  display: 'flex',
  justifyContent: 'row',
  alignItems: 'center',
  backgroundColor: '#F5F5F5',
  height: '48px',
  paddingLeft: '32px',
});

const PaddingComponent = styled.div({
  paddingLeft: '32px',
});

const ContainerTitle = styled.div({
  display: 'flex',
  marginLeft: '44px',
  marginRight: '41px',
  marginTop: '32px',
  marginBottom: '24px',
});
const MarkdownContainer = styled.div({
  marginLeft: '32px',
  marginRight: '32px',
});
const TeamMemberContainer = styled.div({
  display: 'flex',
  justifyContent: 'row',
  alignItems: 'center',
  marginLeft: '32px',

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
  paddingLeft: '32px',
  marginTop: '48px',
  marginBottom: '32px',
});

const ContactInfoTitle = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  color: '#000000',
});

const ContainerCards = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '32px',
  gridAutoRows: 'minmax(100px, auto)',
  marginLeft: '32px',
  marginRight: '32px',
  marginTop: '32px',
});

const CardContainer = styled.div({
  marginBottom: '24px',
  marginTop: '24px',
});

const CardRelateMipsContainer = styled.div({
  marginLeft: '32px',
  marginRight: '32px',
  marginBottom: '33px',
  display: 'flex',
  flexDirection: 'column',
});

const TitleRelateMips = styled.div({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  marginBottom: '24px',
  color: '#000000',
});

const RelateMipCards = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '24px',

});

const RelateMipCard = styled.div({
  marginBottom: '24px',
});

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: '26px',
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
