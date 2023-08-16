import React from 'react';
import BreadcrumbWithYear from '../BreadcrumbWithYear/BreadcrumbWithYear';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { NavigationBreadcrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';

interface Props {
  years: string[];
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  onOpen?: () => void;
  onClose?: () => void;
  selectedValue: string;
  isOpen: boolean;

  trailingAddress: NavigationBreadcrumb[];
}
const BreadcrumbYearNavigation: React.FC<Props> = ({
  years,
  handleChange,
  isOpen,
  selectedValue,
  onClose,
  onOpen,
  trailingAddress,
}: Props) => (
  <BreadcrumbWithYear
    handleChange={handleChange}
    isOpen={isOpen}
    selectedValue={selectedValue}
    years={years}
    onClose={onClose}
    onOpen={onOpen}
    trailingAddress={trailingAddress}
  />
);
export default BreadcrumbYearNavigation;
