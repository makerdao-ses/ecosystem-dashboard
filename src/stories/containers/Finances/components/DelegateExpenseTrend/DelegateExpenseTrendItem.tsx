import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import CircleAvatarWithIcon from '@ses/components/CircleAvatar/CircleAvatarWithIcon';

import ArrowNavigationForCards from '@ses/components/svg/ArrowNavigationForCards';
import MultiUsers from '@ses/components/svg/MultiUsers';
import MultiUsersMobile from '@ses/components/svg/MultiUsersMobile';
import ActorLastModified from '@ses/containers/Actors/components/ActorLastModified/ActorLastModified';
import GenericDelegateCard from '@ses/containers/RecognizedDelegates/components/GenericDelegateCard';
import ExpenseReportStatusIndicator from '@ses/containers/TransparencyReport/components/ExpenseReportStatusIndicator/ExpenseReportStatusIndicator';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { capitalizeSentence } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';

import { DateTime } from 'luxon';
import Link from 'next/link';
import React from 'react';

import { getExpenseMonthWithData, getShowCTA, getStatus, isCoreUnit } from '../../utils/utils';
import ViewButton from '../ViewButton/ViewButton';
import type { MomentDataItem } from '../../utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  link?: string;
  expenseReport: MomentDataItem;
  selectedMetric: string;
  now?: DateTime;
}

const DelegateExpenseTrendItem: React.FC<Props> = ({ link, expenseReport, selectedMetric, now = DateTime.now() }) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const { isLight } = useThemeContext();
  const getDateExpenseModified = getExpenseMonthWithData(expenseReport);
  const lasModified = capitalizeSentence(
    getDateExpenseModified?.toRelative({
      base: now,
      unit: 'days',
    }) ?? ''
  );

  const isCoreUnitElement = isCoreUnit(expenseReport);

  const elementInDesk = (
    <ContainerInside isLight={isLight}>
      <ContainerDesk>
        <ContainerMobile>
          <ActorLabel isLight={isLight}>Ecosystem Actor</ActorLabel>
          <ContainerIconName>
            <CircleAvatarWithIconStyled
              isCoreUnit={isCoreUnitElement}
              name="Image Core Unit or Delegate"
              width={isMobile ? '42px' : '34px'}
              height={isMobile ? '42px' : '34px'}
              icon={isMobile ? <MultiUsersMobile /> : <MultiUsers />}
              image={expenseReport.image}
            />
            <ContainerStatus>
              <TitleCode>
                <Code isLight={isLight}>{expenseReport.shortCode}</Code>
                <Title isLight={isLight}>{expenseReport.name}</Title>
              </TitleCode>
              <StatusMobile>
                <ExpenseReportStatusIndicatorMobile
                  budgetStatus={getStatus(expenseReport.budgetStatements) || BudgetStatus.Draft}
                  showCTA={getShowCTA()}
                />
              </StatusMobile>
            </ContainerStatus>
          </ContainerIconName>

          <ArrowMobile isLight={isLight}>
            <ArrowNavigationForCards width={32} height={32} fill={isLight ? '#434358' : '#B7A6CD'} />
          </ArrowMobile>
        </ContainerMobile>

        <ReportingMonth>
          <LabelDescription isLight={isLight}>Reporting Month</LabelDescription>
          <Date isLight={isLight}>{expenseReport.reportMonth?.toFormat('LLLL yyyy')}</Date>
        </ReportingMonth>
        <TotalActualsTable>
          <LabelDescription isLight={isLight}>{selectedMetric}</LabelDescription>
          <TotalNumber isLight={isLight}>{`${
            expenseReport.totalActuals.toLocaleString('es-US') || '0'
          } DAI`}</TotalNumber>
        </TotalActualsTable>
        <ContainerStatusTable>
          <StatusTable>
            <LabelStatus isLight={isLight}>Status</LabelStatus>
            <ExpenseReportStatusIndicatorTable
              budgetStatus={getStatus(expenseReport.budgetStatements)}
              showCTA={getShowCTA()}
            />
          </StatusTable>
          <ContainerArrow isLight={isLight}>
            <ArrowNavigationForCards width={32} height={32} fill={isLight ? '#434358' : '#B7A6CD'} />
          </ContainerArrow>
        </ContainerStatusTable>
        <LastModifiedDesk>
          <LabelLastModifiedText isLight={isLight}>{lasModified}</LabelLastModifiedText>
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
            <Date isLight={isLight}>{expenseReport.reportMonth?.toFormat('LLLL yyyy')}</Date>
          </ReportingMobile>
        </ContainerReportingMobile>

        <TotalContainerMobile>
          <Total isLight={isLight}>{selectedMetric}</Total>
          <TotalNumber isLight={isLight}>
            {`${expenseReport.totalActuals.toLocaleString('es-US') || '0'} DAI`}
          </TotalNumber>
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
        <ActorLastModifiedStyled href={link || '#'} date={getDateExpenseModified} />
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
    minHeight: 113,
    flexDirection: 'column',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    minHeight: 'revert',
  },
}));

const CircleAvatarWithIconStyled = styled(CircleAvatarWithIcon)<{ isCoreUnit: boolean }>(({ isCoreUnit }) => ({
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
  },
}));

const ContainerInside = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '16px 16px 8px',
  cursor: 'pointer',
  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '8px 8px 16px 16px',
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
  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 'unset',
    alignItems: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
});

const TitleCode = styled.div({
  display: 'flex',
  fontFamily: 'Inter, sans-serif',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 237,

    gap: 6,
    marginTop: 4,
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
  width: 175,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    width: 171,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 180,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 224,
  },
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
    marginBottom: 8,
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
    marginTop: 3,
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
    width: 250,
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
  paddingRight: 32,
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
  alignItems: 'center',
  marginLeft: -2,
});
const ReportingMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const ActorLastModifiedStyled = styled(ActorLastModified)({
  '& > div:first-of-type': {
    color: '#9FAFB9',
    marginTop: 0,
  },
  '& > div:last-of-type': {
    color: '#708390',
  },
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    padding: '2px 10px',
    height: 26,
    '& > div:last-of-type': {
      marginTop: -4,
    },
  },
});
