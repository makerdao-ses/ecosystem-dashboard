import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import './markdown.module.scss';

export const customRenderer = {
  image(href: string) {
    return <div style={{
      width: '100%',
    }}><ImageTag src={href} className='img-container' key={Math.random()} /></div>;
  },
  paragraph(text: string) {
    return <ResponsiveParagraph className='paragraph' style={{
      backgroundColor: 'transparent',
      color: '#231536',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</ResponsiveParagraph>;
  },
  list(text: string) {
    return <ResponsiveList className='ol_tags' style={{
      backgroundColor: 'transparent',
      color: '#231536',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</ResponsiveList>;
  },
  listitem(text: string) {
    return <ResponsiveItem className='ol_' style={{
      backgroundColor: 'transparent',
      color: '#231536',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</ResponsiveItem>;
  },
  code(text: string) {
    return <ResponsiveCode className='tag-code' key={Math.random()} style={{
      backgroundColor: 'transparent',
      color: '#231536',
      fontFamily: 'FT Base, sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19px',
    }}>{text}</ResponsiveCode>;
  },
};

export const customRendererDark = {
  image(href: string) {
    return <div style={{
      width: '100%',
    }}><ImageTag src={href} className='img-container' key={href} /></div>;
  },
  paragraph(text: string) {
    return <ResponsiveParagraph className='paragraph' style={{
      backgroundColor: 'transparent',
      color: '#D2D4EF',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</ResponsiveParagraph>;
  },
  list(text: string) {
    return <ResponsiveList className='ol_tags' style={{
      backgroundColor: 'transparent',
      color: '#D2D4EF',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</ResponsiveList>;
  },
  listitem(text: string) {
    return <ResponsiveItem className='ol_' style={{
      backgroundColor: 'transparent',
      color: '#D2D4EF',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</ResponsiveItem>;
  },
  code(text: string) {
    return <ResponsiveCode className='tag-code' key={Math.random()} style={{
      backgroundColor: 'transparent',
      color: '#D2D4EF',
      fontFamily: 'FT Base, sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19px',
    }}>{text}</ResponsiveCode>;
  },
};

const ImageTag = styled.img({
  width: '660px',
  height: '308px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    display: 'block',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: '327px',
    height: '152px',
    display: 'block',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    width: 'fit-content',
    height: 'auto',
  },
});

const ResponsiveParagraph = styled.p({
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
