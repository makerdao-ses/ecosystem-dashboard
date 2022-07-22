import styled from '@emotion/styled';
import React from 'react';
import Logo from '../svg/logo';
import SesLogo from '../svg/ses-logo';
import DescriptionFooter from './description-footer';
import FooterContact from './footer-contact';
import { iconsContact, iconsSupport } from './iconsData';

interface Props {
  governesses: string[],
  products: string[],
  developer: string[]
}

const Footer = ({ governesses, products, developer }: Props) => {
  return (
    <FooterWrapper>
      <ContainerImage />
      <ContainerFooter>
        <ContainerColumOne>
          <FooterContact
            title="Contact MakerDAO"
            subtitle="Official Community Channels"
            style={{
              paddingLeft: '6px',
              paddingRight: '6.3px',
            }}
            logo={<Logo width={37} height={20}/>}
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
            logo={<SesLogo />} links={iconsSupport}
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

const ContainerImage = styled.div({
  width: '100%',
  height: '100%',
  left: '50%',
  zIndex: -1,
  transform: 'translate(-50%)',
  backgroundImage: 'url(/assets/img/bg_footer_light.jpeg)',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center bottom',
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
});

const ContainerFooter = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  margin: '0px',
  width: '100%',
  padding: '40px 16px 57px',
  '@media (min-width: 435px)': {
    padding: '40px 32px 57px',
  },
  '@media (min-width: 835px)': {
    padding: '40px 64px 57px',
  }
});

const ContainerColumOne = styled.div({
  order: 4,
  width: '320.01px',
  marginBottom: '32px',
  '@media (min-width: 435px)': {
    margin: 0
  },
  '@media (min-width: 835px)': {
    order: 1,
  }
});

const ContainerColumTwo = styled.div({
  order: 1,
  width: '143px',
  marginBottom: '32px',
  '@media (min-width: 835px)': {
    margin: 0,
    order: 2,
  }
});

const ContainerColumThree = styled.div({
  order: 2,
  width: '147px',
  marginBottom: '32px',
  '@media (min-width: 835px)': {
    order: 3,
    margin: 0
  }
});

const ContainerColumFour = styled.div({
  order: 3,
  width: '129px',
  marginBottom: '32px',
  '@media (min-width: 835px)': {
    order: 4,
    margin: 0,
  }
});

const ContainerColumLast = styled.div({
  order: 5,
  width: '272px'
});
export default Footer;
