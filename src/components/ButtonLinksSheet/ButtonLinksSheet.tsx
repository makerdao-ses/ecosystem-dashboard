import { styled } from '@mui/material';
import React, { useState } from 'react';
import LinkList from '@/views/Actors/components/LinkList/LinkList';
import ButtonLinkOptions from '../ButtonLink/ButtonLinkOptions';
import CustomSheet from '../CustomSheet/CustomSheet';

const ButtonLinksSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenSheet = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <ButtonLinkOptionsStyled onClick={handleOpenSheet} />
      <CustomSheetStyled
        children={
          <ContainerButtonSheet>
            <Title>Media Links </Title>
            <LinkListStyled onClick={handleClose} />
          </ContainerButtonSheet>
        }
        handleClose={handleClose}
        isOpen={isOpen}
      />
    </Container>
  );
};

export default ButtonLinksSheet;

const Container = styled('div')({});

const LinkListStyled = styled(LinkList)(({ theme }) => ({
  width: '100%',
  padding: 8,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(55, 62, 77, 0.3)',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.innerShadow : theme.fusionShadows.darkMode,
  borderRadius: 12,
}));

const CustomSheetStyled = styled(CustomSheet)({
  '& .react-modal-sheet-container': {
    padding: '0px 16px 0px 16px',
  },
  '& .react-modal-sheet-header': {
    height: '0px!important',
  },
  '.react-modal-sheet-content': {},
});

const Title = styled('h2')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 700,
  lineHeight: '22px',
  marginTop: 32,
  marginLeft: 10,
  marginBottom: 10,

  color: theme.palette.isLight ? theme.palette.colors.slate[600] : theme.palette.colors.slate[50],
}));

const ContainerButtonSheet = styled('div')({});

const ButtonLinkOptionsStyled = styled(ButtonLinkOptions)({
  '& div:first-of-type': {
    width: 24,
    height: 24,
  },
});
