import styled from '@emotion/styled';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import Background404 from '../../../../public/assets/img/background-404.png';
import Background404Dark from '../../../../public/assets/img/background-dark-404.png';
import BackgroundMobile404 from '../../../../public/assets/img/background-mobile-404.png';
import BackgroundMobile404Dark from '../../../../public/assets/img/background-mobile-dark-404.png';
import Logo404 from '../../../../public/assets/img/logo-404.png';
import Logo404Dark from '../../../../public/assets/img/logo-dark-404.png';
import { Typography, useMediaQuery } from '@mui/material';
import lightTheme from '../../../../styles/theme/light';
import { CustomButton } from '../custom-button/custom-button';
import { useRouter } from 'next/router';
import { useThemeContext } from '../../../core/context/ThemeContext';

const CardNotFoundPage: NextPage = () => {
  const router = useRouter();
  const phoneLess = useMediaQuery(lightTheme.breakpoints.down('table_375'));
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const isLight = useThemeContext().themeMode === 'light';
  const handleOnclick = () => {
    router.push('/');
  };
  return (
    <Wrapper>
      <ImageContainer>
        <Image
          src={isLight && (phoneLess || isMobile) ? BackgroundMobile404 : !isLight && (phoneLess || isMobile) ? BackgroundMobile404Dark : isLight && !(phoneLess || isMobile) ? Background404 : Background404Dark}
          objectFit="fill"
          alt="404"
          layout='fill'
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        <ContainerData>
          <LogoContainer>
            <Image src={isLight ? Logo404 : Logo404Dark}
              layout='fill'
              objectFit='contain'
              objectPosition='center'
            />
          </LogoContainer>
          <ContainerText>
            <TextUps>Oops!</TextUps>
            <TextDescription>The Page you requested couldn't be found</TextDescription>
          </ContainerText>
          <ContainerButton> <CustomButton widthText='100%' label='Go Back to Homepage' style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            width: '250px',
            height: '48px',
            background: isLight ? '#E7FCFA' : 'transparent',
            border: '1px solid #1AAB9B',
            borderRadius: '22px',
            // eslint-disable-next-line @typescript-eslint/no-empty-function
          }} onClick={handleOnclick} styleText={{
            color: '#1AAB9B',
            fontSize: '16px',
            lineHeight: '24px'
          }} />
          </ContainerButton>
        </ContainerData>
      </ImageContainer>
    </Wrapper >);
};

const Wrapper = styled.div({
  width: '100%',
  height: '100%',
  marginTop: '132px',
  marginBottom: '128px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: '132px',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    marginTop: '132px',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    marginTop: '132px',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    marginTop: '132px',
  },
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    marginTop: '132px',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    marginTop: '128px',
  },
});

const ImageContainer = styled.div<{ isLight?: boolean }>(({ isLight }) => ({

  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  paddingTop: '110px',
  marginTop: '90px',
  maxWidth: '343px',
  margin: '0 auto',
  '& > span': {
    borderRadius: '6px',
    linearGradient: isLight ? 'none' : '180deg, #001020 0%, #000000 63.95%)',
    boxShadow: isLight ? ' 0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)'
  },
  borderRadius: '20px',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    paddingTop: '128px',
    maxWidth: '769px',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    paddingTop: '59px',
    maxWidth: '1130px',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    paddingTop: '59px',
    maxWidth: '1184px',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    paddingTop: '59px',
    maxWidth: '1184px',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    paddingTop: '59px',
    maxWidth: '1412px',
    margin: '0 auto',
  },
}));

const ContainerData = styled.div({
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const LogoContainer = styled.div({
  position: 'relative',
  display: 'block',
  width: '279px',
  height: '164px',
  marginBottom: '64px',
  marginLeft: '32px',
  marginRight: '32px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginBottom: '160px',
    width: '580px',
    height: '340px',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    marginBottom: '37.26px',
    width: '675px',
    height: '397.74px',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    marginBottom: '37.26px',
    width: '675px',
    height: '397.74px',
  },
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    marginBottom: '37.26px',
    width: '675px',
    height: '397.74px',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    marginBottom: '37.26px',
    width: '675px',
    height: '397.74px',
  },
});

const ContainerText = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: '32px',
  paddingLeft: '32px',
  maxWidth: '343px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    maxWidth: '100%',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    maxWidth: '100%',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    maxWidth: '100%',
  },
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    maxWidth: '100%',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    maxWidth: '100%',
  },
});

const TextUps = styled(Typography)<{ isLight?: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '36px',
  lineHeight: '43px',
  letterSpacing: '0.4px',
  color: isLight ? '#787A9B' : '#D2D4EF',
  textAlign: 'center',
  marginBottom: '24px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontWeight: 700,
    fontSize: '48px',
    lineHeight: '58px',
    marginBottom: '32px',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    fontWeight: 700,
    fontSize: '48px',
    lineHeight: '58px',
    marginBottom: '32px',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    fontWeight: 700,
    fontSize: '48px',
    lineHeight: '58px',
    marginBottom: '32px',
  },
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    fontWeight: 700,
    fontSize: '48px',
    lineHeight: '58px',
    marginBottom: '32px',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    fontWeight: 700,
    fontSize: '48px',
    lineHeight: '58px',
    marginBottom: '32px',
  }
}));

const TextDescription = styled(Typography)<{ isLight?: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base,san-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: isLight ? '#ADAFD4' : '#ADAFD4',
  marginBottom: '64px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontSize: '24px',
    lineHeight: '29px',
    marginBottom: '40px',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    fontSize: '24px',
    lineHeight: '29px',
    marginBottom: '40px',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    fontSize: '24px',
    lineHeight: '29px',
    marginBottom: '40px',
  },
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    fontSize: '24px',
    lineHeight: '29px',
    marginBottom: '40px',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    fontSize: '24px',
    lineHeight: '29px',
    marginBottom: '40px',
  }
}));

const ContainerButton = styled.div({
  marginBottom: '83px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    marginBottom: '84px',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    marginBottom: '84px',

  },
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    marginBottom: '84px',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    marginBottom: '84px',
  },
});

export default CardNotFoundPage;
