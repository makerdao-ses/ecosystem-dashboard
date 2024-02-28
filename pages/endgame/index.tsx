import EndgameContainer from '@ses/containers/Endgame/EndgameContainer';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import React from 'react';
import type { Analytic } from '@ses/core/models/interfaces/analytic';

interface EndgamePageProps {
  budgetStructureAnalytics: Analytic;
}

const EndgamePage: React.FC<EndgamePageProps> = ({ budgetStructureAnalytics }) => (
  <EndgameContainer budgetStructureAnalytics={budgetStructureAnalytics} />
);

export default EndgamePage;

export async function getServerSideProps() {
  const budgetStructureAnalytics = await fetchAnalytics('total', [2021, 2024], 'atlas', 2);

  return {
    props: {
      budgetStructureAnalytics,
    },
  };
}
