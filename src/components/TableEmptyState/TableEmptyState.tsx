import { styled } from '@mui/material';
import Image from 'next/image';
import EmptyDark from 'public/assets/img/empty-dark.png';
import Empty from 'public/assets/img/empty.png';

import React from 'react';
import { useThemeContext } from '@/core/context/ThemeContext';

interface Props {
  description?: string;
}

const TableEmptyState: React.FC<Props> = ({
  description = 'There are no Core Units available with this combination of filters.',
}) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <ImageWrapper>
        <Image src={isLight ? Empty : EmptyDark} alt="There are no elements" layout="fill" unoptimized />
      </ImageWrapper>
      <ContainerDescription>
        <Title>No Results Found</Title>
        <Description>{description}</Description>
      </ContainerDescription>
    </Container>
  );
};
export default TableEmptyState;
const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  position: 'relative',
  width: '100%',
  height: '100%',
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 24,
  fontWeight: 700,
  lineHeight: '28.8px',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  [theme.breakpoints.up('tablet_768')]: {
    lineHeight: '38.4px',
    fontSize: 32,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 40,
    lineHeight: '48px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    lineHeight: '21.6px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
    lineHeight: '28.8px',
  },
}));

const ImageWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '343px',
  minWidth: '100%',
  height: '568px',

  [theme.breakpoints.up('tablet_768')]: {
    width: '704px',
    height: '784px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: '960px',
    height: '712px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: '1200px',
  },
}));

const ContainerDescription = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  position: 'absolute',
  margin: '0 auto',
  top: '40%',
  maxWidth: '279px',
  marginLeft: 8,
  marginTop: 16,
  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: '394px',
    marginLeft: 12,
    marginTop: 32,
    gap: 32,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: '394px',
    gap: 40,
    marginTop: -1,
    marginLeft: -6,
  },
}));
