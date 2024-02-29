import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import lightTheme from '@ses/styles/theme/light';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import type { BudgetTransitionPlainData, TransitionStatusDataShown } from './types';
import type { Analytic } from '@ses/core/models/interfaces/analytic';
import type { IntersectionOptions } from 'react-intersection-observer';

export enum NavigationTabEnum {
  KEY_CHANGES = 'key-changes',
  BUDGET_STRUCTURE = 'endgame-budget-structure',
  BUDGET_TRANSITION_STATUS = 'budget-transition-status',
}

const useEndgameContainer = (budgetStructureAnalytics: Analytic, budgetTransitionAnalytics: Analytic) => {
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();
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
      if (hash === NavigationTabEnum.BUDGET_STRUCTURE) {
        document.getElementById(`section-${NavigationTabEnum.BUDGET_STRUCTURE}`)?.scrollIntoView({
          behavior: 'smooth',
        });
      } else if (hash === NavigationTabEnum.BUDGET_TRANSITION_STATUS) {
        document.getElementById(`section-${NavigationTabEnum.BUDGET_TRANSITION_STATUS}`)?.scrollIntoView({
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

  const [keyChangesRef, keyInView, keyEntry] = useInView(INTERSECTION_OPTIONS);
  const [structureRef, structureInView, structureEntry] = useInView(INTERSECTION_OPTIONS);
  const [transitionStatusRef, transitionInView, transitionEntry] = useInView(INTERSECTION_OPTIONS);

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
      updateUrl(tab === NavigationTabEnum.KEY_CHANGES ? undefined : tab);
    };

    if (transitionInView) {
      activate(NavigationTabEnum.BUDGET_TRANSITION_STATUS);
    } else if (structureInView) {
      activate(NavigationTabEnum.BUDGET_STRUCTURE);
    } else {
      const hasBoundingData = keyEntryTopY !== 0 && structureEntryTopY !== 0 && transitionEntryTopY !== 0;
      if (
        !keyInView &&
        !transitionInView &&
        !structureInView &&
        hasBoundingData &&
        keyEntryTopY < 0 &&
        structureEntryTopY < 0
      ) {
        // it is close to the footer and any section is in the view
        // activate this as is the last one
        activate(NavigationTabEnum.BUDGET_TRANSITION_STATUS);
      } else {
        activate(NavigationTabEnum.KEY_CHANGES);
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
  ]);

  // transition status section
  const [transitionDataSelected, setTransitionDataSelected] = useState<TransitionStatusDataShown>('Budget');
  const handleTransitionDateSelectedChange = (selected: TransitionStatusDataShown) =>
    setTransitionDataSelected(selected);

  const budgetStructureData = useMemo(() => {
    // compute the data for the budget structure section
    const budgetData = ['scopes', 'immutable', 'legacy'].map((budget) => {
      const values = ['Actuals', 'Budget'].map(
        (metric) =>
          budgetStructureAnalytics.series[0].rows.find(
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
  }, [budgetStructureAnalytics]);

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
    isEnabled,
    handlePauseUrlUpdate,
    keyChangesRef,
    structureRef,
    transitionStatusRef,
    activeTab,
    transitionDataSelected,
    handleTransitionDateSelectedChange,
    budgetStructureData,
    transitionStatusData,
  };
};

export default useEndgameContainer;
