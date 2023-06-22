import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BasicModal from './BasicModal';
import ContainerModal from './ContainerModal';
import type { ParsedExpenseCategoryWithExpanded } from '@ses/core/models/dto/expenseCategoriesDTO';

interface Props {
  handleCloseModal: () => void;
  openModal: boolean;
  isLight: boolean;
  headCountCategories: ParsedExpenseCategoryWithExpanded[];
  notHeadCountCategory: ParsedExpenseCategoryWithExpanded[];
  checkOut: boolean;
  handleCheckedExpandedAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeItemAccordion: (id: string, expanded: boolean) => void;
}

const CategoryModalComponent: React.FC<Props> = ({
  handleCloseModal,
  openModal,
  isLight,
  checkOut,
  headCountCategories,
  notHeadCountCategory,
  handleCheckedExpandedAll,
  handleChangeItemAccordion,
}) => (
  <BasicModalExtended
    handleClose={handleCloseModal}
    open={openModal}
    backdropProps={{
      style: {
        background: isLight ? 'rgba(52, 52, 66, 0.1)' : 'rgba(0, 22, 78, 0.1)',
        backdropFilter: isLight ? 'blur(2px);' : 'blur(4px)',
      },
    }}
  >
    <ContainerModal
      headCountCategories={headCountCategories}
      noHeadCountCategories={notHeadCountCategory}
      isCheckedExpandedAll={checkOut}
      handleCloseModal={handleCloseModal}
      setIsCheckedExpandedAll={handleCheckedExpandedAll}
      handleChangeItemAccordion={handleChangeItemAccordion}
    />
  </BasicModalExtended>
);

export default CategoryModalComponent;

const BasicModalExtended = styled(BasicModal)({
  position: 'absolute',
  left: '50%',
  height: 'calc(100% - 64px)',
  maxHeight: '100%',
  marginTop: 64,
  marginBottom: 0,
  // This to hidden border in safari
  outline: 'none',
  transform: 'translateX(-50%)',
  width: 'max(100%, 375px)',
  [lightTheme.breakpoints.up('table_834')]: {
    width: 'max(90%, 770px)',
    height: 'calc(100% - 128px)',
    marginBottom: 64,
    maxHeight: 813,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 1114,
    maxHeight: 847,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 1184,
  },
});
