import React from 'react';
import BreakdownTableFinances from '../BreakdownTableFinances/BreakdownTableFinances';
import type { SelectChangeEvent } from '@mui/material/Select/Select';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

interface Props {
  metrics: MultiSelectItem[];
  activeItems: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
  periodicSelectionFilter: string[];
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  onOpen?: () => void;
  onClose?: () => void;
  selectedValue: string;
  isOpen: boolean;
  widthPaper?: number;
}

const BreakdownTable: React.FC<Props> = ({
  activeItems,
  handleChange,
  handleResetFilter,
  handleSelectChange,
  isOpen,
  metrics,
  periodicSelectionFilter,
  selectedValue,
  onClose,
  onOpen,
}) => (
  <BreakdownTableFinances
    activeItems={activeItems}
    handleChange={handleChange}
    handleResetFilter={handleResetFilter}
    handleSelectChange={handleSelectChange}
    isOpen={isOpen}
    metrics={metrics}
    periodicSelectionFilter={periodicSelectionFilter}
    selectedValue={selectedValue}
    onClose={onClose}
    onOpen={onOpen}
  />
);

export default BreakdownTable;
