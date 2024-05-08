import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/themes';
import './Markdown.module.scss';

export const customRenderer = {
  image(href: string) {
    return (
      <div
        style={{
          width: '100%',
        }}
      >
        <ImageTag src={href} className="img-container" key={Math.random()} />
      </div>
    );
  },
  paragraph(text: string) {
    return (
      <ResponsiveParagraph
        className="paragraph"
        style={{
          backgroundColor: 'transparent',
          color: '#231536',
          lineHeight: '22px',
          fontFamily: 'Inter, sans-serif',
          marginBottom: 0,
          textAlign: 'left',
        }}
        key={Math.random()}
      >
        {text}
      </ResponsiveParagraph>
    );
  },
  list(text: string) {
    return (
      <ResponsiveList
        className="ol_tags"
        style={{
          backgroundColor: 'transparent',
          color: '#231536',
          lineHeight: '22px',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'left',
        }}
        key={Math.random()}
      >
        {text}
      </ResponsiveList>
    );
  },
  listitem(text: string) {
    return (
      <ResponsiveItem
        className="ol_"
        style={{
          backgroundColor: 'transparent',
          color: '#231536',
          lineHeight: '22px',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'left',
        }}
        key={Math.random()}
      >
        {text}
      </ResponsiveItem>
    );
  },
  code(text: string) {
    return (
      <ResponsiveCode
        className="tag-code"
        key={Math.random()}
        style={{
          backgroundColor: 'transparent',
          color: '#231536',
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '22px',
          textAlign: 'left',
        }}
      >
        {text}
      </ResponsiveCode>
    );
  },
  heading(text: string, level: number) {
    switch (level) {
      case 1:
        return (
          <HeadingResponsiveH1
            style={{
              color: '#231536',
            }}
          >
            {text}
          </HeadingResponsiveH1>
        );
      case 2:
        return (
          <HeadingResponsiveH2
            style={{
              color: '#231536',
            }}
          >
            {text}
          </HeadingResponsiveH2>
        );
      case 3:
        return (
          <HeadingResponsiveH3
            style={{
              color: '#231536',
            }}
          >
            {text}
          </HeadingResponsiveH3>
        );
      default:
        return (
          <HeadingResponsiveH3
            style={{
              color: '#231536',
            }}
          >
            {text}
          </HeadingResponsiveH3>
        );
    }
  },
};

export const customRendererDark = {
  image(href: string) {
    return (
      <div
        style={{
          width: '100%',
        }}
      >
        <ImageTag src={href} className="img-container" key={href} />
      </div>
    );
  },
  paragraph(text: string) {
    return (
      <ResponsiveParagraph
        className="paragraph"
        style={{
          backgroundColor: 'transparent',
          color: '#D2D4EF',
          lineHeight: '22px',
          fontFamily: 'Inter, sans-serif',
          marginBottom: 0,
          textAlign: 'left',
        }}
        key={Math.random()}
      >
        {text}
      </ResponsiveParagraph>
    );
  },
  list(text: string) {
    return (
      <ResponsiveList
        className="ol_tags"
        style={{
          backgroundColor: 'transparent',
          color: '#D2D4EF',
          lineHeight: '22px',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'left',
        }}
        key={Math.random()}
      >
        {text}
      </ResponsiveList>
    );
  },
  listitem(text: string) {
    return (
      <ResponsiveItem
        className="ol_"
        style={{
          backgroundColor: 'transparent',
          color: '#D2D4EF',
          lineHeight: '22px',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'left',
        }}
        key={Math.random()}
      >
        {text}
      </ResponsiveItem>
    );
  },
  code(text: string) {
    return (
      <ResponsiveCode
        className="tag-code"
        key={Math.random()}
        style={{
          backgroundColor: 'transparent',
          color: '#D2D4EF',
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '22px',
          textAlign: 'left',
        }}
      >
        {text}
      </ResponsiveCode>
    );
  },
  heading(text: string, level: number) {
    switch (level) {
      case 1:
        return (
          <HeadingResponsiveH1
            style={{
              color: '#D2D4EF',
            }}
          >
            {text}
          </HeadingResponsiveH1>
        );
      case 2:
        return (
          <HeadingResponsiveH2
            style={{
              color: '#D2D4EF',
            }}
          >
            {text}
          </HeadingResponsiveH2>
        );
      case 3:
        return (
          <HeadingResponsiveH3
            style={{
              color: '#D2D4EF',
            }}
          >
            {text}
          </HeadingResponsiveH3>
        );
      default:
        return (
          <HeadingResponsiveH3
            style={{
              color: '#D2D4EF',
            }}
          >
            {text}
          </HeadingResponsiveH3>
        );
    }
  },
};

const ImageTag = styled.img({
  maxWidth: '100%',
  display: 'block',
  margin: '0 auto',
});

const ResponsiveParagraph = styled.div({
  textAlign: 'left',
  marginTop: '1em',

  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  [lightTheme.breakpoints.down('mobile_375')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
});

const ResponsiveList = styled.ul({
  '& li': {
    '& ul': {
      marginTop: '2em',
    },
    marginTop: '0.5em',
    '&:not(:last-child) ul': {
      marginBottom: '2em',
    },
  },
  marginTop: '1em',
  marginBottom: '0px',
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  [lightTheme.breakpoints.down('mobile_375')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
});

const ResponsiveItem = styled.li({
  textAlign: 'left',
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  [lightTheme.breakpoints.down('mobile_375')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
});

const ResponsiveCode = styled.code({
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  [lightTheme.breakpoints.down('mobile_375')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
});

const HeadingResponsiveH1 = styled.h1({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',
  marginTop: 32,
  marginBottom: 0,
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: '0.4px',
  },
});

const HeadingResponsiveH2 = styled.h2({
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 'normal',
  marginBottom: 0,
  marginTop: 32,
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    fontWeight: 600,
  },
});

const HeadingResponsiveH3 = styled.h3({
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 'normal',
  marginBottom: 0,
  marginTop: 32,
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    fontWeight: 600,
  },
});
