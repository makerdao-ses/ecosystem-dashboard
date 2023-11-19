import styled from '@emotion/styled';
import React from 'react';
import SimpleBar from 'simplebar-react';

interface MaybeScrollableListProps extends React.PropsWithChildren {
  scrollable: boolean;
}

const MaybeScrollableList: React.FC<MaybeScrollableListProps> = ({ scrollable, children }) =>
  scrollable ? (
    <SimpleBar
      style={{
        height: 150,
      }}
      autoHide={false}
    >
      <ResultList>{children}</ResultList>
    </SimpleBar>
  ) : (
    <ResultList>{children}</ResultList>
  );

export default MaybeScrollableList;

const ResultList = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: 0,
  padding: 0,
  height: '100%',
});
