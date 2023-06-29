import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { TeamType, EcosystemActor } from '@ses/core/models/dto/teamsDTO';

export const getAllActors = (teamType: TeamType) => ({
  query: gql`
    query teams($filter: TeamFilter) {
      teams(filter: $filter) {
        id
        image
        code
        name
        type
        category
        socialMediaChannels {
          forumTag
          github
          discord
          website
          twitter
          linkedIn
          youtube
        }
        scopes {
          id
          code
          name
        }
      }
    }
  `,
  filter: {
    filter: {
      type: teamType,
    },
  },
});

export const fetchActors = async (teamType: TeamType): Promise<EcosystemActor[]> => {
  const { query, filter } = getAllActors(teamType);
  const res = await request<{ teams: EcosystemActor[] }>(GRAPHQL_ENDPOINT, query, filter);
  return res.teams;
};
