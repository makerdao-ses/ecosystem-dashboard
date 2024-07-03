import React, { createContext, useContext } from 'react';
import { useModalCategory } from '@/components/AdvancedInnerTable/BasicModal/useModalCategory';
import type { ExpenseCategory, ParsedExpenseCategoryWithExpanded } from '../models/dto/expenseCategoriesDTO';

export type CategoryModalContextValues = {
  handleCloseModal: () => void;
  openModal: boolean;
  handleOpenModal: () => void;

  checkOut: boolean;
  headCountCategories: ParsedExpenseCategoryWithExpanded[];
  noHeadCountCategories: ParsedExpenseCategoryWithExpanded[];
  handleCheckedExpandedAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeItemAccordion: (id: string, expanded: boolean) => void;
};

const CategoriesModalContext = createContext<CategoryModalContextValues>({} as CategoryModalContextValues);
const useCategoriesModalContext = () => useContext(CategoriesModalContext);

interface Props extends React.PropsWithChildren {
  expenseCategories: ExpenseCategory[];
}

const ModalCategoriesProvider = ({ expenseCategories, children }: Props) => {
  const {
    checkOut,
    handleChangeItemAccordion,
    handleCheckedExpandedAll,
    handleCloseModal,
    handleOpenModal,
    headCountCategory,
    notHeadCountCategory,
    openModal,
  } = useModalCategory(expenseCategories);
  return (
    <CategoriesModalContext.Provider
      value={{
        checkOut,
        handleChangeItemAccordion,
        handleCheckedExpandedAll,
        handleCloseModal,
        handleOpenModal,
        headCountCategories: headCountCategory,
        noHeadCountCategories: notHeadCountCategory,
        openModal,
      }}
    >
      {children}
    </CategoriesModalContext.Provider>
  );
};

export { useCategoriesModalContext, ModalCategoriesProvider };
