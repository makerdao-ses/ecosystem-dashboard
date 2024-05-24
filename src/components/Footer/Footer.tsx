import styled from '@emotion/styled';
import Image from 'next/image';
import type { FooterProps } from './type';

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
    </FooterContainer>
  </FooterWrapper>
);

const FooterWrapper = styled.footer({
  display: 'flex',
  flexDirection: 'column',
  padding: 32,
  backgroundColor: '#f8f9fa',
  color: '#6c757d',
});

const FooterContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const FooterLinkWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const FooterColumnLink = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  gap: 64,
});

const FooterColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const FooterLink = styled.a({
  margin: '5px 0',
  color: '#5B667E',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '22px',
  marginTop: 4,
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
});

const FooterColumnTitle = styled.p({
  color: '#252A34',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  marginTop: 4,
  marginBottom: 12,
});

export default Footer;
