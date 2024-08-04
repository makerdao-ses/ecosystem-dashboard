import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import type { Team } from '@/core/models/interfaces/team';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import HomeView from '@/views/Home/HomeView';
import { getGovernanceProposals } from '@/views/Home/api/makervoteQueries';
import type { RevenueAndSpendingRecords } from '@/views/Home/api/queries';
import { getRevenueAndSpendingData } from '@/views/Home/api/queries';
import type { GetServerSideProps, NextPage } from 'next';

interface HomePageProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  teams: Team[];
  governanceProposals: ExtendedExecutiveProposal[];
}

const HomePage: NextPage<HomePageProps> = ({ revenueAndSpendingData, teams, governanceProposals }) => (
  <HomeView revenueAndSpendingData={revenueAndSpendingData} teams={teams} governanceProposals={governanceProposals} />
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const revenueAndSpendingData = await getRevenueAndSpendingData();
  const teams = await fetchActors();
  const governanceProposals = await getGovernanceProposals();

  return {
    props: {
      revenueAndSpendingData,
      teams,
      governanceProposals,
    },
  };
};
