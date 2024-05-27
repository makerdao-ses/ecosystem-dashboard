import { styled } from '@mui/material';
import FooterIcon from 'public/assets/svg/fusion.svg';
import PowerhouseIcon from 'public/assets/svg/powerhouse.svg';
import FooterContact from './FooterContact';
import { linkCategory, contactMakerDAO, contactPowerhouse } from './data';

const Footer = () => (
  <FooterWrapper>
    <FooterContainer>
      <FooterColumnLink>
        {linkCategory.map(({ name, links }) => (
          <FooterColumn>
            <FooterColumnTitle>{name}</FooterColumnTitle>
            <FooterLinkWrapper>
              {links.map(({ label, link, Icon }) => (
                <FooterLink key={label} href={link}>
                  {Icon && <Icon width="16" height="16" />}
                  {label}
                </FooterLink>
              ))}
            </FooterLinkWrapper>
          </FooterColumn>
        ))}
      </FooterColumnLink>
      <ContactSection>
        <FooterContact {...contactMakerDAO} />
        <FooterContact {...contactPowerhouse} />
      </ContactSection>
    </FooterContainer>
    <FooterBottom>
      <FooterIcon width="104" height="36" />
      <FooterBottomRight>
        <FooterButtonLink>2024 Powerhouse</FooterButtonLink>
        <FooterButtonLink>Privacy Notice</FooterButtonLink>
        <FooterButtonLink>Cookie Policy</FooterButtonLink>
        <PowerhouseIcon width={16} height={16} />
      </FooterBottomRight>
    </FooterBottom>
  </FooterWrapper>
);

const FooterWrapper = styled('footer')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 32,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#1B1E24',
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
  color: theme.palette.isLight ? theme.palette.colors.charcoal[600] : theme.palette.colors.charcoal[300],
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '22px',
  marginTop: 4,
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  '&:hover': {
    color: theme.palette.colors.charcoal[400],
  },
}));

const FooterColumnTitle = styled('p')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
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

const FooterBottom = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[300],
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '32px',
}));

const FooterBottomRight = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: 24,
});

const FooterButtonLink = styled('p')(({ theme }) => ({
  color: theme.palette.colors.charcoal[300],
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '22px',
  textDecoration: 'none',
}));

export default Footer;
