import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const useActorProjectsContainer = () => {
  const { isLight } = useThemeContext();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { height, showHeader } = useHeaderSummary(ref, router.query.code as string);

  return {
    ref,
    height,
    showHeader,
    isLight,
  };
};

export default useActorProjectsContainer;
