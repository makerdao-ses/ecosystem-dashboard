import styled from '@emotion/styled';
import React from 'react';
import Logo from '../svg/logo';
import SesLogo from '../svg/ses-logo';
import DescriptionFooter from './description-footer';
import FooterContact from './footer-contact';
import { iconsContact, iconsSupport } from './iconsData';
import { useThemeContext } from '../../../core/context/ThemeContext';
import lightTheme from '../../../../styles/theme/light';

export interface LinkInterface {
  title: string;
  url: string;
}

interface Props {
  governesses: LinkInterface[],
  products: LinkInterface[],
  developer: LinkInterface[],
}

const Footer = ({ governesses, products, developer }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';

  return (
    <FooterWrapper>
      <ContainerImage isLight={isLight} />
      <ContainerFooter>
        <ContainerColumOne>
          <FooterContact
            title="Contact MakerDAO"
            subtitle="Official Community Channels"
            style={{
              paddingLeft: '6px',
              paddingRight: '6.3px',
            }}
            logo={<Logo width={37} height={20} fill={'#211634'} fillDark='#D1DEE6'/>}
            links={iconsContact}
          />
        </ContainerColumOne>
        <ContainerColumTwo>
          <DescriptionFooter
            title="Governance"
            children={governesses}
          />
        </ContainerColumTwo>
        <ContainerColumThree>
          <DescriptionFooter
            title="Products & Tools"
            children={products}
          />
        </ContainerColumThree>
        <ContainerColumFour>
          <DescriptionFooter
            title="Developer"
            children={developer}
          />
        </ContainerColumFour>
        <ContainerColumLast>
          <FooterContact
            title="Contact MakerDAO SES for support"
            subtitle="Sustainable Ecosystem Scaling"
            style={{
              paddingLeft: '6.13px',
              paddingRight: '6px',
            }}
            logo={<SesLogo fill={isLight ? '#211634' : '#D1DEE6'} />}
            links={iconsSupport}
          />
        </ContainerColumLast>
      </ContainerFooter >
    </FooterWrapper >
  );
};

const FooterWrapper = styled.footer({
  position: 'relative',
  bottom: 0,
  width: '100%',
  height: 'fit-content',
  minWidth: '360px',
});

const ContainerImage = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: -1,
  backgroundImage: isLight ? 'url(/assets/img/bg-footer-mobile.png)' : 'url(/assets/img/bg-footer-mobile-dark.png)',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center bottom',
  backgroundRepeat: 'no-repeat',
  [lightTheme.breakpoints.between('table_375', 835)]: {
    backgroundImage: isLight ? 'url(/assets/img/bg-footer-tablet.png)' : 'url(/assets/img/bg-footer-tablet-dark.png)',
    backgroundPosition: 'right bottom',
    backgroundSize: 'cover',
  },
  [lightTheme.breakpoints.up(835)]: {
    backgroundImage: isLight ? 'url(/assets/img/bg_footer_light.jpeg)' : 'url(/assets/img/bg-footer-dark.jpg)',
    backgroundPosition: 'right bottom',
  },
  [lightTheme.breakpoints.between(835, 'desktop_1194')]: {
    backgroundSize: '120% 100%',
  }
}));

const ContainerFooter = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  margin: '0px',
  width: '100%',
  padding: '32px 16px 40px',
  [lightTheme.breakpoints.up('table_834')]: {
    padding: '40px 32px 74px',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '40px 48px 74px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '40px 64px 74px',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    padding: '40px 128px 74px',
  }
});

const ContainerColumOne = styled.div({
  order: 4,
  width: '100%',
  marginBottom: '32px',
  [lightTheme.breakpoints.up(576)]: {
    margin: 0,
    width: '50%',
  },
  [lightTheme.breakpoints.up(835)]: {
    order: 1,
    width: '320.01px',
  }
});

const ContainerColumTwo = styled.div({
  order: 1,
  width: '143px',
  marginBottom: '32px',
  [lightTheme.breakpoints.up(835)]: {
    margin: 0,
    order: 2,
  }
});

const ContainerColumThree = styled.div({
  order: 2,
  width: '147px',
  marginBottom: '32px',
  [lightTheme.breakpoints.up(835)]: {
    order: 3,
    margin: 0
  }
});

const ContainerColumFour = styled.div({
  order: 3,
  width: '129px',
  marginBottom: '32px',
  [lightTheme.breakpoints.up(835)]: {
    order: 4,
    margin: 0,
  }
});

const ContainerColumLast = styled.div({
  order: 5,
  width: '272px'
});

export default Footer;
