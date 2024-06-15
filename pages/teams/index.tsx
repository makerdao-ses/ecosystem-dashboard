import type { Team } from '@/core/models/interfaces/team';
import TeamsView from '@/views/Teams/TeamsView';
import { fetchTeamsType } from '@/views/Teams/api/queries';

interface TeamsPageProps {
  teamTypes: Team[];
}

const TeamsPage: React.FC<TeamsPageProps> = ({ teamTypes }) => <TeamsView teamTypes={teamTypes} />;

export default TeamsPage;

export async function getServerSideProps() {
  const teamTypes = await fetchTeamsType();

  return {
    props: {
      teamTypes,
    },
  };
}
