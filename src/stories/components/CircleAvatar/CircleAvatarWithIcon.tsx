import styled from '@emotion/styled';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
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
  ...circleAvatarProps
}) => (
  <Container className={className}>
    <CircleAvatar image={image} {...circleAvatarProps} width={'34px'} height={'34px'} />

    {icon && <ContainerIcon>{icon}</ContainerIcon>}
  </Container>
);

export default CircleAvatarWithIcon;

const Container = styled.div({
  position: 'relative',
  display: 'flex',
  width: 39,
  height: 38,
});

const ContainerIcon = styled.div({
  position: 'absolute',
  top: 16,
  left: 14,
  width: '100%',
  height: '100%',
  display: 'flex',
  zIndex: zIndexEnum.SMALL_ICON_AVATAR_WITH_ICON_COMPONENT,
});
