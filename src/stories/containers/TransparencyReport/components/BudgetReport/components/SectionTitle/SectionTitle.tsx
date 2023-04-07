import styled from '@emotion/styled';
import Wallet from '@ses/components/svg/wallet';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface SectionTitleProps extends React.PropsWithChildren {
  level?: 1 | 2;
  hasIcon?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, level = 1, hasIcon = false }) => {
  const { isLight } = useThemeContext();

  return (
    <Title isLight={isLight} level={level} as={level === 1 ? 'h2' : 'h3'}>
      {hasIcon && (
        <IconContainer>
          <Wallet fill={isLight ? '#231536' : '#F00'} />
        </IconContainer>
      )}
      {children}
    </Title>
  );
};

export default SectionTitle;

const Title = styled.h2<{ level: number } & WithIsLight>(({ isLight, level }) => ({
  display: 'flex',
  fontSize: 20,
  lineHeight: '24px',
  letterSpacing: '0.4px',
  fontWeight: level === 1 ? 600 : 500,
  color: isLight ? '#231536' : '#f00',
  margin: 0,
}));

const IconContainer = styled.div({
  display: 'inline-flex',
  marginRight: 14,
});
