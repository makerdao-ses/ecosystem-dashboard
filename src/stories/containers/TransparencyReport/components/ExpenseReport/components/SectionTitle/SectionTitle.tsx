import styled from '@emotion/styled';
import ArrowLink from '@ses/components/svg/ArrowLink';
import Wallet from '@ses/components/svg/wallet';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { toKebabCase } from '@ses/core/utils/string';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface SectionTitleProps extends React.PropsWithChildren {
  level?: 1 | 2;
  hasIcon?: boolean;
  hasExternalIcon?: boolean;
  idPrefix?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  level = 1,
  hasIcon = false,
  hasExternalIcon = false,
  idPrefix = '',
}) => {
  const { isLight } = useThemeContext();

  return (
    <Title
      isLight={isLight}
      level={level}
      as={level === 1 ? 'h2' : 'h3'}
      id={`#${idPrefix}-${toKebabCase(children as string)}`}
    >
      {hasIcon && (
        <IconContainer>
          <Wallet fill={isLight ? '#231536' : '#D2D4EF'} />
        </IconContainer>
      )}
      {children}
      {hasExternalIcon && (
        <StyledArrowLink
          href={`#${idPrefix}-${toKebabCase(children as string)}`}
          target="_blank"
          fill={'#447AFB'}
          width={20}
          height={20}
        />
      )}
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
  color: isLight ? '#231536' : '#D2D4EF',
  margin: 0,
}));

const IconContainer = styled.div({
  display: 'inline-flex',
  marginRight: 14,
});

const StyledArrowLink = styled(ArrowLink)({
  marginLeft: 10,
  display: 'flex',
  alignItems: 'center',
});
