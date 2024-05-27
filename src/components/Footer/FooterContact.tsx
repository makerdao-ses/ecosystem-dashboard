import { Box, styled } from '@mui/material';
import Image from 'next/image';
import { FooterLinks } from './FooterLinks';
import type { TypeIconFooter } from './FooterLinks';

interface Props {
  title: string;
  subtitle: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  links: TypeIconFooter[];
}

export const FooterContact = ({ title, subtitle, logo, links }: Props) => (
  <ContactCard>
    <Box>
      <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
    </Box>
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
  backgroundColor: theme.palette.isLight ? '#F3F5F7' : 'red',
  borderRadius: 12,
  padding: '12px 24px',
  border: `1px solid ${theme.palette.isLight ? '#CED3DC' : 'red'}`,
  gap: 16,
  color: theme.palette.isLight ? '#9DA6B9' : 'red',
  minWidth: 336,
}));

const ContactCardBody = styled('div')({
  width: 224,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 8,
});

const Title = styled('h4')(({ theme }) => ({
  margin: 0,
  color: theme.palette.isLight ? '#252A34' : 'red',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  textAlign: 'right',
}));

const Subtitle = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.palette.isLight ? '#9DA6B9' : 'red',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '22px',
  textAlign: 'right',
}));

export default FooterContact;
