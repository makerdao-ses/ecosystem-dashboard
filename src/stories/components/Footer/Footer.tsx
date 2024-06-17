import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import FooterDark from '../../../../public/assets/img/bg-footer-dark.png';
import FooterLight from '../../../../public/assets/img/bg-footer-light.png';
import MobileFooterDark from '../../../../public/assets/img/bg-footer-mobile-dark.png';
import MobileFooterLight from '../../../../public/assets/img/bg-footer-mobile.png';
import TabletFooterDark from '../../../../public/assets/img/bg-footer-tablet-dark.png';
import TabletFooterLight from '../../../../public/assets/img/bg-footer-tablet.png';
import lightTheme from '../../../../styles/theme/themes';
import { useThemeContext } from '../../../core/context/ThemeContext';
import Logo from '../svg/logo';
import SesLogo from '../svg/ses-logo';
import DescriptionFooter from './DescriptionFooter';
import FooterContact from './FooterContact';
import { iconsContact, iconsSupport } from './iconsData';

export interface LinkInterface {
  title: string;
  url: string;
  target?: React.HTMLAttributeAnchorTarget;
  isNotLink?: boolean;
}

interface Props {
  governesses: LinkInterface[];
  products: LinkInterface[];
  developer: LinkInterface[];
}

const Footer = ({ governesses, products, developer }: Props) => {
  const { isLight } = useThemeContext();
  const isTable = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 835));
  const upTable = useMediaQuery(lightTheme.breakpoints.up(835));

  return (
    <FooterWrapper>
      <Image
        src={
          isLight
            ? isTable
              ? TabletFooterLight
              : upTable
              ? FooterLight
              : MobileFooterLight
            : isTable
            ? TabletFooterDark
            : upTable
            ? FooterDark
            : MobileFooterDark
        }
        style={{
          objectFit: 'cover',
          objectPosition: isTable ? 'right bottom' : upTable ? 'right bottom' : 'center bottom',
        }}
        alt="Footer"
        layout="fill"
      />
      <ContainerFooter>
        <ContainerColumOne>
          <FooterContact
            title="Contact MakerDAO"
            subtitle="Official Community Channels"
            style={{
              paddingLeft: '6px',
              paddingRight: '6.3px',
            }}
            logo={<Logo width={37} height={20} fill={'#211634'} fillDark="#D1DEE6" />}
            links={iconsContact}
          />
        </ContainerColumOne>
        <ContainerColumTwo>
          <DescriptionFooter title="Governance" children={governesses} />
        </ContainerColumTwo>
        <ContainerColumThree>
          <DescriptionFooter title="Products & Tools" children={products} />
        </ContainerColumThree>
        <ContainerColumFour>
          <DescriptionFooter title="Developer" children={developer} />
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
            isLink
          />
        </ContainerColumLast>
      </ContainerFooter>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer({
  position: 'relative',
  bottom: 0,
  width: '100%',
  height: 'fit-content',
  minWidth: '360px',
});
const ContainerFooter = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  margin: '0px',
  width: '100%',
  padding: '32px 24px 40px',
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
    padding: '40px 128px 127.36px 74px',
  },
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
  },
  zIndex: 1,
});

const ContainerColumTwo = styled.div({
  order: 1,
  width: '143px',
  marginBottom: '32px',
  [lightTheme.breakpoints.up(835)]: {
    margin: 0,
    order: 2,
  },
  zIndex: 1,
});

const ContainerColumThree = styled.div({
  order: 2,
  width: '147px',
  marginBottom: '32px',
  [lightTheme.breakpoints.up(835)]: {
    order: 3,
    margin: 0,
  },
  zIndex: 1,
});

const ContainerColumFour = styled.div({
  order: 3,
  width: '129px',
  marginBottom: '32px',
  [lightTheme.breakpoints.up(835)]: {
    order: 4,
    margin: 0,
  },
  zIndex: 1,
});

const ContainerColumLast = styled.div({
  order: 5,
  width: '272px',
  zIndex: 1,
});

export default Footer;
