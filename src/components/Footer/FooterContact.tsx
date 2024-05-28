import { styled } from '@mui/material';
import { FooterLinks } from './FooterLinks';
import type { FooterContact as FooterContactProps } from './type';

export const FooterContact = ({ title, subtitle, Icon, links }: FooterContactProps) => (
  <ContactCard>
    <Icon width={45} height={45} />
    <ContactCardBody>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <FooterLinks links={links} />
    </ContactCardBody>
  </ContactCard>
);

const ContactCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900],
  borderRadius: 12,
  padding: '12px 24px',
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[800]
  }`,
  gap: 16,
  color: theme.palette.colors.charcoal[300],
  maxWidth: '100%',
  [theme.breakpoints.up('mobile_375')]: {
    width: '100%',
    minWidth: 336,
  },
}));

const ContactCardBody = styled('div')({
  width: '100%',
  minWidth: 224,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 8,
});

const Title = styled('h4')(({ theme }) => ({
  margin: 0,
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  textAlign: 'right',
}));

const Subtitle = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.palette.colors.charcoal[300],
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '22px',
  textAlign: 'right',
}));

export default FooterContact;
