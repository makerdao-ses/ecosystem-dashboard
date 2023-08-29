import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import type { IntersectionOptions } from 'react-intersection-observer';

export enum NavigationTabEnum {
  KEY_CHANGES = 'key-changes',
  BUDGET_STRUCTURE = 'endgame-budget-structure',
  BUDGET_TRANSITION_STATUS = 'budget-transition-status',
}

const INTERSECTION_OPTIONS: IntersectionOptions = {
  threshold: 0.5,
  fallbackInView: false,
};

const useEndgameContainer = () => {
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();
  const [pauseUrlUpdate, setPauseUrlUpdate] = useState<boolean>(false);

  const handlePauseUrlUpdate = useCallback(() => {
    setPauseUrlUpdate(true);
    // un pause the updating after the scroll has ended
    setTimeout(() => setPauseUrlUpdate(false), 700);
  }, []);

  const { ref: keyChangesRef, inView: keyInView, entry: keyEntry } = useInView(INTERSECTION_OPTIONS);
  const { ref: structureRef, inView: structureInView, entry: structureEntry } = useInView(INTERSECTION_OPTIONS);
  const {
    ref: transitionStatusRef,
    inView: transitionInView,
    entry: transitionEntry,
  } = useInView(INTERSECTION_OPTIONS);

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

    if (structureInView) {
      if (keyInView && (keyEntry?.intersectionRatio ?? 0) > (structureEntry?.intersectionRatio ?? 0)) {
        activate(NavigationTabEnum.KEY_CHANGES);
      }
      if (transitionInView && (transitionEntry?.intersectionRatio ?? 0) > (structureEntry?.intersectionRatio ?? 0)) {
        activate(NavigationTabEnum.KEY_CHANGES);
      }
      activate(NavigationTabEnum.BUDGET_STRUCTURE);
    } else if (transitionInView) {
      activate(NavigationTabEnum.BUDGET_TRANSITION_STATUS);
    } else {
      activate(NavigationTabEnum.KEY_CHANGES);
    }
  }, [structureInView, transitionInView, keyInView, keyEntry, structureEntry, transitionEntry, pauseUrlUpdate]);

  return {
    isLight,
    isEnabled,
    handlePauseUrlUpdate,
    keyChangesRef,
    structureRef,
    transitionStatusRef,
    activeTab,
  };
};

export default useEndgameContainer;
