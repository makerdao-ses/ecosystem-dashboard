import styled from '@emotion/styled';
import ArrowSwiperNext from '@ses/components/svg/ArrowSwiperNext';
import ArrowSwiperPrevious from '@ses/components/svg/ArrowSwiperPrevious';
import React from 'react';

interface Props {
  onNext?: () => void;
  onPrevious?: () => void;
}

const SwiperNavigationButton: React.FC<Props> = ({ onNext, onPrevious }) => (
  <Container>
    <ContainerButtonLeft>
      <ArrowSwiperPrevious onClick={onPrevious} />
    </ContainerButtonLeft>
    <ContainerButtonRight>
      <ArrowSwiperNext onClick={onNext} />
    </ContainerButtonRight>
  </Container>
);

export default SwiperNavigationButton;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const ContainerButtonRight = styled.div({
  marginRight: -10,
});

const ContainerButtonLeft = styled.div({
  marginLeft: -10,
});
