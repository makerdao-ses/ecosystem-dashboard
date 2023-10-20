import { fetchCoreUnits } from '@ses/components/CoreUnitSummary/CoreUnitSummaryApi';
import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import { fetchExpenseCategories } from '@ses/containers/FinancesOverview/api/queries';
import { TransparencyReport } from '@ses/containers/TransparencyReport/TransparencyReport';
import { CORE_UNIT_REQUEST, getLastSnapshotPeriod } from '@ses/containers/TransparencyReport/transparencyReportAPI';
import { TeamContext } from '@ses/core/context/TeamContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import request from 'graphql-request';
import { DateTime } from 'luxon';
import React, { useState, useEffect } from 'react';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { Team } from '@ses/core/models/interfaces/team';
import type { GetServerSidePropsContext } from 'next';

interface TransparencyProps {
  coreUnits: CoreUnit[];
  cu: CoreUnit;
  expenseCategories: ExpenseCategory[];
  latestSnapshotPeriod?: string;
}

const Transparency = ({ coreUnits, cu, expenseCategories, latestSnapshotPeriod }: TransparencyProps) => {
  const [currentCoreUnit, setCurrentCoreUnit] = useState<CoreUnit>(cu);
  useEffect(() => {
    setCurrentCoreUnit(cu);
  }, [cu]);

  return (
    <TeamContext.Provider
      value={{
        teams: coreUnits as unknown as Team[],
        currentTeam: currentCoreUnit as unknown as Team,
        setCurrentTeam: setCurrentCoreUnit as unknown as (cu: Team) => void,
      }}
    >
      <TransparencyReport
        coreUnits={coreUnits}
        coreUnit={currentCoreUnit}
        expenseCategories={expenseCategories}
        latestSnapshotPeriod={latestSnapshotPeriod ? DateTime.fromISO(latestSnapshotPeriod) : undefined}
      />
    </TeamContext.Provider>
  );
};

export default Transparency;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;
  const { query: gqlQuery, filter } = CORE_UNIT_REQUEST(code);

  const [data, coreUnits, expenseCategories] = await Promise.all([
    request(GRAPHQL_ENDPOINT, gqlQuery, filter),
    fetchCoreUnits(),
    fetchExpenseCategories(),
  ]);

  if (data?.coreUnits?.length === 0 || code === 'DEL') {
    return {
      notFound: true,
    };
  }

  const cu = data.coreUnits[0];

  const latestSnapshotPeriod = await getLastSnapshotPeriod(cu.id, ResourceType.CoreUnit);

  return {
    props: {
      coreUnits,
      cu,
      expenseCategories,
      latestSnapshotPeriod: latestSnapshotPeriod?.toISODate() ?? null,
    },
  };
};
