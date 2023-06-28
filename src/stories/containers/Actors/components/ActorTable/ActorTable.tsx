import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ActorItem from '../ActorItem/ActorItem';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';

interface Props {
  actors: EcosystemActor[];
  sortClick?: (index: number) => void;
}

const ActorTable: React.FC<Props> = ({ actors }) => (
  <TableWrapper>
    <ContainerList>
      {actors?.map((actor) => (
        <ActorItem actor={actor} key={actor.name} />
      ))}
    </ContainerList>
  </TableWrapper>
);

const TableWrapper = styled.div({
  width: '100%',
  margin: '0 auto',
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 24,
    lineHeight: '29px',
  },
});

const ContainerList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  [lightTheme.breakpoints.up('table_834')]: {
    gap: 16,
  },
});

export default ActorTable;
