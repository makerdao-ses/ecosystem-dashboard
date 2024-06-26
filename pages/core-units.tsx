import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import CoreUnitsIndexView from '@/views/CoreUnitsIndexView/CoreUnitsIndexView';
import { fetchCoreUnits } from '@/views/CoreUnitsIndexView/cuTableAPI';
import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  coreUnits: CoreUnit[];
}
const CuTablePage: NextPage<Props> = ({ coreUnits }) => <CoreUnitsIndexView coreUnits={coreUnits} />;

export const getServerSideProps: GetServerSideProps = async () => {
  const coreUnits = await fetchCoreUnits();

  return {
    props: {
      coreUnits,
    },
  };
};

export default CuTablePage;
