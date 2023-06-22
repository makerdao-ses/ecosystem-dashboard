import _ from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import type { ExpenseCategory, ParsedExpenseCategoryWithExpanded } from '@ses/core/models/dto/expenseCategoriesDTO';

export const useModalCategory = (expenseCategories: ExpenseCategory[] = []) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [checkOut, setCheckOut] = useState<boolean>(false);
  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const parsedExpenseCategories = useMemo(() => {
    const parseSimpleCategory = (category: ExpenseCategory): ParsedExpenseCategoryWithExpanded =>
      ({
        id: category.id,
        name: category.name,
        order: category.order,
        headcountExpense: category.headcountExpense,
        isExpanded: false,
      } as ParsedExpenseCategoryWithExpanded);

    return expenseCategories
      ?.filter((category: ExpenseCategory) => category.parentId === null)
      .map(
        (category: ExpenseCategory) =>
          ({
            ...parseSimpleCategory(category),
            subcategories: expenseCategories
              .filter((subcategory) => subcategory.parentId === category.id)
              .map((subcategory) => parseSimpleCategory(subcategory))
              .sort((a, b) => a.order - b.order),
          } as ParsedExpenseCategoryWithExpanded)
      )
      .sort((a, b) => a.order - b.order);
  }, [expenseCategories]);
  const [allCategory, setAllCategory] = useState<ParsedExpenseCategoryWithExpanded[]>(parsedExpenseCategories || []);
  const headCountCategory = allCategory?.filter((item) => item.headcountExpense);
  const notHeadCountCategory = allCategory?.filter((item) => !item.headcountExpense);
  const handleChangeItemAccordion = (id: string, value: boolean) => {
    const category = allCategory.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          isExpanded: value,
        };
      } else {
        return item;
      }
    });
    if (category) {
      setAllCategory(category);
    }
    const hasExpandedElement = _.some(
      allCategory,
      (element) => _.has(element, 'isExpanded') && element.isExpanded === true
    );

    if (hasExpandedElement) {
      setCheckOut(false);
    }
  };
  const handleCloseModal = () => {
    const newItemUnExpanded: ParsedExpenseCategoryWithExpanded[] = allCategory.map((item) => ({
      ...item,
      isExpanded: false,
    }));
    setAllCategory(newItemUnExpanded);
    setCheckOut(false);
    setOpenModal(false);
  };

  const handleCheckedExpandedAll = () => {
    setCheckOut(!checkOut);
    let newMoment: ParsedExpenseCategoryWithExpanded[] = [];
    if (checkOut) {
      newMoment = allCategory.map((item) => ({
        ...item,
        isExpanded: false,
      }));
    } else {
      newMoment = allCategory.map((item) => ({
        ...item,
        isExpanded: true,
      }));
    }

    setAllCategory(newMoment);
  };
  return {
    openModal,
    handleCheckedExpandedAll,
    handleCloseModal,
    handleChangeItemAccordion,
    headCountCategory,
    notHeadCountCategory,
    handleOpenModal,
    checkOut,
    expenseCategories,
  };
};
