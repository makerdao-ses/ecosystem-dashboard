import styled from '@emotion/styled';
import Breadcrumbs from '@ses/components/Breadcrumbs/Breadcrumbs';
import React from 'react';
import SelectYear from '../SelectYear';
import type { SelectChangeEvent } from '@mui/material/Select/Select';
import type { NavigationBreadCrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';

interface Props {
  trailingAddress?: NavigationBreadCrumb[];
  years: string[];
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  onOpen?: () => void;
  onClose?: () => void;
  selectedValue: string;
  isOpen: boolean;
}

export const BreadCrumbWithYear: React.FC<Props> = ({
  trailingAddress = [],
  handleChange,
  isOpen,
  selectedValue,
  years,
  onClose,
  onOpen,
}: Props) => (
  <ContainerNavigation>
    <StyledBreadcrumbs items={trailingAddress} />
    <SelectYear
      handleChange={handleChange}
      years={years}
      isOpen={isOpen}
      selectedValue={selectedValue}
      onClose={onClose}
      onOpen={onOpen}
    />
  </ContainerNavigation>
);

const ContainerNavigation = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledBreadcrumbs = styled(Breadcrumbs)({
  '& .crumb': { letterSpacing: 0 },
});
