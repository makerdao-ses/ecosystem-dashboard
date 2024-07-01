import { fetchExpenseCategories } from '@ses/containers/FinancesOverview/api/queries';
import { TeamContext } from '@ses/core/context/TeamContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { getLastSnapshotPeriod } from '@/views/CoreUnitBudgetStatement/transparencyReportAPI';
import EcosystemActorBudgetStatementView from '@/views/EcosystemActorBudgetStatement/EcosystemActorBudgetStatementView';
import { fetchEcosystemActor } from '@/views/EcosystemActorBudgetStatement/api/queries';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

const EcosystemActorsTransparencyReportingPage: NextPage = ({
  actor,
  actors,
  expenseCategories,
  snapshotLimitPeriods,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentActor, setCurrentActor] = useState(actor);
  useEffect(() => {
    setCurrentActor(actor);
  }, [actor]);

  return (
    // make the actors accessible from the comments
    <TeamContext.Provider
      value={{
        currentTeam: currentActor,
        teams: actors,
        setCurrentTeam: setCurrentActor,
      }}
    >
      <EcosystemActorBudgetStatementView
        actor={currentActor}
        actors={actors}
        expenseCategories={expenseCategories}
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
    </TeamContext.Provider>
  );
};

export default EcosystemActorsTransparencyReportingPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;
  const [actors, actor, expenseCategories] = await Promise.all([
    fetchActors(ResourceType.EcosystemActor),
    fetchEcosystemActor(code),
    fetchExpenseCategories(),
  ]);

  if (!actor) {
    return {
      notFound: true,
    };
  }

  const snapshotLimitPeriods = await getLastSnapshotPeriod(actor.id, ResourceType.EcosystemActor);

  return {
    props: {
      actor,
      actors,
      expenseCategories,
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
