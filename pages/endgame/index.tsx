import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { getYearsRange } from '@ses/containers/Finances/utils/utils';
import { DateTime } from 'luxon';
import React from 'react';
// eslint-disable-next-line camelcase
import { SWRConfig, unstable_serialize } from 'swr';
import EndgameView from '@/views/Endgame/EndgameView';
import type { Analytic } from '@ses/core/models/interfaces/analytic';

interface EndgamePageProps {
  budgetTransitionAnalytics: Analytic;
  yearsRange: string[];
  initialYear: string;
  fallback: Analytic;
}

const EndgamePage: React.FC<EndgamePageProps> = ({ budgetTransitionAnalytics, yearsRange, initialYear, fallback }) => (
  <SWRConfig value={{ fallback }}>
    <EndgameView
      budgetTransitionAnalytics={budgetTransitionAnalytics}
      yearsRange={yearsRange}
      initialYear={initialYear}
    />
  </SWRConfig>
);

export default EndgamePage;

export async function getServerSideProps() {
  const now = DateTime.utc();
  // if it is the first quarter of the year, we need to select the previous year
  const initialYear = (now.month / 3 >= 2 ? now.year : now.year - 1).toString();
  const yearsRange = getYearsRange();

  const [budgetStructureAnalytics, budgetTransitionAnalytics] = await Promise.all([
    fetchAnalytics('total', initialYear, 'atlas', 2),
    fetchAnalytics('quarterly', ['2021-01-01', DateTime.now().toFormat('yyyy-LL-dd')], 'atlas', 2),
  ]);

  return {
    props: {
      budgetTransitionAnalytics,
      yearsRange,
      initialYear,
      fallback: {
        [unstable_serialize(['total', initialYear, 'atlas', 2])]: budgetStructureAnalytics,
      },
    },
  };
}
