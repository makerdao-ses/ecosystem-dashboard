import styled from '@emotion/styled';
import Image from 'next/image';

export type TypeIconFooter = {
  icon: string;
  href: string;
  title: string;
};

interface Props {
  links: TypeIconFooter[];
}

export const FooterLinks = ({ links }: Props) => (
  <Container>
    <Wrapper>
      {links.map((link) => (
        <LinkImage key={link.title} href={link.href} target="_blank">
          <Image src={link.icon} alt={link.title} width={32} height={32} />
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

const LinkImage = styled('a')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});
