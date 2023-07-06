import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import ActorAboutContainer from '@ses/containers/ActorsAbout/ActorAboutContainer';

import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';

import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

const ActorAbout: NextPage = ({ actor }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <ActorAboutContainer actor={actor} />
);

export default ActorAbout;

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_ACTORS_ABOUT) {
    return {
      notFound: true,
    };
  }
  const actor = {} as EcosystemActor;

  return {
    props: {
      actor,
    },
  };
};
