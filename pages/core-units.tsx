import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import CoreUnitsView from '@/views/CoreUnits/CoreUnitsView';
import { fetchCoreUnits } from '@/views/CoreUnits/cuTableAPI';
import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  coreUnits: CoreUnit[];
}
const CuTablePage: NextPage<Props> = ({ coreUnits }) => <CoreUnitsView coreUnits={coreUnits} />;

export const getServerSideProps: GetServerSideProps = async () => {
  const coreUnits = await fetchCoreUnits();

  return {
    props: {
      coreUnits,
    },
  };
};

export default CuTablePage;
