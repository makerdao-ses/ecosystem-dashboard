import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';

import { fetchRecognizedDelegatesReport } from '@ses/containers/RecognizedDelegatesReports/RecognizedDelegatesReportAPI';
import RecognizedDelegatesReportContainer from '@ses/containers/RecognizedDelegatesReports/RecognizedDelegatesReportContainer';
import { CoreUnitContext } from '@ses/core/context/CoreUnitContext';
import { featureFlags } from 'feature-flags/feature-flags';
import React, { useEffect, useState } from 'react';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';
import type { DelegatesReportDto } from '@ses/core/models/dto/delegatesDTO';

import type { NextPage } from 'next';

type RecognizedDelegatesProps = {
  delegates: DelegatesReportDto;
};

const RecognizedDelegates: NextPage<RecognizedDelegatesProps> = ({ delegates }) => {
  const [currentDelegates, setCurrentDelegates] = useState<DelegatesReportDto>(delegates);
  useEffect(() => {
    setCurrentDelegates(delegates);
  }, [delegates]);

  return (
    // make the delegates accessible from the comments components
    <CoreUnitContext.Provider
      value={{
        currentCoreUnit: currentDelegates as CoreUnitDto,
        setCurrentCoreUnit: setCurrentDelegates,
      }}
    >
      <RecognizedDelegatesReportContainer delegates={currentDelegates} />
    </CoreUnitContext.Provider>
  );
};

export default RecognizedDelegates;

export async function getServerSideProps() {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_RECOGNIZED_DELEGATES) {
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
