import { styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import type { Team } from '@/core/models/interfaces/team';
import { mockDataDescription } from '../../staticData';

import TabDescriptions from './TabDescriptions';

import type { FC } from 'react';

interface Props {
  contributor: Team;
}
const ContributorsSection: FC<Props> = () => (
  <Container>
    <TabsDescriptions>
      <Tabs>Tabs</Tabs>
      <CardTabs>
        <TabDescriptions contributorsDescription={mockDataDescription} />
      </CardTabs>
    </TabsDescriptions>
    <ContainerTabs>
      <div>Tabs</div>
      <ContributorInformation>
        <Title>All Maker contributors </Title>

        <ContainerContributors>Items</ContainerContributors>
      </ContributorInformation>
    </ContainerTabs>
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
const ContainerTabs = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    width: 401,
    flex: 1,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 632,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 789,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 976,
  },
}));

const ContributorInformation = styled(Card)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '0px 12px 12px 12px',
  overFlow: 'hidden',
}));

const CardTabs = styled(Card)({
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  padding: '8px 16px',
});

const Tabs = styled('div')({});

const TabsDescriptions = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  padding: '9px 16px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',

  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: '0px 12px 0px 0px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const ContainerContributors = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 8,
});
