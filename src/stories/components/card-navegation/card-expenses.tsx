import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { CustomButton } from '../custom-button/custom-button';
import InformationCard from './information-card';

const CardExpenses = () => {
  return (
    <InformationCard title='Expenses' height='134px'>
      <TypographyDescription marginBottom={'24px'}>
      View all expenses of the (SES-01) Sustainable Ecosystem Scaling
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
      }} />
    </InformationCard>
  );
};

export default CardExpenses;

const TypographyDescription = styled(Typography)<{ marginBottom?: string }>((props) => ({
  fontFamily: 'SF Pro Text, sans serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#231536',
  marginBottom: props.marginBottom || '0px'
}));
