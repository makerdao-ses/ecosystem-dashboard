import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { BreadcrumbSeparator } from '../svg/breadcrumb-separator';
export type NavigationBreadcrumb = {
  label: string | JSX.Element;
  url: string;
  style?: React.CSSProperties;
};
interface BreadcrumbsProps {
  items: NavigationBreadcrumb[];
  height?: number;
  width?: number;
  paddingBreadcrumbs?: string;
  fontSize?: string;
  borderRadius?: string;
  marginLeft?: string;
  marginRight?: string;
  className?: string;
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { isLight } = useThemeContext();
  return (
    <Container
      className={props.className}
      isLight={isLight}
      padding={props.paddingBreadcrumbs}
      borderRadius={props.borderRadius}
    >
      {props.items.map((item, i) => (
        <LinkWrapper key={item.label.toString()}>
          <Link
            key={item.label.toString() + i}
            href={item.url}
            passHref
            style={{
              pointerEvents: item.url && !(i === props.items.length - 1) ? 'all' : 'none',
            }}
            legacyBehavior
          >
            <Crumb
              className="crumb"
              isLight={isLight}
              last={i === props.items.length - 1}
              first={i === 0}
              fontSize={props.fontSize}
              marginLeft={props.marginLeft}
              marginRight={props.marginRight}
            >
              {item.label}
            </Crumb>
          </Link>
          {i !== props.items.length - 1 && (
            <BreadcrumbSeparator fillDark="#787A9B" fill="#D1DEE6" height={props.height} width={props.width} />
          )}
        </LinkWrapper>
      ))}
    </Container>
  );
};

export default Breadcrumbs;
const Container = styled.div<{
  padding?: string;
  borderRadius?: string;
  isLight: boolean;
}>(({ padding = '13.2px 0', borderRadius }) => ({
  display: 'flex',
  flex: 1,
  padding,
  boxSizing: 'border-box',
  height: '100%',
  alignSelf: 'flex-start',
  borderRadius,
}));

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

const Crumb = styled.a<{
  first: boolean;
  last: boolean;
  isLight: boolean;
  fontSize?: string;
  marginLeft?: string;
  marginRight?: string;
}>(({ first, last, isLight, fontSize = '16px', marginLeft, marginRight = '15px' }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: last ? 700 : 400,
  fontSize,
  lineHeight: '19px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: last && isLight ? '#231536' : !last && isLight ? '#708390' : last && !isLight ? '#D2D4EF' : '#787A9B',
  marginRight,
  marginLeft: first ? '0' : marginLeft ?? '15px',
  cursor: 'pointer',
  textDecoration: 'none',
}));
