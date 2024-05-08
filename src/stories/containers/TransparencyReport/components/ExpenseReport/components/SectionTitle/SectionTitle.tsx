import styled from '@emotion/styled';
import ArrowLink from '@ses/components/svg/ArrowLink';
import Wallet from '@ses/components/svg/wallet';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { toKebabCase } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
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
        <StyledArrowLink href={`#${idPrefix}-${toKebabCase(children as string)}`} target="_blank" fill={'#447AFB'} />
      )}
    </Title>
  );
};

export default SectionTitle;

const Title = styled.h2<{ level: number } & WithIsLight>(({ isLight, level }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: 16,
  lineHeight: '19px',
  letterSpacing: level === 1 ? 0 : '0.3px',
  fontWeight: 700,
  color: isLight ? '#231536' : '#D2D4EF',
  margin: 0,
  fontFeatureSettings: "'tnum' on, 'lnum' on",

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: level === 1 ? 20 : 18,
    lineHeight: level === 1 ? '24px' : '22px',
    letterSpacing: '0.4px',
    fontWeight: level === 1 ? 600 : 500,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const IconContainer = styled.div({
  display: 'inline-flex',
  marginRight: 12,

  svg: {
    width: 10,
    height: 10,

    [lightTheme.breakpoints.up('table_834')]: {
      width: 20,
      height: 20,
    },
  },
});

const StyledArrowLink = styled(ArrowLink)({
  marginLeft: 8,
  display: 'flex',
  alignItems: 'center',

  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 10,
  },

  svg: {
    width: 16,
    height: 16,

    [lightTheme.breakpoints.up('table_834')]: {
      width: 20,
      height: 20,
    },
  },
});
