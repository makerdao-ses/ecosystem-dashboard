import { useTheme } from '@mui/material';
import Identicon from 'identicon.js';
import padEnd from 'lodash/padEnd';
import React from 'react';
import { getColorForString } from '../../../core/utils/color.utils';
import { getTwoInitials } from '../../../core/utils/string.utils';
import type { Theme } from '@mui/material';
import type { CSSProperties } from 'react';

interface CircleAvatarProps {
  width: string;
  height: string;
  name: string;
  image?: string;
  fontSize?: string;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  identIcon?: boolean;
  border?: string;
  onClick?: () => void;
}

export const CircleAvatar = ({
  width = '32px',
  height = '32px',
  fontSize = '16px',
  identIcon = false,
  border = '2px solid #E7FCFA',
  onClick,
  ...props
}: CircleAvatarProps) => {
  const theme = useTheme();
  const identIconImage =
    identIcon &&
    new Identicon(padEnd(props.name, 43, 'a'), {
      format: 'svg',
      margin: 0.2,
    }).toString();

  return (
    <div
      className="circle-avatar"
      onClick={onClick}
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontFamily: (theme as Theme).typography.fontFamily,
        fontWeight: 900,
        borderRadius: '50%',
        color: props.image ? 'transparent' : 'white',
        border: props.image ? 'none' : border,
        background: props.image || identIcon ? 'white' : `${getColorForString(props.name)} ${height}`,
        position: 'relative',
        ...props.style,
      }}
    >
      {(props.image || identIcon) && (
        <img
          src={identIcon ? `data:image/svg+xml;base64,${identIconImage}` : props.image}
          alt={getTwoInitials(props.name)}
          style={{
            width,
            height,
            borderRadius: '50%',
            border,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            ...props.imageStyle,
          }}
        />
      )}
      {getTwoInitials(props.name)}
    </div>
  );
};
