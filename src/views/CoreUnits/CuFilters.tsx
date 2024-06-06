import { styled } from '@mui/material';
import React from 'react';
import FiltersBundle from '@/components/FiltersBundle/FiltersBundle';
import type { Filter, ResetFilter, SearchFilter } from '@/components/FiltersBundle/types';

interface FilterProps {
  filters: Filter[];

  resetFilters: ResetFilter;
  searchFilter: SearchFilter;
  snapPoints: number[];
}

const CuFilters: React.FC<FilterProps> = ({ filters, resetFilters, searchFilter, snapPoints }) => (
  <Wrapper>
    <Title>Core Units</Title>
    <Container>
      <FiltersBundle
        filters={filters}
        searchFilter={searchFilter}
        resetFilters={resetFilters}
        snapPoints={snapPoints}
      />
    </Container>
  </Wrapper>
);
export default CuFilters;
const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
});

const Container = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

const Title = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: theme.palette.isLight ? '28.8px' : '38px',
  letterSpacing: '0.4px',
  flex: 1,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  [theme.breakpoints.up('tablet_768')]: {
    display: 'block',
    alignSelf: 'flex-start',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    alignSelf: 'center',
  },
}));
