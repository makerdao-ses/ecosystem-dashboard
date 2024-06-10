import { Collapse, styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import React, { forwardRef } from 'react';
import CustomBreadcrumbs from '../Breadcrumbs/CustomBreadcrumbs/CustomBreadcrumbs';
import { CircleAvatar } from '../CircleAvatar/CircleAvatar';
import { CuTableColumnLinks } from '../CuTableColumnLinks/CuTableColumnLinks';
import { CustomLink } from '../CustomLink/CustomLink';
import type { LinkModel } from '../CuTableColumnLinks/CuTableColumnLinks';
import type { Theme } from '@mui/material';

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
  const isUp1280 = useMediaQuery((theme: Theme) => theme.breakpoints.up('tablet_768'));
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.between('mobile_375', 'tablet_768'));

  return (
    <ContainerWithBreadcrumb ref={ref} showHeader={showHeader}>
      <BreadcrumbsContainer>
        <CustomBreadcrumbs items={items} />
      </BreadcrumbsContainer>
      <Collapse in={showHeader} timeout={300} unmountOnExit>
        <Container>
          <ContainerRow>
            <CircleContainer>
              <CircleAvatarStyled
                width={isUp1280 ? '68px' : '32px'}
                height={isUp1280 ? '68px' : '32px'}
                name="mk-logo"
                image="/assets/img/mk-logo.png"
              />
            </CircleContainer>
            <ContainerDescription>
              <ContainerColumnMobile>
                <ContainerText>
                  <Code>{code.toUpperCase()}</Code>
                  <Text>Recognized Delegates</Text>
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

const ContainerWithBreadcrumb = styled('div')<{ showIcons?: boolean; showHeader?: boolean }>(
  ({ showHeader, theme }) => ({
    position: 'fixed',
    top: 64,
    flexDirection: 'column',
    width: '100%',
    height: 'fit-content',
    background: theme.palette.isLight ? '#FFFFFF' : '#25273D',
    backgroundImage: theme.palette.isLight ? 'url(/assets/img/Subheader.png)' : 'url(/assets/img/Subheader-dark.png)',
    backgroundSize: 'cover',
    zIndex: zIndexEnum.DELEGATE_SUMMARY,
    borderBottom: `1px solid ${theme.palette.isLight ? '#B6EDE7' : '#027265'}`,

    paddingBottom: showHeader ? 16 : undefined,

    [theme.breakpoints.up('tablet_768')]: {
      paddingBottom: showHeader ? 22 : 0,
      borderBottom: showHeader ? (theme.palette.isLight ? '1px solid #B6EDE7' : '1px solid #027265') : 'none',
    },
  })
);

const BreadcrumbsContainer = styled('div')(({ theme }) => ({
  padding: '16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '3px 0 0',
    borderBottom: '2px solid rgba(95, 196, 185, 0.1)',
  },
}));

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  padding: '0 16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '26px 32px 0px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '26px 48px 0px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '26px 0px 0px',
    maxWidth: '1312px',
  },
}));

const ContainerRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
});

const ContainerDescription = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const CircleContainer = styled('div')(({ theme }) => ({
  marginRight: 8,
  marginTop: 3,
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: -1,
    marginRight: 16,
  },
}));

const Code = styled('div')(({ theme }) => ({
  marginRight: 4,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: ' 16px',
  lineHeight: '19px',
  color: theme.palette.isLight ? '#9FAFB9' : '#546978',

  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 16,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.4px',
  },
}));

const Text = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: theme.palette.isLight ? '#231536' : '#E2D8EE',
  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 16,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.4px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 0,
  },
}));

const ContainerLink = styled('div')(({ theme }) => ({
  marginBottom: 16,
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: 6,
  height: 13,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 8,
    marginBottom: 0,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    marginTop: 3,
    marginBottom: 0,
    marginLeft: 0,
    height: 'fit-content',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    marginTop: 3,
    alignItems: 'center',
  },
}));

const ContainerLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  marginLeft: -6,
  transition: 'all .3s ease',
  [theme.breakpoints.up('tablet_768')]: {
    ' & > div> div:last-child': {
      marginTop: -4,
    },
  },

  [theme.breakpoints.up('desktop_1440')]: {
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
}));

const ContainerColumnMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: -4,
    marginLeft: 0,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -4,
    marginLeft: 0,
  },
}));

const ContainerText = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const CircleAvatarStyled = styled(CircleAvatar)(({ theme }) => ({
  filter: theme.palette.isLight
    ? 'filter: drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))'
    : 'filter: drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))',
  border: 'none',
}));
