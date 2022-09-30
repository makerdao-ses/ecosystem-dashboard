import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import './markdown.module.scss';

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
};

const ImageTag = styled.img({
  maxWidth: '100%',
  display: 'block',
  margin: '0 auto',
});

const ResponsiveParagraph = styled.div({
  textAlign: 'left',
  marginTop: '0.5em',

  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
});

const ResponsiveList = styled.ul({
  '& li': {
    '& ul': {
      marginTop: '2em',
    },

    '&:not(:last-child) ul': {
      marginBottom: '2em',
    },
  },

  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
});

const ResponsiveItem = styled.li({
  textAlign: 'left',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
});

const ResponsiveCode = styled.code({
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
});
