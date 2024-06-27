import { ResourceType } from '@ses/core/models/interfaces/types';
import React from 'react';
import EcosystemActorsIndexView from '@/views/EcosystemActorsIndex/EcosystemActorsIndexView';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import type { Team } from '@ses/core/models/interfaces/team';
import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  actors: Team[];
}

const EcosystemActors: NextPage<Props> = ({ actors }) => <EcosystemActorsIndexView actors={actors} />;

export default EcosystemActors;

export const getServerSideProps: GetServerSideProps = async () => {
  const actors = await fetchActors(ResourceType.EcosystemActor);

  return {
    props: {
      actors,
    },
  };
};
