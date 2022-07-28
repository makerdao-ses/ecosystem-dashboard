import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InsidePagination from '../pagination/InsidePagination';
import TitleNavigationCuAbout from '../title-navigation-cu-about/title-navigation-cu-about';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { useRouter } from 'next/router';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { useCoreUnitSummaryViewModel } from './core-unit-summary.mvvm';
import _ from 'lodash';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';

interface CoreUnitSummaryProps {
  trailingAddress?: string[];
}

export const CoreUnitSummary = ({ trailingAddress = [] }: CoreUnitSummaryProps) => {
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

  const ref = useRef(null);

  const debounceFunction = _.debounce(() => setHiddenTextDescription(((ref?.current as any)?.offsetTop ?? 0) <= 65), 27);

  const handleScroll = () => {
    debounceFunction();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    // Remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const { filteredData } = useMemo(() =>
    filterData({
      data,
      filteredStatuses,
      filteredCategories,
      searchText
    }), [data, filteredCategories, filteredStatuses, searchText]);

  const page = useMemo(() => filteredData?.findIndex(item => item.code === code) + 1, [code, filteredData]);

  const changeCoreUnitCode = useCallback(
    (direct: -1 | 1) => () => {
      const index = filteredData?.findIndex(item => item.code === code);
      const newIndex = index + direct;
      if (newIndex >= 0 && newIndex < filteredData?.length) {
        router.push(`${router.route.replace('[code]', filteredData[newIndex].code)}?filteredStatuses=${filteredStatuses}&filteredCategories=${filteredCategories}&searchText=${searchText}`);
      }
    },
    [code, filteredData, router]);

  return <Container ref={ref}>
    <NavigationHeader className="no-select">
      <Breadcrumbs items={[
        {
          label: <span>Core Units <b>({filteredData.length})</b></span>,
          url: `/?filteredStatuses=${filteredStatuses}&filteredCategories=${filteredCategories}&searchText=${searchText}`
        },
        {
          label: cu?.name ?? '',
          url: `/core-unit/${code}/?filteredStatuses=${filteredStatuses}&filteredCategories=${filteredCategories}&searchText=${searchText}`
        },
        ...trailingAddress.map(adr => ({
          label: adr,
          url: ''
        }))
      ]}/>
      <InsidePagination count={filteredData.length} page={page} onClickLeft={changeCoreUnitCode(-1)} onClickRight={changeCoreUnitCode(1)} />
    </NavigationHeader>
    <Wrapper>
      <ContainerTitle>
        <TitleNavigationCuAbout coreUnitAbout={cu} />
        {hiddenTextDescription &&
          <div> <Typography fontSize={16} lineHeight='19px' color='#231536' fontFamily={'FT Base, sans-serif'} sx={{
            marginTop: '16px',
          }}>{cu?.sentenceDescription || ''}</Typography>
          </div>}
      </ContainerTitle>
    </Wrapper>
    <div style={{
      position: 'relative',
      borderBottom: hiddenTextDescription ? '1px solid #B6EDE7' : 'none',
      width: '100%',
      marginTop: '24px',
    }} />
  </Container>;
};

const Container = styled.div({
  position: 'sticky',
  top: 63,
  width: '100%',
  backgroundImage: 'url(/assets/img/Subheader.png)',
  backgroundSize: 'cover',
  zIndex: 4,
});

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

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'fit-content',
  transition: 'all .3s ease',
  paddingTop: '8px'
});

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1184px',
  margin: '0 auto',
});
