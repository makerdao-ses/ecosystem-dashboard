import { useContext, createContext } from 'react';
import type { Team } from '../models/interfaces/team';

export type ActorContextValues = {
  actors?: Team[];
  actor?: Team;
  setCurrentActor: (actor: Team) => void;
};

export const ActorContext = createContext<ActorContextValues>({
  setCurrentActor: () => {
    throw new Error('Not implemented yet');
  },
});

export const useActorContext = () => useContext(ActorContext);
