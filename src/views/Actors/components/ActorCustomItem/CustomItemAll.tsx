import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import type { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  total: number;
  isActive: boolean;
}

export const CustomItemAll: FC<Props> = ({ total, isActive, children }) => (
  <ContainerBox>
    <TypographyStyled isActive={isActive}>{total}</TypographyStyled>
    {children}
  </ContainerBox>
);

export default CustomItemAll;

const ContainerBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
});

const TypographyStyled = styled(Typography)<{ isActive: boolean }>(({ theme, isActive }) => ({
  color: theme.palette.isLight
    ? isActive
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.gray[300]
    : isActive
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.charcoal[800],
  width: 24,
}));
