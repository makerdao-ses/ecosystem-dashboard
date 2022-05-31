import React, { CSSProperties } from 'react';
import { getColorForString } from '../../../core/utils/color.utils';
import { Theme, useTheme } from '@mui/material';
import { getTwoInitials } from '../../../core/utils/string.utils';
import styled from '@emotion/styled';

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
    background: getColorForString(props.name),
    backgroundSize: height,
    ...props.style
  }}>{props.image
    ? <img
    src={props.image}
    alt={getTwoInitials(props.name)}
    style={{
      width,
      height,
      borderRadius: '50%'
    }}/>
    : getTwoInitials(props.name)}</div>;
};
