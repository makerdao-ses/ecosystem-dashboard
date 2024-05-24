import styled from '@emotion/styled';

export interface LinkInterface {
  title: string;
  url: string;
  target?: React.HTMLAttributeAnchorTarget;
  isNotLink?: boolean;
}

const Footer = () => (
  <FooterWrapper>
    <FooterContainer>
      <FooterColumnLink>
        <FooterColumn>
          <FooterColumnTitle>Governance</FooterColumnTitle>
          <FooterLinkWrapper>
            <FooterLink href="#">Maker forum</FooterLink>
            <FooterLink href="#">Voting portal</FooterLink>
            <FooterLink href="#">MIPs portal</FooterLink>
            <FooterLink href="#">Makerburn vnext</FooterLink>
          </FooterLinkWrapper>
        </FooterColumn>
        <FooterColumn>
          <FooterColumnTitle>Documentation</FooterColumnTitle>
          <FooterLinkWrapper>
            <FooterLink href="#">Organization</FooterLink>
            <FooterLink href="#">Technical Docs</FooterLink>
            <FooterLink href="#">Brand Assets</FooterLink>
            <FooterLink href="#">Github Repos</FooterLink>
          </FooterLinkWrapper>
        </FooterColumn>
        <FooterColumn>
          <FooterColumnTitle>MakerDAO Tools</FooterColumnTitle>
          <FooterLinkWrapper>
            <FooterLink href="#">Connect</FooterLink>
            <FooterLink href="#">Switchboard</FooterLink>
            <FooterLink href="#">Fusion</FooterLink>
          </FooterLinkWrapper>
        </FooterColumn>
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
