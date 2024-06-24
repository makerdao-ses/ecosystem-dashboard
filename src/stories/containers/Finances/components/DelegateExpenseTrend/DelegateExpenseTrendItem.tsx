import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import ArrowNavigationForCards from '@ses/components/svg/ArrowNavigationForCards';
import MultiUsers from '@ses/components/svg/MultiUsers';
import MultiUsersMobile from '@ses/components/svg/MultiUsersMobile';
import { siteRoutes } from '@ses/config/routes';
import GenericDelegateCard from '@ses/containers/RecognizedDelegates/components/GenericDelegateCard';
import ExpenseReportStatusIndicator from '@ses/containers/TransparencyReport/components/ExpenseReportStatusIndicator/ExpenseReportStatusIndicator';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { capitalizeSentence } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
import { DateTime } from 'luxon';
import Link from 'next/link';
import React, { useMemo } from 'react';
import CircleAvatarWithIcon from '@/components/CircleAvatar/CircleAvatarWithIcon';
import { AllowedOwnerType } from '@/views/BudgetStatement/types';
import LastModifiedActorCoreUnit from '@/views/CoreUnits/LastModifiedActorCoreUnit/LastModifiedActorCoreUnit';
import { getLastActivityDate } from '../../utils/utils';
import ViewButton from '../ViewButton/ViewButton';
import type { AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  budget: BudgetStatement;
  selectedMetric: AnalyticMetric;
  now?: DateTime;
}

const DelegateExpenseTrendItem: React.FC<Props> = ({ budget, selectedMetric, now = DateTime.now() }) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const { isLight } = useThemeContext();
  const lastModified = getLastActivityDate(budget);
  const lastModifiedRelative = capitalizeSentence(
    lastModified?.toRelative({
      base: now,
      unit: 'days',
    }) ?? ''
  );
  const reportMonth = DateTime.fromFormat(budget.month, 'yyyy-LL-dd')?.toFormat('LLL yyyy');
  const isCoreUnitElement = budget.ownerType === 'CoreUnit';

  const link = useMemo(() => {
    switch (budget.ownerType) {
      case 'CoreUnit':
        return `${siteRoutes.coreUnitReports(budget.owner.shortCode)}?viewMonth=${DateTime.fromFormat(
          budget.month,
          'yyyy-LL-dd'
        ).toFormat('LLLyyyy')}`;

      case 'Delegates':
        return `${siteRoutes.recognizedDelegateReport}?viewMonth=${DateTime.fromFormat(
          budget.month,
          'yyyy-LL-dd'
        ).toFormat('LLLyyyy')}`;
      case 'SpecialPurposeFund':
        return `${siteRoutes.budgetStatements(AllowedOwnerType.SPFS)}?viewMonth=${DateTime.fromFormat(
          budget.month,
          'yyyy-LL-dd'
        ).toFormat('LLLyyyy')}`;
      case 'AlignedDelegates':
        return `${siteRoutes.budgetStatements(AllowedOwnerType.ALIGNED_DELEGATES)}?viewMonth=${DateTime.fromFormat(
          budget.month,
          'yyyy-LL-dd'
        ).toFormat('LLLyyyy')}`;
      case 'Keepers':
        return `${siteRoutes.budgetStatements(AllowedOwnerType.KEEPERS)}?viewMonth=${DateTime.fromFormat(
          budget.month,
          'yyyy-LL-dd'
        ).toFormat('LLLyyyy')}`;
    }

    // ecosystem actor by default
    return `${siteRoutes.ecosystemActorReports(budget.owner.shortCode)}?viewMonth=${DateTime.fromFormat(
      budget.month,
      'yyyy-LL-dd'
    ).toFormat('LLLyyyy')}`;
  }, [budget]);

  const value = useMemo(() => {
    switch (selectedMetric) {
      case 'Actuals':
        return budget.actualExpenses ?? 0;
      case 'Forecast':
        return budget.forecastExpenses ?? 0;
      case 'PaymentsOnChain':
        return budget.paymentsOnChain ?? 0;
      case 'ProtocolNetOutflow':
        return budget.netProtocolOutflow ?? 0;
    }
    return NaN;
  }, [budget, selectedMetric]);

  const metricLabel = useMemo(() => {
    switch (selectedMetric) {
      case 'PaymentsOnChain':
        return 'Net On-Chain';
      case 'ProtocolNetOutflow':
        return 'Protocol Outflow';
    }
    return selectedMetric;
  }, [selectedMetric]);

  const elementInDesk = (
    <ContainerInside isLight={isLight}>
      <ContainerDesk>
        <ContainerMobile>
          <ActorLabel isLight={isLight}>Ecosystem Actor</ActorLabel>
          <ContainerIconName>
            <CircleAvatarWithIconStyled
              isCoreUnit={isCoreUnitElement}
              name="Image Core Unit or Delegate"
              icon={isMobile ? <MultiUsersMobile /> : <MultiUsers />}
              image={budget.owner.icon}
            />
            <ContainerStatus>
              <TitleCode>
                <Code isLight={isLight}>{budget.owner.shortCode}</Code>
                <Title isLight={isLight}>{budget.owner.name}</Title>
              </TitleCode>
              <StatusMobile>
                <ExpenseReportStatusIndicatorMobile budgetStatus={budget.status} showCTA={false} />
              </StatusMobile>
            </ContainerStatus>
          </ContainerIconName>

          <ArrowMobile isLight={isLight}>
            <ArrowNavigationForCards width={32} height={32} fill={isLight ? '#434358' : '#B7A6CD'} />
          </ArrowMobile>
        </ContainerMobile>

        <ReportingMonth>
          <LabelDescription isLight={isLight}>Reporting Month</LabelDescription>
          <Date isLight={isLight}>{reportMonth}</Date>
        </ReportingMonth>
        <TotalActualsTable>
          <LabelDescription isLight={isLight}>{metricLabel}</LabelDescription>
          <TotalNumber isLight={isLight}>{usLocalizedNumber(value)} DAI</TotalNumber>
        </TotalActualsTable>
        <ContainerStatusTable>
          <StatusTable>
            <LabelStatus isLight={isLight}>Status</LabelStatus>
            <ExpenseReportStatusIndicatorTable budgetStatus={budget.status} showCTA={false} />
          </StatusTable>
          <ContainerArrow isLight={isLight}>
            <ArrowNavigationForCards width={32} height={32} fill={isLight ? '#434358' : '#B7A6CD'} />
          </ContainerArrow>
        </ContainerStatusTable>
        <LastModifiedDesk>
          <LabelLastModifiedText isLight={isLight}>{lastModifiedRelative}</LabelLastModifiedText>
        </LastModifiedDesk>
        <ViewContainer>
          <ViewButton title="View" />
        </ViewContainer>
      </ContainerDesk>
      <Divider isLight={isLight} />
      <ContainerCardMobile>
        <ContainerReportingMobile>
          <ReportingMobile>
            <LabelTagMobile isLight={isLight}>Reporting Month</LabelTagMobile>
            <Date isLight={isLight}>{reportMonth}</Date>
          </ReportingMobile>
        </ContainerReportingMobile>

        <TotalContainerMobile>
          <Total isLight={isLight}>{metricLabel}</Total>
          <TotalNumber isLight={isLight}>{usLocalizedNumber(value)} DAI</TotalNumber>
        </TotalContainerMobile>
      </ContainerCardMobile>
    </ContainerInside>
  );

  return (
    <ExtendedGenericDelegate isLight={isLight}>
      <Link href={link || ''} legacyBehavior passHref target="_blank">
        <a>{elementInDesk}</a>
      </Link>

      <FooterMobile isLight={isLight}>
        <LastModifiedStyled href={link || '#'} date={lastModified} />
      </FooterMobile>
    </ExtendedGenericDelegate>
  );
};

