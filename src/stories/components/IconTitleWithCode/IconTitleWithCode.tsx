import { styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import lightTheme from '@ses/styles/theme/themes';
import Image from 'next/image';
import React from 'react';

interface Props {
  title: string;
  icon: string;
  className?: string;
  code: string;
}

const IconTitleWithCode: React.FC<Props> = ({ icon, title, className, code }) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  return (
    <Container className={className}>
      <Icon>
        <ImageStyle src={icon} width={isMobile ? 29 : 32} height={isMobile ? 29 : 32} alt="Picture" unoptimized />
      </Icon>
      <Title>
        <Code>{code}</Code>
        {title}
      </Title>
    </Container>
  );
};

export default IconTitleWithCode;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  alignItems: 'flex-start',
  [lightTheme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
  },
});

const Title = styled('span')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 20,
  lineHeight: '24.2px',
  letterSpacing: '0.4px',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 28,
    lineHeight: '33.89px',
  },
}));

const Icon = styled('div')({
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
  backgroundColor: '#ECF1F3',
  boxShadow: '2px 4px 7px 0px rgba(26, 171, 155, 0.25)',
  borderRadius: '50%',

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 48,
    height: 48,
    minWidth: 48,
    minHeight: 48,
  },
});

const ImageStyle = styled(Image)(({ theme }) => ({
  borderRadius: 22,
  minWidth: 29,

  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 32,
  },
}));

const Code = styled('span')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'inline-block',
  fontWeight: 600,
  fontSize: 20,
  lineHeight: '24.2px',
  marginRight: 6,
  letterSpacing: '0.4px',
  color: theme ? '#B6BCC2' : '#546978',
  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 8,
    fontSize: 28,
    lineHeight: '33.89px',
  },
}));
