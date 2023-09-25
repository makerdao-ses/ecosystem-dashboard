import styled from '@emotion/styled';
import Breadcrumbs from '@ses/components/Breadcrumbs/Breadcrumbs';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SelectDropdown from '../SelectDropdown';
import type { SelectChangeEvent } from '@mui/material/Select/Select';
import type { NavigationBreadcrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

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
}: Props) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerNavigation>
      <StyledBreadcrumbs items={trailingAddress} isLight={isLight} />
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
};

export default BreadcrumbWithYear;
const ContainerNavigation = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 50,
  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 74,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

const StyledBreadcrumbs = styled(Breadcrumbs)<WithIsLight>(({ isLight }) => ({
  padding: 0,

  '& .crumb': {
    letterSpacing: 0,
    color: isLight ? '#231536' : '#E2D8EE',
    padding: 0,
    fontSize: 11,
    [lightTheme.breakpoints.up('tablet_768')]: {
      fontSize: 16,
    },
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '27px 0',
  },
}));
