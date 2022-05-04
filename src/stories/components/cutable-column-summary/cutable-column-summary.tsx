import React from 'react';
import styled from '@emotion/styled';
import { Avatar, Chip } from '@mui/material';
import { getColorForString } from '../../../core/utils/color-utils';
import { getTwoInitials } from '../../../core/utils/string-utils';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';

export enum CuStatusEnum {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  RFC = 'RFC',
  FormalSubmission = 'Formal Submission'
}

interface CutableColumnSummaryProps {
  title: string,
  imageUrl?: string,
  status?: CuStatusEnum,
  statusModified?: Date,
}

export const CutableColumnSummary = (props: CutableColumnSummaryProps) => {
  return <Container>
    <CircleContainer>
      {props.imageUrl && <Avatar style={{ width: '48px', height: '48px' }} src={props.imageUrl}/>}
      {!props.imageUrl && <Avatar sx={{ bgcolor: getColorForString(props.title) }} style={{ width: '48px', height: '48px', fontSize: '1rem' }}>{getTwoInitials(props.title) || 'CU'}</Avatar>}
    </CircleContainer>
    <Content>
      <Title>{props.title}</Title>
      <Row>
        {props.status && <Chip size={'small'} sx={{ borderRadius: '8px', borderColor: '#25273D' }} label={props.status} variant={'outlined'}/>}
        {props.statusModified && <CustomPopover
               id={'mouse-over-popover-goto'}
               title={'Go to MIPs Portal'}
           >
               <SinceDate
                   href={'#'}
               >
                   Since {DateTime.fromJSDate(props.statusModified).toLocaleString(DateTime.DATE_MED)}
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
  fontFamily: 'Roboto, Sans-serif',
  padding: '13px',
  cursor: 'pointer'
});

const CircleContainer = styled.div({
  marginRight: '10px',
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled.div({
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

const SinceDate = styled.a({
  color: 'gray',
  fontSize: '12px',
  textDecoration: 'underline',
  marginLeft: '10px'
});