export default DelegateExpenseTrendItem;

const ExtendedGenericDelegate = styled(GenericDelegateCard)<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  flex: 1,

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: 0,
    gap: 12,
    flexDirection: 'column',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    minHeight: 'revert',
    gap: 'revert',
  },
}));

const CircleAvatarWithIconStyled = styled(CircleAvatarWithIcon)<{ isCoreUnit: boolean }>(({ isCoreUnit }) => ({
  width: 42,
  height: 42,
  minWidth: 42,
  minHeight: 42,
  marginTop: 4,

  '& div svg path': {
    fill: isCoreUnit ? '#1AAB9B' : '#447AFB',
  },
  '& div svg rect': {
    stroke: isCoreUnit ? '#6EDBD0' : '#85A9FF',
  },
  '& div svg path:nth-of-type(3)': {
    fill: '#fff',
  },
  '& div svg path:nth-of-type(4)': {
    fill: '#fff',
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
    width: 34,
    height: 34,
    minWidth: 34,
    minHeight: 34,
  },
}));

const ContainerInside = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '16px 16px 8px',
  cursor: 'pointer',
  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '8px 8px 0px 16px',
    flexDirection: 'row',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '16px',
    ':hover': {
      backgroundColor: isLight ? '#ECF1F3' : '#1E2C37',
    },
  },
}));

const ContainerIconName = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  height: 51,
  minHeight: 51,
  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 'unset',
    alignItems: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 16,
    minHeight: 'revert',
  },
});

const TitleCode = styled.div({
  display: 'flex',
  fontFamily: 'Inter, sans-serif',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  width: 200,
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 237,
    gap: 6,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 4,
    width: 256,
    marginTop: 'revert',
  },
});

const Code = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#9FAFB9' : '#546978',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 800,
  lineHeight: 'normal',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
}));
const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#FFF',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const Date = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#EDEFFF',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  marginLeft: -2,
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginLeft: 'revert',
  },
}));

