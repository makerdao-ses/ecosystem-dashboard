import styled from '@emotion/styled';
import { Breadcrumbs } from '@ses/components/breadcrumbs/breadcrumbs';
import DelegateSummary from '@ses/components/delegate-summary/delegate-summary';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import useRecognizedDelegates from './useRecognizedDelegates.mvvm';

const RecognizedDelegatesContainer = () => {
  const { links, itemsBreadcrumb, isMobile } = useRecognizedDelegates();
  const { isLight } = useThemeContext();

  return (
    <Container>
      <ContainerBreadCrumb>
        <StyledBreadcrumbs
          className="crumb-container"
          paddingBreadcrumbs="9px 8px"
          width={isMobile ? 5 : 10}
          height={isMobile ? 10 : 20}
          fontSize="11px"
          items={itemsBreadcrumb}
          borderRadius="6px"
          marginLeft="4px"
          marginRight="6px"
          isLight={isLight}
        />
      </ContainerBreadCrumb>
      <ContainerInside>
        <DelegateSummary links={links} />
      </ContainerInside>
      <Line />
      <ContainerInside>
        <div>Last update</div>
        <div>View the onchain transaction for recognized delegates</div>
        <div>Tab Sections</div>
        <div>Sep 2022 Totals (Sectios)</div>
        <div>Sep 2022 Breakdown (Sectios)</div>
      </ContainerInside>
    </Container>
  );
};

export default RecognizedDelegatesContainer;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  marginTop: 64,
});

const ContainerInside = styled.div({
  width: '343px',
  display: 'flex',
  margin: '0px auto',
  marginTop: 10,
  flexDirection: 'column',
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: '1312px',
    margin: '0px auto',
    marginTop: 23,
  },
});

const Line = styled.div({
  borderBottom: '1px solid #B6EDE7',
  width: '100%',
  marginTop: '16px',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: '24px',
  },
});

const StyledBreadcrumbs = styled(Breadcrumbs)<{ isLight: boolean }>(({ isLight }) => ({
  maxWidth: '343px',
  height: 32,
  margin: '0px auto',
  background: isLight ? '#ECF1F3' : '#000A13',
  '&.crumb-container': {
    [lightTheme.breakpoints.between('table_375', 'table_834')]: {
      '& .crumb': {
        lineHeight: '13px',
      },
    },
    lineHeight: '13px',
    [lightTheme.breakpoints.up('desktop_1280')]: {
      '& .crumb': {
        fontSize: '16px',
        lineHeight: '22px',
        marginRight: 15,
        marginLeft: 15,
      },
    },

    [lightTheme.breakpoints.up('desktop_1440')]: {
      background: 'none',
      maxWidth: '1376px',
      padding: 0,
      marginTop: 5,

      '& .crumb': {
        fontSize: '16px',
        lineHeight: '22px',
        marginRight: 15,
        marginLeft: 0,
        ':last-child': {
          marginLeft: 15,
        },
      },
    },
  },
}));

const ContainerBreadCrumb = styled.div({
  display: 'flex',
  paddingTop: 16,
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 8,
  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 32,
    paddingRight: 32,
    height: 74,
  },
});
