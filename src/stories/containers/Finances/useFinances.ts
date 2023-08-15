import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';

export const useFinances = () => {
  const { isLight } = useThemeContext();
  const filters = ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'];

  const [filterSelected, setFilterSelected] = useState<string>('Budget');
  const router = useRouter();
  const routes = ['Finances'];
  const years = ['2022', '2023'];
  const [value, setValue] = useState(years[0]);
  const [isOpen, setIsOpen] = useState(false);
  const actuals = 9120;
  const budgetCap = 9120;
  const prediction = 4436;

  const handleSelectFilter = (item: string) => {
    setFilterSelected(item);
  };

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as unknown as string);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const trailingAddress = routes.map((adr) => ({
    label: adr,
    url: router.asPath,
  }));
  return {
    years,
    value,
    isOpen,
    handleChange,
    handleClose,
    handleOpen,
    router,
    trailingAddress,
    filterSelected,
    filters,
    handleSelectFilter,
    actuals,
    budgetCap,
    prediction,
    isLight,
  };
};
