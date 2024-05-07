import { Collapse, styled, useMediaQuery } from '@mui/material';
import CustomBreadcrumbs from '@ses/components/Breadcrumbs/CustomBreadcrumbs/CustomBreadcrumbs';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { forwardRef } from 'react';
import type { Theme } from '@mui/material';

interface BudgetStatementSummaryProps {
  code: string;
  name: string;
  showHeader: boolean;
  breadcrumbItems: {
    label: string | JSX.Element;
    url: string;
  }[];
}

const BudgetStatementSummary = forwardRef<HTMLDivElement, BudgetStatementSummaryProps>(
  ({ code, name, showHeader, breadcrumbItems }, ref) => {
    const { isLight } = useThemeContext();
    const isUp1280 = useMediaQuery((theme: Theme) => theme.breakpoints.up('table_834'));

    return (
      <ContainerWithBreadcrumb ref={ref} showHeader={showHeader}>
        <BreadcrumbsContainer>
          <CustomBreadcrumbs isLight={isLight} items={breadcrumbItems} />
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
                    <Code>{code.toUpperCase()}</Code>
                    <Text>{name}</Text>
                  </ContainerText>
                </ContainerColumnMobile>
              </ContainerDescription>
            </ContainerRow>
          </Container>
        </Collapse>
      </ContainerWithBreadcrumb>
    );
  }
);

export default BudgetStatementSummary;

const ContainerWithBreadcrumb = styled('div')<{ showIcons?: boolean; showHeader?: boolean }>(
  ({ theme, showHeader }) => ({
    position: 'fixed',
    top: 64,
    flexDirection: 'column',
    width: '100%',
    height: 'fit-content',
    background: theme.palette.mode === 'light' ? '#FFFFFF' : '#25273D',
    backgroundImage:
      theme.palette.mode === 'light' ? 'url(/assets/img/Subheader.png)' : 'url(/assets/img/Subheader-dark.png)',
    backgroundSize: 'cover',
    zIndex: zIndexEnum.DELEGATE_SUMMARY,
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#B6EDE7' : '#027265'}`,

    paddingBottom: showHeader ? 16 : undefined,

    [theme.breakpoints.up('table_834')]: {
      paddingBottom: showHeader ? 22 : 0,
      borderBottom: showHeader ? (theme.palette.mode === 'light' ? '1px solid #B6EDE7' : '1px solid #027265') : 'none',
    },
  })
);

const BreadcrumbsContainer = styled('div')(({ theme }) => ({
  padding: '16px',

  [theme.breakpoints.up('table_834')]: {
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

  [theme.breakpoints.up('table_834')]: {
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

  [theme.breakpoints.up('table_834')]: {
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

  [theme.breakpoints.up('table_834')]: {
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
  color: theme.palette.mode === 'light' ? '#9FAFB9' : '#546978',

  [theme.breakpoints.up('table_834')]: {
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
  color: theme.palette.mode === 'light' ? '#231536' : '#E2D8EE',

  [theme.breakpoints.up('table_834')]: {
    marginRight: 16,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.4px',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    marginTop: 0,
  },
}));

const ContainerColumnMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('table_834')]: {
    marginTop: -4,
    marginLeft: 0,
  },

  [theme.breakpoints.up('desktop_1194')]: {
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
