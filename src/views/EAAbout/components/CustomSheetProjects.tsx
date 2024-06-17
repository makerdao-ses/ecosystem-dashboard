import { styled } from '@mui/material';
import React, { useState } from 'react';
import CardSheetMobile from '@/components/CardSheetMobile/CardSheetMobile';
import CustomSheet from '@/components/CustomSheet/CustomSheet';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import SecondaryButton from '@/components/SecondaryButton/SecondaryButton';
import { siteRoutes } from '@/config/routes';
import type { FC } from 'react';

interface Props {
  className?: string;
  shortCode: string;
  queryStrings: string;
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

      <CustomSheetStyled
        snapPoints={[230, 180]}
        className={className}
        children={
          <CardSheetMobile
            title="Projects"
            description={`View all the of the projects ${shortCode} is involved in and there status.`}
          >
            <ContainerChildren>
              <InternalLinkButtonStyled
                href={siteRoutes.ecosystemActorProjects(shortCode)}
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
const ButtonOpenMenuStyled = styled(SecondaryButton)({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  padding: '4px 13.5px 4px 13.5px',
});

const InternalLinkButtonStyled = styled(InternalLinkButton)(() => ({
  padding: '4px 13.5px 4px 13.5px',
}));
