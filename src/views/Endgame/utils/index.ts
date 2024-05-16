export const calculateValuesByBreakpoint = (
  isTablet768: boolean,
  isDesktop1024: boolean,
  isDesktop1280: boolean,
  isDesktop1440: boolean
) => {
  const radius = isTablet768 ? [28, 56] : isDesktop1024 || isDesktop1280 || isDesktop1440 ? [48, 96] : [32, 64];

  const center = isTablet768
    ? ['21.2%', 98]
    : isDesktop1024
    ? [110, 124]
    : isDesktop1280 || isDesktop1440
    ? [101, 124]
    : ['50%', 88];

  const legendPadding = 0;

  const legendLeft = isTablet768
    ? '40%'
    : isDesktop1024
    ? '49.5%'
    : isDesktop1280 || isDesktop1440
    ? '52.5%'
    : 'center';

  const legendTop = isTablet768 ? 28 : isDesktop1024 || isDesktop1280 || isDesktop1440 ? 49 : 168;

  const richNameFontSize = isDesktop1024 || isDesktop1280 || isDesktop1440 ? 12 : 11;

  const richValueFontSize = isDesktop1024 || isDesktop1280 || isDesktop1440 ? 14 : 12;
  const richDaiFontSize = richValueFontSize;
  const richPercentFontSize = richValueFontSize;

  const richNamePadding = isTablet768
    ? [21, 0, 0, 0]
    : isDesktop1024
    ? [22, 0, 0, 0]
    : isDesktop1280
    ? [22, 0, 0, 0]
    : isDesktop1440
    ? [22, 0, 0, 0]
    : [17, 20, 0, 0];

  const richValuePadding =
    isTablet768 || isDesktop1024 || isDesktop1280 || isDesktop1440 ? [11, 4, 0, 0] : [7, 3, 0, 0];

  const richDaiPadding = isTablet768 || isDesktop1024 || isDesktop1280 || isDesktop1440 ? [11, 4, 0, 0] : [7, 3, 0, 0];

  const richPercentPadding =
    isTablet768 || isDesktop1024 || isDesktop1280 || isDesktop1440 ? [11, 0, 0, 0] : [7, 0, 0, 0];

  return {
    radius,
    center,

    legendPadding,
    legendLeft,
    legendTop,

    richNameFontSize,
    richValueFontSize,
    richDaiFontSize,
    richPercentFontSize,

    richNamePadding,
    richValuePadding,
    richDaiPadding,
    richPercentPadding,
  };
};
