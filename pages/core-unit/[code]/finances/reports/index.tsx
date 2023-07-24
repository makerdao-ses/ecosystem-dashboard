import { fetchExpenseCategories } from '@ses/containers/FinancesOverview/api/queries';
import { TeamContext } from '@ses/core/context/TeamContext';
import request from 'graphql-request';
import React, { useState, useEffect } from 'react';
import { GRAPHQL_ENDPOINT } from '../../../../../src/config/endpoints';
import { fetchCoreUnits } from '../../../../../src/stories/components/CoreUnitSummary/CoreUnitSummaryApi';
import { TransparencyReport } from '../../../../../src/stories/containers/TransparencyReport/TransparencyReport';
import { CORE_UNIT_REQUEST } from '../../../../../src/stories/containers/TransparencyReport/transparencyReportAPI';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { Team } from '@ses/core/models/interfaces/team';
import type { GetServerSidePropsContext } from 'next';

interface TransparencyProps {
  coreUnits: CoreUnit[];
  cu: CoreUnit;
  expenseCategories: ExpenseCategory[];
}

const Transparency = ({ coreUnits, cu, expenseCategories }: TransparencyProps) => {
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
      <TransparencyReport coreUnits={coreUnits} coreUnit={currentCoreUnit} expenseCategories={expenseCategories} />
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

  return {
    props: {
      coreUnits,
      cu: data.coreUnits[0],
      expenseCategories,
    },
  };
};
