import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import ActorProjectsContainer from '@ses/containers/ActorProjects/ActorProjectsContainer';
import { fetchActors } from '@ses/containers/Actors/api/queries';
import { fetchActorAbout } from '@ses/containers/ActorsAbout/api/queries';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

const ProjectsPage: NextPage = ({ actor, actors }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <ActorProjectsContainer actors={actors} actor={actor} />
);

export default ProjectsPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_TEAM_PROJECTS) {
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
