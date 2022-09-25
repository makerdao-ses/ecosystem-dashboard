import React from 'react';
import styled from '@emotion/styled';
import { BreadcrumbSeparator } from '../svg/breadcrumb-separator';
import Link from 'next/link';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface BreadcrumbsProps {
  items: {
    label: string | JSX.Element;
    url: string;
  }[];
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container>
      {props.items.map((item, i) => (
        <LinkWrapper key={item.label.toString()}>
          <Link
            key={item.label.toString() + i}
            href={item.url}
            style={{
              pointerEvents: item.url && !(i === props.items.length - 1) ? 'all' : 'none',
            }}
          >
            <Crumb isLight={isLight} last={i === props.items.length - 1} first={i === 0}>
              {item.label}
            </Crumb>
          </Link>
          {i !== props.items.length - 1 && <BreadcrumbSeparator fillDark="#787A9B" fill="#D1DEE6" />}
        </LinkWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flex: 1,
  padding: '27px 0',
  boxSizing: 'border-box',
  height: '74px',
  alignSelf: 'flex-start',
});

const LinkWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  '@media (max-width: 1000px)': {
    '&:nth-of-type(n + 3)': {
      display: 'none',
    },
    '&:nth-of-type(n + 2)': {
      svg: {
        visibility: 'hidden',
      },
    },
  },
});

const Crumb = styled.a<{ first: boolean; last: boolean; isLight: boolean }>(({ first, last, isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: last ? 700 : 400,
  fontSize: '16px',
  lineHeight: '19px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: last && isLight ? '#231536' : !last && isLight ? '#708390' : last && !isLight ? '#D2D4EF' : '#787A9B',
  marginRight: '15px',
  marginLeft: first ? '0' : '15px',
  cursor: 'pointer',
}));
