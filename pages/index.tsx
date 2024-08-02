import type { Team } from '@/core/models/interfaces/team';

import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import HomeView from '@/views/Home/HomeView';
import type { GetServerSideProps, NextPage } from 'next';
interface Props {
  teams: Team[];
}
const HomePage: NextPage<Props> = ({ teams }) => <HomeView teams={teams} />;

export const getServerSideProps: GetServerSideProps = async () => {
  const teams = await fetchActors();

  return {
    props: {
      teams,
    },
  };
};

export default HomePage;
