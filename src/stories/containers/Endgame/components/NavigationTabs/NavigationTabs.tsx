import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const NavigationTabs: React.FC = () => {
  const { isLight } = useThemeContext();
  const router = useRouter();
  const [asPath, setAsPath] = useState('');

  useEffect(() => {
    setAsPath(router.asPath);

    // Will run when leaving the current page (on back/forward click)
    router.beforePopState(({ as }) => {
      const url = as.split('#');
      if (url[0] === '/endgame') {
        setAsPath(as);
        return false;
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onHashChangeStart = (url: string) => {
      setAsPath(url);
    };

    router.events.on('hashChangeStart', onHashChangeStart);

    return () => {
      router.events.off('hashChangeStart', onHashChangeStart);
    };
  }, [router.events]);

  return (
    <Sticky>
      <Wrapper isLight={isLight}>
        <Container>
          <Navigation isLight={isLight}>
            <Link href="#key-changes" scroll={false} passHref>
              <Tab isLight={isLight} active={asPath === '/endgame#key-changes'}>
                Key Changes
              </Tab>
            </Link>
            <Link href="#endgame-budget-structure" scroll={false} passHref>
              <Tab isLight={isLight} active={asPath === '/endgame#endgame-budget-structure'}>
                Endgame Budget Structure
              </Tab>
            </Link>
            <Link href="#budget-transition-status" scroll={false} passHref>
              <Tab isLight={isLight} active={asPath === '/endgame#budget-transition-status'}>
                Budget Transition Status
              </Tab>
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
