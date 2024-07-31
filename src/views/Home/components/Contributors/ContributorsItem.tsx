import { styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import type { Team } from '@/core/models/interfaces/team';
import Profile from './Profile';
import type { FC } from 'react';

interface Props {
  contributors: Team;
}
const ContributorsItem: FC<Props> = ({ contributors }) => (
  <Container>
    <div>
      <></>
    </div>
    <Profile contributor={contributors} />
    <Line />
  </Container>
);

export default ContributorsItem;

const Container = styled(Card)({
  display: 'flex',
  // flexDirection: 'column',
  gap: 8,
  width: '100%',
  // height: 'fit-content',
});
const Line = styled('div')(({ theme }) => ({
  display: 'flex',
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : 'red'}`,
}));
