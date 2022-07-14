import React from 'react';
import styled from '@emotion/styled';
import { Download } from '../../../components/svg/download';
import { AuditStatusChip } from '../../../components/audit-status-chip/audit-status-chip';
import { AuditStatusEnum } from '../../../../core/enums/audit-status.enum';
import { useTransparencyAuditMvvm } from './transparency-audit.mvvm';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';

interface TransparencyAuditProps {
  budgetStatement?: BudgetStatementDto;
}

export const TransparencyAudit = (props: TransparencyAuditProps) => {
  const { getDate, getTime, getFilenameFromUrl } = useTransparencyAuditMvvm();

  return <Container>
    {props.budgetStatement?.auditReport?.map(item => <Box key={item.reportUrl}>
      <Title>
        <DateAndTime>
          <span>{getDate(item.timestamp)}</span>
          <span>{getTime(item.timestamp)}</span>
        </DateAndTime>
        <Text>
          <span>Status</span>
          <AuditStatusChip status={item.auditStatus as AuditStatusEnum}/>
        </Text>
      </Title>
      <DownloadText onClick={() => item.reportUrl && window.open(item.reportUrl, '_blank')}>
        <span>{getFilenameFromUrl(item.reportUrl)}</span>
        <Download/>
      </DownloadText>
    </Box>)}
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
});

const Title = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Box = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  padding: '16px',
  background: '#FFFFFF',
  boxShadow: '0px 20px 40px -40px rgba(219, 227, 237, .4), 0px 1px 3px rgba(190, 190, 190, .4);',
  borderRadius: '6px',
  height: '118px',
  width: '100%',
  maxWidth: '560px',
  marginBottom: '32px'
});

const DateAndTime = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#9FAFB9',
  '> span': {
    marginRight: '16px'
  }
});

const DownloadText = styled.a({
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#447AFB',
  cursor: 'pointer',
  '> span': {
    marginRight: '14px'
  }
});

const Text = styled.div({
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 400,
  fontSize: '12px',
  color: '#231536',
  '> span': {
    marginRight: '8px'
  }
});
