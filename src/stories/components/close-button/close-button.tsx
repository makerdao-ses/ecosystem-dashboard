import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import { CustomButton } from '../custom-button/custom-button';
import { Close } from '../svg/close';

interface Props {
  onClick?: () => void;
  style?: React.CSSProperties;
}
export default (props: Props) => {
  const desktop = useMediaQuery('(min-width: 834px)');
  const { isLight } = useThemeContext();

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
          isLight={isLight}
        />
      ) : (
        <Close width={16} height={16} style={{ padding: '3px' }} />
      )}
    </CloseWrapper>
  );
};

const CloseWrapper = styled.div({
  position: 'absolute',
  top: 24,
  right: 24,
});
