import React from 'react';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';
import { CircleAvatar } from '../circle-avatar/circle-avatar';
import { CustomLink } from '../custom-link/custom-link';

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
        style={{ filter: 'drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))' }}
      />
    </CircleContainer>
    <Content>
      <TitleWrapper>
        <Code>{props.code}</Code>
        <Title>{props.title}</Title>
      </TitleWrapper>
      <Row>
        {props.status && <StatusChip status={props.status} />}
        {props.statusModified && <CustomPopover
          id={'mouse-over-popover-goto'}
          title={'Go to MIPs Portal'}
        >
          {props.statusModified && <CustomLink
              href={props.mipUrl}
              style={{ marginLeft: '4px' }}
              target="_blank">
            {`Since ${DateTime.fromJSDate(props.statusModified).toFormat('d-MMM-y').toUpperCase()}`}
          </CustomLink>}
        </CustomPopover>}
      </Row>
    </Content>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
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

const Code = styled.span(({
  fontFamily: 'SF Pro Display, sans-serif',
  fontWeight: 800,
  fontSize: '14px',
  letterSpacing: '0.3px',
  textTransform: 'uppercase',
  color: '#9FAFB9',
  marginRight: '5px',
}));

const TitleWrapper = styled.div({
  display: 'flex'
});

const Title = styled.div(({
  fontFamily: 'FT Base, sans-serif',
  fontSize: '16px',
  alignItems: 'center',
  maxWidth: '200px',
  fontWeight: 400,
  color: '#231536',
  lineHeight: '19px',
}));

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  marginTop: '8px',
});

const SinceDate = styled.a({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#447AFB',
  textDecoration: 'none',
  marginLeft: '4px',
});
