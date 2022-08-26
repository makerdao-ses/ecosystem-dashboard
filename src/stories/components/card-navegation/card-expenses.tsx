import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CustomButton } from '../custom-button/custom-button';
import InformationCard from './information-card';

interface Props {
  onClick: () => void,
  code: string
  name: string
}

const CardExpenses = ({ onClick, code, name }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <InformationCard title='Expenses' height='134px' fontSize='24px' lineHeight='29px' color={isLight ? '#231536' : '#D2D4EF'}>
      <TypographyDescription marginBottom={'24px'} isLight={isLight}>
        {`View all the expenses for the (${code}) ${name} Core Unit`}
      </TypographyDescription>
      <CustomButton widthText='100%' label='View Expenses' style={{
        textAlign: 'center',
        background: isLight ? '#E7FCFA' : 'none',
        border: '1px solid #1AAB9B',
        borderRadius: '22px',
        height: ' 34px',
        color: '#1AAB9B',
        fontFamily: 'SF Pro Text, sans serif',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '18px',
        width: '100%'
      }} onClick={onClick} styleText={{
        color: '#1AAB9B',
      }} />
    </InformationCard>
  );
};

export default CardExpenses;

const TypographyDescription = styled(Typography)<{ marginBottom?: string, isLight: boolean }>(({ isLight, marginBottom }) => ({
  fontFamily: 'SF Pro Text, sans serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '18px',
  color: isLight ? '#546978 ' : '#9FAFB9',
  letterSpacing: '0.4px',
  marginBottom: marginBottom || '0px'
}));
