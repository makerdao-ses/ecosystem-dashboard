import React from 'react';
import styled from '@emotion/styled';
import { Avatar, Chip } from '@mui/material';
import { getColorForString } from '../../../core/utils/color-utils';
import { getTwoInitials } from '../../../core/utils/string-utils';
import { DateTime } from 'luxon';

export enum CuStatusEnum {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  RFC = 'RFC',
  FormalSubmission = 'Formal Submission'
}

interface CutableColumnOneProps {
  title: string,
  imageUrl?: string,
  status?: CuStatusEnum,
  statusModified?: Date,
}

export const CutableColumnOne = (props: CutableColumnOneProps) => {
  return <Container>
    <CircleContainer>
      {props.imageUrl && <Avatar style={{ width: '50px', height: '50px' }} src={props.imageUrl}/>}
      {!props.imageUrl && <Avatar sx={{ bgcolor: getColorForString(props.title) }} style={{ width: '50px', height: '50px' }}>{getTwoInitials(props.title) || 'CU'}</Avatar>}
    </CircleContainer>
    <Content>
      <Title>{props.title}</Title>
      <Row>
        {props.status && <Chip size={'small'} label={props.status} variant={'outlined'}/>}
        {props.statusModified && <SinceDate>Since {DateTime.fromJSDate(props.statusModified).toLocaleString(DateTime.DATE_MED)}</SinceDate>}
      </Row>
    </Content>
  </Container>;
};

export const Container = styled.div({
  display: 'flex',
  height: '100px',
  alignItems: 'stretch',
  boxSizing: 'border-box',
  fontFamily: 'Roboto, Sans-serif',
  padding: '13px',
  cursor: 'pointer'
});

export const CircleContainer = styled.div({
  marginRight: '10px',
});

export const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export const Title = styled.div({
  fontSize: '14px',
  alignItems: 'center',
  marginBottom: '10px',
  maxWidth: '200px',
});

export const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

export const SinceDate = styled.span({
  color: 'gray',
  fontSize: '12px',
  textDecoration: 'underline',
  marginLeft: '10px'
});
