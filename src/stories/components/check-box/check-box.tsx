import React from 'react';
import styled from '@emotion/styled';
import CheckboxOff from '../svg/checkbox-off';
import IconButton from '@mui/material/IconButton';
import CheckOnComponent from '../svg/check-on-new';

interface Props {
  label: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

const CheckBox = ({ label, isChecked, setIsChecked }: Props) => {
  const handleClick = () => {
    setIsChecked(isChecked);
  };
  return (
    <Container>
      <IconButton
        onClick={handleClick}
        sx={{
          padding: '0px',
        }}
      >
        {isChecked ? (
          <CheckOnComponent fill="#1AAB9B" width={12} height={12} />
        ) : (
          <CheckboxOff fill="#1AAB9B" width={12} height={12} />
        )}
      </IconButton>
      <StyleLabel isChecked={isChecked}>{label}</StyleLabel>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const StyleLabel = styled.span<{ isChecked: boolean }>(({ isChecked }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: ' normal',
  fontWeight: isChecked ? 600 : 500,
  fontSize: '14px',
  lineHeight: isChecked ? '17px' : '18px',
  color: '#231536',
  display: 'inline-block',
  marginLeft: '10px',
}));

export default CheckBox;
