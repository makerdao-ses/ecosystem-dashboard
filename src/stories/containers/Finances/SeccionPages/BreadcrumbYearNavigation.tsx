import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreadcrumbWithYear from '../components/BreadcrumbWithYear/BreadcrumbWithYear';
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
  position: 'sticky',
  top: 16,
  margin: 16,
  zIndex: zIndexEnum.BREAD_CRUMB_NAVIGATION,
  borderRadius: 6,
  // background: isLight ? '#FFFFFF' : '#25273D',
  // backgroundImage: isLight ? 'url(/assets/img/Subheader.png)' : 'url(/assets/img/Subheader-dark.png)',
  background: isLight ? '#ECF1F3' : 'red',
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: '100%',
    background: isLight ? '#FFFFFF' : '#25273D',
    backgroundImage: isLight ? 'url(/assets/img/Subheader.png)' : 'url(/assets/img/Subheader-dark.png)',
    backgroundSize: 'cover',
    borderBottom: isLight ? '2px solid rgba(95, 196, 185, 0.1)' : 'red',
    top: 64,
    margin: 0,
  },
}));
