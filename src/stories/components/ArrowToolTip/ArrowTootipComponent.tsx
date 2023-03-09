import styled from '@emotion/styled';
import React from 'react';
import ArrowToolTip from './ArrowToolTip';
import BodyArrowToolTip from './BodyArrowToolTip';
import type { AlignArrowTooTip } from './ArrowToolTip';

interface Props {
  name: string;
  longCode: string;
  description: string;
  mipNumber: string;
  align: AlignArrowTooTip;
  link?: string;
}

const ArrowTooltipComponent: React.FC<Props> = ({ description, longCode, mipNumber, name, align, link }) => (
  <Container>
    <ArrowToolTip align={align}>
      <BodyArrowToolTip longCode={longCode} name={name} description={description} mipNumber={mipNumber} link={link} />
    </ArrowToolTip>
  </Container>
);

export default ArrowTooltipComponent;

const Container = styled.div({
  width: 305,
  display: 'flex',
  borderRadius: 6,
});
