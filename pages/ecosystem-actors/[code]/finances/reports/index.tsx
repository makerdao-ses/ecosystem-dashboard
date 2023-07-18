import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { fetchActors } from '@ses/containers/Actors/api/queries';
import ActorsTransparencyReportContainer from '@ses/containers/ActorsTransparencyReport/ActorsTransparencyReportContainer';
import { fetchEcosystemActor } from '@ses/containers/ActorsTransparencyReport/api/queries';
import { fetchExpenseCategories } from '@ses/containers/FinancesOverview/api/queries';
import { ActorContext } from '@ses/core/context/ActorContext';
import { featureFlags } from 'feature-flags/feature-flags';
import React, { useEffect, useState } from 'react';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

const EcosystemActorsTransparencyReportingPage: NextPage = ({
  actor,
  actors,
  expenseCategories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentActor, setCurrentActor] = useState(actor);
  useEffect(() => {
    setCurrentActor(currentActor);
  }, [currentActor]);

  return (
    <ActorContext.Provider
      value={{
        actor,
        actors,
        setCurrentActor,
      }}
    >
      <ActorsTransparencyReportContainer actor={actor} actors={actors} expenseCategories={expenseCategories} />
    </ActorContext.Provider>
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
    fetchActors('EcosystemActor'),
    fetchEcosystemActor(code),
    fetchExpenseCategories(),
  ]);

  if (!actor) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      actor,
      actors,
      expenseCategories,
    },
  };
};
