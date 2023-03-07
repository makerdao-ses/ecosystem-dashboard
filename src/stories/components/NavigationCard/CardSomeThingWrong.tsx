import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SES_DASHBOARD, TYPE_FORM } from '../../../core/utils/const';
import { CustomLink } from '../custom-link/custom-link';
import InformationCard from './InformationCard';

interface Props {
  width?: string;
}

const CardSomeThingWrong = ({ width }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <InformationCard
      title="Something Wrong on this Page?"
      width={width}
      fontWeight={600}
      color={isLight ? '#231536' : '#D2D4EF'}
      fontSize="20px"
      padding="16px 16px 24px 16px"
    >
      <TypographyDescription marginBottom={'16px'} isLight={isLight}>
        Is this your core unit?
      </TypographyDescription>
      <TypographyDescription marginBottom={'16px'} isLight={isLight}>
        We are still collecting all the relevant information.
      </TypographyDescription>
      <TypographyDescription marginBottom={'12px'} isLight={isLight}>
        If you see something that needs updating, don't hesitate to contact us.
      </TypographyDescription>
      <CustomLink
        href={SES_DASHBOARD}
        style={{
          flexWrap: 'wrap',
          color: '#447AFB',
          letterSpacing: '0.3px',
          lineHeight: '19px',
          marginBottom: '16px',
          marginLeft: '0px',
          whiteSpace: 'break-spaces',
          display: 'inline-block',
        }}
        fontSize={16}
        fontWeight={500}
        iconWidth={10}
        iconHeight={10}
        marginLeft="7px"
        fontFamily="Inter, sans-serif"
      >
        Join SES discord #dashboard-reporting channel
      </CustomLink>
      <br />
      <CustomLink
        style={{
          color: '#447AFB',
          letterSpacing: '0.3px',
          lineHeight: '19px',
          marginBottom: '16px',
          marginLeft: '0px',
        }}
        href={TYPE_FORM}
        iconWidth={10}
        iconHeight={10}
        fontSize={16}
        fontWeight={500}
        marginLeft="7px"
        fontFamily="Inter, sans-serif"
      >
        Or fill out this Typeform
      </CustomLink>
    </InformationCard>
  );
};

export default CardSomeThingWrong;

const TypographyDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  marginBottom?: string;
  isLight: boolean;
}>(({ isLight, marginBottom }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '24px',
  fontSize: '15px',
  letterSpacing: ' 0.4px',
  color: isLight ? '#546978 ' : '#9FAFB9',
  marginBottom: marginBottom || '0px',
}));
