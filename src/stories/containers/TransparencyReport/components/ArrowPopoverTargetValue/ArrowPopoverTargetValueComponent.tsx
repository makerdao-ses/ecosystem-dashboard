import styled from '@emotion/styled';
import React from 'react';
import ArrowPopover from '../../../../components/ArrowPopover/ArrowPopover';
import ArrowPopoverTargetValueContent from './ArrowPopoverTargetValueContent';
import type { CSSProperties } from 'react';

interface Props {
  name: string;
  longCode: string;
  description: string;
  mipNumber: string;
  link?: string;
  style?: CSSProperties;
}

const ArrowPopoverTargetValueComponent: React.FC<Props> = ({
  description,
  longCode,
  mipNumber,
  name,
  link,
  style = {},
}) => (
  <Container style={style}>
    <ArrowPopover>
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
  display: 'flex',
  borderRadius: 6,

  width: '100%',
});
