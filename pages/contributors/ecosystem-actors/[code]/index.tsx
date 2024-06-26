import { TeamContext } from '@ses/core/context/TeamContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import React, { useEffect, useState } from 'react';
import EcosystemActorAboutView from '@/views/EcosystemActorAbout/EcosystemActorAboutView';
import { fetchActorAbout } from '@/views/EcosystemActorAbout/api/queries';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import type { Team } from '@ses/core/models/interfaces/team';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

const ActorAbout: NextPage = ({ actors, actor }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentActor, setCurrentActor] = useState<Team>(actor);
  useEffect(() => {
    setCurrentActor(actor);
  }, [actor]);

  return (
    <TeamContext.Provider
      value={{
        currentTeam: currentActor,
        teams: actors,
        setCurrentTeam: setCurrentActor,
      }}
    >
      <EcosystemActorAboutView actors={actors} actor={actor} />
    </TeamContext.Provider>
  );
};

export default ActorAbout;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;
  const [actors, actor] = await Promise.all([
    fetchActors(ResourceType.EcosystemActor),
    fetchActorAbout(ResourceType.EcosystemActor, code),
  ]);

  if (!actor) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      actors,
      actor,
    },
  };
};
