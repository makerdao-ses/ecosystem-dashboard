import { styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import ItemLinkList from './ItemLinkList';
import { useLinks } from './useLinks';

interface Props {
  onClick: () => void;
}

const LinkList: React.FC<Props> = ({ onClick }) => {
  const links = useLinks();
  return (
    <Container>
      {links.map((link) => (
        <ItemLinkList icon={link.icon} title={link.title} href={link.href} onClick={onClick} />
      ))}
    </Container>
  );
};

export default LinkList;

const Container = styled(Card)({
  padding: 16,
  gap: 8,
  width: 200,
});
