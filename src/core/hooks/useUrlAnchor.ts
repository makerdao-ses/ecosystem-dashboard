import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useUrlAnchor = () => {
  const router = useRouter();
  const [anchor, setAnchor] = useState<string | undefined>();

  useEffect(() => {
    if (router.asPath.lastIndexOf('#') !== -1) {
      const _anchor = router.asPath.substring(router.asPath.lastIndexOf('#') + 1);
      setAnchor(_anchor);
    } else {
      setAnchor('');
    }
  }, [router.asPath]);

  return anchor;
};
