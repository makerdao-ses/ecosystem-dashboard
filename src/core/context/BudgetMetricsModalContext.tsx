import { createContext, useContext, useState } from 'react';
import BudgetMetricsModal from '@/views/Finances/components/BudgetMetricsModal/BudgetMetricsModal';

interface BudgetMetricsModalContextValues {
  handleOpenModal: () => void;
  openModal: boolean;
}

const BudgetMetricsModalContext = createContext<BudgetMetricsModalContextValues>({} as BudgetMetricsModalContextValues);
const useBudgetMetricsModalContext = () => useContext(BudgetMetricsModalContext);

const BudgetMetricsModalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <BudgetMetricsModalContext.Provider
      value={{
        handleOpenModal: () => setOpenModal((prev) => !prev),
        openModal,
      }}
    >
      {children}
      <BudgetMetricsModal />
    </BudgetMetricsModalContext.Provider>
  );
};

export { useBudgetMetricsModalContext, BudgetMetricsModalProvider };
