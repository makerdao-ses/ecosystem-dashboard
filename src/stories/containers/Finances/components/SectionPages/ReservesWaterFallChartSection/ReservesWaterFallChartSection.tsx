import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import TitleToolTipArrowLink from '../../TitleToolTipArrowLink/TitleToolTipArrowLink';

interface Props {
  title: string;
}

const ReservesWaterFallChartSection: React.FC<Props> = ({ title }) => (
  <Container>
    <ContainerTitleFilter>
      <TitleToolTipArrowLink title={title} />
    </ContainerTitleFilter>
  </Container>
);

export default ReservesWaterFallChartSection;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

const ContainerTitleFilter = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 'revert',
  },
});
