import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Divider, Typography } from '@mui/material';
import SmallButton from '../../../components/button/small-button/small-button';
import CardInfoMember, { CardInfoMemberType } from '../../../components/card-info-member/card-info-member';
import { LinkModel } from '../../../components/cu-table-column-links/cu-table-column-links';
import MdViewerContainer from '../../../components/markdown/md-view-container';
import InsidePagination from '../../../components/pagination/InsidePagination';
import TeamMember from '../../../components/team-members/team-member';
import TitleNavigationCuAbout from '../../../components/title-navigation-cu-about/title-navigation-cu-about';
import RelateMips, { RelateMipType } from '../../../components/relate-mips/relate-mips';
import BigButton from '../../../components/button/big-button/big-button';
import { CuStatusEnum } from '../../../../core/enums/cu-status.enum';
import { LinkTypeEnum } from '../../../../core/enums/link-type.enum';

const CuAbout = () => {
  const sentenceDescription = 'SES aims to sustainably grow the Maker Protocol’s moats by removing barriers between decentralized workforce, capital, and work.';
  const paragraphDescription = '**Vision**\n    \n    An effective, decentralized, and scalable ecosystem:\n    \n    1. The industry’s best on-boarding experience and retention rate\n    2. Easy to find the capital needed for the best projects to work on:\n        1. Optimal driving force for protocol growth\n        2. Most fulfilling for the project’s participants\n    3. Resilient safety mechanisms\n        1. Preventing protocol failure\n        2. Allow for rapid innovation and experimentation\n \n **Strategy**\n \n    - Opportunity & Risk Assessment\n        - Engage with the different DAO stakeholders and keep an open backlog accessible to the broader Community.\n        - Prioritize issues based on importance and risk and build a Road Map to tackle these issues.\n    - Research\n        - Research the opportunities and issues, with a data-centric approach.\n        - Explore solutions and frameworks that produce high-quality, repeatable results.\n    - Incubate\n        - Set groups for success into becoming a functional Core Unit answering a specific need for the DAO. Guide and support them through the process.\n        - Feedback the research through continuous improvement to accelerate the scale and improve the success rate of new Core Units.';
  const paragraphImage = 'https://gateway-proxy-bee-9-0.gateway.ethswarm.org/bzz/1fe299c01206d1d422cf79a60ea49b8a77b04382f8d25745842eb2a199eb4389';
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
      linkType: LinkTypeEnum.WWW,
      href: '#',
    },
    {
      linkType: LinkTypeEnum.Forum,
      href: '#',
    },
    {
      linkType: LinkTypeEnum.Discord,
      href: '#',
    },
    {
      linkType: LinkTypeEnum.Twitter,
      href: '#',
    },
    {
      linkType: LinkTypeEnum.Youtube,
      href: '#',
    },
    {
      linkType: LinkTypeEnum.LinkedIn,
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
        <MdViewerContainer paragraphDescription={paragraphDescription} paragraphImage={paragraphImage} sentenceDescription={sentenceDescription} />
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
      <Divider light sx={{ marginBottom: '32px', color: '#D8E0E3', marginLeft: '32px', marginRight: '32px' }} variant='fullWidth' />
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
        <BigButton title='See fewer MIPs' />

      </ButtonContainer>
    </ContainerAbout>
  );
};

export default CuAbout;

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
  paddingLeft: '44px'

});

const PaddingComponent = styled.div({
  marginLeft: '33px'
});

const ContainerTitle = styled.div({
  display: 'flex',
  marginLeft: '32px',
  marginRight: '38px',
  marginTop: '32px',
  marginBottom: '24px'
});

const MarkdownContainer = styled.div({
  marginLeft: '32px',
  marginRight: '32px'
});

const TeamMemberContainer = styled.div({
  display: 'flex',
  justifyContent: 'row',
  alignItems: 'center',
  marginLeft: '32px',
});

const TeamMemberTitle = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  marginRight: '16px',
  color: '#000000'
});

const ContactInfoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '182px',
  marginTop: '48px'
});

const ContactInfoTitle = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  color: '#000000',
  marginLeft: '32px'
});

const ContainerCards = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  columnGap: '32px',
  gridAutoRows: 'minmax(100px,auto)',
  marginLeft: '32px',
  marginRight: '32px',
  marginTop: '32px'
});

const CardContainer = styled.div({
  marginBottom: '32px',
  marginTop: '24px'
});

const CardRelateMipsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '32px',
  marginRight: '32px',
  marginBottom: '33px',
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
  marginTop: '24px'
});

const RelateMipCard = styled.div({
  marginBottom: '24px'
});

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: '26px'
});
