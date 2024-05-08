import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import lightTheme from '../../../../styles/theme/themes';
import { useCookiesContextTracking } from '../../../core/context/CookiesContext';
import { useThemeContext } from '../../../core/context/ThemeContext';
import {
  COOKIES_POLICY_PARAGRAPH_FOUR,
  COOKIES_POLICY_PARAGRAPH_ONE,
  COOKIES_POLICY_PARAGRAPH_THREE,
  COOKIES_POLICY_PARAGRAPH_TWO,
} from '../../../core/utils/const';
import { CustomButton } from '../../components/CustomButton/CustomButton';

const CookiesPolicyContainer = () => {
  const { isLight } = useThemeContext();
  const { isShowBanner, setIsShowBanner } = useCookiesContextTracking();

  const handlePolicyBanner = useCallback(() => {
    window.scrollTo(0, 0);
    setIsShowBanner(!isShowBanner);
  }, [isShowBanner, setIsShowBanner]);

  return (
    <Container isLight={isLight}>
      <ContainerData isLight={isLight}>
        <Title isLight={isLight}>Cookies Policy</Title>
        <Description isLight={isLight}>Use of Cookies and Similar Technologies</Description>
        <div>
          <ParagraphStyle isLight={isLight}>{COOKIES_POLICY_PARAGRAPH_ONE}</ParagraphStyle>
          <ParagraphStyle isLight={isLight}>{COOKIES_POLICY_PARAGRAPH_TWO}</ParagraphStyle>
          <ParagraphStyle isLight={isLight}>{COOKIES_POLICY_PARAGRAPH_THREE}</ParagraphStyle>
          <ContainerUl isLight={isLight}>
            <ListItem isLight={isLight}>Page views,</ListItem>
            <ListItem isLight={isLight}>Button clicks,</ListItem>
            <ListItem isLight={isLight}>Input form changes (without the values being entered),</ListItem>
            <ListItem isLight={isLight}>Errors.</ListItem>
          </ContainerUl>
          <ParagraphStyle isLight={isLight}>{COOKIES_POLICY_PARAGRAPH_FOUR}</ParagraphStyle>
          <ContainerButton>
            <CustomButton
              label="Configure my settings"
              style={{
                padding: '14.5px 40px',
                width: 249,
                height: 48,
              }}
              styleText={{
                fontSize: '16px',
                color: isLight ? '#31424E' : '#E2D8EE',
              }}
              onClick={handlePolicyBanner}
            />
          </ContainerButton>
        </div>
      </ContainerData>
    </Container>
  );
};

const Container = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '104px',
  width: '100%',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingBottom: '128px',
}));

const ContainerData = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: isLight ? '#FFFFFF' : '#10191F',
  marginTop: '40px',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : ' 10px 15px 20px 6px rgba(20, 0, 141, 0.1);',
  borderRadius: '6px',
  maxWidth: '1312px',
  margin: '0 auto',
  padding: '32px',
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    maxWidth: '1184px',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    maxWidth: '1066px',
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    maxWidth: '770px',
  },
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    maxWidth: '343px',
    padding: '32px 24px',
  },
}));

const Title = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  alignItems: 'center',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: '24px',
  textAlign: 'left',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    textAlign: 'left',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    textAlign: 'left',
  },
}));

const Description = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const ContainerUl = styled.ul<{ isLight?: boolean }>(({ isLight }) => ({
  '> li': {
    marginBottom: '8px',
    color: isLight ? '#231536' : '#D2D4EF',
    '&:last-child': {
      marginBottom: '0px',
    },
  },
}));

const ContainerButton = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: '64px',
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    marginTop: '40px',
  },
});

const ParagraphStyle = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const ListItem = styled.li<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  color: isLight ? '#231536' : '#D2D4EF',
}));

export default CookiesPolicyContainer;
