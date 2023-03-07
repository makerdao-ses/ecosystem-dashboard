import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { fetchRecognizedDelegates } from '@ses/containers/recognized-delegates/delegates.api';
import RecognizedDelegatesContainer from '@ses/containers/recognized-delegates/recognized-delegates';
import { CoreUnitContext } from '@ses/core/context/CoreUnitContext';
import { featureFlags } from 'feature-flags/feature-flags';
import React, { useEffect, useState } from 'react';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';
import type { DelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { NextPage } from 'next';

type RecognizedDelegatesProps = {
  delegates: DelegatesDto;
};

const RecognizedDelegates: NextPage<RecognizedDelegatesProps> = ({ delegates }) => {
  const [currentDelegates, setCurrentDelegates] = useState<DelegatesDto>(delegates);
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
      <RecognizedDelegatesContainer delegates={currentDelegates} />
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

  const delegates = await fetchRecognizedDelegates();

  return {
    props: {
      delegates,
    },
  };
}
