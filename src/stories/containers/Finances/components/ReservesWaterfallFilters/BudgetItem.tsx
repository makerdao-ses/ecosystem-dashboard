import styled from '@emotion/styled';
import { Container } from '@ses/components/SelectItem/SelectItem';
import Check from '@ses/components/svg/check';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import Image from 'next/image';
import React from 'react';
import type { SelectItemProps } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const BudgetItem: React.FC<SelectItemProps> = ({ checked = false, ...props }) => {
  const { isLight } = useThemeContext();

  return (
    <StyledContainer
      className="no-select"
      style={{
        flex: 1,
        alignItems: 'center',
        minHeight: 40,
        padding: 4,
      }}
      checked={checked}
      isLight={isLight}
      onClick={props.onClick}
    >
      {!props.params?.isAll && (
        <>
          <ImageContainer>
            <Image
              src={props.params?.url || '/assets/img/default-icon-cards-budget.svg'}
              alt="Budget Icon"
              fill={true}
              unoptimized
            />
          </ImageContainer>
        </>
      )}

      <Title isLight={isLight} checked={checked}>
        {props.label}
      </Title>
      <CheckWrapper>
        <Check fill={checked ? (isLight ? '#231536' : 'white') : isLight ? '#D1DEE6' : '#231536'} />
      </CheckWrapper>
    </StyledContainer>
  );
};

export default BudgetItem;

const CheckWrapper = styled.span({
  alignSelf: 'center',
  position: 'absolute',
  right: 8,
});

const StyledContainer = styled(Container)<{ isLight: boolean; checked: boolean }>(({ isLight, checked }) => ({
  gap: 16,
  display: 'flex',
  position: 'relative',
  '&:hover': {
    background: isLight ? (checked ? '#EDEFFF' : '#F6F8F9') : checked ? '#231536' : '#25273D',
  },
}));

const ImageContainer = styled.div({
  position: 'relative',
  width: 32,
  height: 32,
});

const Title = styled.span<WithIsLight & { checked: boolean }>(({ isLight, checked = false }) => ({
  color: isLight ? (checked ? '#231536' : '#231536') : '#D2D4EF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  display: 'flex',
  flexWrap: 'wrap',
  width: 200,
}));
