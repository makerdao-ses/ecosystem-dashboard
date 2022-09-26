import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import CUActivityContainer from '../../../src/stories/containers/cu-activity/cu-activity';
import { fetchCoreUnitByCode } from '../../../src/stories/containers/cu-about/cu-about.api';
import { fetchCoreUnits } from '../../../src/stories/components/core-unit-summary/core-unit-summary.mvvm';
import { CoreUnitDto } from '../../../src/core/models/dto/core-unit.dto';
import { CuActivityDto } from '../../../src/core/models/dto/core-unit-activity.dto';

interface CUActivityProps {
  coreUnits: CoreUnitDto[];
  coreUnit: CoreUnitDto;
  activity: CuActivityDto[];
}

const CoreUnitActivityPage: NextPage<CUActivityProps> = ({ coreUnit, coreUnits, activity }) => {
  return <CUActivityContainer coreUnit={coreUnit} coreUnits={coreUnits} activity={activity} />;
};

export default CoreUnitActivityPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;

  const [coreUnit, coreUnits] = await Promise.all([fetchCoreUnitByCode(code), fetchCoreUnits()]);

  if (isEmpty(coreUnit)) {
    return {
      notFound: true,
    };
  }

  // const activity = await fetchCoreUnitActivity(coreUnit.id);
  // TODO: uncomment the previous line and remove the next object
  // (this is for UI tests only since theres no data coming from the API)
  const activity: CuActivityDto[] = [
    {
      cuId: '1',
      id: '3',
      updateDate: '1663788830325',
      updateTitle:
        'Signal your support or opposition to prioritising onboarding GUNIV3-BUSD-DAI (Gelato Uniswap v3 BUSD-DAI).',
      updateUrl: 'https://makerdao.network/something-3',
    },
    {
      cuId: '1',
      id: '2',
      updateDate: '1663270393246',
      updateTitle: 'This subproposal aims to allocate 81,000 DAI to the Ambassador Program.',
      updateUrl: 'https://makerdao.network/something-2',
    },
    {
      cuId: '1',
      id: '1',
      updateDate: '1653270393246',
      updateTitle: 'Lower dedication of 1 F/E for the next 6 months.',
      updateUrl: 'https://makerdao.network/something-1',
    },
  ];

  return {
    props: {
      coreUnits,
      coreUnit,
      activity,
    },
  };
};
