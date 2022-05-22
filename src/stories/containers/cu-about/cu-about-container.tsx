import styled from '@emotion/styled';
import { Divider, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/hooks';
import BigButton from '../../components/button/big-button/big-button';
import SmallButton from '../../components/button/small-button/small-button';
import CardInfoMember from '../../components/card-info-member/card-info-member';
import MdViewerContainer from '../../components/markdown/md-view-container';
import InsidePagination from '../../components/pagination/InsidePagination';
import RelateMips from '../../components/relate-mips/relate-mips';
import TeamMember from '../../components/team-members/team-member';
import TitleNavigationCuAbout from '../../components/title-navigation-cu-about/title-navigation-cu-about';
import { ContributorCommitment } from './cu-about-contributor';
import { contributorCommitmentSelector, cuAboutSelector, CurrentCoreUnitAbout, loadCoreUnitABout, status } from './cu-about-slice';
import { CuMip, getFTEsFromCoreUnitAbout } from './cu-about.api';

const CuAboutContainer = () => {
  const navigate = useNavigate();
  const coreUnitCode = 'PE-001';
  const dispatch = useAppDispatch();
  const { cuAbout, statusCoreUnit } = useAppSelector<CurrentCoreUnitAbout>(cuAboutSelector);
  const contributors = useAppSelector<ContributorCommitment[]>(contributorCommitmentSelector);
  useEffect(() => {
    dispatch(loadCoreUnitABout(coreUnitCode));
  }, [dispatch]);

  const handleClickPrevious = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {
    },
    [],
  );
  const handleClickNext = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {
    },
    [],
  );

  const handleGoBack = useCallback(
    () => {
      navigate('/');
    },
    [navigate],
  );

  if (statusCoreUnit === status.loading) {
    return <div>Loading...</div>;
  }
  if (statusCoreUnit === status.failed) {
    return <div>Failed...</div>;
  }

  return (
    <ContainerAbout>
      <NavigationHeader>
        <SmallButton onClick={handleGoBack} /> <PaddingComponent><InsidePagination count={10} page={1} onClickLeft={handleClickPrevious} onClickRight={handleClickNext} /></PaddingComponent>
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
      <Divider light sx={{ marginBottom: '32px', marginTop: '32px', color: '#D8E0E3', marginLeft: '32px', marginRight: '32px' }} variant='fullWidth' />
      <CardRelateMipsContainer>
        <TitleRelateMips>Related MIPs (Maker Improvement Proposals)</TitleRelateMips>
        <RelateMipCards>
          {cuAbout.cuMip.map((mip: CuMip, index: number) => {
            return (
              <RelateMipCard key={index}>
                <RelateMips relateMips={mip} />
              </RelateMipCard>

            );
          })}
          {cuAbout.cuMip.length === 0 && <ContainerNoRelateMIps>There is not Mips relate</ContainerNoRelateMIps>}
        </RelateMipCards>
      </CardRelateMipsContainer>
      {cuAbout.cuMip.length !== 0 && <ButtonContainer>
        <BigButton title='See less related MIPs' />
      </ButtonContainer>}
    </ContainerAbout>
  );
};

export default CuAboutContainer;

const ContainerAbout = styled.div({
  display: 'flex',
  flexDirection: 'column',
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
