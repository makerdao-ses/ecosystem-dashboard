
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { SES_DASHBOARD, TYPE_FORM } from '../../../core/utils/const';
import { CustomLink } from '../custom-link/custom-link';
import InformationCard from './information-card';

interface Props {
  height?: string;
  width?: string;
}

const CardSomeThingWrong = ({ width, height = '208px' }: Props) => {
  return (
    <InformationCard title='Something Wrong on this Page?' height={height} width={width}>

      <TypographyDescription marginBottom={'8px'}>Is this your core unit?
      </TypographyDescription>
      <TypographyDescription marginBottom={'16px'}>
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
        >Join SES discord #dashboard-reporting channel</CustomLink><br/>
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

const TypographyDescription = styled(Typography)<{ marginBottom?: string }>((props) => ({
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '18px',
  letterSpacing: ' 0.4px',
  color: '#546978',
  marginBottom: props.marginBottom || '0px'
}));
