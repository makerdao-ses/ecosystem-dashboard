import { Typography, styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import Card from '@/components/Card/Card';
import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  width?: string;
  title?: string;
  linkText?: string;
  className?: string;
}

const CardSomethingWrong: React.FC<Props> = ({ title = 'Is this your core unit?', children, className }) => (
  <Container className={className}>
    <Label>Something Wrong on this Page</Label>
    <StyledInformationCard>
      <ContainerText>
        <TypographyDescription>{title}</TypographyDescription>
        <TypographyDescription>We are still collecting all the relevant information.</TypographyDescription>
        <StyledTypographyDescription>
          If you see something that needs updating, don't hesitate to contact us.
        </StyledTypographyDescription>
      </ContainerText>
      <LineStyledBorder />
      <div>{children}</div>
    </StyledInformationCard>
  </Container>
);

export default CardSomethingWrong;

const Container = styled('div')({
  display: 'flex',

  flexDirection: 'column',
  gap: 8,
});
const ContainerText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '16px 16px 0px 16px',
  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '8px 8px 0px 8px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '16px 16px 0px 16px',
  },
});
const StyledInformationCard = styled(Card)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  fontSize: 16,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 383,
    minHeight: 212,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 405,
  },
});

const TypographyDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '24px',
  fontSize: '15px',
  letterSpacing: ' 0.4px',
  color: theme.palette.isLight ? theme.palette.colors.slate[300] : theme.palette.colors.gray[500],
}));
const StyledTypographyDescription = styled(TypographyDescription)({});

const Label = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 700,
  [theme.breakpoints.up('tablet_768')]: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 20,
    lineHeight: '24px',
  },
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const LineStyledBorder = styled('div')(({ theme }) => ({
  display: 'none',
  width: '100%',
  borderTop: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    marginTop: 4,
    marginBottom: 4,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    marginTop: 16,
    marginBottom: 4,
  },
}));
