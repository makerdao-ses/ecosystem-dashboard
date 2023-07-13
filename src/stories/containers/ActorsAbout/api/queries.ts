import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { TeamType, EcosystemActor } from '@ses/core/models/dto/teamsDTO';

export const getActorAbout = (teamType: TeamType, code: string) => ({
  query: gql`
    query teams($filter: TeamFilter) {
      teams(filter: $filter) {
        id
        image
        code
        name
        type
        paragraphDescription
        sentenceDescription
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
      code,
    },
  },
});

export const fetchActorAbout = async (teamType: TeamType, code: string): Promise<EcosystemActor> => {
  const { query, filter } = getActorAbout(teamType, code);
  const res = await request<{ teams: EcosystemActor[] }>(GRAPHQL_ENDPOINT, query, filter);
  return res.teams[0];
};
