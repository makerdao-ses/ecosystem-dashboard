import React from 'react';
import styled from '@emotion/styled';
import { Download } from '../../../components/svg/download';
import { AuditStatusChip } from '../../../components/audit-status-chip/audit-status-chip';
import { AuditStatusEnum } from '../../../../core/enums/audit-status.enum';

export const TransparencyAudit = () => {
  return <Container>
    <Box>
      <Title>
        <DateAndTime>
          <span>25-NOV-2021</span>
          <span>19:31</span>
        </DateAndTime>
        <Text>
          <span>Status</span>
          <AuditStatusChip status={AuditStatusEnum.Escalated}/>
        </Text>
      </Title>
      <DownloadText>
        <span>SES_AUDIT_REPORT-05_14_2022.PDF</span>
        <Download/>
      </DownloadText>
    </Box>
    <Box>
      <Title>
        <DateAndTime>
          <span>25-NOV-2021</span>
          <span>19:31</span>
        </DateAndTime>
        <Text>
          <span>Status</span>
          <AuditStatusChip status={AuditStatusEnum.ActionRequired}/>
        </Text>
      </Title>
      <DownloadText>
        <span>SES_AUDIT_REPORT-05_14_2022.PDF</span>
        <Download/>
      </DownloadText>
    </Box>
    <Box>
      <Title>
        <DateAndTime>
          <span>25-NOV-2021</span>
          <span>19:31</span>
        </DateAndTime>
        <Text>
          <span>Status</span>
          <AuditStatusChip status={AuditStatusEnum.ApprovedWithComments}/>
        </Text>
      </Title>
      <DownloadText>
        <span>SES_AUDIT_REPORT-05_14_2022.PDF</span>
        <Download/>
      </DownloadText>
    </Box>
    <Box>
      <Title>
        <DateAndTime>
          <span>25-NOV-2021</span>
          <span>19:31</span>
        </DateAndTime>
        <Text>
          <span>Status</span>
          <AuditStatusChip status={AuditStatusEnum.Approved}/>
        </Text>
      </Title>
      <DownloadText>
        <span>SES_AUDIT_REPORT-05_14_2022.PDF</span>
        <Download/>
      </DownloadText>
    </Box>
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

const DownloadText = styled.div({
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#447AFB',
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
