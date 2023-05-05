import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';

import { fetchRecognizedDelegatesBudgetStatements } from '@ses/containers/RecognizedDelegatesReports/RecognizedDelegatesReportAPI';
import RecognizedDelegatesReportContainer from '@ses/containers/RecognizedDelegatesReports/RecognizedDelegatesReportContainer';
import { CoreUnitContext } from '@ses/core/context/CoreUnitContext';
import { featureFlags } from 'feature-flags/feature-flags';
import React, { useEffect, useState } from 'react';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';
import type { DelegatesDto } from '@ses/core/models/dto/delegatesDTO';

import type { NextPage } from 'next';

type RecognizedDelegatesReportProps = {
  delegates: DelegatesDto;
};

const RecognizedDelegatesReport: NextPage<RecognizedDelegatesReportProps> = ({ delegates }) => {
  const [currentDelegatesReport, setCurrentDelegatesReport] = useState<DelegatesDto>(delegates);
  useEffect(() => {
    setCurrentDelegatesReport(delegates);
  }, [delegates]);

  return (
    // make the delegates accessible from the comments components
    <CoreUnitContext.Provider
      value={{
        currentCoreUnit: currentDelegatesReport as CoreUnitDto,
        setCurrentCoreUnit: setCurrentDelegatesReport,
      }}
    >
      <RecognizedDelegatesReportContainer delegates={currentDelegatesReport} />
    </CoreUnitContext.Provider>
  );
};

export default RecognizedDelegatesReport;

export async function getServerSideProps() {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_RECOGNIZED_DELEGATES_REPORT) {
    return {
      notFound: true,
    };
  }

  const delegates = await fetchRecognizedDelegatesBudgetStatements();

  return {
    props: {
      delegates,
    },
  };
}
