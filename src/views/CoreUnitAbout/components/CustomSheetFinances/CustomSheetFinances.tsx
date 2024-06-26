import { styled } from '@mui/material';
import React, { useState } from 'react';
import CustomSheet from '@/components/CustomSheet/CustomSheet';
import SecondaryButton from '@/components/SecondaryButton/SecondaryButton';
import type { AuditorDto } from '@/core/models/dto/coreUnitDTO';
import { ResourceType } from '@/core/models/interfaces/types';
import ItemFinancesSheet from './ItemFinancesSheet';
import type { FC } from 'react';

interface Props {
  className?: string;
  budgetPath: string;
  shortCode: string;
  queryStrings: string;
  code: string;
  type: ResourceType;
  auditors?: AuditorDto[];
  auditorTitle?: string;
}

const CustomSheetFinances: FC<Props> = ({
  className,
  budgetPath,
  queryStrings,
  shortCode,
  code,
  type,
  auditors,
  auditorTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Container type={type}>
      <ButtonOpenMenuStyled title="Finances" onClick={handleOpenSheet} />
      <CustomSheetStyled
        handleClose={handleClose}
        isOpen={isOpen}
        snapPoints={type === ResourceType.CoreUnit ? [600, 350] : (auditors?.length || 0) > 0 ? [600, 300] : [600, 250]}
        className={className}
      >
        <ItemFinancesSheet
          budgetPath={budgetPath}
          code={code}
          queryStrings={queryStrings}
          shortCode={shortCode}
          type={type}
          auditorTitle={auditorTitle}
          auditors={auditors}
        />
      </CustomSheetStyled>
    </Container>
  );
};

export default CustomSheetFinances;

const CustomSheetStyled = styled(CustomSheet)({
  '& .react-modal-sheet-container': {
    padding: '0px 16px 0px 16px',
  },
  '& .react-modal-sheet-header': {
    height: '0px!important',
  },
  '.react-modal-sheet-content': {},
});

const ButtonOpenMenuStyled = styled(SecondaryButton)({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
});

const Container = styled('div')<{ type: ResourceType }>(({ type }) => ({
  display: 'flex',
  width: type === ResourceType.CoreUnit ? undefined : '100%',
}));
