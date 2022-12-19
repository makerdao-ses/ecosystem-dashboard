import React from 'react';
import styled from '@emotion/styled';
import GenericCommentCard from './generic-comment-card';
import lightTheme from '../../../../../styles/theme/light';

const NoComments: React.FC = () => {
  return (
    <GenericCommentCard opacity={0.5}>
      <Title>No Data Provided</Title>
    </GenericCommentCard>
  );
};

export default NoComments;

const Title = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '38px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: '#9FAFB9',
  padding: '77px 16px',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '32px',
  },
});
