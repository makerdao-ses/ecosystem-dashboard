import request, { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '@/config/endpoints';
import type { ScopeOfWorkState } from '@/core/models/interfaces/roadmaps';

export const getScopeOfWorkState = async () => {
  const query = gql`
    query ScopeOfWorkState {
      scopeOfWorkState {
        roadmaps {
          id
          slug
          title
          description
          milestones {
            id
            sequenceCode
            code
            title
            abstract
            description
            targetDate
            scope {
              deliverables {
                id
                code
                title
                description
                status
                keyResults {
                  id
                  title
                  link
                }
                workProgress {
                  ... on StoryPoints {
                    __typename
                    total
                    completed
                  }
                  ... on Percentage {
                    __typename
                    value
                  }
                }
                budgetAnchor {
                  project {
                    code
                    title
                  }
                  workUnitBudget
                  deliverableBudget
                }
                owner {
                  id
                  ref
                  name
                  code
                  imageUrl
                }
              }
              status
              progress {
                ... on StoryPoints {
                  total
                  completed
                }
                ... on Percentage {
                  value
                }
              }
              totalDeliverables
              deliverablesCompleted
            }
            coordinators {
              imageUrl
              code
              name
              ref
              id
            }
            contributors {
              id
              ref
              name
              code
              imageUrl
            }
          }
        }
      }
    }
  `;

  const res = await request<{ scopeOfWorkState: ScopeOfWorkState }>(GRAPHQL_ENDPOINT, query);
  return res.scopeOfWorkState.roadmaps;
};
