import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { useRouter } from 'next/router';

interface TabsProps {
  items?: string[] | { item: string, id: string}[],
  currentIndex: number,
  style?: CSSProperties
}

export const Tabs = (props: TabsProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const router = useRouter();

  const handleClick = (id: string) => {
    if (id) {
      let path = router.asPath;
      if (path.lastIndexOf('#') !== -1) {
        path = path.substring(0, path.lastIndexOf('#'));
      }
      path += `#${id}`;
      router.push(path, undefined, { shallow: true });
    }
  };

  return <Wrapper className="no-select" style={props.style}>
    <Container isLight={isLight}>
      {props.items?.map((element, i) => {
        let id = '';
        let item: string;
        if (typeof element === 'string') {
          item = element;
        } else {
          item = element?.item;
          id = element?.id;
        }
        return (
          <Tab isLight={isLight}
            key={`${item}-${i}`}
            active={i === props.currentIndex}
            onClick={() => handleClick(id)}
            >
            {item}
          </Tab>
        );
      })}
    </Container>
  </Wrapper>;
};

const Wrapper = styled.div({
  width: 'calc(100vw - 32px)',
  overflowX: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  '@media (min-width: 834px)': {
    width: '100%',
  }
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'SF Pro Text, sans-serif',
  display: 'flex',
  borderBottom: isLight ? '1px solid #B6EDE7' : '1px solid #405361',
  flex: 1,
  minWidth: 'fit-content',
  gap: '32px',
  width: '100%',
}));

const Tab = styled.div<{ active: boolean, isLight: boolean }>(({ active, isLight }) => ({
  fontFamily: 'SF Pro Text, sans-serif',
  color: active && isLight ? '#1AAB9B' : isLight && !active ? '#7E7E88' : !isLight && active ? '#1AAB9B' : '#708390',
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: 400,
  paddingBottom: '12px',
  borderBottom: `2px solid ${isLight ? (active ? '#1AAB9B' : 'transparent') : (active ? '#1AAB9B' : 'transparent')}`,
  cursor: 'pointer',
  transition: 'all .3s ease',
  whiteSpace: 'nowrap',
  '@media (min-width: 834px)': {
    fontSize: '16px',
    lineHeight: '18px',
  }
}));
