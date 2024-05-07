import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';
import { AllowedOwnerType } from './types';

const useBudgetStatementContainer = () => {
  const router = useRouter();
  const ownerType = router.query.ownerType as AllowedOwnerType;

  const ref = useRef<HTMLDivElement>(null);
  const { height, showHeader } = useHeaderSummary(ref, 'code');

  const { code, name } = useMemo(() => {
    switch (ownerType) {
      case AllowedOwnerType.KEEPERS:
        return {
          code: 'KEEPERS',
          name: 'Keepers',
        };
      case AllowedOwnerType.SPFS:
        return {
          code: 'SFPs',
          name: 'Special Purpose Funds',
        };
      case AllowedOwnerType.RECOGNIZED_DELEGATES:
        return {
          code: 'DEL',
          name: 'Recognized Delegates',
        };
    }
  }, [ownerType]);

  return {
    ownerType,
    ref,
    height,
    showHeader,
    code,
    name,
  };
};

export default useBudgetStatementContainer;
