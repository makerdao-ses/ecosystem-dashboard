import { styled } from '@mui/material';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import type { Team } from '@/core/models/interfaces/team';
import TeamsSections from './components/TeamsSections/TeamsSections';
import useTeamView from './useTeamView';

interface TeamsViewProps {
  teamTypes: Team[];
}

const TeamsView: React.FC<TeamsViewProps> = ({ teamTypes }) => {
  const { currentTeams, legacyTeams } = useTeamView(teamTypes);

  return (
    <TeamsPageContainer>
      <Container>
        <SectionsContainer>
          <TeamsSections sectionName="Current teams" teams={currentTeams} />

          <TeamsSections sectionName="Legacy" teams={legacyTeams} />
        </SectionsContainer>
      </Container>
    </TeamsPageContainer>
  );
};

export default TeamsView;

const TeamsPageContainer = styled(PageContainer)(() => ({
  marginTop: 32,
}));

const SectionsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
}));
