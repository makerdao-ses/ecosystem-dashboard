/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Divider, Typography } from '@mui/material';
import RelateMips from '../../components/relate-mips/relate-mips';
import CardInfoMember from '../../components/card-info-member/card-info-member';
import SmallButton from '../../components/button/small-button/small-button';
import InsidePagination from '../../components/pagination/InsidePagination';
import TitleNavigationCuAbout from '../../components/title-navigation-cu-about/title-navigation-cu-about';
import MdViewerContainer from '../../components/markdown/md-view-container';
import TeamMember from '../../components/team-members/team-member';
import BigButton from '../../components/button/big-button/big-button';
import { CoreUnit, CuMipStatus } from './cu-about.api';

import { Commitment, ContributorCommitment } from './cu-about-contributor';

import { RelateMipsCuAbout } from './cu-about-relate-mip';

const CuAboutContainer = () => {
  const coreUnit = {
    name: 'Sustainable Ecosystem Scaling',
    cuMip: [{
      mipStatus: CuMipStatus.Accepted,
      accepted: '2020-01-01',
      obsolete: '2020-01-01',
      rejected: '2020-01-01',
      rfc: '2020-01-01',
    }] as CoreUnit['cuMip'],
    socialMediaChannels: [{
      cuCode: 'CU-1',
      discord: 'https://discord.gg/h7GKvqDyDP',
      forumTag: 'ses-001',
      linkedIn: 'https://www.linkedin.com/company/makerdao-ses/',
      twitter: 'https://twitter.com/MakerDAO_SES',
      website: 'https://www.makerdao.com/',
      youtube: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw/about'
    }] as CoreUnit['socialMediaChannels'],
  } as CoreUnit;

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

  const contributors: ContributorCommitment[] = [
    {
      id: '2',
      jobTitle: 'Lead Developer',
      commitment: Commitment.FullTime,
      contributor: [
        {
          id: '0',
          name: 'Petru',
          email: 'Petru@ses.makerdao.network',
          forumHandle: 'Petru_Catana',
          twitterHandle: 'Petru_Catana',
          discordHandle: 'catana | SES#2938',
          facilitatorImage: ''
        }
      ]
    },
    {
      id: '2',
      jobTitle: 'Lead Developer',
      commitment: Commitment.FullTime,
      contributor: [
        {
          id: '0',
          name: 'Petru',
          email: 'Petru@ses.makerdao.network',
          forumHandle: 'Petru_Catana',
          twitterHandle: 'Petru_Catana',
          discordHandle: 'catana | SES#2938',
          facilitatorImage: ''
        }
      ]
    },
  ];

  const relateMips = [{
    mipTitle: 'MIP39c2-SP10: Adding Sustainable Ecosystem Scaling Core Unit',
    mipUrl: 'https://mips.makerdao.com/mips/details/MIP39c2SP10',
    mipStatus: 'Accepted',
    accepted: '2021-05-25',
    obsolete: '',
    rfc: '2021-04-02',
    formalSubmission: '2021-05-01',
    rejected: ''
  }, {
    mipTitle: 'MIP39c2-SP10: Adding Sustainable Ecosystem Scaling Core Unit',
    mipUrl: 'https://mips.makerdao.com/mips/details/MIP39c2SP10',
    mipStatus: 'Accepted',
    accepted: '2021-05-25',
    obsolete: '',
    rfc: '2021-04-02',
    formalSubmission: '2021-05-01',
    rejected: ''
  },
  ] as RelateMipsCuAbout[];

  const sentenceDescription = 'SES aims to sustainably grow the Maker Protocol’s moats by removing barriers between decentralized workforce, capital, and work.';
  const paragraphDescription = '**Vision**\n    \n    An effective, decentralized, and scalable ecosystem:\n    \n    1. The industry’s best on-boarding experience and retention rate\n    2. Easy to find the capital needed for the best projects to work on:\n        1. Optimal driving force for protocol growth\n        2. Most fulfilling for the project’s participants\n    3. Resilient safety mechanisms\n        1. Preventing protocol failure\n        2. Allow for rapid innovation and experimentation\n \n **Strategy**\n \n    - Opportunity & Risk Assessment\n        - Engage with the different DAO stakeholders and keep an open backlog accessible to the broader Community.\n        - Prioritize issues based on importance and risk and build a Road Map to tackle these issues.\n    - Research\n        - Research the opportunities and issues, with a data-centric approach.\n        - Explore solutions and frameworks that produce high-quality, repeatable results.\n    - Incubate\n        - Set groups for success into becoming a functional Core Unit answering a specific need for the DAO. Guide and support them through the process.\n        - Feedback the research through continuous improvement to accelerate the scale and improve the success rate of new Core Units.';
  const paragraphImage = 'https://gateway-proxy-bee-9-0.gateway.ethswarm.org/bzz/1fe299c01206d1d422cf79a60ea49b8a77b04382f8d25745842eb2a199eb4389';
  const fte = 7.5;
  return (
        <ContainerAbout>
            <NavigationHeader>
                <SmallButton onClick={() => { }} /> <PaddingComponent><InsidePagination count={10} page={1} onClickLeft={handleClickPrevious} onClickRight={handleClickNext} /></PaddingComponent>
            </NavigationHeader>
            <ContainerTitle>
                <TitleNavigationCuAbout coreUnit={coreUnit} />
            </ContainerTitle>
            <MarkdownContainer>
                <MdViewerContainer sentenceDescription={sentenceDescription} paragraphDescription={paragraphDescription} paragraphImage={paragraphImage} />
            </MarkdownContainer>
            <TeamMemberContainer>
                <TeamMemberTitle>Team Size</TeamMemberTitle><TeamMember fte={fte} />
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
                    {relateMips.map((mip: RelateMipsCuAbout, index: number) => {
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
margin-left:32px ;
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
