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
        <ImageStyle src={icon} width={isMobile ? 32 : 42} height={isMobile ? 32 : 42} alt="Picture" unoptimized />
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
  alignItems: 'center',

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
});

const Title = styled('span')(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '120%',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  margin: 0,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 24,
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
  boxShadow: '2px 4px 7px rgba(25, 144, 255, 0.20)',
  borderRadius: '50%',

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 42,
    height: 42,
    minWidth: 42,
    minHeight: 42,
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
  display: 'inline-block',
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '120%',
  marginRight: 8,
  color: theme.palette.isLight ? theme.palette.colors.gray[400] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 16,
    fontSize: 20,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 24,
  },
}));
