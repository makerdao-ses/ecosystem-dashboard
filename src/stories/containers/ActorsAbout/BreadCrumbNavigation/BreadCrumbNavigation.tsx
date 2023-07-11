import styled from '@emotion/styled';
import { Breadcrumbs } from '@ses/components/Breadcrumbs/Breadcrumbs';
import BreadcrumbMobile from '@ses/components/Pagination/BreadcrumbMobile';
import InsidePagination from '@ses/components/Pagination/InsidePagination';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { NavigationBreadCrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  totalElements: number;
  navigationPageTitle?: string;
  mainUrl: string;
  labelFirstItemNavigation: NavigationBreadCrumb;
  trailingAddress?: NavigationBreadCrumb[];
  itemActual: number;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  breadcrumbTitleMobile?: string;
  hasStyleMobileItem: boolean;
  descriptionTextPagination?: string;
}

const BreadCrumbNavigation: React.FC<Props> = ({
  totalElements,
  mainUrl,
  navigationPageTitle = 'Ecosystem Actors',
  labelFirstItemNavigation,
  trailingAddress = [],
  itemActual,
  onClickLeft,
  onClickRight,
  breadcrumbTitleMobile,
  hasStyleMobileItem,
  descriptionTextPagination,
}) => {
  const { isLight } = useThemeContext();
  return (
    <>
      <WrapperContainerDesk isLight={isLight}>
        <StyledBreadcrumbs
          items={[
            {
              label: (
                <CoreUnitStyle isLight={isLight}>
                  {navigationPageTitle} <NumberActors>({totalElements})</NumberActors>
                </CoreUnitStyle>
              ),
              url: mainUrl,
            },
            {
              label: labelFirstItemNavigation.label,
              url: labelFirstItemNavigation.url,
            },
            ...trailingAddress.map((adr) => ({
              label: adr.label,
              url: adr.url,
            })),
          ]}
        />
        <StyledInsidePagination
          count={totalElements}
          page={itemActual}
          onClickLeft={onClickLeft}
          onClickRight={onClickRight}
          descriptionText={descriptionTextPagination}
        />
      </WrapperContainerDesk>

      <WrapperContainerMobile>
        <BreadcrumbMobileStyled
          marginRightSeparator="6px"
          arrowHeight={16}
          arrowWidth={16}
          items={[
            ...trailingAddress.map((adr) => ({
              style: breadcrumbTitleMobile === adr.label ? { color: isLight ? '#25273D' : '#D2D4EF' } : undefined,
              label: adr.label,
              url: adr.url,
            })),
            {
              style: hasStyleMobileItem ? { color: isLight ? '#25273D' : '#D2D4EF' } : undefined,
              label: labelFirstItemNavigation.label,
              url: labelFirstItemNavigation.url,
            },

            {
              label: (
                <span>
                  {navigationPageTitle} <Value isLight={isLight}>({totalElements})</Value>
                </span>
              ),
              url: labelFirstItemNavigation.url,
            },
          ]}
          title={breadcrumbTitleMobile || (labelFirstItemNavigation.label as string)}
          count={totalElements}
          onClickLeft={onClickLeft}
          onClickRight={onClickRight}
          page={itemActual}
        />
      </WrapperContainerMobile>
    </>
  );
};

export default BreadCrumbNavigation;

const Value = styled.b<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#708390' : '#48495F',
}));

const CoreUnitStyle = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  color: isLight ? '#708390' : '#787A9B',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  '> b': {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
  },
}));

const NumberActors = styled.b({});
const StyledBreadcrumbs = styled(Breadcrumbs)({
  '& .crumb': {
    letterSpacing: 0,
  },
});

const StyledInsidePagination = styled(InsidePagination)({
  '& > div:nth-of-type(1)': {
    [lightTheme.breakpoints.up('table_834')]: {
      letterSpacing: 0,
      lineHeight: 18,
      padding: 0,
      '& p': {
        letterSpacing: 0,
      },
    },
  },
  '& > div:nth-of-type(2)': {
    [lightTheme.breakpoints.up('table_834')]: {
      marginLeft: 12,
      gap: '4px',
    },
  },
});

const WrapperContainerDesk = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 16,
    borderBottom: isLight ? '2px solid rgba(95, 196, 185, 0.1)' : 'none',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 48,
    paddingRight: 48,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
}));

const WrapperContainerMobile = styled.div({
  display: 'none',

  [lightTheme.breakpoints.down('table_834')]: {
    display: 'flex',
    width: '100%',
    padding: 16,
  },
});

const BreadcrumbMobileStyled = styled(BreadcrumbMobile)({
  width: '100%',
  '& > div:nth-of-type(2) > :nth-of-type(2)': {
    gap: 16,
  },
  '& > div:nth-of-type(2) > :nth-of-type(1)': {
    width: 'fit-content',
    marginRight: 3,
  },
});
