
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { CustomLink } from '../custom-link/custom-link';
import InformationCard from './information-card';

const CardSomeThingWrong = () => {
  return (
        <InformationCard title='Something Wrong on this Page?' height='208px'>

            <TypographyDescription marginBottom={'8px'}>Is this your core unit?
            </TypographyDescription>
            <TypographyDescription marginBottom={'16px'}>
                We are still collecting all the relevant information.
                If you see something that needs updating, don’t
                hesitate to contact us.
            </TypographyDescription>
            <div style={{
              marginBottom: '16px'
            }}>
                <CustomLink
                    style={{
                      color: '#447AFB',
                      letterSpacing: '0.3px',
                      lineHeight: '19px',
                      marginBottom: '16px',
                      marginLeft: '0px'
                    }}
                    fontSize={16}
                    fontWeight={500}
                    fontFamily='SF Pro Display, sans-serif'
                >Join SES discord #dashboard-reporting channel</CustomLink></div>
            <CustomLink style={{
              color: '#447AFB',
              letterSpacing: '0.3px',
              lineHeight: '19px',
              marginBottom: '16px',
              marginLeft: '0px'
            }}
                fontSize={16}
                fontWeight={500}
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
  color: '#666666',
  marginBottom: props.marginBottom || '0px'
}));
