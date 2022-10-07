import styled from '@emotion/styled';
import React from 'react';
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
          <p>{COOKIES_POLICY_PARAGRAPH_THREE}</p>
          <ContainerUl>
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
  background: isLight ? '#FFFFFF' : '#000000',
  marginTop: '40px',
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '6px',
  maxWidth: '1312px',
  margin: '0 auto',
  padding: '32px',
}));

const Title = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  alignItems: 'center',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D7C9FF',
  marginBottom: '24px',
  textAlign: 'center',
}));

const Description = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D7C9FF',
}));

const ContainerUl = styled.ul({
  '> li': {
    marginBottom: '8px',
    '&:last-child': {
      marginBottom: '0px',
    },
  },
});

const ContainerButton = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: '64px',
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
