import { styled } from '@mui/material';
import React, { useState } from 'react';
import ButtonOpenMenu from '@/components/ButtonOpenMenu/ButtonOpenMenu';
import CardSheetMobile from '@/components/CardSheetMobile/CardSheetMobile';
import CustomSheet from '@/components/CustomSheet/CustomSheet';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import type { FC } from 'react';

interface Props {
  className?: string;
  shortCode: string;
  queryStrings: string;
}

const CustomSheetProjects: FC<Props> = ({ className, queryStrings, shortCode }) => {
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

      <CustomSheetStyled
        snapPoints={[200, 150]}
        className={className}
        children={
          <CardSheetMobile
            title="Projects"
            description={`View all the of the projects ${shortCode} is involved in and there status.`}
          >
            <ContainerChildren>
              <InternalLinkButton
                href={`/core-unit/${shortCode}/activity-feed${queryStrings}`}
                label="View Projects"
                showIcon
              />
            </ContainerChildren>
          </CardSheetMobile>
        }
        handleClose={handleClose}
        isOpen={isOpen}
      />
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

const ContainerChildren = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const Container = styled('div')({
  display: 'flex',
  width: '100%',
});
const ButtonOpenMenuStyled = styled(ButtonOpenMenu)({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  // },
});
