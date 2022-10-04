import styled from '@emotion/styled';
import React from 'react';
import { CustomButton } from '../custom-button/custom-button';
import { Close } from '../svg/close';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
}

export default (props: Props) => {
  return (
    <>
      <Under834>
        <ResponsiveButton onClick={props.onClick}>
          <Close width={10} height={10} fill={!props.disabled ? '#231536' : '#D1DEE6'} />
        </ResponsiveButton>
      </Under834>
      <Over834>
        <CustomButton
          label="Reset Filters"
          style={{
            width: '114px',
            border: 'none',
            background: 'none',
          }}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={props.onClick}
          disabled={props.disabled}
        />
      </Over834>
    </>
  );
};

const Under834 = styled.div({
  display: 'flex',
  '@media (min-width: 834px)': {
    display: 'none',
  },
});

const Over834 = styled.div({
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
});

const ResponsiveButton = styled.div({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  width: '34px',
  height: '34px',
  border: '1px solid #D4D9E1',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (min-width: 834px)': {
    display: 'none',
  },
});
