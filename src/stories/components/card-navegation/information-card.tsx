import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  title: string
  children: (string | JSX.Element)[]
  height: string
}

const InformationCard = ({ title, children, height }: Props) => {
  return (
    <>
      <Typography sx={{
        marginBottom: '16px',
        fontFamily: 'FT Base,sans-serif',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '20px',
        lineHeight: '24px',
        letterSpacing: '0.4px',
        color: '#231536'
      }}>{title}</Typography>
      <Container height={height}>
        {children}
      </Container>
    </>
  );
};
export default InformationCard;

const Container = styled(Box)({
  background: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '6px',
  padding: '16px 16px 24px 16px',
  width: '405px',
});
