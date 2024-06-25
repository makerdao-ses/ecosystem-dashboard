import { styled } from '@mui/material';
import Breadcrumbs from '@ses/components/Breadcrumbs/Breadcrumbs';
import BreadCrumbWithIcons from '@ses/components/Pagination/BreadCrumbWithIcons';
import React from 'react';
import type { NavigationBreadcrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';

interface BreadcrumbProps {
  items: NavigationBreadcrumb[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <BreadcrumbNavigationStyled>
    <WrapperContainerDesk>
      <StyledBreadcrumbs items={items} />
    </WrapperContainerDesk>

    <WrapperContainerMobile>
      <Container>
        <BreadCrumbWithIcons items={items} title={items[items.length - 1].label as string} />
      </Container>
    </WrapperContainerMobile>
  </BreadcrumbNavigationStyled>
);

export default Breadcrumb;

const BreadcrumbNavigationStyled = styled('div')(({ theme }) => ({
  marginBottom: 0,
  background: theme.palette.isLight
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
    maxWidth: '230px!important', // override the default width
  },
});

const WrapperContainerDesk = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 16,
    borderBottom: '2px solid rgba(95, 196, 185, 0.1)',
  },
}));

const WrapperContainerMobile = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.down('tablet_768')]: {
    display: 'flex',
    width: '100%',
    padding: 16,
  },
}));

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '32px',
  padding: '8px',
  background: theme.palette.isLight ? '#ECF1F3' : '#000A13',
  borderRadius: '6px',
  width: '100%',
}));
