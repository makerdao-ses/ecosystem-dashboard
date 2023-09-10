import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreadcrumbWithYear from '../BreadcrumbWithYear/BreadcrumbWithYear';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { NavigationBreadcrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

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
}: Props) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerNavigation isLight={isLight}>
      <BreadcrumbWithYear
        handleChange={handleChange}
        isOpen={isOpen}
        selectedValue={selectedValue}
        years={years}
        onClose={onClose}
        onOpen={onOpen}
        trailingAddress={trailingAddress}
      />
    </ContainerNavigation>
  );
};

export default BreadcrumbYearNavigation;

const ContainerNavigation = styled.div<WithIsLight>(({ isLight }) => ({
  marginRight: 16,
  marginLeft: 16,
  position: 'sticky',
  top: 64,
  marginTop: 16,
  paddingLeft: 8,
  paddingRight: 8,
  borderRadius: 6,
  background: isLight ? '#ECF1F3' : '#000A13',
  zIndex: zIndexEnum.BREAD_CRUMB_NAVIGATION,
  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 0,
    marginLeft: 0,
    top: 63,
    paddingLeft: 32,
    paddingRight: 32,
    width: '100%',
    background: isLight ? '#FFFFFF' : '#25273D',
    backgroundImage: isLight ? 'url(/assets/img/Subheader.png)' : 'url(/assets/img/Subheader-dark.png)',
    backgroundSize: 'cover',
    borderBottom: isLight ? '2px solid rgba(95, 196, 185, 0.1)' : 'red',

    margin: 0,
    borderRadius: 0,
  },
}));
