import styled from '@emotion/styled';
import CheckOnComponent from '@ses/components/svg/check-on-new';
import CheckboxOff from '@ses/components/svg/checkbox-off';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  isChecked?: boolean;
  setIsChecked?: (isChecked: boolean) => void;
}

const CheckBoxDescription: React.FC<Props> = ({ isChecked = false, setIsChecked }) => {
  const { isLight } = useThemeContext();
  const handleClick = () => {
    setIsChecked?.(isChecked);
  };
  return (
    <Container>
      <Text isLight={isLight} isChecked={isChecked}>
        Expand All Categories
      </Text>
      <ContainerCheckBox onClick={handleClick}>
        {isChecked ? (
          <CheckOnComponent fill="#231536" width={15} height={15} />
        ) : (
          <CheckboxOff width={15} height={15} fillDark="#B7A6CD" />
        )}
      </ContainerCheckBox>
    </Container>
  );
};

export default CheckBoxDescription;

const Container = styled.div({
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  paddingRight: 5,
});
const Text = styled.div<WithIsLight & { isChecked: boolean }>(({ isLight, isChecked = false }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: isChecked ? 700 : 400,
  fontSize: '16px',
  lineHeight: isChecked ? '19px' : '22px',
  color: isLight ? '#231536' : 'red',
  verticalAlign: 'center',
}));

const ContainerCheckBox = styled.div({
  height: 22,
  cursor: 'pointer',
});
