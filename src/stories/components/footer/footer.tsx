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
    <div style={{
      position: 'relative',
    }}>
      <ContainerImage />
      <ContainerFooter>
        <ContainerColumOne ><FooterContact title='Contact MakerDAO' subtitle='Official Community Channels' logo={<Logo />} links={iconsContact} /></ContainerColumOne>
        <ContainerColumTwo>
          <DescriptionFooter title='Governance' children={governesses} />
          <DescriptionFooter title='Products & Tools' children={products} />
          <DescriptionFooter title='Developer' children={developer} color='#333333' />
        </ContainerColumTwo>
        <ContainerColumThree>
          <FooterContact title='Contact MakerDAO SES for support' subtitle='Sustainable Ecosystem Scalling' logo={<SesLogo />} links={iconsSupport} />
        </ContainerColumThree>
      </ContainerFooter >
    </div>

  );
};

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

const ContainerFooter = styled.footer({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  margin: '0px',
  minWidth: '0px',
  width: '100%',
  paddingTop: '43.85px',
  paddingBottom: '32px',
  paddingLeft: '64.86px',
  paddingRight: '64.86px',
});
const ContainerColumOne = styled.div({
  width: '23%'
});
const ContainerColumTwo = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '40%',

});
const ContainerColumThree = styled.div({
  width: '23%',
});
export default Footer;
