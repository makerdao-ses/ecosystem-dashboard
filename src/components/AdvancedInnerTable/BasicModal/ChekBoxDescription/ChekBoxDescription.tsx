import { styled } from '@mui/material';
import CheckboxMui from '@mui/material/Checkbox';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';

interface Props {
  isChecked?: boolean;

  setIsChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBoxDescription: React.FC<Props> = ({ isChecked = false, setIsChecked }) => (
  <Container isChecked={isChecked}>
    <Text isChecked={isChecked}>Expand All Categories</Text>
    <ContainerCheckBox>
      <Checkbox size="small" checked={isChecked} onChange={setIsChecked} />
    </ContainerCheckBox>
  </Container>
);

export default CheckBoxDescription;

const Container = styled('div')<{ isChecked: boolean }>(({ isChecked }) => ({
  gap: 8,
  display: 'flex',
  marginBottom: isChecked ? 4 : undefined,
  alignItems: 'center',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    gap: 12,
    marginBottom: isChecked ? 3 : undefined,
  },
}));

const Text = styled('div')<{ isChecked: boolean }>(({ theme, isChecked = false }) => ({
  fontSize: 16,

  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: isChecked ? 700 : 400,
  lineHeight: isChecked ? '19px' : '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',
}));

const ContainerCheckBox = styled('div')({
  height: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: 4,
});

const Checkbox = styled(CheckboxMui)(({ theme }) => ({
  width: 15,
  height: 15,

  svg: {
    fill: theme.palette.isLight ? '#231536' : '#ADAFD4',
  },
}));
