import EndgameContainer from '@ses/containers/Endgame/EndgameContainer';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { DateTime } from 'luxon';
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
  const [budgetStructureAnalytics, budgetTransitionAnalytics] = await Promise.all([
    fetchAnalytics('total', [2021, 2025], 'atlas', 2),
    fetchAnalytics('quarterly', ['2021-01-01', DateTime.now().toFormat('yyyy-LL-dd')], 'atlas', 2),
  ]);

  return {
    props: {
      budgetStructureAnalytics,
      budgetTransitionAnalytics,
    },
  };
}
