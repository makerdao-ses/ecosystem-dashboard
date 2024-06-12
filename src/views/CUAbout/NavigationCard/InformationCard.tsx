import { Typography, styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';

interface Props {
  title: string;
  children: (string | JSX.Element)[];
  width?: string;

  letterSpacing?: string;

  padding?: string;
  isTitlePresent?: boolean;
  className?: string;
}

const InformationCard = ({
  title,
  children,
  isTitlePresent = true,

  className,
}: Props) => (
  <ContainerTitleCard className={className}>
    {isTitlePresent && <Label>{title}</Label>}
    <Container>{children}</Container>
  </ContainerTitleCard>
);
export default InformationCard;

const Container = styled(Card)(({ theme }) => ({
  padding: 16,
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    width: '100%',
  },
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    width: '100%',
  },
  [theme.breakpoints.up('tablet_768')]: {
    padding: 8,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: 16,
  },
}));

const Label = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 20,
  fontWeight: 700,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const ContainerTitleCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});
