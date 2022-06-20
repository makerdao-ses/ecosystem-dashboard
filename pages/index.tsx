import type { NextPage } from 'next';
import { HeaderWrapper } from '../stories/containers/dashboard-wrapper/header-wrapper';
import { CuTable } from '../stories/containers/cu-table/cu-table';

const Home: NextPage = () => {
  return (
    <HeaderWrapper>
      <CuTable/>
    </HeaderWrapper>
  );
};

export default Home;
