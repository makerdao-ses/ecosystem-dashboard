import styled from '@emotion/styled';
import Breadcrumbs from '@ses/components/Breadcrumbs/Breadcrumbs';
import BreadCrumbWithIcons from '@ses/components/Pagination/BreadCrumbWithIcons';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { NavigationBreadcrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface BreadcrumbProps {
  items: NavigationBreadcrumb[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { isLight } = useThemeContext();

  return (
    <BreadcrumbNavigationStyled isLight={isLight}>
      <WrapperContainerDesk>
        <StyledBreadcrumbs items={items} />
      </WrapperContainerDesk>

      <WrapperContainerMobile>
        <Container isLight={isLight}>
          <BreadCrumbWithIcons items={items} title={items[items.length - 1].label as string} />
        </Container>
      </WrapperContainerMobile>
    </BreadcrumbNavigationStyled>
  );
};

export default Breadcrumb;

const BreadcrumbNavigationStyled = styled.div<WithIsLight>(({ isLight }) => ({
  marginBottom: 0,
  background: isLight
    ? 'url(/assets/img/Subheader.png)'
    : 'url(/assets/img/Subheader-dark.png) 0% 0% / cover rgb(37, 39, 61)',
  backgroundSize: 'cover',
  position: 'fixed',
  width: '100%',
  zIndex: 3,

  '> div:first-of-type': {
    marginBottom: 0,
  },
}));

const StyledBreadcrumbs = styled(Breadcrumbs)({
  '& .crumb': {
    letterSpacing: 0,
  },
});

const WrapperContainerDesk = styled.div({
  display: 'none',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 16,
    borderBottom: '2px solid rgba(95, 196, 185, 0.1)',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 48,
    paddingRight: 48,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
});

const WrapperContainerMobile = styled.div({
  display: 'none',

  [lightTheme.breakpoints.down('table_834')]: {
    display: 'flex',
    width: '100%',
    padding: 16,
  },
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '32px',
  padding: '8px',
  background: isLight ? '#ECF1F3' : '#000A13',
  borderRadius: '6px',
  width: '100%',
}));
