import React from 'react';
import { BreadCrumbWithYear } from '../components/BreadCrumbWithYear/BreadCrumbWithYear';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { NavigationBreadCrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';

interface Props {
  years: string[];
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  onOpen?: () => void;
  onClose?: () => void;
  selectedValue: string;
  isOpen: boolean;

  trailingAddress: NavigationBreadCrumb[];
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
  <BreadCrumbWithYear
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
