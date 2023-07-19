import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ActorsHeaderTable from '../ActorHeader/ActorsHeaderTable';
import ActorItem from '../ActorItem/ActorItem';
import type { ActorTableHeader } from '../ActorHeader/ActorsHeaderTable';
import type { Team } from '@ses/core/models/interfaces/team';

interface Props {
  actors: Team[];
  sortClick?: (index: number) => void;
  columns: ActorTableHeader[];
}

const ActorTable: React.FC<Props> = ({ actors, columns, sortClick }) => (
  <TableWrapper>
    <ContainerList>
      <ActorsHeaderTable columns={columns} sortClick={sortClick} />
      {actors?.map((actor) => (
        <ActorItem actor={actor} key={actor.code} />
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
