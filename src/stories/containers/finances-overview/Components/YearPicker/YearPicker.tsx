import styled from '@emotion/styled';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { CustomButton } from '@ses/components/custom-button/custom-button';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/button-type.enum';
import { ButtonPickerStyle } from '@ses/core/utils/share-style';
import React from 'react';
import lightTheme from 'styles/theme/light';

interface Props {
  years?: number[];
  selectedYear: number;
  handleOnclick: (year: number) => void;
}

const YearPicker = ({ years = [], selectedYear, handleOnclick }: Props) => {
  const { isLight } = useThemeContext();
  const onclick = (year: number) => () => {
    handleOnclick(year);
  };

  return (
    <Container>
      {years?.map((year) => (
        <ContainerButtons key={year}>
          <PickerButtonStyle
            onClick={onclick(year)}
            buttonType={ButtonType.Secondary}
            widthText="100%"
            label={year.toString()}
            style={{
              background: ButtonPickerStyle(isLight, year === selectedYear).background,
              textAlign: 'center',
              borderRadius: '22px',
              borderColor: ButtonPickerStyle(isLight, year === selectedYear).borderColor,
              boxShadow: ButtonPickerStyle(isLight, year === selectedYear).boxShadow,
              fontFamily: 'Inter, sans serif',
              fontStyle: 'normal',
              fontWeight: 500,
            }}
            allowsHover={false}
            styleText={{
              color: ButtonPickerStyle(isLight, year === selectedYear).textColor,
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
  marginBottom: 40,
});

const ContainerButtons = styled.div({
  display: 'flex',
  position: 'relative',
});

const PickerButtonStyle = styled(CustomButton)({
  width: '83px',
  height: '34px',
  padding: '8px 24px',
  fontSize: '14px',
  lineHeight: '18px',
  [lightTheme.breakpoints.up('table_834')]: {
    width: '120px',
    height: '48px',
    padding: '14.5px 40px',
    fontSize: '16px',
    lineHeight: '19px',
  },
});

export default YearPicker;
