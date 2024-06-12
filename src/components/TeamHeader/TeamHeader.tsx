import { Container, styled, useMediaQuery } from '@mui/material';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import { TeamRole } from '@/core/enums/teamRole';
import { TeamStatus } from '@/core/models/interfaces/types';
import ButtonLinkOptions from '../ButtonLink/ButtonLinkOptions';
import CircleAvatar from '../CircleAvatar/CircleAvatar';
import RoleChip from '../RoleChip/RoleChip';
import ScopeChip from '../ScopeChip/ScopeChip';
import { StatusChip } from '../StatusChip/StatusChip';
import type { Theme } from '@mui/material';

interface TeamHeaderProps {
  code: string;
  name: string;
}

const TeamHeader: React.FC<TeamHeaderProps> = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const chips = (
    <ScopeList>
      <ScopeChip
        scope={{
          id: '1',
          code: 'GOV',
          name: TeamScopeEnum.GovernanceScope,
        }}
        codeOnly={isMobile}
      />
      <ScopeChip
        scope={{
          id: '2',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        }}
        codeOnly={isMobile}
      />
      <ScopeChip
        scope={{
          id: '3',
          code: 'PRO',
          name: TeamScopeEnum.ProtocolScope,
        }}
        codeOnly={isMobile}
      />
    </ScopeList>
  );

  return (
    <MainContainer>
      <Container>
        <Content>
          <TeamBasicInfo>
            <Avatar name="Team" />
            <InfoContent>
              <TeamName>
                <Code>PH</Code> Powerhouse
              </TeamName>
              <ChipsContainer>
                <StatusChip status={TeamStatus.Accepted} />
                <RoleChip status={TeamRole.AdvisoryCouncilMember} />
              </ChipsContainer>
              {chips}
            </InfoContent>
          </TeamBasicInfo>

          <LinksContainer>
            <ButtonLinkOptions label={isMobile ? undefined : 'Links'} />
          </LinksContainer>
        </Content>
        <Description>
          The aim of SES is to sustainably grow the Maker Protocol's moats by systematically removing barriers between
          the decentralized workforce, capital, and work.
        </Description>
      </Container>
    </MainContainer>
  );
};

export default TeamHeader;

const MainContainer = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900]
  }`,
  paddingTop: 16,
  paddingBottom: 8,
}));

const Content = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  gap: 8,
}));

const TeamBasicInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
}));

const Avatar = styled(CircleAvatar)(({ theme }) => ({
  width: 48,
  height: 48,
  minWidth: 48,
  minHeight: 48,

  [theme.breakpoints.up('tablet_768')]: {
    width: 56,
    height: 56,
    minWidth: 56,
    minHeight: 56,
  },
}));

const InfoContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

const ChipsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 4,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
}));

const TeamName = styled('div')(({ theme }) => ({
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 16,
    fontSize: 20,
    fontWeight: 700,
  },
}));

const Code = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[400] : theme.palette.colors.gray[600],
}));

const ScopeList = styled('div')(() => ({
  display: 'flex',
  gap: 8,
  marginTop: 8,
  width: '100%',
}));

const LinksContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
}));

const Description = styled('div')(({ theme }) => ({
  marginTop: 8,
  fontSize: 12,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 16,
    fontSize: 14,
    paddingLeft: 72,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
  },
}));
