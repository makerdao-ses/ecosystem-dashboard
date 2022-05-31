import React, { CSSProperties } from 'react';
import { getColorForString } from '../../../core/utils/color.utils';
import { Theme, useTheme } from '@mui/material';
import { getTwoInitials } from '../../../core/utils/string.utils';

interface CircleAvatarProps {
  width: string,
  height: string,
  name: string,
  image?: string
  fontSize?: string,
  style?: CSSProperties
}

export const CircleAvatar = ({ width = '32px', height = '32px', fontSize = '16px', ...props }: CircleAvatarProps) => {
  const theme = useTheme();

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
    background: `${props.image ? `url(${props.image})` : getColorForString(props.name)}`,
    backgroundSize: height,
    ...props.style
  }}>{getTwoInitials(props.name)}</div>;
};
