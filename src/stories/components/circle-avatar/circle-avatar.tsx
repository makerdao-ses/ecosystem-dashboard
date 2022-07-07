import React, { CSSProperties } from 'react';
import { getColorForString } from '../../../core/utils/color.utils';
import { Theme, useTheme } from '@mui/material';
import { getTwoInitials } from '../../../core/utils/string.utils';
import Identicon from 'identicon.js';

interface CircleAvatarProps {
  width: string;
  height: string;
  name: string;
  image?: string;
  fontSize?: string;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  identIcon?: boolean;
}

export const CircleAvatar = ({ width = '32px', height = '32px', fontSize = '16px', identIcon = false, ...props }: CircleAvatarProps) => {
  const theme = useTheme();
  const identIconImage = identIcon && new Identicon(props.name, {
    format: 'svg',
    margin: 0.2
  }).toString();

  return <div style={{
    width,
    height,
    textAlign: 'center',
    lineHeight: height,
    fontSize,
    fontFamily: (theme as Theme).typography.fontFamily,
    fontWeight: 900,
    borderRadius: '50%',
    color: props.image ? 'transparent' : 'white',
    background: `${getColorForString(props.name)} ${height}`,
    ...props.style
  }}>{props.image || identIcon
    ? <img
    src={identIcon
      ? `data:image/svg+xml;base64,${identIconImage}`
      : props.image}
    alt={getTwoInitials(props.name)}
    style={{
      width,
      height,
      borderRadius: '50%',
      ...props.imageStyle
    }}/>
    : getTwoInitials(props.name)}</div>;
};
