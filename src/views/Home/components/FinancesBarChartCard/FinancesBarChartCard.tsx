import { Button, styled } from '@mui/material';

import BlueLinesIcon from 'public/assets/svg/blue_lines.svg';
import CircleIcon from 'public/assets/svg/circle.svg';

import Card from '@/components/Card/Card';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';

import { MAKERBURN_URL } from '@/config/externalUrls';
import { siteRoutes } from '@/config/routes';

import FinancesBarChart from '@/views/Home/components/FinancesBarChart/FinancesBarChart';
import useFinancesBarChart from '@/views/Home/components/FinancesBarChart/useFinancesBarChart';

import { financesBarChartCardData } from '@/views/Home/staticData';
import useFinancesBarChartCard from './useFinancesBarChartCard';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

interface StyledButtonProps extends ButtonProps {
  index: number;
}

const FinancesBarChartCard: FC = () => {
  useFinancesBarChart();
  useFinancesBarChartCard();

  return (
    <Container>
      <Title>{financesBarChartCardData.title}</Title>
      <FinancesBarChartContainer>
        <div>
          <AnnualProfit>
            <Text>{financesBarChartCardData.annualProfitLegendAsteriskText}</Text>
            <AnnualProfitLegend>
              <BlueLinesIcon />
              <Text>{financesBarChartCardData.annualProfitLegendTitle}</Text>
            </AnnualProfitLegend>
          </AnnualProfit>
          <FinancesBarChart />
        </div>
        <Legends>
          <RevenueLegend>
            <LegendTitle>{financesBarChartCardData.revenueLegendTitle}</LegendTitle>
            <RevenueLegendButtons>
              <LegendButton index={0} startIcon={<CircleIcon />} disableRipple>
                {financesBarChartCardData.revenueLegendButtonTexts[0]}
              </LegendButton>
              <LegendButton index={1} startIcon={<CircleIcon />} disableRipple>
                {financesBarChartCardData.revenueLegendButtonTexts[1]}
              </LegendButton>
              <LegendButton index={2} startIcon={<CircleIcon />} disableRipple>
                {financesBarChartCardData.revenueLegendButtonTexts[2]}
              </LegendButton>
            </RevenueLegendButtons>
          </RevenueLegend>
          <SpendingLegend>
            <LegendTitle>{financesBarChartCardData.spendingLegendTitle}</LegendTitle>
            <SpendingLegendButtons>
              <LegendButton index={3} startIcon={<CircleIcon />} disableRipple>
                {financesBarChartCardData.spendingLegendButtonTexts[0]}
              </LegendButton>
              <LegendButton index={4} startIcon={<CircleIcon />} disableRipple>
                {financesBarChartCardData.spendingLegendButtonTexts[1]}
              </LegendButton>
            </SpendingLegendButtons>
          </SpendingLegend>
        </Legends>
      </FinancesBarChartContainer>
      <LinkButtons>
        <StyledExternalLinkButton href={MAKERBURN_URL} wrapText={false}>
          {financesBarChartCardData.makerburnLinkText}
        </StyledExternalLinkButton>
        <InternalLinkButton
          href={siteRoutes.finances()}
          buttonType="primary"
          label={financesBarChartCardData.detailsLinkText}
        />
      </LinkButtons>
    </Container>
  );
};

export default FinancesBarChartCard;

const Container = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '8px 8px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 'fit-content',
    padding: '16px 16px 24px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 24px 24px',
  },
}));

const Title = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: 20,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontWeight: 800,
    fontSize: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontWeight: 700,
    fontSize: 20,
  },
}));

const FinancesBarChartContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'column',
    gap: 32,
    marginTop: 24,
  },
}));

const AnnualProfit = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 49,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 18,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 49,
  },
}));

const Text = styled('span')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.colors.slate[200],
}));

const AnnualProfitLegend = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

const Legends = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 14,

  [theme.breakpoints.up('tablet_768')]: {
    flex: '1 0 0',
    gap: 24,
    marginTop: 0,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    marginTop: 12,
  },
}));

const RevenueLegend = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '4px 8px',
  border: `1px solid ${theme.palette.colors.gray[200]}`,
  borderRadius: 12,

  [theme.breakpoints.up('tablet_768')]: {
    height: 129,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '16px 16px 16px 32px',
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
    border: 'none',

    [theme.breakpoints.up('desktop_1280')]: {
      height: 120,
      flex: '1 0 0',
      padding: '16px 24px',
    },
  },
}));

const SpendingLegend = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '4px 8px',
  border: `1px solid ${theme.palette.colors.gray[200]}`,
  borderRadius: 12,

  [theme.breakpoints.up('tablet_768')]: {
    height: 129,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '24px 16px 24px 32px',
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
    border: 'none',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    height: 120,
    flex: '1 0 0',
    padding: '16px 24px',
  },
}));

const LegendTitle = styled('span')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '24px',
  color: theme.palette.colors.gray[500],

  [theme.breakpoints.up('tablet_768')]: {
    position: 'absolute',
    left: 40,
    top: -10,
    padding: '0px 8px',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[500],
    backgroundColor: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[700],
    borderRadius: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    left: 16,
    top: -14,
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const RevenueLegendButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 24,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'column',
    gap: 8,
  },
}));

const SpendingLegendButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 24,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'column',
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
}));

const LegendButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'index',
})<StyledButtonProps>(({ theme, index }) => ({
  minWidth: 'auto',
  height: 18,
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '18px',
  textTransform: 'none',
  border: 'none',
  borderRadius: 0,
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.slate[50],
  backgroundColor: 'transparent',
  boxShadow: 'none',

  '& .MuiButton-startIcon': {
    width: 8,
    height: 8,
    marginLeft: 0,
    marginRight: 8,

    '& > svg circle': {
      ...(index === 0 && {
        fill: theme.palette.isLight ? theme.palette.colors.green[300] : theme.palette.colors.green[500],
      }),
      ...(index === 1 && {
        fill: theme.palette.isLight ? theme.palette.colors.green[500] : theme.palette.colors.green[700],
      }),
      ...(index === 2 && {
        fill: theme.palette.isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900],
      }),
      ...(index === 3 && {
        fill: theme.palette.isLight ? theme.palette.colors.red[500] : theme.palette.colors.red[700],
      }),
      ...(index === 4 && {
        fill: theme.palette.isLight ? theme.palette.colors.red[700] : theme.palette.colors.red[900],
      }),
    },
  },

  '&:hover, &:active, &:focus': {
    backgroundColor: 'transparent',
  },

  [theme.breakpoints.up('tablet_768')]: {
    width: 'fit-content',
    height: 22,
    fontSize: 14,
    lineHeight: '22px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    height: 24,
    fontSize: 16,
    lineHeight: '24px',

    '& .MuiButton-startIcon': {
      transform: 'scale(1.5)',
    },
  },
}));

const LinkButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 24,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 24,
  },
}));

const StyledExternalLinkButton = styled(ExternalLinkButton)(() => ({
  padding: '4px 16px 4px 24px',
  fontSize: 16,
}));
