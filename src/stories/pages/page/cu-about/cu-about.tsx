import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Divider, Typography } from '@mui/material';
import SmallButton from '../../../components/button/small-button/small-button';
import CardInfoMember, { CardInfoMemberType } from '../../../components/card-info-member/card-info-member';
import { LinkModel, LinkType } from '../../../components/cutable-column-links/cutable-column-links';
import MdViewerContainer from '../../../components/markdown/md-view-container';
import InsidePagination from '../../../components/pagination/InsidePagination';
import TeamMember from '../../../components/team-members/team-member';
import TitleNavigationCuAbout from '../../../components/title-navigation-cu-about/title-navigation-cu-about';
import RelateMips, { RelateMipType } from '../../../components/relate-mips/relate-mips';
import BigButton from '../../../components/button/big-button/big-button';
import { CuStatusEnum } from '../../../../core/enums/cu-status-enum';

const CuAbout = () => {
  const markdownText = 'https://raw.githubusercontent.com/mact200590/Proyectos/master/example.md';
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

  const src = 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/53/92/77/53927729-28a4-b94a-40d9-9abbc9583078/source/512x512bb.jpg';
  const numbersMembers: CardInfoMemberType[] = [
    { avatar: src, name: 'John Doe', username: 'forum @username', jobTitle: 'Research Expert', commitment: 'Full Time' },
    { avatar: src, name: 'John Doe', username: 'forum @username', jobTitle: 'Research Expert', commitment: 'Full Time' },
    { avatar: src, name: 'John Doe', username: 'forum @username', jobTitle: 'Research Expert', commitment: 'Full Time' },
    { avatar: src, name: 'John Doe', username: 'forum @username', jobTitle: 'Research Expert', commitment: 'Full Time' },
    { avatar: '', name: 'John Doe', username: 'forum @username', jobTitle: 'Research Expert', commitment: 'Full Time' },
  ];

  const links: LinkModel[] = [
    {
      linkType: LinkType.WWW,
      href: '#',
    },
    {
      linkType: LinkType.Forum,
      href: '#',
    },
    {
      linkType: LinkType.Discord,
      href: '#',
    },
    {
      linkType: LinkType.Twitter,
      href: '#',
    },
    {
      linkType: LinkType.Youtube,
      href: '#',
    },
    {
      linkType: LinkType.LinkedIn,
      href: '#',
    },
  ];

  const relateMips: RelateMipType[] = [{
    status: CuStatusEnum.Rejected,
    statusModified: new Date(),
    href: '#',
    mipTitle: 'MIP40c3-SP1: Modify Core Unit Budget - Real-World Finance (RWF-001)',
  },
  {
    status: CuStatusEnum.Rejected,
    statusModified: new Date(),
    href: '#',
    mipTitle: 'MIP41c4-SP29: Facilitator Onboarding for Maker Talent Core Unit (MT-001)',
  },
  {
    status: CuStatusEnum.Rejected,
    statusModified: new Date(),
    href: '#',
    mipTitle: 'MIP40c3-SP1: Modify Core Unit Budget - Real-World Finance (RWF-001)',
  },
  {
    status: CuStatusEnum.Rejected,
    statusModified: new Date(),
    href: '#',
    mipTitle: 'MIP41c4-SP29: Facilitator Onboarding for Maker Talent Core Unit (MT-001)',
  },
  {
    status: CuStatusEnum.Rejected,
    statusModified: new Date(),
    href: '#',
    mipTitle: 'MIP40c3-SP1: Modify Core Unit Budget - Real-World Finance (RWF-001)',
  },
  {
    status: CuStatusEnum.Rejected,
    statusModified: new Date(),
    href: '#',
    mipTitle: 'MIP41c4-SP29: Facilitator Onboarding for Maker Talent Core Unit (MT-001)',
  },
  {
    status: CuStatusEnum.Rejected,
    statusModified: new Date(),
    href: '#',
    mipTitle: 'MIP40c3-SP1: Modify Core Unit Budget - Real-World Finance (RWF-001)',
  },
  {
    status: CuStatusEnum.Rejected,
    statusModified: new Date(),
    href: '#',
    mipTitle: 'MIP41c4-SP29: Facilitator Onboarding for Maker Talent Core Unit (MT-001)',
  },

  ];

  return (
    <ContainerAbout>
      <NavigationHeader>
        <SmallButton /> <PaddingComponent><InsidePagination count={10} page={1} onClickLeft={handleClickPrevious} onClickRight={handleClickNext} /></PaddingComponent>
      </NavigationHeader>
      <ContainerTitle>
        <TitleNavigationCuAbout status={CuStatusEnum.Accepted} title='Sustainable Ecosystem Scaling' statusModified={new Date()} links={links} />
      </ContainerTitle>
      <MarkdownContainer>
        <MdViewerContainer markdown={markdownText} />
      </MarkdownContainer>
      <TeamMemberContainer>
        <TeamMemberTitle>Team Size</TeamMemberTitle><TeamMember fte={7.5} />
      </TeamMemberContainer>
      <ContactInfoContainer>
        <ContactInfoTitle>Contact Information</ContactInfoTitle>
        <ContainerCards className='cards'>
          {numbersMembers.map((card: CardInfoMemberType, index: number) => {
            return (
              <CardContainer key={index}>
                <CardInfoMember info={card} />
              </CardContainer>
            );
          })}
        </ContainerCards>
      </ContactInfoContainer>
      <Divider light sx={{ marginBottom: '32px', marginTop: '32px', color: '#D8E0E3', marginLeft: '32px', marginRight: '32px' }} variant='fullWidth' />
      <CardRelateMipsContainer>
        <TitleRelateMips>Related MIPs (Maker Improvement Proposals)</TitleRelateMips>
        <RelateMipCards>
          {relateMips.map((mip: RelateMipType, index: number) => {
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

export default CuAbout;

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
