import { createRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { fetchAnalytics } from '../Finances/api/queries';
import type { BudgetTransitionPlainData, TransitionStatusDataShown } from './types';
import type { Analytic } from '@ses/core/models/interfaces/analytic';
import type { RefObject } from 'react';

export enum NavigationTabEnum {
  LATESTS_UPDATES = 'latest-updates',
  KEY_CHANGES = 'key-changes',
  BUDGET_STRUCTURE = 'endgame-budget-structure',
  BUDGET_TRANSITION_STATUS = 'budget-transition-status',
}

const sections: NavigationTabEnum[] = [
  NavigationTabEnum.LATESTS_UPDATES,
  NavigationTabEnum.KEY_CHANGES,
  NavigationTabEnum.BUDGET_STRUCTURE,
  NavigationTabEnum.BUDGET_TRANSITION_STATUS,
];

const useEndgameView = (budgetTransitionAnalytics: Analytic, yearsRange: string[], initialYear: string) => {
  const [activeTab, setActiveTab] = useState(NavigationTabEnum.LATESTS_UPDATES);

  const sectionRefs = useRef<{ [key in NavigationTabEnum]: RefObject<HTMLDivElement> }>(
    sections.reduce((acc, section) => {
      acc[section] = createRef<HTMLDivElement>();
      return acc;
    }, {} as { [key in NavigationTabEnum]: RefObject<HTMLDivElement> })
  );

  useLayoutEffect(() => {
    const hash = window.location.hash.substring(1) as NavigationTabEnum;
    if (sections.includes(hash)) {
      setTimeout(() => {
        const element = sectionRefs.current[hash].current;
        if (element) {
          const offsetTop = element.offsetTop - 300;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      }, 300);
    }
  }, [sectionRefs]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 300;
    let newActiveTab: NavigationTabEnum | null = null;

    sections.forEach((section) => {
      const element = sectionRefs.current[section].current;
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          newActiveTab = section;
        }
      }
    });

    if (newActiveTab && newActiveTab !== activeTab) {
      setActiveTab(newActiveTab);
      window.history.replaceState(null, '', `#${newActiveTab}`);
    }
  }, [activeTab]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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

  const selectYearsRange = yearsRange.map((e) => ({
    value: e,
    label: e,
  }));

  return {
    sectionRefs,
    activeTab,
    transitionDataSelected,
    handleTransitionDateSelectedChange,
    budgetStructureData,
    isLoadingBudgetStructure,
    selectedYear,
    selectYearsRange,
    handleYearChange,
    transitionStatusData,
  };
};

export default useEndgameView;
