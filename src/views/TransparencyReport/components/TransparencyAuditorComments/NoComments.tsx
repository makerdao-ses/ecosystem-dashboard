import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import GenericCommentCard from './GenericCommentCard';

const NoComments: React.FC = () => (
  <GenericCommentCard opacity={0.5}>
    <Title>No Data Provided</Title>
  </GenericCommentCard>
);

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
