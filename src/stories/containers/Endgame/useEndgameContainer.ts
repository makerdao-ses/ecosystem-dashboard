import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useSWRImmutable from 'swr/immutable';
import { fetchAnalytics } from '../Finances/api/queries';
import type { BudgetTransitionPlainData, TransitionStatusDataShown } from './types';
import type { Analytic } from '@ses/core/models/interfaces/analytic';
import type { IntersectionOptions } from 'react-intersection-observer';

export enum NavigationTabEnum {
  LATESTS_UPDATES = 'latest-updates',
  KEY_CHANGES = 'key-changes',
  BUDGET_STRUCTURE = 'endgame-budget-structure',
  BUDGET_TRANSITION_STATUS = 'budget-transition-status',
}

const useEndgameContainer = (budgetTransitionAnalytics: Analytic, yearsRange: string[], initialYear: string) => {
  const { isLight } = useThemeContext();
  const [pauseUrlUpdate, setPauseUrlUpdate] = useState<boolean>(false);
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const isUpDesktop1440 = useMediaQuery(lightTheme.breakpoints.up('desktop_1440'));

  const INTERSECTION_OPTIONS: IntersectionOptions = {
    threshold: isMobile ? 0.5 : isUpDesktop1440 ? 0.9 : 0.65,
    fallbackInView: false,
    rootMargin: '130px 0px 0px 0px',
  };

  useEffect(() => {
    // scroll into a section on page load
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (
        [
          NavigationTabEnum.KEY_CHANGES,
          NavigationTabEnum.BUDGET_STRUCTURE,
          NavigationTabEnum.BUDGET_TRANSITION_STATUS,
        ].includes(hash as NavigationTabEnum)
      ) {
        // scroll to the section
        document.getElementById(`section-${hash}`)?.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const handlePauseUrlUpdate = useCallback(() => {
    setPauseUrlUpdate(true);
    // un pause the updating after the scroll has ended
    setTimeout(() => setPauseUrlUpdate(false), 700);
  }, []);

  const [updatesChangesRef, updatesInView, updatesEntry] = useInView(INTERSECTION_OPTIONS);
  const [keyChangesRef, keyInView, keyEntry] = useInView({
    ...INTERSECTION_OPTIONS,
    threshold: isMobile ? 0.15 : isUpDesktop1440 ? 0.15 : 0.25,
  });
  const [structureRef, structureInView, structureEntry] = useInView(INTERSECTION_OPTIONS);
  const [transitionStatusRef, transitionInView, transitionEntry] = useInView(INTERSECTION_OPTIONS);

  const updatesEntryTopY = updatesEntry?.boundingClientRect?.y ?? 0;
  const keyEntryTopY = keyEntry?.boundingClientRect?.y ?? 0;
  const structureEntryTopY = structureEntry?.boundingClientRect?.y ?? 0;
  const transitionEntryTopY = transitionEntry?.boundingClientRect?.y ?? 0;

  const [activeTab, setActiveTab] = useState<NavigationTabEnum>(NavigationTabEnum.KEY_CHANGES);
  useEffect(() => {
    const updateUrl = (hash?: string) => {
      if (typeof window !== 'undefined') {
        if (hash) {
          window.location.hash = hash;
        } else {
          history.replaceState(null, '', window.location.pathname);
        }
      }
    };

    const activate = (tab: NavigationTabEnum) => {
      setActiveTab(tab);

      if (pauseUrlUpdate) {
        // it's scrolling, don't update the url yet
        return;
      }
      updateUrl(tab === NavigationTabEnum.LATESTS_UPDATES ? undefined : tab);
    };

    if (keyInView) {
      activate(NavigationTabEnum.KEY_CHANGES);
    } else if (transitionInView) {
      activate(NavigationTabEnum.BUDGET_TRANSITION_STATUS);
    } else if (structureInView) {
      activate(NavigationTabEnum.BUDGET_STRUCTURE);
    } else {
      const hasBoundingData =
        updatesEntryTopY !== 0 && keyEntryTopY !== 0 && structureEntryTopY !== 0 && transitionEntryTopY !== 0;
      if (
        !updatesInView &&
        !keyInView &&
        !transitionInView &&
        !structureInView &&
        hasBoundingData &&
        updatesEntryTopY < 0 &&
        keyEntryTopY < 0 &&
        structureEntryTopY < 0
      ) {
        // it is close to the footer and any section is in the view
        // activate this as is the last one
        activate(NavigationTabEnum.BUDGET_TRANSITION_STATUS);
      } else {
        activate(NavigationTabEnum.LATESTS_UPDATES);
      }
    }
  }, [
    structureInView,
    transitionInView,
    keyInView,
    pauseUrlUpdate,
    keyEntryTopY,
    transitionEntryTopY,
    transitionEntry,
    structureEntry,
    structureEntryTopY,
    updatesInView,
    updatesEntryTopY,
  ]);

  // budget structure section
  const [selectedYear, setSelectedYear] = useState<string>(initialYear);
  const handleYearChange = (year: string) => setSelectedYear(year);

  // fetch budget structure analytics
  const { data: budgetStructureAnalytics, isLoading: isLoadingBudgetStructure } = useSWRImmutable(
    ['total', selectedYear, 'atlas', 2],
    async () => fetchAnalytics('total', selectedYear, 'atlas', 2) as Promise<Analytic>
  );

  // compute the data for the budget structure section
  const budgetStructureData = useMemo(() => {
    // compute the data for the budget structure section
    const budgetData = ['scopes', 'immutable', 'legacy'].map((budget) => {
      const values = ['Actuals', 'Budget'].map(
        (metric) =>
          budgetStructureAnalytics?.series[0].rows.find(
            (row) => row.dimensions[0].path === `atlas/${budget}` && row.metric === metric
          )?.value ?? 0
      );

      return {
        actuals: values[0],
        budget: values[1],
      };
    });

    const endgameBudgets = budgetData[0].budget + budgetData[1].budget;
    const legacyBudgets = budgetData[2].budget;

    return {
      scopes: budgetData[0],
      immutable: budgetData[1],
      legacy: budgetData[2],

      endgameBudgets,
      legacyBudgets,
      totalBudgetCap: endgameBudgets + legacyBudgets,
      averageCapUtilization:
        (budgetData.reduce((acc, curr) => acc + curr.actuals, 0) /
          budgetData.reduce((acc, curr) => acc + curr.budget, 0)) *
        100,
    };
  }, [budgetStructureAnalytics?.series]);

  // transition status section
  const [transitionDataSelected, setTransitionDataSelected] = useState<TransitionStatusDataShown>('Budget');
  const handleTransitionDateSelectedChange = (selected: TransitionStatusDataShown) =>
    setTransitionDataSelected(selected);

  const transitionStatusData = useMemo(() => {
    const data: BudgetTransitionPlainData = {};

    // translate the data to a more usable format
    budgetTransitionAnalytics.series.forEach((series) => {
      const period = series.period;

      const values = ['scopes', 'immutable', 'legacy'].map((budget) =>
        series.rows
          .filter((row) => row.dimensions[0].path === `atlas/${budget}` && row.metric === transitionDataSelected)
          .reduce((acc, curr) => acc + curr.value, 0)
      );

      data[period] = {
        endgame: values[0] + values[1],
        legacy: values[2],
      };
    });

    return data;
  }, [budgetTransitionAnalytics.series, transitionDataSelected]);

  return {
    isLight,
    handlePauseUrlUpdate,
    updatesChangesRef,
    keyChangesRef,
    structureRef,
    transitionStatusRef,
    activeTab,
    transitionDataSelected,
    handleTransitionDateSelectedChange,
    budgetStructureData,
    isLoadingBudgetStructure,
    selectedYear,
    handleYearChange,
    transitionStatusData,
  };
};

export default useEndgameContainer;
