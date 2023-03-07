import { createContext, useContext } from 'react';
import type { LastVisitHandler } from '../utils/lastVisitHandler';

export type CommentActivityContextValues = {
  lastVisitHandler?: LastVisitHandler;
};

export const CommentActivityContext = createContext<CommentActivityContextValues>({});

export const useCommentActivityContext = () => useContext(CommentActivityContext)?.lastVisitHandler;
