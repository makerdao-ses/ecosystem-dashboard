import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Background404 from '../../../../public/assets/img/background-404.png';
import Background404Dark from '../../../../public/assets/img/background-dark-404.png';
import BackgroundMobile404 from '../../../../public/assets/img/background-mobile-404.png';
import BackgroundMobile404Dark from '../../../../public/assets/img/background-mobile-dark-404.png';
import Logo404 from '../../../../public/assets/img/logo-404.png';
import Logo404Dark from '../../../../public/assets/img/logo-dark-404.png';
import lightTheme from '../../../../styles/theme/themes';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CustomButton } from '../CustomButton/CustomButton';

const NotFound404: React.FC = () => {
  const router = useRouter();
  const phoneLess = useMediaQuery(lightTheme.breakpoints.down('mobile_375'));
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'table_834'));
  const { isLight } = useThemeContext();
  const handleOnclick = () => {
    router.push('/');
  };
  return (
    <Wrapper>
      <ImageContainer isLight={isLight}>
        <Image
          src={
            isLight
              ? phoneLess || isMobile
                ? BackgroundMobile404
                : Background404
              : phoneLess || isMobile
              ? BackgroundMobile404Dark
              : Background404Dark
          }
          objectFit="fill"
          alt="404"
          layout="fill"
        />
        <ContainerData>
          <LogoContainer>
            <Image
              src={isLight ? Logo404 : Logo404Dark}
              alt=""
              layout="fill"
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
          </LogoContainer>
          <ContainerText>
            <TextUps isLight={isLight}>Oops!</TextUps>
            <TextDescription>The page you requested couldn't be found</TextDescription>
          </ContainerText>
          <ContainerButton>
            <CustomButton
              widthText="100%"
              label="Go Back to Homepage"
              style={{
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
              }}
              onClick={handleOnclick}
              styleText={{
                color: '#1AAB9B',
                fontSize: '16px',
                lineHeight: '24px',
              }}
            />
          </ContainerButton>
        </ContainerData>
      </ImageContainer>
    </Wrapper>
  );
};

export default NotFound404;

const Wrapper = styled.div({
  width: '100%',
  height: '100%',
  marginTop: '132px',
  paddingBottom: '128px',
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: '128px',
  },
});

const ImageContainer = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  paddingTop: '110px',
  marginTop: '90px',
  maxWidth: '343px',
  margin: '0 auto',
  '& > span': {
    borderRadius: '6px',
    background: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
    boxShadow: isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  },
  borderRadius: '20px',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    paddingTop: '128px',
    maxWidth: '769px',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    paddingTop: '58px',
    maxWidth: '1130px',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1920')]: {
    paddingTop: '58px',
    maxWidth: '1184px',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    paddingTop: '58px',
    maxWidth: '1412px',
    margin: '0 auto',
    height: '785px',
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
  [lightTheme.breakpoints.up('desktop_1194')]: {
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
  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: '100%',
  },
});

const TextUps = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight?: boolean }>(
  ({ isLight }) => ({
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '36px',
    lineHeight: '43px',
    letterSpacing: '0.4px',
    color: isLight ? '#787A9B' : '#D2D4EF',
    textAlign: 'center',
    marginBottom: '24px',
    [lightTheme.breakpoints.up('table_834')]: {
      fontWeight: 700,
      fontSize: '48px',
      lineHeight: '58px',
      marginBottom: '32px',
    },
  })
);

const TextDescription = styled(Typography)({
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: '#ADAFD4',
  marginBottom: '64px',
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '24px',
    lineHeight: '29px',
    marginBottom: '40px',
  },
});

const ContainerButton = styled.div({
  paddingBottom: '83px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    paddingBottom: '156px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingBottom: '84px',
  },
});
