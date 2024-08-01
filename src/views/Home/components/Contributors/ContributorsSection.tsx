import { styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import FancyTabs from '@/components/FancyTabs/FancyTabs';
import { mockDataDescription } from '../../staticData';
import TabDescriptions from './TabDescriptions';
import { useContributorsSection } from './useContributorsSection';

const ContributorsSection = () => {
  const {
    activeCategoryTab,
    handleActiveCategoryTab,
    activeDetailTab,
    handleActiveDetailTab,
    teamCategoriesTabs,
    teamDetailsTabs,
    subTitle,
    isLegacy,
  } = useContributorsSection();
  return (
    <Container>
      <TabsDescriptions>
        <FancyTabs
          tabs={teamCategoriesTabs}
          activeTab={activeCategoryTab}
          onTabChange={(tab: string) => {
            handleActiveCategoryTab(tab);
          }}
        />

        <CardTabs isLegacy={isLegacy}>
          <TabDescriptions contributorsDescription={mockDataDescription} isLegacy={isLegacy} />
        </CardTabs>
      </TabsDescriptions>
      <ContainerTabs>
        <FancyTabs
          tabs={teamDetailsTabs}
          activeTab={activeDetailTab}
          onTabChange={(tab: string) => {
            handleActiveDetailTab(tab);
          }}
        />
        <ContributorInformation>
          <Title>{subTitle}</Title>
        </ContributorInformation>
      </ContainerTabs>
    </Container>
  );
};

export default ContributorsSection;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
  flex: 1,
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 24,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    gap: 32,
  },
}));
const ContainerTabs = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flex: 1,

  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 401,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 632,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 789,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 976,
  },
}));

const ContributorInformation = styled(Card)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '0px 12px 12px 12px',
  overFlow: 'hidden',
}));

const CardTabs = styled(Card)<{ isLegacy: boolean }>(({ isLegacy }) => ({
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,

  padding: isLegacy ? '8px 8px' : '8px 16px',
}));

const TabsDescriptions = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 247,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 272,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 379,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 304,
  },
}));

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
