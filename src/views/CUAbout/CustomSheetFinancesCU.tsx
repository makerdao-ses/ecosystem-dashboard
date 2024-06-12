import { styled } from '@mui/material';
import React, { useState } from 'react';
import ButtonOpenMenu from '@/components/ButtonOpenMenu/ButtonOpenMenu';
import CardSheetMobile from '@/components/CardSheetMobile/CardSheetMobile';
import CustomSheet from '@/components/CustomSheet/CustomSheet';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import { siteRoutes } from '@/config/routes';
import type { FC } from 'react';

interface Props {
  className?: string;
  budgetPath: string;
  shortCode: string;
  queryStrings: string;
}

const CustomSheetFinancesCU: FC<Props> = ({ className, budgetPath, queryStrings, shortCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenSheet = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <ButtonOpenMenu title="Finances" onClick={handleOpenSheet} />
      <CustomSheetStyled
        className={className}
        children={
          <CardSheetMobile title="Finances" description="View all expenses of the SES Core Unit.">
            <ContainerChildren>
              <InternalLinkButton
                href={`/core-unit/${shortCode}/activity-feed${queryStrings}`}
                label="Activity Feed"
                showIcon
              />
              <InternalLinkButton
                href={`${siteRoutes.coreUnitReports(shortCode)}${queryStrings}`}
                label="Budget Statements"
                showIcon
              />
              <InternalLinkButton href={`/finances/${budgetPath}/${queryStrings}`} label="Finances" showIcon />
            </ContainerChildren>
          </CardSheetMobile>
        }
        handleClose={handleClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default CustomSheetFinancesCU;

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
