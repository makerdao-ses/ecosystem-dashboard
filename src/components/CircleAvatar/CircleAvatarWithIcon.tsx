import styled from '@emotion/styled';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { CircleAvatar } from './CircleAvatar';
import type { CircleAvatarProps } from './type';
import type { CSSProperties } from 'react';

interface CircleAvatarWithIconProps extends CircleAvatarProps {
  icon: JSX.Element;
  className?: string;
  iconStyle?: CSSProperties;
  image: string;
}

const CircleAvatarWithIcon: React.FC<CircleAvatarWithIconProps> = ({
  image,
  className,
  icon,
  width = '34px',
  height = '34px',
  ...circleAvatarProps
}) => (
  <Container className={className}>
    <CircleAvatar image={image} {...circleAvatarProps} width={width} height={height} />

    {icon && <ContainerIcon>{icon}</ContainerIcon>}
  </Container>
);

export default CircleAvatarWithIcon;

const Container = styled.div({
  position: 'relative',
  display: 'flex',
  width: 47,
  height: 47,

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 39,
    height: 38,
  },
});

const ContainerIcon = styled.div({
  position: 'absolute',
  top: 18,
  left: 18,
  zIndex: zIndexEnum.SMALL_ICON_AVATAR_WITH_ICON_COMPONENT,
  width: '100%',
  height: '100%',
  display: 'flex',
  [lightTheme.breakpoints.up('tablet_768')]: {
    top: 16,
    left: 14,
  },
});
