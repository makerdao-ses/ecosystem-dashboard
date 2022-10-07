import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import {
  COOKIES_POLICY_PARAGRAPH_FOUR,
  COOKIES_POLICY_PARAGRAPH_ONE,
  COOKIES_POLICY_PARAGRAPH_THREE,
  COOKIES_POLICY_PARAGRAPH_TWO,
} from '../../../core/utils/const';
import { CustomButton } from '../../components/custom-button/custom-button';

const CookiesPolicyContainer = () => {
  const isLight = useThemeContext().themeMode === 'light';

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
            <li>Page views,</li>
            <li>Button clicks,</li>
            <li>Input form changes (without the values being entered),</li>
            <li>Errors.</li>
          </ContainerUl>
          <ParagraphStyle isLight={isLight}>{COOKIES_POLICY_PARAGRAPH_FOUR}</ParagraphStyle>
          <ContainerButton>
            <CustomButton
              label="Configure my settings"
              style={{
                padding: '14.5px 40px',
                borderColor: isLight ? '#231536' : '#343442',
              }}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onClick={() => {}}
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
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
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
  textAlign: 'center',
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
  color: isLight ? '#231536' : '#D7C9FF',
}));

const ContainerUl = styled.ul<{ isLight?: boolean }>(({ isLight }) => ({
  '> li': {
    marginBottom: '8px',
    color: isLight ? '#231536' : '#D7C9FF',
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
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    marginTop: '40px',
  },
});

const ParagraphStyle = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D7C9FF',
}));

export default CookiesPolicyContainer;
