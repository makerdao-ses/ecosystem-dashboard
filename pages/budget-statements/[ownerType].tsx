import BudgetStatementView from '@/views/BudgetStatement/BudgetStatementView';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const BudgetStatementPage: NextPage = () => <BudgetStatementView />;

export default BudgetStatementPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const ownerType = context.params?.ownerType as string;
  if (!ownerType || !['keepers', 'spfs', 'recognized-delegates'].includes(ownerType)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};
