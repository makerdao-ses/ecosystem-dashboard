import styled from '@emotion/styled';
import CircleAvatarWithIcon from '@ses/components/CircleAvatar/CircleAvatarWithIcon';

import ArrowNavigationForCards from '@ses/components/svg/ArrowNavigationForCards';
import MultiUsers from '@ses/components/svg/MultiUsers';
import MultiUsersMobile from '@ses/components/svg/MultiUsersMobile';
import ActorLastModified from '@ses/containers/Actors/components/ActorLastModified/ActorLastModified';
import GenericDelegateCard from '@ses/containers/RecognizedDelegates/components/GenericDelegateCard';
import ExpenseReportStatusIndicator from '@ses/containers/TransparencyReport/components/ExpenseReportStatusIndicator/ExpenseReportStatusIndicator';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import { BudgetStatus } from '@ses/core/models/interfaces/types';
import lightTheme from '@ses/styles/theme/light';

import React from 'react';

import ViewButton from '../ViewButton/ViewButton';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

interface Props {
  handleLinkToPage: () => void;
  link?: string;
  date: DateTime;
  isMobile: boolean;
}

const DelegateExpenseTrendItem: React.FC<Props> = ({ handleLinkToPage, link, date, isMobile }) => {
  const { isLight } = useThemeContext();

  return (
    <ExtendedGenericDelegate isLight={isLight}>
      <ContainerInside>
        <ContainerDesk>
          <ContainerMobile>
            <ActorLabel isLight={isLight}>Ecosystem Actor</ActorLabel>
            <ContainerIconName>
              <CircleAvatarWithIcon
                name="Alt"
                width={isMobile ? '42px' : '34px'}
                height={isMobile ? '42px' : '34px'}
                icon={isMobile ? <MultiUsersMobile /> : <MultiUsers />}
                image="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png"
              />
              <ContainerStatus>
                <TitleCode>
                  <Code isLight={isLight}>SES</Code>
                  <Title isLight={isLight}>Sustainable Ecosystem Scaling</Title>
                </TitleCode>
                <StatusMobile>
                  <ExpenseReportStatusIndicatorMobile budgetStatus={BudgetStatus.Draft} showCTA={false} />
                </StatusMobile>
              </ContainerStatus>
            </ContainerIconName>

            <ArrowMobile isLight={isLight}>
              <ArrowNavigationForCards width={32} height={32} />
            </ArrowMobile>
          </ContainerMobile>

          <ReportingMonth>
            <LabelDescription isLight={isLight}>Reporting Month</LabelDescription>
            <Date isLight={isLight}>March 2023</Date>
          </ReportingMonth>
          <TotalActualsTable>
            <LabelDescription isLight={isLight}>Total Actuals</LabelDescription>
            <Date isLight={isLight}>2,048,873 DAI</Date>
          </TotalActualsTable>
          <ContainerStatusTable>
            <StatusTable>
              <LabelStatus isLight={isLight}>Status</LabelStatus>
              <ExpenseReportStatusIndicatorTable budgetStatus={BudgetStatus.Draft} showCTA={false} />
            </StatusTable>
            <ContainerArrow isLight={isLight}>
              <ArrowNavigationForCards width={32} height={32} />
            </ContainerArrow>
          </ContainerStatusTable>
          <LastModifiedDesk>
            <LabelLastModifiedText isLight={isLight}>13 Days Ago</LabelLastModifiedText>
          </LastModifiedDesk>
          <ViewContainer>
            <ViewButton title="View" handleOnclick={handleLinkToPage} />
          </ViewContainer>
        </ContainerDesk>
        <Divider isLight={isLight} />
        <ContainerCardMobile>
          <ContainerReportingMobile>
            <ReportingMobile>
              <LabelTagMobile isLight={isLight}>Reporting Month</LabelTagMobile>
              <Date isLight={isLight}>March 2023</Date>
            </ReportingMobile>
          </ContainerReportingMobile>

          <TotalContainerMobile>
            <Total isLight={isLight}>Total Actuals</Total>
            <TotalNumber isLight={isLight}>2,048,873 DAI</TotalNumber>
          </TotalContainerMobile>
        </ContainerCardMobile>
      </ContainerInside>

      <FooterMobile>
        <ActorLastModified href={link || '#'} date={date} />
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

  [lightTheme.breakpoints.up('table_834')]: {
    padding: 0,
    flexDirection: 'column',
  },
}));

