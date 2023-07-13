import { useContext, createContext } from 'react';
import type { EcosystemActor } from '../models/dto/teamsDTO';

export type ActorContextValues = {
  actors?: EcosystemActor[];
  actor?: EcosystemActor;
  setCurrentActor: (actor: EcosystemActor) => void;
};

export const ActorContext = createContext<ActorContextValues>({
  setCurrentActor: () => {
    throw new Error('Not implemented yet');
  },
});

export const useActorContext = () => useContext(ActorContext);
