import { fetchExpenseCategories } from '@ses/containers/FinancesOverview/api/queries';
import request from 'graphql-request';
import React, { useState, useEffect } from 'react';
import { GRAPHQL_ENDPOINT } from '../../../../../src/config/endpoints';
import { CoreUnitContext } from '../../../../../src/core/context/CoreUnitContext';
import { fetchCoreUnits } from '../../../../../src/stories/components/CoreUnitSummary/CoreUnitSummaryApi';
import { TransparencyReport } from '../../../../../src/stories/containers/TransparencyReport/TransparencyReport';
import { CORE_UNIT_REQUEST } from '../../../../../src/stories/containers/TransparencyReport/transparencyReportAPI';
import type { CoreUnitDto } from '../../../../../src/core/models/dto/coreUnitDTO';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { GetServerSidePropsContext } from 'next';

interface TransparencyProps {
  coreUnits: CoreUnitDto[];
  cu: CoreUnitDto;
  expenseCategories: ExpenseCategory[];
}

const Transparency = ({ coreUnits, cu, expenseCategories }: TransparencyProps) => {
  const [currentCoreUnit, setCurrentCoreUnit] = useState<CoreUnitDto>(cu);
  useEffect(() => {
    setCurrentCoreUnit(cu);
  }, [cu]);

  return (
    <CoreUnitContext.Provider
      value={{
        currentCoreUnit,
        setCurrentCoreUnit,
        coreUnits,
      }}
    >
      <TransparencyReport coreUnits={coreUnits} coreUnit={currentCoreUnit} expenseCategories={expenseCategories} />
    </CoreUnitContext.Provider>
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
