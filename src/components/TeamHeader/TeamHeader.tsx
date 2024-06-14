import { styled, useMediaQuery } from '@mui/material';
import type { TeamRole } from '@/core/enums/teamRole';
import type { Team } from '@/core/models/interfaces/team';
import type { TeamStatus } from '@/core/models/interfaces/types';
import SocialMediaLinksButton from '../ButtonLink/SocialMediaLinksButton';
import CircleAvatar from '../CircleAvatar/CircleAvatar';
import Container from '../Container/Container';
import RoleChip from '../RoleChip/RoleChip';
import ScopeChip from '../ScopeChip/ScopeChip';
import { StatusChip } from '../StatusChip/StatusChip';
import type { Theme } from '@mui/material';

interface TeamHeaderProps {
  team: Team;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const chips = (
    <ScopeList>
      {team.scopes?.map((item, index) => (
        <ScopeChip scope={item} key={index} codeOnly={isMobile} />
      ))}
    </ScopeList>
  );

  return (
    <MainContainer>
      <Container>
        <Content>
          <TeamBasicInfo>
            <Avatar name={team.name} image={team.image} />
            <InfoContent>
              <TeamName>
                <Code>{team.shortCode}</Code> {team.name}
              </TeamName>
              <ChipsContainer>
                <StatusChip status={team.status as TeamStatus} />
                <RoleChip status={(team.category?.[0] ?? '') as TeamRole} />
              </ChipsContainer>
              {chips}
            </InfoContent>
          </TeamBasicInfo>

          <LinksContainer>
            <SocialMediaLinksButton socialMedia={team.socialMediaChannels?.[0]} />
          </LinksContainer>
        </Content>
        <Description>{team.sentenceDescription}</Description>
      </Container>
    </MainContainer>
  );
};

export default TeamHeader;

const MainContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 105,
  zIndex: 3,
  width: '100%',
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(25, 29, 36, 1)',
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
  flexWrap: 'wrap',
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
