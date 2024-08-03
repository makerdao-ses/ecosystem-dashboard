import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import type { Team } from '@/core/models/interfaces/team';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import HomeView from '@/views/Home/HomeView';
import type { RevenueAndSpendingRecords } from '@/views/Home/api/queries';
import { getRevenueAndSpendingData } from '@/views/Home/api/queries';
import { getScopeOfWorkState } from '@/views/RoadmapMilestones/api/queries';
import type { GetServerSideProps, NextPage } from 'next';

interface HomePageProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  teams: Team[];
  roadmaps: Roadmap[];
}

const HomePage: NextPage<HomePageProps> = ({ revenueAndSpendingData, teams, roadmaps }) => (
  <HomeView revenueAndSpendingData={revenueAndSpendingData} teams={teams} roadmaps={roadmaps} />
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const revenueAndSpendingData = await getRevenueAndSpendingData();
  const teams = await fetchActors();
  const roadmaps = await getScopeOfWorkState();

  return {
    props: {
      revenueAndSpendingData,
      teams,
      roadmaps,
    },
  };
};
