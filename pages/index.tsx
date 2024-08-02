import HomeView from '@/views/Home/HomeView';
import type { RevenueAndSpendingRecords } from '@/views/Home/api/queries';
import { getRevenueAndSpendingData } from '@/views/Home/api/queries';
import type { FC } from 'react';

interface HomePageProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
}

const HomePage: FC<HomePageProps> = ({ revenueAndSpendingData }) => (
  <HomeView revenueAndSpendingData={revenueAndSpendingData} />
);

export default HomePage;

export const getServerSideProps = async () => {
  const revenueAndSpendingData = await getRevenueAndSpendingData();

  return {
    props: {
      revenueAndSpendingData,
    },
  };
};
