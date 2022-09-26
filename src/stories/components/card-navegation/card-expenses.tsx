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
  onClickFinances: () => void;
  onClickActivity: () => void;
  code: string;
  isTitlePresent?: boolean;
  style?: React.CSSProperties;
}

const CardExpenses = ({ onClickActivity, onClickFinances, code, isTitlePresent = true, style = {} }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <InformationCard
      fontWeight={600}
      title="Expenses"
      fontSize="24px"
      lineHeight="29px"
      style={style}
      isTitlePresent={isTitlePresent}
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
          {`View all expenses of the ${code} Core Unit`}
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
            borderColor="#1AAB9B"
            style={{
              textAlign: 'center',
              border: '1px solid #1AAB9B',
              borderRadius: '22px',
              height: ' 34px',
              color: '#1AAB9B',
              fontFamily: 'Inter, sans serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              padding: '8px 24px',
            }}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={onClickActivity}
            styleText={{
              color: '#1AAB9B',
            }}
          />
          <CustomButton
            borderColor="#1AAB9B"
            widthText="100%"
            label="Expense Reports"
            style={{
              textAlign: 'center',
              borderRadius: '22px',
              height: ' 34px',
              color: '#1AAB9B',
              fontFamily: 'Inter, sans serif',
              border: '1px solid #1AAB9B',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
            }}
            onClick={onClickFinances}
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
          href={`${MAKER_BURN_LINK}/${code}`}
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
