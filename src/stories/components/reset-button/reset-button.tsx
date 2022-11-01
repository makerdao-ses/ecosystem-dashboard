import styled from '@emotion/styled';
import React from 'react';
import { CustomButton } from '../custom-button/custom-button';
import { Close } from '../svg/close';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  isWithIcon?: boolean;
  labelMobile?: string;
}

export default ({ onClick, disabled, label = 'Reset Filters', isWithIcon = true, labelMobile }: Props) => {
  return (
    <>
      <Under834>
        <ResponsiveButton onClick={onClick} isWithIcon={isWithIcon}>
          {isWithIcon ? (
            <Close width={10} height={10} fill={!disabled ? '#231536' : '#D1DEE6'} />
          ) : (
            <CustomButton
              label={labelMobile || label}
              style={{
                border: 'none',
                background: 'none',
                padding: 'none',
              }}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onClick={onClick}
              disabled={disabled}
            />
          )}
        </ResponsiveButton>
      </Under834>
      <Over834>
        <CustomButton
          label={label}
          style={{
            width: '114px',
            border: 'none',
            background: 'none',
          }}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={onClick}
          disabled={disabled}
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

const ResponsiveButton = styled.div<{ isWithIcon: boolean }>(({ isWithIcon = true }) => ({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  width: isWithIcon ? '34px' : 'fit-content',
  height: isWithIcon ? '34px' : 'fit-content',
  border: isWithIcon ? '1px solid #D4D9E1' : 'none',
  borderRadius: isWithIcon ? '50%' : 'none',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (min-width: 834px)': {
    display: 'none',
  },
}));
