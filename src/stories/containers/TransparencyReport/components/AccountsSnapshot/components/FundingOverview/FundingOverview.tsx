import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';

interface FundingOverviewProps {
  coreUnitCode: string;
}

const FundingOverview: React.FC<FundingOverviewProps> = ({ coreUnitCode }) => (
  <div>
    <SectionHeader
      title="MakerDAO Funding Overview"
      subtitle={`Totals funds made available to the ${coreUnitCode} Core Unit over its entire lifetime, since June 2021.`}
      tooltip={'pending...'}
    />
  </div>
);

export default FundingOverview;
