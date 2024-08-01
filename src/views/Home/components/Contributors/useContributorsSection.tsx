import { useTheme } from '@mui/material';

import { useState } from 'react';
import BulletIcon from '@/components/FancyTabs/BulletIcon';

import { currentTeams, legacyTeams } from '@/views/Contributors/staticData';

export const useContributorsSection = () => {
  const theme = useTheme();

  const [activeCategoryTab, setActiveCategoryTab] = useState('1');
  const [activeDetailTab, setActiveDetailTab] = useState('1');
  const handleActiveCategoryTab = (id: string) => {
    setActiveCategoryTab(id);
  };

  const handleActiveDetailTab = (id: string) => {
    setActiveDetailTab(id);
  };
  const teamCategoriesTabs = [
    {
      id: '1',
      title: 'Current Contributors',
    },
    {
      id: '2',
      title: 'Legacy Contributors',
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
  };
};
