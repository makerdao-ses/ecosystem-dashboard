import { styled } from '@mui/material';
import React from 'react';
import { mockDataDescription } from '../../staticData';
import TabDescriptions from './TabDescriptions';

const ContributorsSection = () => (
  <Container>
    <CardTabs>
      <TabDescriptions contributorsDescription={mockDataDescription} />
    </CardTabs>
    <ContributorInformation>data</ContributorInformation>
  </Container>
);

export default ContributorsSection;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 24,
  },
}));

const ContributorInformation = styled('div')(({ theme }) => ({
  // Remove the fixed when component is done
  height: 400,
  width: '100%',
  display: 'flex',
  border: '1px solid black',
  [theme.breakpoints.up('tablet_768')]: {
    width: 401,
    flex: 1,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 632,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 976,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 789,
  },
}));

const CardTabs = styled('div')({
  border: '1px solid black',
});
