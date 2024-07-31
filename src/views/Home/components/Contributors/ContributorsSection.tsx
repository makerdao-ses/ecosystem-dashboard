import { styled } from '@mui/material';
import React from 'react';
import type { Team } from '@/core/models/interfaces/team';
import { mockDataDescription } from '../../staticData';
import ContributorsItem from './ContributorsItem';
import Profile from './Profile';
import TabDescriptions from './TabDescriptions';
import type { FC } from 'react';

interface Props {
  contributor: Team;
}
const ContributorsSection: FC<Props> = ({ contributor }) => (
  <Container>
    <CardTabs>
      <TabDescriptions contributorsDescription={mockDataDescription} />
    </CardTabs>
    <ContributorInformation>
      <div>Tabs</div>
      <ContributorsItem contributors={contributor} />
    </ContributorInformation>
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
  // height: 400,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
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
