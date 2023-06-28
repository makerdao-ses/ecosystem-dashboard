import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import ActorsContainer from '@ses/containers/Actors/ActorsContainer';
import { fetchActors } from '@ses/containers/Actors/api/queries';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';
import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  actors: EcosystemActor[];
}

const EcosystemActors: NextPage<Props> = ({ actors }) => <ActorsContainer actors={actors} />;

export default EcosystemActors;

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_ACTORS) {
    return {
      notFound: true,
    };
  }

  const actors = await fetchActors('EcosystemActor');
  return {
    props: {
      actors,
    },
  };
};
