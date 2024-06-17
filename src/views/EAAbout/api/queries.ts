import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { Team } from '@ses/core/models/interfaces/team';
import type { ResourceType } from '@ses/core/models/interfaces/types';

export const getActorAbout = (teamType: ResourceType, code: string) => ({
  query: gql`
    query teams($filter: TeamFilter) {
      teams(filter: $filter) {
        id
        image
        code
        shortCode
        name
        type
        status
        budgetPath
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
      shortCode: code,
    },
  },
});

export const fetchActorAbout = async (teamType: ResourceType, code: string): Promise<Team> => {
  const { query, filter } = getActorAbout(teamType, code);
  const res = await request<{ teams: Team[] }>(GRAPHQL_ENDPOINT, query, filter);
  return res?.teams?.[0];
};