const Divider = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 11,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  borderBottom: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  opacity: 0.5,
  marginTop: 16,
  marginBottom: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const TotalContainerMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});

const Total = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#708390' : '#EDEFFF',
  fontSize: 11,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
}));

const TotalNumber = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#EDEFFF',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
}));

const FooterMobile = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  width: '100%',
  '& > div': {
    flex: 1,
  },
  '& > a': {
    flex: 1,
  },
  ':hover': {
    background: isLight ? '#F5F6FB' : '#1E2C37',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const ActorLabel = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    color: isLight ? '#9FAFB9' : '#D2D4EF',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    width: '100%',
  },
}));

const ReportingMonth = styled.div({
  display: 'none',
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 19,
    marginLeft: 0,
    minWidth: 130,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',

    flexDirection: 'column',
    justifyContent: 'center',
    gap: 0,
    marginLeft: 0,
    width: 120,
    marginTop: 1,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: -20,
    marginTop: 'revert',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: -40,
  },
});

const TotalActualsTable = styled.div({
  display: 'none',
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 19,
    marginLeft: -6,
    minWidth: 120,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 0,
    marginLeft: 0,
    width: 130,
    marginTop: 1,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: 2,
    marginTop: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: 20,
  },
});

const StatusTable = styled.div({
  display: 'none',
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    '& > div:nth-last-of-type(1)': {
      marginLeft: 0,
    },
    height: 63,

    gap: 14,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',

    flexDirection: 'column',
    justifyContent: 'center',

    gap: 0,

    '& > div:nth-last-of-type(1)': {
      marginLeft: 0,
    },

    minWidth: 120,
    marginLeft: 0,
    marginTop: 1,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 150,
    marginLeft: 0,
    paddingLeft: 0,
    marginTop: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: 10,

    '& div:nth-of-type(2)': {
      marginLeft: 0,
    },
  },
});

const LabelDescription = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    color: isLight ? '#9FAFB9' : '#D2D4EF',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    marginLeft: -2,
  },
}));
const LabelStatus = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    color: isLight ? '#9FAFB9' : '#D2D4EF',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
  },
}));

const LastModifiedDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    width: 160,
    marginLeft: 0,
    marginTop: 1,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 'revert',
    paddingLeft: 0,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 20,
  },
});

const ViewContainer = styled.div({
  display: 'none',
  [lightTheme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',

    justifyContent: 'flex-end',
    marginRight: -2,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    display: 'flex',

    marginTop: 2,
  },
});

const ContainerDesk = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    justifyContent: 'space-between',
    height: 38,
  },
});

const LabelLastModifiedText = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#EDEFFF',
  display: 'flex',
  alignItems: 'center',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
}));

const ContainerArrow = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isLight ? '#F9FAFF' : 'rgba(60, 62, 100, 0.50)',
    borderRadius: 6,
    width: 48,
    height: 63,
    boxShadow: isLight ? '0px 2px 3px 0px #DEE1F4' : '0px 2px 3px 0px #040C27',
  },
}));

const ArrowMobile = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  width: 32,
  height: 32,
  backgroundColor: isLight ? '#F0F2FA' : 'rgba(60, 62, 100, 0.50)',
  boxShadow: isLight ? '0px 2px 3px 0px #DEE1F4' : ' 0px 2px 3px 0px #040C27;',
  marginTop: 2,
  borderRadius: 6,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const ContainerMobile = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',

  alignItems: 'center',
  [lightTheme.breakpoints.up('tablet_768')]: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 'unset',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 'revert',
  },
});

const ContainerCardMobile = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,

  paddingLeft: 32,
  paddingRight: 42,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});

const ContainerReportingMobile = styled.div({
  gap: 16,
  display: 'flex',
  flexDirection: 'column',
});

const LabelTagMobile = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  color: isLight ? '#708390' : '#D2D4EF',
  fontSize: 11,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  [lightTheme.breakpoints.up('tablet_768')]: {
    color: isLight ? '#9FAFB9' : '#D2D4EF',
  },
}));

const ExpenseReportStatusIndicatorMobile = styled(ExpenseReportStatusIndicator)({
  marginTop: 0,
});
const ExpenseReportStatusIndicatorTable = styled(ExpenseReportStatusIndicator)({
  marginTop: 0,
  [lightTheme.breakpoints.up('tablet_768')]: {
    '& > div': {
      marginLeft: 0,
    },
  },
});

const StatusMobile = styled.div({
  display: 'flex',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});

const ContainerStatus = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});
const ContainerStatusTable = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 22,
  marginLeft: -2,
});
const ReportingMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const LastModifiedStyled = styled(LastModifiedActorCoreUnit)({
  '& > div:first-of-type': {
    color: '#9FAFB9',
    marginTop: 0,
  },
  '& > div:last-of-type': {
    color: '#708390',
  },
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    padding: '3px 10px',
    minHeight: 25,
  },
});
