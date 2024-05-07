import BudgetStatementContainer from '@ses/containers/BudgetStatement/BudgetStatementContainer';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const BudgetStatementPage: NextPage = () => <BudgetStatementContainer />;

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
