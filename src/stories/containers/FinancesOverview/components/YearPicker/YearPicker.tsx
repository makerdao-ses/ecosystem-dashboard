import styled from '@emotion/styled';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

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
      {years.map((year) => (
        <ContainerButtons key={year}>
          <YearButton
            onClick={onclick(year)}
            allowsHover={false}
            label={year.toString()}
            isLight={isLight}
            selected={year === selectedYear}
          />
        </ContainerButtons>
      ))}
    </Container>
  );
};

export default YearPicker;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
});

const ContainerButtons = styled.div({
  display: 'flex',
  position: 'relative',
});

const YearButton = styled(CustomButton)<WithIsLight & { selected: boolean }>(({ isLight, selected }) => ({
  background: isLight ? (selected ? '#1AAB9B' : 'transparent') : selected ? '#098C7D' : 'transparent',
  borderColor: isLight ? (selected ? '#1AAB9B' : '#D4D9E1') : selected ? '#098C7D' : '#708390',
  boxShadow: selected ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : 'none',
  borderRadius: '22px',
  fontFamily: 'Inter, sans serif',
  fontStyle: 'normal',
  width: 75,
  height: 34,

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 120,
    height: 48,
  },

  '& > div': {
    color: isLight ? (selected ? '#FFFFFF' : '#9FAFB9') : selected ? '#FFFFFF' : '#ADAFD4',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [lightTheme.breakpoints.up('tablet_768')]: {
      fontSize: '16px!important',
      lineHeight: '19px!important',
    },
  },

  ...(!selected
    ? {
        '&:hover': {
          background: isLight ? '#F6F8F9' : '#10191F',
          border: `1px solid ${isLight ? '#ECF1F3' : '#1E2C37'}}`,

          '&:hover > div': {
            color: `${isLight ? '#787A9B' : '#D2D4EF'}!important`,
          },
        },
      }
    : {}),
}));