const ContainerInside = styled.div({
  padding: '16px 16px 8px',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '6px 8px 16px 16px',
    flexDirection: 'row',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '16px',
  },
});

const ContainerIconName = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  height: 51,

  [lightTheme.breakpoints.up('table_834')]: {
    height: 'unset',
    alignItems: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    gap: 16,
  },
});

const TitleCode = styled.div({
  display: 'flex',
  fontFamily: 'Inter, sans-serif',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});

const Code = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#9FAFB9' : 'red',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 800,
  lineHeight: 'normal',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
}));
const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  width: 175,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: 175,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 224,
  },
}));

const Date = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
}));

const Divider = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 11,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  borderBottom: `1px solid ${isLight ? '#D4D9E1' : 'red'}`,
  opacity: 0.5,
  marginTop: 16,
  marginBottom: 16,
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
}));

const TotalContainerMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',

  gap: 8,
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

const Total = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#708390' : 'red',
  fontSize: 11,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
}));

const TotalNumber = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
}));

const FooterMobile = styled.div({
  display: 'flex',
  width: '100%',
  '& > div': {
    flex: 1,
  },
  '& > a': {
    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
});

const ActorLabel = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    display: 'flex',
    marginBottom: 8,
    color: isLight ? '#9FAFB9' : 'red',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    width: '100%',
  },
}));

const ReportingMonth = styled.div({
  display: 'none',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 19,
    marginLeft: -28,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 0,
    marginLeft: -73,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: -110,
  },
});

const TotalActualsTable = styled.div({
  display: 'none',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 19,
    marginLeft: -4,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    gap: 0,
    marginLeft: -12,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: -12,
  },
});

const StatusTable = styled.div({
  display: 'none',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    display: 'flex',
    flexDirection: 'column',
    '& > div:nth-last-of-type(1)': {
      marginLeft: 0,
    },
    height: 63,

    gap: 14,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    marginLeft: -16,
    flexDirection: 'column',
    justifyContent: 'center',

    gap: 0,
    '& div:nth-of-type(2)': {
      marginLeft: 0,
    },
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: -22,
  },
});

const LabelDescription = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    display: 'flex',
    color: isLight ? '#9FAFB9' : 'red',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
  },
}));
const LabelStatus = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    display: 'flex',
    color: isLight ? '#9FAFB9' : 'red',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
  },
}));

const LastModifiedDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    marginRight: 24,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginRight: -12,
  },
});

const ViewContainer = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    marginTop: 2,
  },
});

const ContainerDesk = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    height: 38,
  },
});

const LabelLastModifiedText = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  display: 'flex',
  alignItems: 'center',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
}));

const ContainerArrow = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isLight ? '#F9FAFF' : 'red',
    borderRadius: '0px 6px 6px 0px',
    width: 48,
    height: 63,
    boxShadow: isLight ? '0px 2px 3px 0px #DEE1F4' : 'red',
  },
}));

const ArrowMobile = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  width: 32,
  height: 32,
  backgroundColor: isLight ? '#F0F2FA' : 'red',
  boxShadow: isLight ? '0px 2px 3px 0px #DEE1F4' : 'red',
  marginTop: 2,
  borderRadius: 6,
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
}));

const ContainerMobile = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',

  alignItems: 'center',
  [lightTheme.breakpoints.up('table_834')]: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 'unset',
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
  [lightTheme.breakpoints.up('table_834')]: {
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
  color: isLight ? '#9FAFB9' : 'red',
  fontSize: 11,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
}));

const ExpenseReportStatusIndicatorMobile = styled(ExpenseReportStatusIndicator)({
  marginTop: 0,
});
const ExpenseReportStatusIndicatorTable = styled(ExpenseReportStatusIndicator)({
  marginTop: 0,
  [lightTheme.breakpoints.up('table_834')]: {
    '& > div': {
      marginLeft: 0,
    },
  },
});

const StatusMobile = styled.div({
  display: 'flex',
  [lightTheme.breakpoints.up('table_834')]: {
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
