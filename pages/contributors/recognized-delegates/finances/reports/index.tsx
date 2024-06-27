import { fetchRecognizedDelegatesBudgetStatements } from '@ses/containers/RecognizedDelegatesReports/RecognizedDelegatesReportAPI';
import RecognizedDelegatesReportContainer from '@ses/containers/RecognizedDelegatesReports/RecognizedDelegatesReportContainer';
import { TeamContext } from '@ses/core/context/TeamContext';
import React, { useEffect, useState } from 'react';
import type { DelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { Team } from '@ses/core/models/interfaces/team';
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
    <TeamContext.Provider
      value={{
        currentTeam: currentDelegatesReport as unknown as Team,
        setCurrentTeam: setCurrentDelegatesReport as unknown as (cu: Team) => void,
      }}
    >
      <RecognizedDelegatesReportContainer delegates={currentDelegatesReport} />
    </TeamContext.Provider>
  );
};

export default RecognizedDelegatesReport;

export async function getServerSideProps() {
  const delegates = await fetchRecognizedDelegatesBudgetStatements();

  return {
    props: {
      delegates,
    },
  };
}
