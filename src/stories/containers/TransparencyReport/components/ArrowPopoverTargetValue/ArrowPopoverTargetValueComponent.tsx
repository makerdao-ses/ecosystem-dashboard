import styled from '@emotion/styled';
import ArrowPopover from '@ses/components/ArrowPopover/ArrowPopover';
import React from 'react';
import ArrowPopoverTargetValueContent from './ArrowPopoverTargetValueContent';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';
import type { CSSProperties } from 'react';

interface Props {
  name: string;
  longCode: string;
  style?: CSSProperties;
  toolTipData: Pick<TargetBalanceTooltipInformation, 'description' | 'mipNumber' | 'link'>;
}

const ArrowPopoverTargetValueComponent: React.FC<Props> = ({ toolTipData, longCode, name, style = {} }) => (
  <Container style={style}>
    <ArrowPopover>
      <ArrowPopoverTargetValueContent longCode={longCode} name={name} toolTipData={toolTipData} />
    </ArrowPopover>
  </Container>
);

export default ArrowPopoverTargetValueComponent;

const Container = styled.div({
  display: 'flex',
  borderRadius: 6,

  width: '100%',
});
