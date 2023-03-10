import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import React from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import { Close } from '../svg/close';

interface Props {
  onClick?: () => void;
  style?: React.CSSProperties;
}
const CloseButton: React.FC<Props> = (props) => {
  const desktop = useMediaQuery('(min-width: 834px)');

  return (
    <CloseWrapper onClick={props.onClick}>
      {desktop ? (
        <CustomButton
          label="Close"
          style={{
            width: 86,
            height: 34,
            borderRadius: 22,
          }}
        />
      ) : (
        <Close width={16} height={16} style={{ padding: '3px' }} />
      )}
    </CloseWrapper>
  );
};

export default CloseButton;

const CloseWrapper = styled.div({
  position: 'absolute',
  top: 24,
  right: 24,
});
