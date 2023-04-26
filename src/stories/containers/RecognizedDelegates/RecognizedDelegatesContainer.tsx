import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';

import DelegateExpenseBreakdown from './DelegateExpenseBreakdown/DelegateExpenseBreakdown';
import DelegateExpenseTrend from './DelegateExpenseTrend';

import TotalAndKeyStatsComponent from './TotalAndKeyStatsComponent/TotalAndkeyStatusComponent';
import { useRecognizedDelegates } from './useRecognizedDelegates';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const RecognizedDelegatesContainer: React.FC = () => {
  const { isLight } = useThemeContext();
  const {
    totalDAI,
    arrayOfDelegate,
    mediaAnnual,
    percent,
    shadowTotal,
    totalDelegates,
    delegatesExpenses,
    otherExpenses,
    amountDelegates,
    expensesMock,
    startDate,
    endDate,
  } = useRecognizedDelegates();
  return (
    <ExtendedPageContainer isLight={isLight}>
      <Container>
        <Title isLight={isLight}>Recognized Delegates</Title>
        <TotalAndKeyStatsComponent
          amountDelegates={amountDelegates}
          totalDAI={totalDAI}
          start={startDate}
          end={endDate}
          annual={mediaAnnual}
          percent={percent}
          shadowTotal={shadowTotal}
          totalDelegates={totalDelegates}
          delegatesExpenses={delegatesExpenses}
          otherExpenses={otherExpenses}
        />
        <ContainerTrend>
          <DelegateExpenseTrend expenses={expensesMock} endDate={endDate} startDate={startDate} />
        </ContainerTrend>
        <ContainerBreakdown>
          <DelegateExpenseBreakdown arrayOfDelegate={arrayOfDelegate} totalDai={totalDAI} />
        </ContainerBreakdown>
        <ContainerButton>
          <Button
            href={siteRoutes.recognizedDelegateReport}
            label="View Expense Reports"
            buttonType={ButtonType.Primary}
          />
        </ContainerButton>
      </Container>
    </ExtendedPageContainer>
  );
};

export default RecognizedDelegatesContainer;

const Title = styled.h1<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 32,
  marginBottom: 32,
}));

const ExtendedPageContainer = styled(PageContainer)<WithIsLight>(({ isLight }) => ({
  backgroundColor: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
}));

const ContainerTrend = styled.div({
  marginTop: 40,
  marginBottom: 32,
  // TODO: Delete height when the chart is implemented
  height: 378,
  [lightTheme.breakpoints.up('table_834')]: {
    width: 690,
    margin: '0 auto',
    marginBottom: 62,
  },
});

const ContainerBreakdown = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

const ContainerButton = styled.div({
  margin: '46px auto 64px',
  width: 300,
  height: 48,
});

const Button = styled(LinkButton)({
  padding: '14.5px 64px',
  width: '100%',

  '& > div': {
    fontWeight: 500,
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    lineHeight: '19px',
  },
});
