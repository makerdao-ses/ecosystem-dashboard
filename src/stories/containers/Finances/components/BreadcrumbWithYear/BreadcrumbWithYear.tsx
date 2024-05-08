import styled from '@emotion/styled';
import Breadcrumbs from '@ses/components/Breadcrumbs/Breadcrumbs';
import BreadCrumbWithIcons from '@ses/components/Pagination/BreadCrumbWithIcons';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { NavigationBreadcrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  trailingAddress?: NavigationBreadcrumb[];
  years: string[];
  handleChange: (value: string) => void;
  title: string;
  selectedValue: string;
  trailingAddressDesk?: NavigationBreadcrumb[];
  hasIcon?: boolean;
}

const BreadcrumbWithYear: React.FC<Props> = ({
  trailingAddress = [],
  trailingAddressDesk = [],
  handleChange,
  selectedValue,
  years,
  title,
  hasIcon = true,
}: Props) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerNavigation>
      {trailingAddress.length >= 1 && (
        <BreadcrumbMobile>
          <BreadCrumbWithIcons items={trailingAddress} title={title} hasIcon={hasIcon} />
        </BreadcrumbMobile>
      )}
      <BreadcrumbDesk>
        <StyledBreadcrumbs items={trailingAddressDesk} isLight={isLight} />
      </BreadcrumbDesk>

      <YearSelect
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

const YearSelect = styled(SingleItemSelect)({
  padding: '7px 15px 7px 16px',
});

const BreadcrumbMobile = styled.div({
  display: 'flex',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});
const BreadcrumbDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
});
