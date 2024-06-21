import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { siteRoutes } from '@/config/routes';
import { useThemeContext } from '@/core/context/ThemeContext';
import { CONNECT } from '@/core/utils/const';
import type { SelectItem } from '@/stories/components/SingleItemSelect/SingleItemSelect';
import type { MenuType, RouteOnHeader } from './types';
const menuItems = {} as Record<RouteOnHeader, MenuType>;
export const useTopBarNavigation = () => {
  const { themeMode, toggleTheme, isLight } = useThemeContext();
  const router = useRouter();

  const filter: SelectItem[] = [
    {
      label: 'Teams',
      value: 'teams',
    },
    {
      label: 'Finances',
      value: 'finances',
    },
    {
      label: 'Roadmap',
      value: 'roadmap',
    },
    {
      label: 'Endgame',
      value: 'endgame',
    },
    {
      label: 'Connect',
      value: 'connect',
    },
  ];

  menuItems.teams = {
    title: 'Teams',
    link: '/teams',
  };

  menuItems.finances = {
    title: 'Finances',
    link: siteRoutes.finances(),
  };

  menuItems.roadmap = {
    title: 'Roadmap',
    link: siteRoutes.roadmapMilestones('ph-2024'),
  };

  menuItems.endgame = {
    title: 'Endgame',
    link: siteRoutes.endgame,
  };

  menuItems.connect = {
    title: 'Connect',
    link: CONNECT,
  };
  const activeMenuItem: MenuType = useMemo(() => {
    if (router.pathname.startsWith('/teams')) {
      return menuItems.teams;
    } else if (router.pathname.startsWith(siteRoutes.finances())) {
      return menuItems.finances;
    } else if (router.pathname.startsWith('/roadmaps')) {
      return menuItems.roadmap;
    } else if (router.pathname.startsWith(siteRoutes.endgame)) {
      return menuItems.endgame;
    } else return menuItems.connect;
  }, [router.pathname]);

  const activeItem = activeMenuItem?.title;

  return {
    filter,
    themeMode,
    toggleTheme,
    isLight,
    menuItems,
    activeItem,
  };
};
