import styled from '@emotion/styled';
import Switch from '@mui/material/Switch';
import * as React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';

interface Props {
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  styleLabel?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ControlledSwitches = ({ checked, handleChange, label = '', styleLabel = {}, onClick, disabled }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Container onClick={(e) => disabled && e.stopPropagation()}>
      <AntSwitch
        disabled={disabled}
        isLight={isLight}
        disableRipple
        checked={checked}
        onClick={onClick}
        onChange={handleChange}
        inputProps={{
          'aria-label': 'controlled',
        }}
      />
      {label && (
        <Label isLight={isLight} style={styleLabel} isChecked={checked}>
          {label}
        </Label>
      )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const Label = styled.p<{ isLight: boolean; isChecked: boolean }>(({ isLight, isChecked }) => ({
  marginTop: '0px',
  marginBottom: '0px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '18px',
  alignItems: 'center',
  textAlign: 'center',
  color: isLight ? (isChecked ? '#231536' : '#9FAFB9') : isChecked ? '#D2D4EF' : '#48495F',
  marginLeft: '8px',
}));

const AntSwitch = styled(Switch, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    width: 26,
    height: 15,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {},
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      color: '#9FAFB9',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#ECF1F3',
        border: '1px solid #9FAFB9',
      },
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: isLight ? '#1AAB9B' : '#139D8D',
        '& + .MuiSwitch-track': {
          opacity: 1,
          border: isLight ? '1px solid #1AAB9B' : '1px solid #139D8D',
          backgroundColor: 'white',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      width: 10,
      height: 10,
      borderRadius: 6,
      transition: 'width',
      duration: 200,
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: '#D4D9E1',
      boxSizing: 'border-box',
    },
  })
);

export default ControlledSwitches;
