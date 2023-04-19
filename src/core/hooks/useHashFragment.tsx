import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Options {
  offset?: number;
  addListeners?: boolean;
  delayOnLoad?: number;
}

export const useHashFragment = ({ offset = 0, addListeners = true, delayOnLoad = 0 }: Options = {}) => {
  const router = useRouter();

  useEffect(() => {
    // function to scroll to the hash element
    const scrollToHashElement = () => {
      const { hash } = window.location;
      const elementToScroll = document.getElementById(hash);

      if (!elementToScroll) return;

      window.scrollTo({
        top: elementToScroll.offsetTop - offset,
        behavior: 'smooth',
      });
    };
    const delayedScrollToHashElement = () => {
      setTimeout(() => {
        scrollToHashElement();
      }, delayOnLoad);
    };
    // function to handle the route change event
    const handleRouteChange = (url: string) => {
      if (url.includes('#')) {
        delayedScrollToHashElement();
      }
    };

    // If we don't want to add listeners, we just scroll to the hash element on page load
    if (!addListeners) {
      delayedScrollToHashElement();
      return;
    }

    // scroll to the hash element on page load
    delayedScrollToHashElement();

    router.events.on('hashChangeComplete', handleRouteChange);
    // Clean up the event listener
    return () => {
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [addListeners, delayOnLoad, offset, router.events]);
};
