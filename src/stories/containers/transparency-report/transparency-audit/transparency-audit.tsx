import React from 'react';
import styled from '@emotion/styled';
import { Download } from '../../../components/svg/download';
import { AuditStatusChip } from '../../../components/audit-status-chip/audit-status-chip';
import { AuditStatusEnum } from '../../../../core/enums/audit-status.enum';
import { useTransparencyAuditMvvm } from './transparency-audit.mvvm';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { TransparencyEmptyAudit } from '../placeholders/transparenct-empty-audit';

interface TransparencyAuditProps {
  budgetStatement?: BudgetStatementDto;
}

export const TransparencyAudit = (props: TransparencyAuditProps) => {
  const { getDate, getTime, getFilenameFromUrl } = useTransparencyAuditMvvm();
  const isLight = useThemeContext().themeMode === 'light';

  return !props.budgetStatement?.auditReport?.length ? (
    <TransparencyEmptyAudit />
  ) : (
    <Container>
      {props.budgetStatement?.auditReport?.map((item) => (
        <Box key={item.reportUrl} isLight={isLight}>
          <DateAndTime>
            <span>{getDate(item.timestamp)}</span>
            <span>{getTime(item.timestamp)}</span>
          </DateAndTime>
          <Text isLight={isLight}>
            <span>Status</span>
            <AuditStatusChip status={item.auditStatus as AuditStatusEnum} />
          </Text>
          <DownloadText onClick={() => item.reportUrl && window.open(item.reportUrl, '_blank')}>
            <span>{getFilenameFromUrl(item.reportUrl)}</span>
            <Download />
          </DownloadText>
        </Box>
      ))}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

const Box = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'grid',
  gridTemplateAreas: `
    "status"
    "download"
    "date"
    `,
  padding: '16px',
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
  width: '100%',
  marginBottom: '32px',
  '@media (min-width: 834px)': {
    height: '118px',
    maxWidth: '560px',
    gridTemplateAreas: `
      "date . status"
      ". . ."
      "download . ."
      `,
  },
}));

const DateAndTime = styled.div({
  display: 'flex',
  gridArea: 'date',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#9FAFB9',
  alignSelf: 'center',
  justifySelf: 'center',
  '> span': {
    marginRight: '16px',
  },
  marginTop: '20px',
  paddingTop: '8px',
  borderTop: '1px solid #D4D9E1',
  width: '100%',
  justifyContent: 'center',
  '@media (min-width: 834px)': {
    justifySelf: 'flex-start',
    margin: 0,
    padding: 0,
    width: 'unset',
    border: 'none',
  },
});

const DownloadText = styled.a({
  gridArea: 'download',
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#447AFB',
  cursor: 'pointer',
  flex: 1,
  justifyContent: 'center',
  '> span': {
    marginRight: '14px',
  },
  '@media (min-width: 834px)': {
    justifyContent: 'flex-start',
  },
});

const Text = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  gridArea: 'status',
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '12px',
  color: isLight ? '#231536' : '#708390',
  justifyContent: 'center',
  marginBottom: '32px',
  '> span': {
    marginRight: '8px',
  },
  '@media (min-width: 834px)': {
    justifyContent: 'flex-end',
    justifySelf: 'flex-end',
    margin: 0,
  },
}));
