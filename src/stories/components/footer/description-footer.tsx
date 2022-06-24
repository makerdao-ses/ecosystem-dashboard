import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';

interface Props {
  title: string
  children: string[]
  color?: string
}

const DescriptionFooter = ({ title, children, color }: Props) => {
  return (
    <div>
      <StyleTitle color={color}>{title}</StyleTitle>
      {children && children.map((item) => {
        return <StyleChildren key={item}>{item}</StyleChildren>;
      })}
    </div>
  );
};

const StyleTitle = styled(Typography)<{ color?: string }>(({ color }) => ({
  color: color || '#000000',
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '18px',
  marginBottom: '14px',
  letterSpacing: '0.4px'
}));

const StyleChildren = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '32px',

  letterSpacing: '0.4px',
  color: '#333333'
});

export default DescriptionFooter;
