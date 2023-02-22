export const getPageWrapper = (): HTMLElement | null => document?.querySelector<HTMLElement>('body');

export const enablePageOverflow = (enable = true): void => {
  const pageWrapper = getPageWrapper();
  if (pageWrapper) {
    if (enable) {
      pageWrapper.style.overflow = 'auto';
    } else {
      pageWrapper.style.overflow = 'hidden';
    }
  }
};
