import { styled } from '@mui/material';
import TeamTypeCard from '../TeamTypeCard/TeamTypeCard';

export interface TeamType {
  name: string;
  teams: number;
  href: string;
  description: string;
}

interface TeamsSectionsProps {
  sectionName: string;
  teams: TeamType[];
}

const TeamsSections: React.FC<TeamsSectionsProps> = ({ sectionName, teams }) => (
  <SectionContainer>
    <Title>{sectionName}</Title>

    {teams.map((team) => (
      <TeamTypeCard key={team.name} name={team.name} teams={team.teams} href={team.href}>
        {team.description}
      </TeamTypeCard>
    ))}
  </SectionContainer>
);

export default TeamsSections;

const SectionContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const Title = styled('h2')(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: 18,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));
