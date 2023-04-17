import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';

import Icon from './Icon/Icon';
import type { IconNames } from './Icon/IconNames';

interface CustomButtonProps {
  className?: string;
  iconName?: IconNames;
  label: string;
  width?: number;
  height?: number;
  fill?: string;
  styleIcon?: React.CSSProperties;

  href: string;
}

const ButtonLink = ({ fill, height, width, iconName, className, href, label, styleIcon }: CustomButtonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLight } = useThemeContext();
  return (
    <Container href={href} className={className}>
      <Text>{label}</Text>
      {iconName && <Icon fill={fill} height={height} width={width} name={iconName} styleIcon={styleIcon} />}
    </Container>
  );
};

export default ButtonLink;

const Container = styled.a({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  border: '1px solid #25273D',
  borderRadius: 22,
  padding: '8px 16px 8px 24px',
  height: 34,
});

const Text = styled.div({
  fontSize: '14px',
  lineHeight: '18px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  marginRight: 8,
  color: ' #231536',
});
