import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';

interface CUReservesProps {
  coreUnitCode: string;
}

const CUReserves: React.FC<CUReservesProps> = ({ coreUnitCode }) => (
  <div>
    <SectionHeader
      title="Total Core Unit Reserves"
      subtitle={`On-chain and off-chain reserves accessible to the ${coreUnitCode} Core Unit.`}
      tooltip={'pending...'}
    />
  </div>
);

export default CUReserves;
