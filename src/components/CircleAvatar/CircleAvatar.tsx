import { styled } from '@mui/material';
import Identicon from 'identicon.js';
import padEnd from 'lodash/padEnd';
import React from 'react';
import { getColorForString } from '@/core/utils/colors';
import { getTwoInitials } from '@/core/utils/string';

export interface CircleAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  image?: string;
  identIcon?: boolean;
  className?: string;
}

export const CircleAvatar: React.FC<CircleAvatarProps> = ({
  identIcon = false,
  name,
  className,
  image,
  ...htmlAttributes
}) => {
  const identIconImage =
    identIcon &&
    new Identicon(padEnd(name, 43, 'a'), {
      format: 'svg',
      margin: 0,
    }).toString();

  const backgroundImage = identIcon ? `data:image/svg+xml;base64,${identIconImage}` : image;

  return (
    <Container className={className} name={name} backgroundImage={backgroundImage} {...htmlAttributes}>
      {!backgroundImage && getTwoInitials(name)}
    </Container>
  );
};

const Container = styled('div')<{
  name: string;
  backgroundImage?: string;
}>(({ theme, backgroundImage, name }) => ({
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
  fontSize: 16,
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
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.reskinShortShadow,
}));

export default CircleAvatar;
