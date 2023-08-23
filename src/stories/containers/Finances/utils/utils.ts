export const calculateValuesByBreakpoint = (isTable: boolean, isSmallDesk: boolean, normalSizeDesk: boolean) => {
  const radius = isTable ? ['40%', '75%'] : isSmallDesk ? ['45%', '95%'] : ['45%', '95%'];
  const center = isTable ? ['30%', '50%'] : isSmallDesk ? ['24%', '50%'] : ['24%', '50%'];

  const paddingLegend = isTable
    ? [18, 36, 0, 0]
    : isSmallDesk
    ? [22, 8, 0, 0]
    : normalSizeDesk
    ? [22, 12, 0, 0]
    : [22, 8, 0, 0];

  const paddingRichTextName = isTable ? [24, 0, 9, 1] : isSmallDesk ? [24, 0, 14, 1] : [24, 0, 13.7, 1];
  const paddingRichTextValue = isTable ? [-3, 2, 0, 2] : isSmallDesk ? [0, 2, 0, 2] : [0, 2, 0, 2];
  const paddingRichTextDai = isTable ? [-3, 4, 0, 6] : isSmallDesk ? [0, 4, 0, 6] : [0, 4, 0, 6];
  const paddingRichTextPercent = isTable ? [0, 0, 0, 0] : isSmallDesk ? [0, 0, 0, 0] : [0, 0, 0, 0];

  return {
    radius,
    center,
    paddingLegend,
    paddingRichTextName,
    paddingRichTextValue,
    paddingRichTextDai,
    paddingRichTextPercent,
  };
};
