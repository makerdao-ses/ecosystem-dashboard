import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import Link from 'next/link';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const NavigationTabs: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Sticky>
      <Wrapper isLight={isLight}>
        <Container>
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
        </Container>
      </Wrapper>
    </Sticky>
  );
};

export default NavigationTabs;

const Sticky = styled.div({
  position: 'sticky',
  top: 64,
  zIndex: 2,
});

const Wrapper = styled.div<WithIsLight>(({ isLight }) => ({
  backgroundColor: isLight ? 'white' : '#000d1ae8',
  backdropFilter: isLight ? 'none' : 'blur(20px)',
  width: '100%',
  overflowX: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const Navigation = styled.nav<WithIsLight>(({ isLight }) => ({
  borderBottom: `1px solid ${isLight ? '#B6EDE7' : '#405361'}`,
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  minWidth: 'fit-content',
  width: '100%',

  [lightTheme.breakpoints.down('table_834')]: {
    marginLeft: -16,
    paddingLeft: 16,
    paddingRight: 16,
  },

  [lightTheme.breakpoints.up('table_834')]: {
    gap: 56,
  },
}));

const Tab = styled.a<WithIsLight & { active?: boolean }>(({ isLight, active = false }) => {
  const activeColor = isLight ? '#1AAB9B' : '#2DC1B1';
  const defaultColor = '#708390';

  return {
    fontSize: 14,
    color: active ? activeColor : defaultColor,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottom: `2px solid ${active ? activeColor : 'transparent'}`,
    whiteSpace: 'nowrap',

    [lightTheme.breakpoints.up('table_834')]: {
      fontSize: 16,
      lineHeight: '22px',
      paddingBottom: 12,
    },
  };
});
