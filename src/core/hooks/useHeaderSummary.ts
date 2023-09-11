import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useHeaderSummary = (ref: React.RefObject<HTMLDivElement>, code: string) => {
  const router = useRouter();
  const url = router.query.code;
  const [actualsUrl, setActualsUrl] = useState(code);

  const [position, setPosition] = useState(0);
  const [height, setHeight] = useState(0);
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
    updateHeight();
  }, [updateHeight]);

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
