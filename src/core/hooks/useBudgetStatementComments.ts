import { DateTime } from 'luxon';
import { useEffect, useMemo, useReducer } from 'react';
import { getAllCommentsBudgetStatementLine } from '../business-logic/coreUnits';
import { useCookiesContextTracking } from '../context/CookiesContext';
import { isActivity } from '../utils/typesHelpers';
import type { ActivityFeedDto, BudgetStatementDto, CommentsBudgetStatementDto } from '../models/dto/coreUnitDTO';
import type { LastVisitHandler } from '../utils/lastVisitHandler';
import type { WithDate } from '../utils/typesHelpers';

type CommentsLastVisitState = {
  hasNewComments: boolean;
  isFetching: boolean;
};
type CommentLastVisitAction = {
  type: 'START_FETCHING' | 'SET_HAS_NEW_COMMENTS';
  hasNewComments?: boolean;
};

const useBudgetStatementComments = (
  budgetStatement: BudgetStatementDto | undefined,
  lastVisitHandler: LastVisitHandler | undefined,
  isCommentsTabActive: boolean
) => {
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();

  const comments = useMemo(() => {
    const comments = getAllCommentsBudgetStatementLine(budgetStatement) as (CommentsBudgetStatementDto & WithDate)[];
    let activities = budgetStatement?.activityFeed.filter(
      (activity) => activity.event === 'CU_BUDGET_STATEMENT_CREATED'
    ) as (ActivityFeedDto & WithDate)[];
    activities =
      activities?.map((activity) => {
        activity.date = DateTime.fromISO(activity.created_at);
        return activity;
      }) || [];
    const result = (comments as unknown[]).concat(activities) as WithDate[];
    result.sort((a, b) => a.date.toMillis() - b.date.toMillis());

    return result as unknown as (CommentsBudgetStatementDto | ActivityFeedDto)[];
  }, [budgetStatement]);

  const numbersComments = useMemo(() => comments.length, [comments]);

  // "hasNewComments" related logic
  const [commentsLastVisitState, commentsLastVisitDispatch] = useReducer(
    (state: CommentsLastVisitState, action: CommentLastVisitAction): never | CommentsLastVisitState => {
      switch (action.type) {
        case 'START_FETCHING':
          return {
            hasNewComments: false,
            isFetching: true,
          };
        case 'SET_HAS_NEW_COMMENTS':
          return {
            isFetching: false,
            hasNewComments: !!action.hasNewComments,
          };
        default:
          throw new Error(`Unhandled action type: ${action.type}. Current state: ${state}`);
      }
    },
    {
      isFetching: false,
      hasNewComments: false,
    }
  );

  const updateHasNewComments = async (date?: DateTime) => {
    commentsLastVisitDispatch({ type: 'START_FETCHING' });
    const lastVisit = date || (await lastVisitHandler?.lastVisit());
    if (lastVisit) {
      let hasNewComments: boolean = comments.length > 0 && !lastVisit;
      for (const comment of comments) {
        const commentDate = isActivity(comment)
          ? DateTime.fromISO(comment.created_at)
          : DateTime.fromISO(comment.timestamp);
        if (commentDate > lastVisit) {
          hasNewComments = true;
          break;
        }
      }
      commentsLastVisitDispatch({
        type: 'SET_HAS_NEW_COMMENTS',
        hasNewComments,
      });
    } else {
      commentsLastVisitDispatch({
        type: 'SET_HAS_NEW_COMMENTS',
        hasNewComments: comments.length > 0,
      });
    }
  };

  useEffect(() => {
    updateHasNewComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastVisitHandler, comments]);

  // update the visit date (preventing multiple renderings)
  let timeout: NodeJS.Timeout;
  useEffect(() => {
    clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timeout = setTimeout(async () => {
      if (isTimestampTrackingAccepted && isCommentsTabActive) {
        const lastVisit = (await lastVisitHandler?.visit()) || DateTime.now().toMillis();
        await updateHasNewComments(DateTime.fromMillis(lastVisit));
      }
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [lastVisitHandler, isTimestampTrackingAccepted, isCommentsTabActive]);
  // end of "hasNewComments" related logic

  return {
    comments,
    numbersComments,
    commentsLastVisitState,
    updateHasNewComments,
  };
};

export default useBudgetStatementComments;
