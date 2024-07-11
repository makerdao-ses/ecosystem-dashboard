import lightTheme from '@ses/styles/theme/themes';
import { isBorder } from './types';
import type { Border, BorderConfig, GenericCell, CellPadding } from './types';

const getBorderValue = (border: Border | boolean, isLight: boolean) => {
  const defaultWidth = 1;
  const defaultColor = isLight ? '#D4D9E1' : '#405361';
  const defaultStyle = 'solid';

  if (typeof border === 'boolean') {
    return border ? `${defaultWidth}px ${defaultStyle} ${defaultColor}` : 'none';
  }

  const { color, width, style } = {
    color: defaultColor,
    width: defaultWidth,
    style: defaultStyle,
    ...border,
  };

  return `${width}${typeof width === 'string' ? '' : 'px'} ${style} ${color}`;
};

export const buildBorderStyles = (borderConfig: BorderConfig | Border = {}, isLight = true): React.CSSProperties => {
  if (isBorder(borderConfig)) {
    return {
      border: getBorderValue(borderConfig, isLight),
    };
  }

  return {
    ...(borderConfig.top && {
      borderTop: getBorderValue(borderConfig.top, isLight),
    }),
    ...(borderConfig.right && {
      borderRight: getBorderValue(borderConfig.right, isLight),
    }),
    ...(borderConfig.bottom && {
      borderBottom: getBorderValue(borderConfig.bottom, isLight),
    }),
    ...(borderConfig.left && {
      left: getBorderValue(borderConfig.left, isLight),
    }),
  };
};

export const buildWidthStyles = (width: GenericCell['width']): React.CSSProperties => {
  if (!width) {
    return {};
  }

  if (typeof width === 'string' || typeof width === 'number') {
    return {
      width,
    };
  }

  return {
    ...(width.mobile_375 && {
      width: width.mobile_375,
    }),
    ...(width.tablet_768 && {
      [lightTheme.breakpoints.up('tablet_768')]: {
        width: width.tablet_768,
      },
    }),
    ...(width.desktop_1024 && {
      [lightTheme.breakpoints.up('desktop_1024')]: {
        width: width.desktop_1024,
      },
    }),
    ...(width.desktop_1280 && {
      [lightTheme.breakpoints.up('desktop_1280')]: {
        width: width.desktop_1280,
      },
    }),
    ...(width.desktop_1440 && {
      [lightTheme.breakpoints.up('desktop_1440')]: {
        width: width.desktop_1440,
      },
    }),
    ...(width.desktop_1920 && {
      [lightTheme.breakpoints.up('desktop_1920')]: {
        width: width.desktop_1920,
      },
    }),
  };
};

export const buildPaddingStyles = (padding?: CellPadding): React.CSSProperties => {
  if (!padding) {
    return {};
  }

  if (typeof padding === 'string' || typeof padding === 'number') {
    return {
      padding,
    };
  }

  return {
    ...(padding.mobile_375 && {
      padding: padding.mobile_375,
    }),
    ...(padding.tablet_768 && {
      [lightTheme.breakpoints.up('tablet_768')]: {
        padding: padding.tablet_768,
      },
    }),
    ...(padding.desktop_1024 && {
      [lightTheme.breakpoints.up('desktop_1024')]: {
        padding: padding.desktop_1024,
      },
    }),
    ...(padding.desktop_1280 && {
      [lightTheme.breakpoints.up('desktop_1280')]: {
        padding: padding.desktop_1280,
      },
    }),
    ...(padding.desktop_1440 && {
      [lightTheme.breakpoints.up('desktop_1440')]: {
        padding: padding.desktop_1440,
      },
    }),
    ...(padding.desktop_1920 && {
      [lightTheme.breakpoints.up('desktop_1920')]: {
        padding: padding.desktop_1920,
      },
    }),
  };
};
