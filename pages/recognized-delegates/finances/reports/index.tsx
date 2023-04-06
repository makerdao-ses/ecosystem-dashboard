import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';

import { fetchRecognizedDelegatesReport } from '@ses/containers/RecognizedDelegatesReports/RecognizedDelegatesReportAPI';
import RecognizedDelegatesReportContainer from '@ses/containers/RecognizedDelegatesReports/RecognizedDelegatesReportContainer';
import { CoreUnitContext } from '@ses/core/context/CoreUnitContext';
import { featureFlags } from 'feature-flags/feature-flags';
import React, { useEffect, useState } from 'react';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';
import type { DelegatesReportDto } from '@ses/core/models/dto/delegatesDTO';

import type { NextPage } from 'next';

type RecognizedDelegatesReportProps = {
  delegates: DelegatesReportDto;
};

const RecognizedDelegatesReport: NextPage<RecognizedDelegatesReportProps> = ({ delegates }) => {
  const [currentDelegatesReport, setCurrentDelegatesReport] = useState<DelegatesReportDto>(delegates);
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

  const delegates = await fetchRecognizedDelegatesReport();

  return {
    props: {
      delegates,
    },
  };
}
