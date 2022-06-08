import React from 'react';
import styled from '@emotion/styled';
import { BreadcrumbSeparator } from '../svg/breadcrumb-separator';

interface BreadcrumbsProps {
  items: (string | JSX.Element)[]
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  return <Container>
    {props.items.map((item, i) => <>
      <Crumb last={i === props.items.length - 1} first={i === 0}>{item}</Crumb>
      {i !== props.items.length - 1 && <BreadcrumbSeparator/>}
    </>)}
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flex: 1,
  padding: '27px 32px',
  boxSizing: 'border-box',
  height: '74px',
  alignSelf: 'flex-start',
});

const Crumb = styled.div((props: { first:boolean, last: boolean }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: props.last ? '#231536' : '#708390',
  marginRight: '15px',
  marginLeft: props.first ? '0' : '15px'
}));
