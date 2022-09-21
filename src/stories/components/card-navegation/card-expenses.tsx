import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { MAKER_BURN_LINK } from '../../../core/utils/const';
import { DividerStyle } from '../../containers/cu-about-2/cu-about-container-2';
import { CustomButton } from '../custom-button/custom-button';
import { CustomLink } from '../custom-link/custom-link';
import InformationCard from './information-card';

interface Props {
  onClick: () => void;
  code: string;
}

const CardExpenses = ({ onClick, code }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <InformationCard
      title="Expenses"
      height="190px"
      fontSize="24px"
      lineHeight="29px"
      padding="0px"
      color={isLight ? '#231536' : '#D2D4EF'}
    >
      <div
        style={{
          paddingTop: '16px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <TypographyDescription marginBottom={'24px'} isLight={isLight}>
          {`View all the expenses for the ${code} Core Unit`}
        </TypographyDescription>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <CustomButton
            widthText="100%"
            label="Activity Feed"
            style={{
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
            }}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={() => {}}
            styleText={{
              color: '#1AAB9B',
            }}
          />
          <CustomButton
            widthText="100%"
            label="Expense Reports"
            style={{
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
            }}
            onClick={onClick}
            styleText={{
              color: '#1AAB9B',
            }}
          />
        </div>
      </div>
      <DividerStyle
        sx={{
          bgcolor: isLight ? '#D4D9E1' : '#405361',
          marginTop: '16px',
          marginBottom: '16px',
        }}
      />
      <div
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingBottom: '24px',
        }}
      >
        <CustomLink
          href={MAKER_BURN_LINK}
          style={{
            marginLeft: '0px',
            paddingRight: '0px',
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '18px',
            whiteSpace: 'normal',
          }}
          target="_blank"
          children={`View on-chain transfers to ${code} Core Unit on makerburn.com`}
        />
      </div>
    </InformationCard>
  );
};

export default CardExpenses;

const TypographyDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  marginBottom?: string;
  isLight: boolean;
}>(({ isLight, marginBottom }) => ({
  fontFamily: 'Inter, sans serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '24px',
  color: isLight ? '#546978 ' : '#9FAFB9',
  letterSpacing: '0.4px',
  marginBottom: marginBottom || '0px',
}));
