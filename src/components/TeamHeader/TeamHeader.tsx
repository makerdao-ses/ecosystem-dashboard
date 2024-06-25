import { styled, useMediaQuery } from '@mui/material';
import type { TeamRole } from '@/core/enums/teamRole';
import type { Team } from '@/core/models/interfaces/team';
import type { TeamCategory, TeamStatus } from '@/core/models/interfaces/types';
import { ResourceType } from '@/core/models/interfaces/types';
import SocialMediaLinksButton from '../ButtonLink/SocialMediaLinksButton';
import CategoryChip from '../CategoryChip/CategoryChip';
import CircleAvatar from '../CircleAvatar/CircleAvatar';
import Container from '../Container/Container';
import RoleChip from '../RoleChip/RoleChip';
import ScopeChip from '../ScopeChip/ScopeChip';
import { StatusChip } from '../StatusChip/StatusChip';
import CoreUnitSubmissionLink from './CoreUnitSubmissionLink';
import type { Theme } from '@mui/material';

interface TeamHeaderProps {
  team: Team;
  className?: string;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ team, className }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const chips =
    team.type === ResourceType.EcosystemActor
      ? team.scopes?.length > 0 && (
          <ScopeList>
            {team.scopes?.map((item, index) => (
              <ScopeChip scope={item} key={index} codeOnly={isMobile} />
            ))}
          </ScopeList>
        )
      : team.category?.length > 0 && (
          <CategoryList>
            {team.category?.map((category) => (
              <CategoryChip category={category as TeamCategory} key={category} />
            ))}
          </CategoryList>
        );

  return (
    <MainContainer className={className}>
      <HeaderWrapper>
        <Container>
          <Content>
            <TeamBasicInfo>
              <Avatar name={team.name} image={team.image} />
              <InfoContent>
                <TeamName>
                  <Code>{team.shortCode}</Code> {team.name}
                </TeamName>
                <ChipsContainer>
                  {team.type === ResourceType.EcosystemActor ? (
                    <StatusChipStyled status={team.status as TeamStatus} />
                  ) : (
                    <StatusChipForCoreUnit status={team.status as TeamStatus} />
                  )}

                  {team.type === ResourceType.EcosystemActor ? (
                    <RoleChip status={(team.category?.[0] ?? '') as TeamRole} />
                  ) : (
                    <CoreUnitSubmissionLink team={team} />
                  )}
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
      </HeaderWrapper>
    </MainContainer>
  );
};

export default TeamHeader;

const MainContainer = styled('div')(({ theme }) => ({
  marginTop: 40,
  zIndex: 3,
  width: '100%',
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(25, 29, 36, 1)',
}));

const HeaderWrapper = styled('div')(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 8,
  borderBottom: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900]
  }`,
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
  width: '100%',
  maxWidth: 'calc(100% - 40px)',

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
  alignContent: 'center',
  width: '100%',
  maxWidth: 'calc(100% - 48px)',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

const ChipsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 4,

  '& > *': {
    alignSelf: 'center',
    textWrap: 'nowrap',
    height: 24,
  },

  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
}));

const StatusChipStyled = styled(StatusChip)(() => ({
  height: 24,
}));

const StatusChipForCoreUnit = styled(StatusChip)(({ theme }) => ({
  alignSelf: 'baseline',
  padding: '3px 4px 3px 4px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '1px 8px 1px 8px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '1px 16px 1px 16px',
  },
}));

const TeamName = styled('div')(({ theme }) => ({
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

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

const CategoryList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  marginTop: 8,
  marginLeft: -56,
  width: 'calc(100% + 96px)',

  [theme.breakpoints.up('tablet_768')]: {
    width: '100%',
    marginLeft: 0,
  },
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
