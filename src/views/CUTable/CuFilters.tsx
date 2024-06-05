import { Divider, styled } from '@mui/material';
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

export const SmallSeparator = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  isLight: boolean;
}>(({ isLight }) => ({
  height: '32px',
  width: '1px',
  backgroundColor: isLight ? '#D4D9E1' : '#48495F',
  alignSelf: 'center',
  gridArea: 'separator',
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'block',
  },
}));

export const ButtonFilter = styled('div')<{ isActive: boolean; isOpen: boolean }>(({ isActive, isOpen, theme }) => ({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  width: '34px',
  height: '34px',
  border: theme.palette.isLight
    ? isOpen || isActive
      ? '1px solid #6EDBD0'
      : '1px solid #D4D9E1'
    : isOpen || isActive
    ? '1px solid #098C7D'
    : '1px solid #343442',
  borderRadius: '50%',
  alignItems: 'center',
  background: isOpen
    ? theme.palette.isLight
      ? '#B6EDE7'
      : '#003C40'
    : theme.palette.isLight
    ? 'white'
    : 'transparent',
  justifyContent: 'center',
  boxSizing: 'border-box',
  '@media (min-width: 834px)': {
    display: 'none',
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: theme.palette.isLight ? '28.8px' : '38px',
  letterSpacing: '0.4px',
  flex: 1,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  '@media (min-width: 834px)': {
    display: 'block',
    alignSelf: 'flex-start',
  },
  '@media (min-width: 1194px)': {
    alignSelf: 'center',
  },
}));
