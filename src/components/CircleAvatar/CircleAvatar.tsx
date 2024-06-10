import { styled } from '@mui/material';
import Identicon from 'identicon.js';
import padEnd from 'lodash/padEnd';
import React from 'react';
import { getColorForString } from '../../../core/utils/colors';
import { getTwoInitials } from '../../../core/utils/string';
import type { CircleAvatarProps } from './type';

export const CircleAvatar: React.FC<CircleAvatarProps> = ({
  width = '32px',
  height = '32px',
  fontSize = '16px',
  identIcon = false,
  onClick,
  name,
  className,
  image,
}) => {
  const identIconImage =
    identIcon &&
    new Identicon(padEnd(name, 43, 'a'), {
      format: 'svg',
      margin: 0,
    }).toString();

  const backgroundImage = identIcon ? `data:image/svg+xml;base64,${identIconImage}` : image;

  return (
    <Container
      className={className}
      onClick={onClick}
      fontSize={fontSize}
      width={width}
      height={height}
      name={name}
      backgroundImage={backgroundImage}
    >
      {!backgroundImage && getTwoInitials(name)}
    </Container>
  );
};

const Container = styled('div')<{
  width: string;
  height: string;
  fontSize: string;
  name: string;
  backgroundImage?: string;
}>(({ height, width, fontSize, backgroundImage, name, theme }) => ({
  width,
  height,
  fontSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 900,
  borderRadius: '50%',
  color: backgroundImage ? 'transparent' : 'white',
  backgroundColor: backgroundImage ? 'white' : getColorForString(name),
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minWidth: width,
  minHeight: height,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.reskinShortShadow,
}));

export default CircleAvatar;
