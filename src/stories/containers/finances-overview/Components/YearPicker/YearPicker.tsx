import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CustomButton } from '@ses/components/custom-button/custom-button';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/button-type.enum';
import { ButtonPickerStyle } from '@ses/core/utils/share-style';
import React from 'react';
import lightTheme from 'styles/theme/light';

interface Props {
  years?: number[];
  yearSelect: number;
  handleOnclick: (year: number) => void;
}

const YearPicker = ({ years = [], yearSelect, handleOnclick }: Props) => {
  const isUpMobile = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  const { isLight } = useThemeContext();
  const onclick = (year: number) => () => {
    handleOnclick(year);
  };

  return (
    <Container
      style={{
        display: 'flex',
        marginBottom: 40,
      }}
    >
      {years?.map((year) => (
        <ContainerButtons key={year}>
          <CustomButton
            onClick={onclick(year)}
            buttonType={ButtonType.Secondary}
            widthText="100%"
            label={year.toString()}
            style={{
              background: ButtonPickerStyle(isLight, year, yearSelect).background,
              textAlign: 'center',
              borderRadius: '22px',
              width: isUpMobile ? '120px' : '83px',
              height: isUpMobile ? '48px' : '34px',
              padding: isUpMobile ? '14.5px 40px' : '8px 24px',
              borderColor: ButtonPickerStyle(isLight, year, yearSelect).borderColor,
              boxShadow: ButtonPickerStyle(isLight, year, yearSelect).background,
              fontFamily: 'Inter, sans serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: isUpMobile ? '16px' : '14px',
              lineHeight: isUpMobile ? '19px' : '18px',
            }}
            allowsHover={false}
            styleText={{
              color: ButtonPickerStyle(isLight, year, yearSelect).textColor,
            }}
          />
        </ContainerButtons>
      ))}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 16,
});

const ContainerButtons = styled.div({
  display: 'flex',
  position: 'relative',
});

export default YearPicker;
