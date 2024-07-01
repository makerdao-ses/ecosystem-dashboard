import { DateTime } from 'luxon';
import BudgetStatementView from '@/views/BudgetStatement/BudgetStatementView';
import type { AllowedOwnerType } from '@/views/BudgetStatement/types';
import { allowedOwnerTypeToResourceType } from '@/views/BudgetStatement/utils';
import { getLastSnapshotPeriod } from '@/views/CoreUnitBudgetStatement/transparencyReportAPI';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

const BudgetStatementPage: NextPage = ({
  snapshotLimitPeriods,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <BudgetStatementView
    snapshotLimitPeriods={
      snapshotLimitPeriods
        ? {
            // deserialize the ISO strings to date objects
            earliest: DateTime.fromISO(snapshotLimitPeriods.earliest).toUTC(),
            latest: DateTime.fromISO(snapshotLimitPeriods.latest).toUTC(),
          }
        : undefined
    }
  />
);

export default BudgetStatementPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const ownerType = context.params?.ownerType as string;
  if (!ownerType || !['keepers', 'spfs', 'aligned-delegates'].includes(ownerType)) {
    return {
      notFound: true,
    };
  }

  const resourceType = allowedOwnerTypeToResourceType(ownerType as AllowedOwnerType);
  const snapshotLimitPeriods = await getLastSnapshotPeriod(null, resourceType);

  return {
    props: {
      snapshotLimitPeriods: snapshotLimitPeriods
        ? {
            // serialize the date objects to ISO strings
            earliest: snapshotLimitPeriods.earliest.toISO(),
            latest: snapshotLimitPeriods.latest.toISO(),
          }
        : null,
    },
  };
};
