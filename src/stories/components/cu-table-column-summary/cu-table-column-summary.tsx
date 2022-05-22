import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Avatar, Typography } from '@mui/material';
import { getColorForString } from '../../../core/utils/color-utils';
import { getTwoInitials } from '../../../core/utils/string-utils';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';

interface CuTableColumnSummaryProps {
  title: string,
  imageUrl?: string,
  status?: CuStatusEnum,
  statusModified?: Date | null,
  code:string,
  handleClick: (code:string) => void,
}

export const CuTableColumnSummary = (props: CuTableColumnSummaryProps) => {
  const memoizedCallback = useCallback(
    () => {
      props.handleClick(props.code);
    },
    []
  );
  return <Container onClick={memoizedCallback}>
    <CircleContainer>
      {props.imageUrl && <Avatar style={{ width: '48px', height: '48px' }} src={props.imageUrl}/>}
      {!props.imageUrl && <Avatar sx={{ bgcolor: getColorForString(props.title) }} style={{
        width: '48px',
        height: '48px',
        fontSize: '1rem'
      }}>{getTwoInitials(props.title) || 'CU'}</Avatar>}
    </CircleContainer>
    <Content>
      <Title>{props.title}</Title>
      <Row>
        {props.status && <StatusChip status={props.status}/>}
        {props.statusModified && <CustomPopover
            id={'mouse-over-popover-goto'}
            title={'Go to MIPs Portal'}
        >
            <SinceDate>
                Since {DateTime.fromJSDate(props.statusModified).toFormat('d-MMM-y').toUpperCase()}
            </SinceDate>
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
  marginRight: '10px',
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled(Typography)({
  fontSize: '14px',
  alignItems: 'center',
  marginBottom: '10px',
  maxWidth: '200px',
});

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

const SinceDate = styled(Typography)({
  color: 'gray',
  fontSize: '12px',
  textDecoration: 'underline',
  marginLeft: '10px'
});
