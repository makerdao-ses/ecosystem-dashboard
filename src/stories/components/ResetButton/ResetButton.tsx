import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import { Close } from '../svg/close';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  hasIcon?: boolean;
  labelMobile?: string;
  legacyBreakpoints?: boolean;
}

const ResetButton: React.FC<Props> = ({
  onClick,
  disabled,
  label = 'Reset Filters',
  hasIcon = true,
  labelMobile,
  legacyBreakpoints = true,
}) => (
  <>
    <Under834 legacyBreakpoints={legacyBreakpoints}>
      <ResponsiveButton onClick={onClick} hasIcon={hasIcon} legacyBreakpoints={legacyBreakpoints}>
        {hasIcon ? (
          <Close width={10} height={10} fill={!disabled ? '#231536' : '#D1DEE6'} />
        ) : (
          <CustomButton
            label={labelMobile || label}
            style={{
              border: 'none',
              background: 'none',
              padding: '0px',
            }}
            onClick={onClick}
            disabled={disabled}
          />
        )}
      </ResponsiveButton>
    </Under834>
    <Over834 legacyBreakpoints={legacyBreakpoints}>
      <CustomButton
        label={label}
        style={{
          width: '114px',
          border: 'none',
          background: 'none',
        }}
        padding="7px 16px"
        onClick={onClick}
        disabled={disabled}
      />
    </Over834>
  </>
);

export default ResetButton;

const Under834 = styled.div<{ legacyBreakpoints: boolean }>(({ legacyBreakpoints }) => ({
  display: 'flex',

  [lightTheme.breakpoints.up(legacyBreakpoints ? 'table_834' : 'tablet_768')]: {
    display: 'none',
  },
}));

const Over834 = styled.div<{ legacyBreakpoints: boolean }>(({ legacyBreakpoints }) => ({
  display: 'none',

  [lightTheme.breakpoints.up(legacyBreakpoints ? 'table_834' : 'tablet_768')]: {
    display: 'flex',
  },
}));

const ResponsiveButton = styled.div<{ hasIcon: boolean; legacyBreakpoints: boolean }>(
  ({ hasIcon = true, legacyBreakpoints }) => ({
    display: 'flex',
    gridArea: 'buttonFilter',
    justifySelf: 'flex-end',
    width: hasIcon ? '34px' : 'fit-content',
    height: '34px',
    border: hasIcon ? '1px solid #D4D9E1' : 'none',
    borderRadius: hasIcon ? '50%' : 'none',
    alignItems: 'center',
    justifyContent: 'center',

    [lightTheme.breakpoints.up(legacyBreakpoints ? 'table_834' : 'tablet_768')]: {
      display: 'none',
    },
  })
);
