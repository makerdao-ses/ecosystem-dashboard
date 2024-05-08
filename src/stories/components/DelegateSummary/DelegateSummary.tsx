import styled from '@emotion/styled';
import { Collapse } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import lightTheme from '@ses/styles/theme/themes';
import React, { forwardRef } from 'react';
import CustomBreadcrumbs from '../Breadcrumbs/CustomBreadcrumbs/CustomBreadcrumbs';
import { CircleAvatar } from '../CircleAvatar/CircleAvatar';
import { CuTableColumnLinks } from '../CuTableColumnLinks/CuTableColumnLinks';
import { CustomLink } from '../CustomLink/CustomLink';
import type { LinkModel } from '../CuTableColumnLinks/CuTableColumnLinks';

interface Props {
  code?: string;
  links: LinkModel[];
  showHeader?: boolean;
  items: {
    label: string | JSX.Element;
    url: string;
  }[];
}

const DelegateSummary = forwardRef<HTMLDivElement, Props>(({ code = 'del', links, items, showHeader }, ref) => {
  const { isLight } = useThemeContext();
  const isUp1280 = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'table_834'));

  return (
    <ContainerWithBreadcrumb isLight={isLight} ref={ref} showHeader={showHeader}>
      <BreadcrumbsContainer>
        <CustomBreadcrumbs isLight={isLight} items={items} />
      </BreadcrumbsContainer>
      <Collapse in={showHeader} timeout={300} unmountOnExit>
        <Container>
          <ContainerRow>
            <CircleContainer>
              <CircleAvatar
                style={{
                  filter: isLight
                    ? 'filter: drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))'
                    : 'filter: drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))',
                }}
                width={isUp1280 ? '68px' : '32px'}
                height={isUp1280 ? '68px' : '32px'}
                name="mk-logo"
                border="none"
                image="/assets/img/mk-logo.png"
              />
            </CircleContainer>
            <ContainerDescription>
              <ContainerColumnMobile>
                <ContainerText>
                  <Code isLight={isLight}>{code.toUpperCase()}</Code>
                  <Text isLight={isLight}>Recognized Delegates</Text>
                </ContainerText>
                <ContainerLink>
                  <CustomLink
                    children="Onchain transactions"
                    fontSize={11}
                    fontWeight={400}
                    href="https://makerburn.com/#/expenses/core-units/DELEGATES"
                    style={{
                      fontFamily: 'Inter, sans serif',
                      color: '#447AFB',
                      fontStyle: 'normal',
                      marginLeft: '0px',
                      letterSpacing: '0px',
                    }}
                    marginLeft="5px"
                    withArrow
                    iconHeight={6}
                    iconWidth={6}
                  />
                </ContainerLink>
              </ContainerColumnMobile>
              {isMobile && (
                <ContainerLinks>
                  <CuTableColumnLinks links={links} align="flex-start" />
                </ContainerLinks>
              )}
              {!isMobile && (
                <ContainerLinks>
                  <CuTableColumnLinks links={links} align="flex-start" />
                </ContainerLinks>
              )}
            </ContainerDescription>
          </ContainerRow>
        </Container>
      </Collapse>
    </ContainerWithBreadcrumb>
  );
});

export default DelegateSummary;

const ContainerWithBreadcrumb = styled.div<{ isLight: boolean; showIcons?: boolean; showHeader?: boolean }>(
  ({ isLight, showHeader }) => ({
    position: 'fixed',
    top: 64,
    flexDirection: 'column',
    width: '100%',
    height: 'fit-content',
    background: isLight ? '#FFFFFF' : '#25273D',
    backgroundImage: isLight ? 'url(/assets/img/Subheader.png)' : 'url(/assets/img/Subheader-dark.png)',
    backgroundSize: 'cover',
    zIndex: zIndexEnum.DELEGATE_SUMMARY,
    borderBottom: `1px solid ${isLight ? '#B6EDE7' : '#027265'}`,

    paddingBottom: showHeader ? 16 : undefined,

    [lightTheme.breakpoints.up('table_834')]: {
      paddingBottom: showHeader ? 22 : 0,
      borderBottom: showHeader ? (isLight ? '1px solid #B6EDE7' : '1px solid #027265') : 'none',
    },
  })
);

const BreadcrumbsContainer = styled.div({
  padding: '16px',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '3px 0 0',
    borderBottom: '2px solid rgba(95, 196, 185, 0.1)',
  },
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  padding: '0 16px',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '26px 32px 0px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '26px 48px 0px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '26px 0px 0px',
    maxWidth: '1312px',
  },
});

const ContainerRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
});

const ContainerDescription = styled.div({
  display: 'flex',
  flexDirection: 'column',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const CircleContainer = styled.div({
  marginRight: 8,
  marginTop: 3,
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: -1,
    marginRight: 16,
  },
});

const Code = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  marginRight: 4,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: ' 16px',
  lineHeight: '19px',
  color: isLight ? '#9FAFB9' : '#546978',

  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 16,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.4px',
  },
}));

const Text = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#E2D8EE',
  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 16,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.4px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 0,
  },
}));

const ContainerLink = styled.div({
  marginBottom: 16,
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: 6,
  height: 13,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 8,
    marginBottom: 0,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    marginTop: 3,
    marginBottom: 0,
    marginLeft: 0,
    height: 'fit-content',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 3,
    alignItems: 'center',
  },
});

const ContainerLinks = styled.div({
  display: 'flex',
  marginLeft: -6,
  transition: 'all .3s ease',
  [lightTheme.breakpoints.up('table_834')]: {
    ' & > div> div:last-child': {
      marginTop: -4,
    },
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    '& > div > div:first-of-type': {
      marginRight: '16px',
      marginTop: '0px',
      marginLeft: 0,
    },
    '* + *': {
      marginRight: '14px',
      marginTop: '0px!important',
    },
    ' & > div> div:last-child': {
      marginRight: '0px',
    },
  },
});

const ContainerColumnMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: -4,
    marginLeft: 0,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -4,
    marginLeft: 0,
  },
});

const ContainerText = styled.div({
  display: 'flex',
  flexDirection: 'row',
});
