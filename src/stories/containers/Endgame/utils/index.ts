export const calculateValuesByBreakpoint = (
  isTablet: boolean,
  isSmallDesk: boolean,
  isNormalDesk: boolean,
  isNormalDeskPlus: boolean
) => {
  const radius = isTablet
    ? [32, 64]
    : isSmallDesk
    ? [48, 96]
    : isNormalDesk
    ? [48, 96]
    : isNormalDeskPlus
    ? [48, 96]
    : [32, 64];

  const center = isTablet
    ? ['20.538%', 104]
    : isSmallDesk
    ? ['29.4%', 118]
    : isNormalDesk
    ? ['25.5%', 118]
    : isNormalDeskPlus
    ? ['25.5%', 118]
    : ['50%', 88];

  const legendPadding = isTablet ? 0 : isSmallDesk ? 0 : isNormalDesk ? 0 : isNormalDeskPlus ? 0 : 0;

  const legendLeft = isTablet
    ? '41.565%'
    : isSmallDesk
    ? '56.4%'
    : isNormalDesk
    ? '49%'
    : isNormalDeskPlus
    ? '45%'
    : 'center';

  const legendTop = isTablet ? 30 : isSmallDesk ? 50 : isNormalDesk ? 50 : isNormalDeskPlus ? 50 : 168;

  const richNameFontSize = isTablet ? 12 : isSmallDesk ? 12 : isNormalDesk ? 12 : isNormalDeskPlus ? 12 : 11;

  const richValueFontSize = isTablet ? 14 : isSmallDesk ? 14 : isNormalDesk ? 14 : isNormalDeskPlus ? 14 : 12;

  const richDaiFontSize = isTablet ? 14 : isSmallDesk ? 14 : isNormalDesk ? 14 : isNormalDeskPlus ? 14 : 12;

  const richPercentFontSize = isTablet ? 14 : isSmallDesk ? 14 : isNormalDesk ? 14 : isNormalDeskPlus ? 14 : 12;

  const richNamePadding = isTablet
    ? [21, 0, 0, 0]
    : isSmallDesk
    ? [22, 0, 0, 0]
    : isNormalDesk
    ? [22, 0, 0, 0]
    : isNormalDeskPlus
    ? [22, 0, 0, 0]
    : [17, 0, 0, 0];

  const richValuePadding = isTablet
    ? [11, 3, 0, 0]
    : isSmallDesk
    ? [12, 3, 0, 0]
    : isNormalDesk
    ? [12, 3, 0, 0]
    : isNormalDeskPlus
    ? [12, 3, 0, 0]
    : [7, 3, 0, 0];

  const richDaiPadding = isTablet
    ? [11, 3, 0, 0]
    : isSmallDesk
    ? [12, 3, 0, 0]
    : isNormalDesk
    ? [12, 3, 0, 0]
    : isNormalDeskPlus
    ? [12, 3, 0, 0]
    : [7, 3, 0, 0];

  const richPercentPadding = isTablet
    ? [11, 0, 0, 0]
    : isSmallDesk
    ? [12, 0, 0, 0]
    : isNormalDesk
    ? [12, 0, 0, 0]
    : isNormalDeskPlus
    ? [12, 0, 0, 0]
    : [7, 0, 0, 0];

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
