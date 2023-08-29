export const calculateValuesByBreakpoint = (
  isTablet834: boolean,
  isDesktop1194: boolean,
  isDesktop1280: boolean,
  isDesktop1440: boolean
) => {
  const radius = isTablet834 ? [32, 64] : isDesktop1194 || isDesktop1280 || isDesktop1440 ? [48, 96] : [32, 64];

  const center = isTablet834
    ? ['20.538%', 104]
    : isDesktop1194 || isDesktop1280 || isDesktop1440
    ? [101, 124]
    : ['50%', 88];

  const legendPadding = 0;

  const legendLeft = isTablet834 ? '41.8%' : isDesktop1194 || isDesktop1280 || isDesktop1440 ? '52.5%' : 'center';

  const legendTop = isTablet834 ? 28 : isDesktop1194 || isDesktop1280 || isDesktop1440 ? 49 : 168;

  const richNameFontSize = isTablet834 || isDesktop1194 || isDesktop1280 || isDesktop1440 ? 12 : 11;

  const richValueFontSize = isTablet834 || isDesktop1194 || isDesktop1280 || isDesktop1440 ? 14 : 12;
  const richDaiFontSize = richValueFontSize;
  const richPercentFontSize = richValueFontSize;

  const richNamePadding = isTablet834
    ? [21, 0, 0, 0]
    : isDesktop1194
    ? [22, 0, 0, 0]
    : isDesktop1280
    ? [22, 0, 0, 0]
    : isDesktop1440
    ? [22, 0, 0, 0]
    : [17, 20, 0, 0];

  const richValuePadding =
    isTablet834 || isDesktop1194 || isDesktop1280 || isDesktop1440 ? [11, 4, 0, 0] : [7, 3, 0, 0];

  const richDaiPadding = isTablet834 || isDesktop1194 || isDesktop1280 || isDesktop1440 ? [11, 4, 0, 0] : [7, 3, 0, 0];

  const richPercentPadding =
    isTablet834 || isDesktop1194 || isDesktop1280 || isDesktop1440 ? [11, 0, 0, 0] : [7, 0, 0, 0];

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
