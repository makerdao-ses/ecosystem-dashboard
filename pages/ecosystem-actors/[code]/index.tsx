import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { fetchActors } from '@ses/containers/Actors/api/queries';
import ActorAboutContainer from '@ses/containers/ActorsAbout/ActorAboutContainer';
import { fetchActorAbout } from '@ses/containers/ActorsAbout/api/queries';
import { ActorContext } from '@ses/core/context/ActorContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { featureFlags } from 'feature-flags/feature-flags';
import React, { useEffect, useState } from 'react';
import type { Team } from '@ses/core/models/interfaces/team';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

const ActorAbout: NextPage = ({ actors, actor }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentActor, setCurrentActor] = useState<Team>(actor);
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
      <ActorAboutContainer actors={actors} actor={actor} />
    </ActorContext.Provider>
  );
};

export default ActorAbout;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_ACTORS) {
    return {
      notFound: true,
    };
  }
  const { query } = context;
  const code = query.code as string;
  const [actors, actor] = await Promise.all([
    fetchActors(ResourceType.EcosystemActor),
    fetchActorAbout(ResourceType.EcosystemActor, code),
  ]);

  return {
    props: {
      actors,
      actor,
    },
  };
};
