import { TeamContext } from '@ses/core/context/TeamContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import React, { useEffect, useState } from 'react';
import { fetchActors } from '@/views/Actors/api/queries';
import EAAboutView from '@/views/EAAbout/EAAboutView';
import { fetchActorAbout } from '@/views/EAAbout/api/queries';
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
      <EAAboutView actors={actors} actor={actor} />
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
