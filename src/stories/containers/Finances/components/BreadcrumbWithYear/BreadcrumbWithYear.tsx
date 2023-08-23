import styled from '@emotion/styled';
import Breadcrumbs from '@ses/components/Breadcrumbs/Breadcrumbs';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SelectDropdown from '../SelectDropdown';
import type { SelectChangeEvent } from '@mui/material/Select/Select';
import type { NavigationBreadcrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';

interface Props {
  trailingAddress?: NavigationBreadcrumb[];
  years: string[];
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  onOpen?: () => void;
  onClose?: () => void;
  selectedValue: string;
  isOpen: boolean;
}

const BreadcrumbWithYear: React.FC<Props> = ({
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
    <SelectDropdown
      handleChange={handleChange}
      items={years}
      isOpen={isOpen}
      selectedValue={selectedValue}
      onClose={onClose}
      onOpen={onOpen}
    />
  </ContainerNavigation>
);

export default BreadcrumbWithYear;
const ContainerNavigation = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 50,
  [lightTheme.breakpoints.up('table_834')]: {
    height: 74,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

const StyledBreadcrumbs = styled(Breadcrumbs)({
  padding: 0,
  '& .crumb': {
    letterSpacing: 0,
    padding: 0,
    fontSize: 11,
    [lightTheme.breakpoints.up('table_834')]: {
      fontSize: 16,
    },
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '27px 0',
  },
});
