import styled from '@emotion/styled';
import { Breadcrumbs } from '@ses/components/breadcrumbs/breadcrumbs';
import DelegateSummary from '@ses/components/delegate-summary/delegate-summary';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import useRecognizedDelegates from './useRecognizedDelegates.mvvm';

const RecognizedDelegatesContainer = () => {
  const { links, itemsBreadcrumb } = useRecognizedDelegates();
  const { isLight } = useThemeContext();
  return (
    <Container>
      <ContainerBreadCrumb>
        <StyledBreadcrumbs
          className="crumb-container"
          heightBreadcrumbs="32x"
          paddingBreadcrumbs="9px 8px"
          width={5}
          height={10}
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
  width: '100%',
  marginTop: 64,
});

const ContainerInside = styled.div({
  width: '343px',
  display: 'flex',
  margin: '0px auto',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: '1312px',
    margin: '0px auto',
  },
});

const Line = styled.div({
  borderBottom: '1px solid #B6EDE7',
  width: '100%',
  marginTop: '16px',
});

const StyledBreadcrumbs = styled(Breadcrumbs)<{ isLight: boolean }>(({ isLight }) => ({
  maxWidth: '343px',
  margin: '0px auto',
  background: isLight ? '#ECF1F3' : '#000A13',
  '&.crumb-container': {
    [lightTheme.breakpoints.up('desktop_1280')]: {
      background: 'none',
      width: '100%',
      marginLeft: 48,
      '& .crumb': {
        fontSize: '16px',
        lineHeight: '22px',
        marginRight: 15,
        marginLeft: 15,
      },
    },
  },
}));

const ContainerBreadCrumb = styled.div({
  display: 'flex',
  paddingTop: 16,
  paddingBottom: 16,
});
