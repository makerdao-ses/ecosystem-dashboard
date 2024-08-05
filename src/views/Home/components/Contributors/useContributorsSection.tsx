import { useTheme } from '@mui/material';

import sortBy from 'lodash/sortBy';
import { useState } from 'react';
import BulletIcon from '@/components/FancyTabs/BulletIcon';

import type { Team } from '@/core/models/interfaces/team';
import { ResourceType } from '@/core/models/interfaces/types';
import { currentTeams, legacyTeams } from '@/views/Contributors/staticData';

export const useContributorsSection = (teams: Team[]) => {
  const theme = useTheme();

  const [activeCategoryTab, setActiveCategoryTab] = useState('1');
  const [activeDetailTab, setActiveDetailTab] = useState('1');

  const handleActiveCategoryTab = (id: string) => setActiveCategoryTab(id);

  const handleActiveDetailTab = (id: string) => setActiveDetailTab(id);

  // Filter teams by type
  const coreUnits = teams?.filter((team) => team.type === ResourceType.CoreUnit);
  const ecosystemActors = teams?.filter((team) => team.type === ResourceType.EcosystemActor);

  // Alphabetically sort by name
  const sortedCoreUnits = sortBy(coreUnits, 'name');
  const sortedEcosystemActors = sortBy(ecosystemActors, 'name');

  // Combine and sort based on the active tab
  const contributors =
    activeDetailTab === '1'
      ? sortBy([...sortedEcosystemActors, ...sortedCoreUnits], 'name') // Alphabetically sort after combining
      : activeDetailTab === '2'
      ? sortedEcosystemActors
      : sortedCoreUnits;

  const teamCategoriesTabs = [
    {
      id: '1',
      title: 'Current',
    },
    {
      id: '2',
      title: 'Legacy',
    },
  ];
  const teamDetailsTabs = [
    {
      id: '1',
      title: 'All',
    },
    {
      id: '2',
      title: 'Ecosystem Actors',
      icon: <BulletIcon color={theme.palette.isLight ? 'blue' : 'blueDark'} />,
    },
    {
      id: '3',
      title: 'Core Units',
      icon: <BulletIcon color={theme.palette.isLight ? 'gray' : 'charcoalDark'} />,
    },
  ];

  const subTitle =
    activeDetailTab === '1'
      ? 'All Maker contributors'
      : activeDetailTab === '2'
      ? 'Ecosystem Actors Contributors'
      : 'Core Units Contributors';

  const isLegacy = activeCategoryTab === '2';
  const teamCategoryDataMock = isLegacy ? legacyTeams : currentTeams;
  const hasDefaultColors = activeDetailTab === '1';
  const textDefault = activeDetailTab === '1';

  return {
    hasDefaultColors,
    teamCategoriesTabs,
    teamDetailsTabs,
    activeCategoryTab,
    activeDetailTab,
    handleActiveDetailTab,
    handleActiveCategoryTab,
    subTitle,
    isLegacy,
    teamCategoryDataMock,
    contributors,
    textDefault,
  };
};
