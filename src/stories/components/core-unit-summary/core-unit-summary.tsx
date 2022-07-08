import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BreadCrumb from '../pagination/bread-crumb';
import InsidePagination from '../pagination/InsidePagination';
import TitleNavigationCuAbout from '../title-navigation-cu-about/title-navigation-cu-about';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { useRouter } from 'next/router';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { useCoreUnitSummaryViewModel } from './core-unit-summary.mvvm';

export const CoreUnitSummary = () => {
  const [hiddenTextDescription, setHiddenTextDescription] = useState(true);
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;

  const { data: response } = useCoreUnitSummaryViewModel();

  const data: CoreUnitDto[] = response && response.coreUnits as CoreUnitDto[];
  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);

  const cu = data?.find(cu => cu.code === code);

  const handleScroll = () => {
    const element = document.getElementById('hidden-element');
    if (element != null) {
      const bound = element?.getBoundingClientRect();
      if (bound && bound?.y < 276) {
        setHiddenTextDescription(false);
      } else {
        setHiddenTextDescription(true);
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    // Remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);
  const filteredData = useMemo(() =>
    filterData({
      data,
      filteredStatuses,
      filteredCategories,
      searchText
    }), [data, filteredCategories, filteredStatuses, searchText]);

  const page = useMemo(() => filteredData.findIndex(item => item.code === code) + 1, [code, filteredData]);

  const changeCoreUnitCode = useCallback(
    (direct: -1 | 1) => () => {
      const index = filteredData.findIndex(item => item.code === code);
      const newIndex = index + direct;
      if (newIndex >= 0 && newIndex < filteredData.length) {
        router.push(`${router.route.replace('[code]', filteredData[newIndex].code)}?filteredStatuses=${filteredStatuses}&filteredCategories=${filteredCategories}&searchText=${searchText}`);
      }
    },
    [code, filteredData, router]);

  return <div style={{
    position: 'fixed',
    top: 63,
    width: '100%',
    backgroundImage: 'url(/assets/img/Subheader.png)',
    backgroundSize: 'cover',
    zIndex: 4,
    borderBottom: hiddenTextDescription ? '1px solid #B6EDE7' : 'none',
    paddingBottom: hiddenTextDescription ? '24px' : '32px',
  }}>
    <NavigationHeader>
      <BreadCrumb count={filteredData.length} breadcrumbs={[cu?.name ?? '']} isCoreUnit />
      <InsidePagination count={filteredData.length} page={page} onClickLeft={changeCoreUnitCode(-1)} onClickRight={changeCoreUnitCode(1)} />
    </NavigationHeader>
    <Wrapper>
      <ContainerTitle>
      <TitleNavigationCuAbout coreUnitAbout={cu} />
      {hiddenTextDescription && <Typography fontSize={16} lineHeight='19px' color='#231536' fontFamily={'FT Base, sans-serif'} sx={{
        marginTop: '16px',
      }}>{cu?.sentenceDescription || ''}</Typography>}
    </ContainerTitle>  </Wrapper>
  </div>;
};

const NavigationHeader = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '74px',
  paddingLeft: '32px',
  paddingRight: '32px',
  marginBottom: '16px'
});

const ContainerTitle = styled.div<{ stateHidden?: boolean }>((props) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '128px',
  paddingRight: '128px',
  paddingBottom: props.stateHidden ? '24px' : '32px',
  height: props.stateHidden ? '135px' : '108px',
  borderBottom: props.stateHidden ? '1px solid #B6EDE7' : 'none',
  paddingTop: '8px'
}));

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
});
