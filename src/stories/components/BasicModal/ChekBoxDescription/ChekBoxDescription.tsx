import styled from '@emotion/styled';
import CheckboxMui from '@mui/material/Checkbox';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  isChecked?: boolean;

  setIsChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBoxDescription: React.FC<Props> = ({ isChecked = false, setIsChecked }) => {
  const { isLight } = useThemeContext();
  return (
    <Container isChecked={isChecked}>
      <Text isLight={isLight} isChecked={isChecked}>
        Expand All Categories
      </Text>
      <ContainerCheckBox>
        <Checkbox isLight={isLight} size="small" checked={isChecked} onChange={setIsChecked} />
      </ContainerCheckBox>
    </Container>
  );
};

export default CheckBoxDescription;

const Container = styled.div<{ isChecked: boolean }>(({ isChecked }) => ({
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

const Text = styled.div<WithIsLight & { isChecked: boolean }>(({ isLight, isChecked = false }) => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '18px',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: isChecked ? 700 : 400,
    fontSize: '16px',
    lineHeight: isChecked ? '19px' : '22px',
    verticalAlign: 'center',
  },
}));

const ContainerCheckBox = styled.div({
  height: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: 4,
});

const Checkbox = styled(CheckboxMui)<WithIsLight>(({ isLight }) => ({
  width: 15,
  height: 15,

  svg: {
    fill: isLight ? '#231536' : '#ADAFD4',
  },
}));
