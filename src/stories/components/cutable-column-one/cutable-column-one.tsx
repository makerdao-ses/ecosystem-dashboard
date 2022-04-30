import React from 'react';
import styled from '@emotion/styled';
import { Chip } from '@mui/material';

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
    <CircleAvatar/>
    <Content>
      <Title>{props.title}</Title>
      <Row>
        {props.status && <Chip size={'small'} label={CuStatusEnum.Accepted} variant={'outlined'}/>}
        {props.statusModified && <StyledLink>{props.statusModified.toLocaleString()}</StyledLink>}
      </Row>
    </Content>
  </Container>;
};

export const Container = styled.div({
  display: 'flex',
  maxWidth: '300px',
  height: '100px',
  alignItems: 'stretch',
  boxSizing: 'border-box',
  fontFamily: 'Roboto, Sans-serif',
  padding: '13px',
  cursor: 'pointer'
});

export const CircleAvatar = styled.div({
  borderRadius: '50%',
  height: '50px',
  width: '50px',
  background: 'gray',
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
});

export const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

export const StyledLink = styled.span({
  color: 'gray',
  fontSize: '12px',
  textDecoration: 'underline',
  marginLeft: '10px'
});
