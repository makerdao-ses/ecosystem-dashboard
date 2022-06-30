import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';

interface Props {
  title: string
  children: string[]
  style?: React.CSSProperties
}

const DescriptionFooter = ({ title, children, style = {} }: Props) => {
  return (
    <div style={style}>
      <StyleTitle>{title}</StyleTitle>
      {children && children.map((item) => {
        return <StyleChildren key={item}>{item}</StyleChildren>;
      })}
    </div>
  );
};

const StyleTitle = styled(Typography)({
  color: '#000000',
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '18px',
  marginBottom: '16px',
  letterSpacing: '0.4px'
});

const StyleChildren = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '32px',
  letterSpacing: '0.4px',
  color: '#333333',
  marginBottom: '16px'
});

export default DescriptionFooter;
