import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { siteRoutes } from '@/config/routes';
import { useAuthContext } from '@/core/context/AuthContext';
import { useThemeContext } from '@/core/context/ThemeContext';
import { CONNECT } from '@/core/utils/const';
import type { SelectItem } from '@/stories/components/SingleItemSelect/SingleItemSelect';
import type { MenuType, RouteOnHeader } from './types';
const menuItems = {} as Record<RouteOnHeader, MenuType>;
export const useTopBarNavigation = () => {
  const { clearCredentials, permissionManager } = useAuthContext();
  const { themeMode, toggleTheme, isLight } = useThemeContext();
  const router = useRouter();
  const handleGoLogin = () => {
    router.push('/login');
  };

  const handleOnClickLogOut = () => {
    clearCredentials?.();
    router.push(siteRoutes.login);
  };

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
  const filter: SelectItem[] = useMemo(
    () =>
      Object.values(menuItems).map((value) => ({
        label: value.title,
        value: value.title,
      })),
    []
  );

  const activeMenuItem: MenuType = useMemo(() => {
    if (router.pathname.startsWith('/teams')) {
      return menuItems.teams;
    } else if (router.pathname.startsWith(siteRoutes.finances())) {
      return menuItems.finances;
    } else if (router.pathname.startsWith('/roadmaps')) {
      return menuItems.roadmap;
    } else if (router.pathname.startsWith(siteRoutes.endgame)) {
      return menuItems.endgame;
    } else return menuItems.teams;
  }, [router.pathname]);

  const activeItem = activeMenuItem?.title;
  const handleChangeRoute = (value: string | string[]) => {
    if (typeof value === 'string') {
      const find = Object.values(menuItems).find((menu) => menu.title === value);
      router.push(find?.link || '/teams');
    }
  };

  return {
    filter,
    themeMode,
    toggleTheme,
    isLight,
    menuItems,
    activeItem,
    handleGoLogin,
    handleChangeRoute,
    handleOnClickLogOut,
    permissionManager,
  };
};
