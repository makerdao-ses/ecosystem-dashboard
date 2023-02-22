import styled from '@emotion/styled';
import { Breadcrumbs } from '@ses/components/breadcrumbs/breadcrumbs';
import { CustomLink } from '@ses/components/custom-link/custom-link';
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
        <ContainerDelegate>
          <DelegateSummary links={links} />
        </ContainerDelegate>
      </ContainerInside>
      <Line />
      <ContainerInside>
        <ContainerAdditionalNotes>
          <TitleNotes isLight={isLight}>Additional Notes</TitleNotes>
          <Description isLight={isLight}>
            The expenses on this page are for all Recognized Delegates that receive compensation. To view all delegates
            visit
            <span>
              <CustomLink
                iconWidth={10}
                iconHeight={10}
                children={'vote.makerdao.com/delegates'}
                href="https://vote.makerdao.com/delegates"
                marginLeft="7px"
              />
            </span>
          </Description>
          <Description isLight={isLight}>
            MakerDAO forum reports for delegate can be found
            <Spacer style={{ width: 1 }} />
            <CustomLink
              iconWidth={10}
              iconHeight={10}
              children={'here'}
              href="https://forum.makerdao.com/tag/compensation"
              marginLeft="7px"
              style={{
                marginLeft: isMobile ? '0px' : '4px',
              }}
            />
          </Description>
        </ContainerAdditionalNotes>
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

const ContainerDelegate = styled.div({
  marginTop: 8,
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 36,
    marginLeft: 0,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 36,
    marginLeft: 0,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 22,
    marginLeft: 0,
  },
});

const ContainerInside = styled.div({
  width: '343px',
  flexDirection: 'column',
  display: 'flex',
  margin: '0px auto',

  [lightTheme.breakpoints.up('table_834')]: {
    minWidth: '770px',
    margin: '0px auto',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: '1130px',
    margin: '0px auto',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: '1184px',
    margin: '0px auto',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: '1312px',
    margin: '0px auto',
  },
});

const Line = styled.div({
  borderBottom: '1px solid #B6EDE7',
  width: '100%',
  marginTop: '16px',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: '26px',
  },

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
    '& .crumb': {
      letterSpacing: 0,
      ':last-child': {
        letterSpacing: 0,
      },
      [lightTheme.breakpoints.between('table_375', 'table_834')]: {
        lineHeight: '13px',
      },
      [lightTheme.breakpoints.up('table_834')]: {
        fontSize: '16px',
        lineHeight: '22px',
        marginRight: 15,
        marginLeft: 15,
      },
    },

    [lightTheme.breakpoints.up('table_834')]: {
      background: 'none',
      maxWidth: '768px',
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
    [lightTheme.breakpoints.up('desktop_1194')]: {
      background: 'none',
      maxWidth: '1130px',
    },
    [lightTheme.breakpoints.up('desktop_1280')]: {
      background: 'none',
      maxWidth: '1184px',
    },
    [lightTheme.breakpoints.up('desktop_1280')]: {
      background: 'none',
      maxWidth: '1184px',
    },

    [lightTheme.breakpoints.up('desktop_1440')]: {
      background: 'none',
      maxWidth: '1376px',
    },
    [lightTheme.breakpoints.up('desktop_1920')]: {
      background: 'none',
      maxWidth: '1855px',
    },
  },
}));

const ContainerBreadCrumb = styled.div({
  display: 'flex',
  paddingTop: 16,
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 8,
  [lightTheme.breakpoints.up('table_834')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 48,
    paddingRight: 48,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    height: 74,
    paddingLeft: 32,
    paddingRight: 32,
  },
});

const ContainerAdditionalNotes = styled.div({
  marginTop: 40,
  marginBottom: 64,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const Description = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  letterSpacing: 0,
  color: isLight ? '#231536' : '#d2d4ef',
  '> a': {
    fontSize: 14,
    lineHeight: '18px',
    letterSpacing: 0,
  },
  '> span a': {
    fontSize: 14,
    lineHeight: '18px',
    letterSpacing: 0,
  },
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    '> a': {
      fontSize: 16,
      lineHeight: '18px',
      letterSpacing: 0,
    },
    '> span a': {
      fontSize: 16,
      lineHeight: '18px',
      letterSpacing: 0,
    },
  },
}));
const TitleNotes = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  display: 'flex',
  color: isLight ? '#231536' : '#d2d4ef',
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const Spacer = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});
