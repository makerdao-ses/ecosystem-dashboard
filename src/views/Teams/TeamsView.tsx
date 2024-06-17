import { styled } from '@mui/material';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import TeamsSections from './components/TeamsSections/TeamsSections';
import { currentTeams, legacyTeams } from './staticData';

const TeamsView: React.FC = () => (
  <TeamsPageContainer>
    <Container>
      <SectionsContainer>
        <TeamsSections sectionName="Current teams" teams={currentTeams} />

        <TeamsSections sectionName="Legacy" teams={legacyTeams} />
      </SectionsContainer>
    </Container>
  </TeamsPageContainer>
);

export default TeamsView;

const TeamsPageContainer = styled(PageContainer)(() => ({
  marginTop: 32,
}));

const SectionsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
}));
