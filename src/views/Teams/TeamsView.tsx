import { styled } from '@mui/material';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import { SEOHead } from '@/stories/components/SEOHead/SEOHead';
import TeamsSections from './components/TeamsSections/TeamsSections';
import { currentTeams, legacyTeams } from './staticData';

const TeamsView: React.FC = () => (
  <TeamsPageContainer>
    <SEOHead
      title="MakerDAO | Teams"
      description="MakerDAO Teams page provides an overview of the categories, descriptions and number of teams contributing to the Endgame Ecosystem."
    />
    <Container>
      <SectionsContainer>
        <TeamsSections sectionName="Current teams" teams={currentTeams} />

        <TeamsSections sectionName="Legacy teams" teams={legacyTeams} />
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
