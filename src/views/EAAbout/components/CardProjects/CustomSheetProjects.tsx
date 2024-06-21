import { styled } from '@mui/material';
import React, { useState } from 'react';
import CustomSheet from '@/components/CustomSheet/CustomSheet';
import SecondaryButton from '@/components/SecondaryButton/SecondaryButton';
import ItemCustomProject from './ItemCustomProject';
import type { FC } from 'react';

interface Props {
  className?: string;
  shortCode: string;
}

const CustomSheetProjects: FC<Props> = ({ className, shortCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenSheet = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Container>
      <ButtonOpenMenuStyled title="Projects" onClick={handleOpenSheet} className={className} />

      <CustomSheetStyled snapPoints={[230, 180]} className={className} handleClose={handleClose} isOpen={isOpen}>
        <ItemCustomProject shortCode={shortCode} />
      </CustomSheetStyled>
    </Container>
  );
};

export default CustomSheetProjects;

const CustomSheetStyled = styled(CustomSheet)({
  '& .react-modal-sheet-container': {
    padding: '0px 16px 0px 16px',
  },
  '& .react-modal-sheet-header': {
    height: '0px!important',
  },
  '.react-modal-sheet-content': {},
});

const Container = styled('div')({
  display: 'flex',
  width: '100%',
});
const ButtonOpenMenuStyled = styled(SecondaryButton)({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  padding: '4px 13.5px 4px 13.5px',
});
