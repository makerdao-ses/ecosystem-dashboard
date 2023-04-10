import styled from '@emotion/styled';
import React from 'react';
import Range from './Range';
import TotalDaiExpense from './TotalDaiExpense';

interface Props {
  totalDAI: string;
  start: string;
  end: string;
}

export const TotalAndKeyStatsComponent: React.FC<Props> = ({ totalDAI, start, end }) => (
  <BackgroundContainer>
    <DescriptionContainer>
      <ContainerTotalDai>
        <TotalDaiExpense totalDAI={totalDAI} />
      </ContainerTotalDai>
    </DescriptionContainer>
    <Range start={start} end={end} />
  </BackgroundContainer>
);

export default TotalAndKeyStatsComponent;

const BackgroundContainer = styled.div({
  background: '#F6F8F9',

  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '6px',
  padding: '24px 16px',
  maxWidth: 343,
});
const DescriptionContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  margin: '0 auto',
});

const ContainerTotalDai = styled.div({
  marginBottom: 16,
});
