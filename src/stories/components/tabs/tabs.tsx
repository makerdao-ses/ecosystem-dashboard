import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

interface TabsProps {
  items?: string[],
  currentIndex: number,
  onChange?: (index: number) => void,
  style?: CSSProperties
}

export const Tabs = (props: TabsProps) => {
  return <Container className="no-select" style={props.style}>
    {props.items?.map((item, i) => <Tab
      key={`${item}-${i}`}
      active={i === props.currentIndex}
      onClick={() => props.onChange && props.onChange(i)}>
      {item}
    </Tab>)}
  </Container>;
};

const Container = styled.div({
  fontFamily: 'SF Pro Text, sans-serif',
  display: 'flex',
  borderBottom: '1px solid #B6EDE7',
  flex: 1,
});

const Tab = styled.div((props: { active: boolean }) => ({
  fontFamily: 'SF Pro Text, sans-serif',
  color: props.active ? '#1AAB9B' : '#7E7E88',
  fontSize: '16px',
  fontWeight: 400,
  marginRight: '32px',
  paddingBottom: '12px',
  borderBottom: `2px solid ${props.active ? '#1AAB9B' : 'white'}`,
  cursor: 'pointer',
  transition: 'all .3s ease'
}));
