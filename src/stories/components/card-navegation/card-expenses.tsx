import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { CustomButton } from '../custom-button/custom-button';
import InformationCard from './information-card';

interface Props {
  onClick: () => void,
  code: string
  name: string
}

const CardExpenses = ({ onClick, code, name }: Props) => {
  return (
    <InformationCard title='Expenses' height='134px' fontSize='24px' lineHeight='29px'>
      <TypographyDescription marginBottom={'24px'}>
        {`View all expenses of the ${code} ${name}`}
      </TypographyDescription>
      <CustomButton widthText='100%' label='View Expenses' style={{
        textAlign: 'center',
        background: '#E7FCFA',
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

const TypographyDescription = styled(Typography)<{ marginBottom?: string }>((props) => ({
  fontFamily: 'SF Pro Text, sans serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '18px',
  color: '#546978 ',
  letterSpacing: '0.4px',
  marginBottom: props.marginBottom || '0px'
}));
