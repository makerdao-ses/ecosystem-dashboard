import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { Team } from '@ses/core/models/interfaces/team';
import type { ResourceType } from '@ses/core/models/interfaces/types';

export const getAllActors = (teamType: ResourceType) => ({
  query: gql`
    query teams($filter: TeamFilter) {
      teams(filter: $filter) {
        id
        image
        code
        shortCode
        name
        type
        lastActivity {
          created_at
          description
          event
          id
          params
        }
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
        auditors {
          id
          username
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

export const fetchActors = async (teamType: ResourceType): Promise<Team[]> => {
  const { query, filter } = getAllActors(teamType);
  const res = await request<{ teams: Team[] }>(GRAPHQL_ENDPOINT, query, filter);
  return res.teams;
};
