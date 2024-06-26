import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import ActorProjectsContainer from '@ses/containers/ActorProjects/ActorProjectsContainer';
import { fetchProjects } from '@ses/containers/ActorProjects/api/query';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import { fetchActorAbout } from '@/views/EAAbout/api/queries';
import { fetchActors } from '@/views/EcosystemActorsIndexView/api/queries';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

const ProjectsPage: NextPage = ({
  actor,
  actors,
  projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <ActorProjectsContainer actors={actors} actor={actor} projects={projects} />
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

  const projects = await fetchProjects();

  return {
    props: {
      actors,
      actor,
      projects,
    },
  };
};
