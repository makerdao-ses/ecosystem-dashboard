import styled from '@emotion/styled';
import Breadcrumbs from '@ses/components/Breadcrumbs/Breadcrumbs';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { NavigationBreadcrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  trailingAddress?: NavigationBreadcrumb[];
  years: string[];
  handleChange: (value: string) => void;

  selectedValue: string;
}

const BreadcrumbWithYear: React.FC<Props> = ({
  trailingAddress = [],
  handleChange,

  selectedValue,
  years,
}: Props) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerNavigation>
      <StyledBreadcrumbs items={trailingAddress} isLight={isLight} />
      <PeriodSelect
        items={years}
        useSelectedAsLabel
        onChange={handleChange}
        selected={selectedValue}
        PopperProps={{
          placement: 'bottom-end',
        }}
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

const PeriodSelect = styled(SingleItemSelect)({
  padding: '7px 15px 7px 16px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '14px 15px 14px 16px',
  },
});
