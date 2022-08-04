import React, { CSSProperties, useState } from 'react';
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
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();
  const identIconImage = identIcon && new Identicon(props.name, {
    format: 'svg',
    margin: 0.2
  }).toString();

  return <div style={{
    width,
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize,
    fontFamily: (theme as Theme).typography.fontFamily,
    fontWeight: 900,
    borderRadius: '50%',
    color: props.image && loaded ? 'transparent' : 'white',
    background: `${getColorForString(props.name)} ${height}`,
    position: 'relative',
    ...props.style
  }}>
    {((props.image || identIcon)) && <img
        onLoad={() => setLoaded(true)}
        src={identIcon
          ? `data:image/svg+xml;base64,${identIconImage}`
          : props.image}
        alt={getTwoInitials(props.name)}
        style={{
          width,
          height,
          borderRadius: '50%',
          ...props.imageStyle,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          visibility: loaded ? 'visible' : 'hidden'
        }}
      />}
    {getTwoInitials(props.name)}</div>;
};
