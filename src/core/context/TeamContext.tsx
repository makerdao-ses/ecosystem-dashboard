import { useContext, createContext } from 'react';
import type { Team } from '../models/interfaces/team';

export type TeamContextValues = {
  teams?: Team[];
  currentTeam?: Team;
  setCurrentTeam: (team: Team) => void;
};

export const TeamContext = createContext<TeamContextValues>({
  setCurrentTeam: () => {
    throw new Error('Not implemented yet');
  },
});

export const useTeamContext = () => useContext(TeamContext);
