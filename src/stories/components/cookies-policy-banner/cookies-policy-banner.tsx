import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';

import { ButtonType } from '../../../core/enums/button-type.enum';
import { CustomButton } from '../../components/custom-button/custom-button';
import CheckBox from '../check-box/check-box';

interface Props {
  // isShowBanner: boolean;
  functionalCheckbox: boolean;
  analyticsCheckbox: boolean;
  isLight: boolean;
  setFunctionalCheckbox: (isChecked: boolean) => void;
  setAnalyticsCheckbox: (isChecked: boolean) => void;
  handleAcceptCookies: () => void;
  handleRejectCookies: () => void;
}

const CookiesPolicyBanner = ({
  functionalCheckbox,
  analyticsCheckbox,
  setFunctionalCheckbox,
  setAnalyticsCheckbox,
  handleAcceptCookies,
  handleRejectCookies,
  isLight,
}: Props) => {
  const handleCheckbox = (key: (val: boolean) => void) => (val: boolean) => {
    key(!val);
  };
  return (
    <Container isLight={isLight}>
      <ContainerData>
        <StyleParagraph isLight={isLight}>
          This website uses cookies for analytic purposes only. Cookies are anonymous and do not link to user data. We
          collect information to improve the user experience and validate UI changes. You can still use the page without
          cookies. For more information, please read our <br />
          <LinkCookiesPolicy href="/cookies-policy">cookies policy.</LinkCookiesPolicy>
        </StyleParagraph>

        <ContainerCheckBox>
          <CheckBox
            label="Functional cookies"
            isChecked={functionalCheckbox}
            setIsChecked={handleCheckbox(setFunctionalCheckbox)}
            isLight={isLight}
          />
          <CheckBox
            label="Analytics cookies"
            isChecked={analyticsCheckbox}
            setIsChecked={handleCheckbox(setAnalyticsCheckbox)}
            isLight={isLight}
          />
        </ContainerCheckBox>
        <ContainerButton>
          <CustomButton
            label="Reject all cookies"
            buttonType={ButtonType.Secondary}
            style={{
              width: 285,
              height: 48,
              padding: '14.5px 76px',
            }}
            styleText={{
              fontSize: '16px',
              lineHeight: '19px',
            }}
            onClick={handleRejectCookies}
            isLight={isLight}
          />
          <CustomButtonStyle
            label="Accept configured cookies"
            style={{
              width: 285,
              height: 48,
            }}
            buttonType={ButtonType.Primary}
            styleText={{
              fontSize: '16px',
              lineHeight: '19px',
            }}
            onClick={handleAcceptCookies}
            isLight={isLight}
          />
        </ContainerButton>
      </ContainerData>
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  borderRadius: '6px',
  width: '100%',
  padding: '40px 24px',
  height: '458px',
  boxShadow: !isLight ? '0px -15px 35px 10px rgba(0, 27, 141, 0.15)' : 'none',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    padding: '40px 63px',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    padding: '40px 243px',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    padding: '40px 286px',
  },
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    padding: '40px 366px',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    padding: '40px 606px',
  },
  [lightTheme.breakpoints.up('table_834')]: {
    height: '282px',
  },
}));

const ContainerData = styled.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '375px',
  margin: '0px auto',
  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: '708px',
    margin: '0px auto',
  },
});

const LinkCookiesPolicy = styled.a({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#447AFB',
  marginLeft: '2px',
  textAlign: 'center',
});

const ContainerCheckBox = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '34px',
  margin: '0 auto',
  marginTop: '32px',
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: '24px',
  },
});

const ContainerButton = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '22px',
  paddingRight: '22px',
  marginTop: '32px',
  alignItems: 'center',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 auto',
    gap: '24px',
    marginTop: '24px',
    height: '48px',
  },
});

const CustomButtonStyle = styled(CustomButton)({
  padding: '14.5px 40px',
  marginTop: '24px',
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: '0px',
  },
});

const StyleParagraph = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  textAlign: 'center',
  color: isLight ? '#000000' : '#D2D4EF',
  marginBottom: '0px',
  marginTop: '0px',
}));

export default CookiesPolicyBanner;
