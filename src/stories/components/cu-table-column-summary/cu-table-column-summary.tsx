import React from 'react';
import styled from '@emotion/styled';
import { Theme, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import ArrowLink from '../svg/ArrowLink';

interface CuTableColumnSummaryProps {
  title: string,
  imageUrl?: string,
  status?: CuStatusEnum,
  statusModified?: Date | null,
  onClick?: () => void,
  mipUrl?: string,
  code: string,
}

export const CuTableColumnSummary = (props: CuTableColumnSummaryProps) => {
  return <Container onClick={props.onClick}>
    <CircleContainer>
      <CircleAvatar
        width={'48px'}
        height={'48px'}
        name={props.title || 'Core Unit'}
        image={props.imageUrl}
        style={{ filter: 'drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))' }}/>
    </CircleContainer>
    <Content>
      <Title><Code>{props.code}</Code>{props.title}</Title>
      <Row>
        {props.status && <StatusChip status={props.status} />}
        {props.statusModified && <CustomPopover
          id={'mouse-over-popover-goto'}
          title={'Go to MIPs Portal'}
        >
          {props.statusModified && <SinceDate href={props.mipUrl} target="_blank" onClick={(evt) => evt.stopPropagation()}>
            Since {DateTime.fromJSDate(props.statusModified).toFormat('d-MMM-y').toUpperCase()}
              <ArrowLink width={6} height={6}/>
          </SinceDate>}
        </CustomPopover>}
      </Row>
    </Content>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  height: '100px',
  alignItems: 'stretch',
  boxSizing: 'border-box',
  padding: '13px',
  cursor: 'pointer',
  minWidth: '300px'
});

const CircleContainer = styled.div({
  marginRight: '16px',
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Code = styled.span(({ theme }) => ({
  fontFamily: (theme as Theme).typography.fontFamily,
  fontWeight: 800,
  fontSize: '14px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  color: '#9FAFB9',
  marginRight: '5px',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: (theme as Theme).typography.fontFamily,
  fontSize: '14px',
  alignItems: 'center',
  marginBottom: '10px',
  maxWidth: '250px',
  fontWeight: 400,
  color: '#231536'
}));

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

const SinceDate = styled.a(({ theme }) => ({
  fontFamily: (theme as Theme).typography.fontFamily,
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#447AFB',
  textDecoration: 'none',
  marginLeft: '10px',
}));
