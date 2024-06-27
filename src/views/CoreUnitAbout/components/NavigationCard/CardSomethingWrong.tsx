import { Typography, styled } from '@mui/material';
import theme from '@ses/styles/theme/themes';
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
    <Label>Something Wrong on this Page?</Label>
    <StyledInformationCard>
      <ContainerText>
        <TypographyDescription>{title}</TypographyDescription>
        <TypographyDescription>We are still collecting all the relevant information.</TypographyDescription>
        <StyledTypographyDescription>
          If you see something that needs updating, don't hesitate to contact us.
        </StyledTypographyDescription>
      </ContainerText>
      <div>{children}</div>
    </StyledInformationCard>
  </Container>
);

export default CardSomethingWrong;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',

  flexDirection: 'column',
  gap: 16,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
}));
const ContainerText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '16px 16px 16px 16px',
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '8px 8px 8px 8px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 16px 16px 16px',
  },
});
const StyledInformationCard = styled(Card)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  fontSize: 16,
}));

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
