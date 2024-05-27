import { styled } from '@mui/material';
import Image from 'next/image';
import FooterContact from './FooterContact';
import type { TypeIconFooter } from './FooterLinks';
import type { FooterProps } from './type';

const iconsMakerDAO: TypeIconFooter[] = [
  {
    icon: '/assets/img/footer/discord.svg',
    href: '#',
    title: 'discord',
  },
  {
    icon: '/assets/img/footer/twitter.svg',
    href: '#',
    title: 'twitter',
  },
  {
    icon: '/assets/img/footer/reddit.svg',
    href: '#',
    title: 'reddit',
  },
  {
    icon: '/assets/img/footer/youtube.svg',
    href: '#',
    title: 'youtube',
  },
  {
    icon: '/assets/img/footer/github.svg',
    href: '#',
    title: 'github',
  },
];

const Footer = ({ linkCategory }: FooterProps) => (
  <FooterWrapper>
    <FooterContainer>
      <FooterColumnLink>
        {linkCategory.map(({ name, links }) => (
          <FooterColumn>
            <FooterColumnTitle>{name}</FooterColumnTitle>
            <FooterLinkWrapper>
              {links.map(({ label, link, icon }) => (
                <FooterLink key={label} href={link}>
                  {icon && <Image src={icon} alt={`${label.toLowerCase()} icon`} width={16} height={16} />}
                  {label}
                </FooterLink>
              ))}
            </FooterLinkWrapper>
          </FooterColumn>
        ))}
      </FooterColumnLink>
      <ContactSection>
        <FooterContact
          title="Contact MakerDAO"
          subtitle="Official Community Channels"
          logo={{
            src: '/assets/img/footer/makerdao_icon.svg',
            alt: 'Contact MakerDAO',
            width: 48,
            height: 25,
          }}
          links={iconsMakerDAO}
        />
        <FooterContact
          title="Contact Powerhouse"
          subtitle="Official Community Channels"
          logo={{
            src: '/assets/img/footer/powerhouse_icon.svg',
            alt: 'Contact Powerhouse',
            width: 45,
            height: 45,
          }}
          links={iconsMakerDAO}
        />
      </ContactSection>
    </FooterContainer>
  </FooterWrapper>
);

const FooterWrapper = styled('footer')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 32,
  backgroundColor: theme.palette.isLight ? '#f8f9fa' : 'red',
  color: theme.palette.isLight ? '#6c757d' : 'red',
}));

const FooterContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const FooterLinkWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const FooterColumnLink = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  gap: 64,
});

const FooterColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const FooterLink = styled('a')(({ theme }) => ({
  margin: '5px 0',
  color: theme.palette.isLight ? '#5B667E' : 'red',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '22px',
  marginTop: 4,
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
}));

const FooterColumnTitle = styled('p')(({ theme }) => ({
  color: theme.palette.isLight ? '#252A34' : 'red',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  marginTop: 4,
  marginBottom: 12,
}));

const ContactSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 16,
});

export default Footer;
