import { styled } from '@mui/material';
import React from 'react';
import ButtonLinksSheet from '@/components/ButtonLinksSheet/ButtonLinksSheet';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';

const ListMobileSheetIconArrow = () => {
  console.log('hello');
  return (
    <ContainerLinksArrowsMobile>
      <ButtonLinksSheet />

      <InternalLinkButtonStyled href="" showIcon />
    </ContainerLinksArrowsMobile>
  );
};

export default ListMobileSheetIconArrow;
const ContainerLinksArrowsMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  height: 32,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)({
  borderRadius: 8,
  padding: '2px 8px 2px 8px',
  ':hover': {
    padding: '2px 8px 2px 8px',
  },
});
