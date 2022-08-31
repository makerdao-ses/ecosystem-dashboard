
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SES_DASHBOARD, TYPE_FORM } from '../../../core/utils/const';
import { CustomLink } from '../custom-link/custom-link';
import InformationCard from './information-card';

interface Props {
  width?: string;
}

const CardSomeThingWrong = ({ width }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <InformationCard title='Something Wrong on this Page?' height={'auto'} width={width} color={isLight ? '#231536' : '#D2D4EF'} fontSize='20px'>

      <TypographyDescription marginBottom={'8px'} isLight={isLight}>Is this your core unit?
      </TypographyDescription>
      <TypographyDescription marginBottom={'16px'} isLight={isLight}>
        We are still collecting all the relevant information.<br />
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
        marginLeft='7px'
        fontFamily='SF Pro Display, sans-serif'
      >Join SES discord #dashboard-reporting channel</CustomLink><br />
      <CustomLink style={{
        color: '#447AFB',
        letterSpacing: '0.3px',
        lineHeight: '19px',
        marginBottom: '16px',
        marginLeft: '0px'
      }}
        href={TYPE_FORM}
        iconWidth={10}
        iconHeight={10}
        fontSize={16}
        fontWeight={500}
        marginLeft='7px'
        fontFamily='SF Pro Display, sans-serif'>Or fill out this Typeform</CustomLink>
    </InformationCard>
  );
};

export default CardSomeThingWrong;

const TypographyDescription = styled(Typography)<{ marginBottom?: string, isLight: boolean }>(({ isLight, marginBottom }) => ({
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  letterSpacing: ' 0.4px',
  color: isLight ? '#546978 ' : '#9FAFB9',
  marginBottom: marginBottom || '0px'
}));
