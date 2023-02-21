export const getPageWrapper = (): HTMLDivElement | null => document?.querySelector<HTMLDivElement>('#ses-wrapper');

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
