import styled from '@emotion/styled';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { CircleAvatar } from './CircleAvatar';
import type { CircleAvatarProps } from './CircleAvatar';
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
  ...circleAvatarProps
}) => (
  <Container className={className}>
    <Avatar image={image} {...circleAvatarProps} />

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

const Avatar = styled(CircleAvatar)(() => ({
  width: 34,
  height: 34,
  minWidth: 34,
  minHeight: 34,
}));
