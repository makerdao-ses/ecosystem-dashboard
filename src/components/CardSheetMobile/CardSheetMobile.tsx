import { styled } from '@mui/material';
import React from 'react';
import type { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title: string;
  description: string;
  className?: string;
}

const CardSheetMobile: FC<Props> = ({ title, description, children, className }) => (
  <Container className={className}>
    <Title>{title}</Title>
    <ContainerCard>
      <Description>{description}</Description>
      <div>{children}</div>
    </ContainerCard>
  </Container>
);

export default CardSheetMobile;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
const Title = styled('label')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 700,
  lineHeight: '22px',
  padding: '0px  8px  8px 8px',
  color: theme.palette.isLight ? theme.palette.colors.slate[600] : theme.palette.colors.slate[50],
}));
const Description = styled('label')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '22px',
  letterSpacing: '0.4px',
  color: theme.palette.isLight ? '#546978' : theme.palette.colors.gray[500],
}));

const ContainerCard = styled('div')(({ theme }) => ({
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 8,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#373E4D4D',
}));
