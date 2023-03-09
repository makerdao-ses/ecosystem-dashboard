import styled from '@emotion/styled';
import React from 'react';
import ArrowPopover from '../../../../components/ArrowPopover/ArrowPopover';
import ArrowPopoverTargetValueContent from './ArrowPopoverTargetValueContent';
import type { AlignArrowTooTip } from '../../../../components/ArrowPopover/ArrowPopover';
import type { CSSProperties } from 'react';

interface Props {
  name: string;
  longCode: string;
  description: string;
  mipNumber: string;
  align: AlignArrowTooTip;
  link?: string;
  style?: CSSProperties;
}

const ArrowPopoverTargetValueComponent: React.FC<Props> = ({
  description,
  longCode,
  mipNumber,
  name,
  align,
  link,
  style = {},
}) => (
  <Container style={style}>
    <ArrowPopover align={align}>
      <ArrowPopoverTargetValueContent
        longCode={longCode}
        name={name}
        description={description}
        mipNumber={mipNumber}
        link={link}
      />
    </ArrowPopover>
  </Container>
);

export default ArrowPopoverTargetValueComponent;

const Container = styled.div({
  width: 305,
  display: 'flex',
  borderRadius: 6,
});
