import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import { useUrlAnchor } from '../../../../core/hooks/useUrlAnchor';
import { TableItems } from '../../transparency-report/transparency-report';

export const TRANSPARENCY_IDS = ['profile', 'manage'];

export const useManagerAccountViewModel = () => {
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;

  const anchor = useUrlAnchor();
  const transparencyTableRef = useRef<HTMLDivElement>(null);

  const [tabsIndex, setTabsIndex] = useState(1);

  useEffect(() => {
    if (anchor) {
      const index = TRANSPARENCY_IDS.findIndex((id) => anchor.indexOf(id) > -1);
      setTabsIndex(index);
    }
  }, [anchor]);

  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (anchor === '') {
      setScrolled(true);
    }
    if (!scrolled && anchor && TRANSPARENCY_IDS.includes(anchor)) {
      setScrolled(true);
      let offset = (transparencyTableRef?.current?.offsetTop || 0) - 280;
      const windowsWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      if (windowsWidth < 834) {
        offset += 100;
      }
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, Math.max(0, offset));
    }
  }, [anchor]);

  const tabItems: TableItems[] = [
    {
      item: 'Your Profile',
      id: TRANSPARENCY_IDS[0],
    },
  ];

  return {
    tabItems,
    tabsIndex,
    code,
    transparencyTableRef,
  };
};
