import React from 'react';
import styled from '@emotion/styled';
import { CuStatusEnum } from '../../../core/enums/cu-status-enum';
import { CuCategory } from '../../../core/enums/cu-category';
import { CustomMultiSelect } from '../../components/custom-multi-select/custom-multi-select';
import { SearchInput } from '../../components/search-input/search-input';
import { getEnumValuesForSelect } from '../../../core/utils/enum-utils';

const statuses = getEnumValuesForSelect(CuStatusEnum);
const categories = getEnumValuesForSelect(CuCategory);

export const CUTable = () => {
  return <Container>
    <Header>
      <Title>Core Units: </Title>
      <CustomMultiSelect label={'Status'} items={statuses}/>
      <CustomMultiSelect label={'Category'} items={categories}/>
      <Separator/>
      <SearchInput label={'Search CUs'} placeholder={'Search CUs by name or Code'}/>
    </Header>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'center'
});

const Title = styled.span({
  fontSize: '2rem',
  fontWeight: 600,
  flex: 1,
});

const Separator = styled.span({
  width: '1px',
  height: '40px',
  backgroundColor: '#D3D4D8',
  margin: 'auto 24px'
});
