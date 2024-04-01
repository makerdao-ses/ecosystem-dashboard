import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { fetchActors } from '@ses/containers/Actors/api/queries';
import ActorsTransparencyReportContainer from '@ses/containers/ActorsTransparencyReport/ActorsTransparencyReportContainer';
import { fetchEcosystemActor } from '@ses/containers/ActorsTransparencyReport/api/queries';
import { fetchExpenseCategories } from '@ses/containers/FinancesOverview/api/queries';
import { getLastSnapshotPeriod } from '@ses/containers/TransparencyReport/transparencyReportAPI';
import { TeamContext } from '@ses/core/context/TeamContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { featureFlags } from 'feature-flags/feature-flags';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
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
      <ActorsTransparencyReportContainer
        actor={currentActor}
        actors={actors}
        expenseCategories={expenseCategories}
        snapshotLimitPeriods={
          snapshotLimitPeriods
            ? {
                // deserialize the ISO strings to date objects
                earliest: DateTime.fromISO(snapshotLimitPeriods.earliest),
                latest: DateTime.fromISO(snapshotLimitPeriods.latest),
              }
            : undefined
        }
      />
    </TeamContext.Provider>
  );
};

export default EcosystemActorsTransparencyReportingPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_ACTORS_TRANSPARENCY_REPORTING) {
    return {
      notFound: true,
    };
  }

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
            earliest: snapshotLimitPeriods.earliest,
            latest: snapshotLimitPeriods.latest,
          }
        : null,
    },
  };
};
