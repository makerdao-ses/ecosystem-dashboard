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
  const coreUnitCode = 'SES-001';
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
          })}
        </ContainerCards>
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
        </RelateMipCards>
      </CardRelateMipsContainer>
      <ButtonContainer>
        <BigButton title='See less related MIPs' />
      </ButtonContainer>
    </ContainerAbout>
  );
};

export default CuAboutContainer;

const ContainerAbout = styled.div`
display:flex;
flex-direction:column;
background-color:#F9F9F9 ;
`;

const NavigationHeader = styled.div`
display:flex ;
justify-content:row ;
align-items:center ;
background-color:#F5F5F5 ;
height:48px ;
padding-left: 44px;
`;

const PaddingComponent = styled.div`
margin-left:33px ;
`;

const ContainerTitle = styled.div`
display:flex ;
margin-left:44px ;
margin-right:41px ;
margin-top: 32px;
margin-bottom: 24px;
`;

const MarkdownContainer = styled.div`
margin-left :32px ;
margin-right:32px ;
`;

const TeamMemberContainer = styled.div`
display:flex ;
justify-content: row;
align-items:center ;
margin-left:32px ;

`;

const TeamMemberTitle = styled(Typography)`
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 19px;
margin-right:16px ;
color: #000000;
`;

const ContactInfoContainer = styled.div`
display:flex ;
flex-direction:column ;
min-height:182px ;
padding-left:32px ;
margin-top:48px ;
margin-bottom: 32px;

`;
const ContactInfoTitle = styled(Typography)`
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
color: #000000;
`;

const ContainerCards = styled.div`
display: grid ;
grid-template-columns: repeat(3, 1fr);
 column-gap: 32px;
row-gap: 32px;
grid-auto-rows: minmax(100px, auto);
margin-left:32px ;
margin-right: 32px;
margin-top: 32px;
`;

const CardContainer = styled.div`
margin-bottom:24px ;
margin-top:24px ;
`;

const CardRelateMipsContainer = styled.div`
margin-left:32px ;
margin-right:32px ;
margin-bottom:33px ;
display: flex;
flex-direction: column;
`;

const TitleRelateMips = styled.div`
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 19px;
margin-bottom:24px ;
color: #000000;
`;

const RelateMipCards = styled.div`
display:flex ;
flex-direction:column;
margin-top:24px ;

`;

const RelateMipCard = styled.div`
margin-bottom: 24px ;
`;

const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
margin-bottom: 26px;
`;
