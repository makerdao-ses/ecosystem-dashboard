import type { Team } from '@/core/models/interfaces/team';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import HomeView from '@/views/Home/HomeView';
import type { RevenueAndSpendingRecords } from '@/views/Home/api/queries';
import { getRevenueAndSpendingData } from '@/views/Home/api/queries';
import type { GetServerSideProps, NextPage } from 'next';

interface HomePageProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  teams: Team[];
}

const HomePage: NextPage<HomePageProps> = ({ revenueAndSpendingData, teams }) => (
  <HomeView revenueAndSpendingData={revenueAndSpendingData} teams={teams} />
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const revenueAndSpendingData = await getRevenueAndSpendingData();
  const teams = await fetchActors();

  return {
    props: {
      revenueAndSpendingData,
      teams,
    },
  };
};
