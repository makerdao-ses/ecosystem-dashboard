import { createContext, useContext } from 'react';
import { LastVisitHandler } from '../utils/last-visit-handler';

export type CommentActivityContextValues = {
  lastVisitHandler?: LastVisitHandler;
};

export const CommentActivityContext = createContext<CommentActivityContextValues>({});

export const useCommentActivityContext = () => useContext(CommentActivityContext)?.lastVisitHandler;
