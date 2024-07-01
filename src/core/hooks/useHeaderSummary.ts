import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

// todo: remove this hook after all the legacy headers is replaced
export const useHeaderSummary = (ref: React.RefObject<HTMLDivElement>, code: string) => {
  const router = useRouter();
  const url = router.query.code;
  const [actualsUrl, setActualsUrl] = useState(code);

  const [position, setPosition] = useState(0);
  const [height, setHeight] = useState(165);
  const [showHeader, setShowHeader] = useState(true);
  const updateHeight = useCallback(() => {
    if (ref?.current) {
      const { bottom, top } = ref.current.getBoundingClientRect();
      const elementHeight = bottom - top;
      setHeight(elementHeight);
    }
  }, [ref]);
  const updatePosition = useCallback(() => {
    if (url !== actualsUrl) {
      updateHeight();
      setActualsUrl(code);
    }
    if (ref?.current) {
      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const top = rect.top;

      setPosition(rect.y);

      setShowHeader(scrollY < top);
    }
  }, [actualsUrl, code, ref, updateHeight, url]);

  useEffect(() => {
    if (ref?.current && (showHeader || height === 0)) {
      const { bottom, top } = ref.current.getBoundingClientRect();
      const elementHeight = bottom - top;
      if (elementHeight > height) {
        setHeight(elementHeight);
      }
    }
    // ref.current is not recommended as a dependency, but in this case
    // it works as we only want to trigger the re-render when the ref
    // is properly initialized
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, ref?.current, showHeader]);

  useEffect(() => {
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updateHeight);
    window.addEventListener('resize', updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      window.addEventListener('resize', updateHeight);
    };
  }, [ref, updateHeight, updatePosition]);

  return {
    position,
    height,
    showHeader,
  };
};
