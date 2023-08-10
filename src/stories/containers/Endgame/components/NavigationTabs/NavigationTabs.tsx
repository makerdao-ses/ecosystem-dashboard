import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import Link from 'next/link';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const NavigationTabs: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <SpaceLimitation>
      <Navigation isLight={isLight}>
        <Link href="#" passHref>
          <Tab isLight={isLight} active={true}>
            Key Changes
          </Tab>
        </Link>
        <Link href="#" passHref>
          <Tab isLight={isLight}>Endgame Budget Structure</Tab>
        </Link>
        <Link href="#" passHref>
          <Tab isLight={isLight}>Budget Transition Status</Tab>
        </Link>
      </Navigation>
    </SpaceLimitation>
  );
};

export default NavigationTabs;

const SpaceLimitation = styled.div({
  width: '100%',
});

const Navigation = styled.nav<WithIsLight>(({ isLight }) => ({
  position: 'sticky',
  top: 64,
  borderBottom: `1px solid ${isLight ? '#B6EDE7' : 'red'}`,
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  minWidth: 'fit-content',

  [lightTheme.breakpoints.up('table_834')]: {
    gap: 56,
  },
}));

const Tab = styled.a<WithIsLight & { active?: boolean }>(({ isLight, active = false }) => {
  const activeColor = isLight ? '#1AAB9B' : 'red';
  const defaultColor = isLight ? '#708390' : 'red';

  return {
    fontSize: 14,
    color: active ? activeColor : defaultColor,
    paddingBottom: 10,
    borderBottom: `2px solid ${active ? activeColor : 'transparent'}`,
    whiteSpace: 'nowrap',

    [lightTheme.breakpoints.up('table_834')]: {
      fontSize: 16,
      lineHeight: '22px',
    },
  };
});
