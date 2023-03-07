import styled from '@emotion/styled';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/button-type.enum';
import { ButtonPickerStyle } from '@ses/core/utils/share-style';
import React from 'react';
import lightTheme from 'styles/theme/light';

interface Props {
  years: number[];
  selectedYear: number;
  handleOnclick: (year: number) => void;
}

const YearPicker: React.FC<Props> = ({ years, selectedYear, handleOnclick }) => {
  const { isLight } = useThemeContext();
  const onclick = (year: number) => () => {
    handleOnclick(year);
  };

  return (
    <Container>
      {years.map((year) => {
        const currentButtonStyles = ButtonPickerStyle(isLight, year === selectedYear);
        return (
          <ContainerButtons key={year}>
            <CustomButton
              onClick={onclick(year)}
              buttonType={ButtonType.Secondary}
              widthText="100%"
              label={year.toString()}
              style={{
                background: currentButtonStyles.background,
                borderColor: currentButtonStyles.borderColor,
                boxShadow: currentButtonStyles.boxShadow,
                borderRadius: '22px',
                fontFamily: 'Inter, sans serif',
                fontStyle: 'normal',
                width: 83,
                height: 34,

                [lightTheme.breakpoints.up('table_834')]: {
                  width: 120,
                  height: 48,
                },
              }}
              allowsHover={false}
              styleText={{
                color: currentButtonStyles.textColor,
                fontWeight: 500,
                fontSize: 14,
                lineHeight: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                [lightTheme.breakpoints.up('table_834')]: {
                  fontSize: '16px!important',
                  lineHeight: '19px!important',
                },
              }}
            />
          </ContainerButtons>
        );
      })}
    </Container>
  );
};

export default YearPicker;

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
