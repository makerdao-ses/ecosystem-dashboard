import EndgameContainer from '@ses/containers/Endgame/EndgameContainer';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import React from 'react';
import type { Analytic } from '@ses/core/models/interfaces/analytic';

interface EndgamePageProps {
  budgetStructureAnalytics: Analytic;
  budgetTransitionAnalytics: Analytic;
}

const EndgamePage: React.FC<EndgamePageProps> = ({ budgetStructureAnalytics, budgetTransitionAnalytics }) => (
  <EndgameContainer
    budgetStructureAnalytics={budgetStructureAnalytics}
    budgetTransitionAnalytics={budgetTransitionAnalytics}
  />
);

export default EndgamePage;

export async function getServerSideProps() {
  const budgetStructureAnalytics = await fetchAnalytics('total', [2021, 2024], 'atlas', 2);
  const budgetTransitionAnalytics = await fetchAnalytics('quarterly', [2021, 2024], 'atlas', 2);

  return {
    props: {
      budgetStructureAnalytics,
      budgetTransitionAnalytics,
    },
  };
}
