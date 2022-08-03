import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

interface TabsProps {
  items?: string[],
  currentIndex: number,
  onChange?: (index: number) => void,
  style?: CSSProperties
}

export const Tabs = (props: TabsProps) => {
  return <Wrapper className="no-select" style={props.style}>
    <Container>
      {props.items?.map((item, i) => <Tab
        key={`${item}-${i}`}
        active={i === props.currentIndex}
        onClick={() => props.onChange && props.onChange(i)}>
        {item}
      </Tab>)}
    </Container>
  </Wrapper>;
};

const Wrapper = styled.div({
  width: 'calc(100vw - 32px)',
  overflowX: 'scroll',
  '-ms-overflow-style': 'none',
  scrollbarHeight: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  '@media (min-width: 835px)': {
    width: '100%',
  }
});

const Container = styled.div({
  fontFamily: 'SF Pro Text, sans-serif',
  display: 'flex',
  borderBottom: '1px solid #B6EDE7',
  flex: 1,
  minWidth: 'fit-content',
  gap: '32px',
  width: '100%',
});

const Tab = styled.div((props: { active: boolean }) => ({
  fontFamily: 'SF Pro Text, sans-serif',
  color: props.active ? '#1AAB9B' : '#708390',
  fontSize: '14px',
  fontWeight: 400,
  paddingBottom: '12px',
  borderBottom: `2px solid ${props.active ? '#1AAB9B' : 'white'}`,
  cursor: 'pointer',
  transition: 'all .3s ease',
  whiteSpace: 'nowrap',
  '@media (min-width: 835px)': {
    fontSize: '16px',
  }
}));
