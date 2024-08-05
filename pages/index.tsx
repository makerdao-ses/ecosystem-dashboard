import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import type { Team } from '@/core/models/interfaces/team';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import HomeView from '@/views/Home/HomeView';
import { getGovernanceProposals } from '@/views/Home/api/makervoteQueries';
import type { RevenueAndSpendingRecords } from '@/views/Home/api/queries';
import { getRevenueAndSpendingData } from '@/views/Home/api/queries';
import { getScopeOfWorkState } from '@/views/RoadmapMilestones/api/queries';
import type { GetServerSideProps, NextPage } from 'next';

interface HomePageProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  teams: Team[];
  governanceProposals: ExtendedExecutiveProposal[];
  roadmaps: Roadmap[];
}

const HomePage: NextPage<HomePageProps> = ({ revenueAndSpendingData, teams, governanceProposals, roadmaps }) => (
  <HomeView
    revenueAndSpendingData={revenueAndSpendingData}
    teams={teams}
    governanceProposals={governanceProposals}
    roadmaps={roadmaps}
  />
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const revenueAndSpendingData = await getRevenueAndSpendingData();
  const teams = await fetchActors();
  const governanceProposals = await getGovernanceProposals();
  const roadmaps = await getScopeOfWorkState();

  return {
    props: {
      revenueAndSpendingData,
      teams,
      governanceProposals,
      roadmaps,
    },
  };
};
