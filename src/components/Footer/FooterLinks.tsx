import { styled } from '@mui/material';
import type { TypeIconFooter } from './type';

interface Props {
  links: TypeIconFooter[];
}

export const FooterLinks = ({ links }: Props) => (
  <Container>
    <Wrapper>
      {links.map(({ title, href, Icon }) => (
        <LinkImage key={title} href={href} target="_blank">
          <Icon width={32} height={32} />
        </LinkImage>
      ))}
    </Wrapper>
  </Container>
);

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  width: '100%',
  gap: '16px',
});

const LinkImage = styled('a')(({ theme }) => ({
  color: theme.palette.colors.charcoal[300],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.colors.charcoal[400],
  },
}));
