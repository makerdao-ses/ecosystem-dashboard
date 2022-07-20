import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { CustomButton } from '../../../custom-button/custom-button';

interface Props {
  title: string
  logo: ReactNode | JSX.Element
  background?: string
  fontSize?: number | string
  color?: string | string
  fontWeight?: number
  link?: string
  fontFamily?: string
  padding?: string
  subtract?: ReactNode | JSX.Element
  description: string
  height?: string
  letterSpacing?: string
  onClick: () => void;
  lineHeight?: string
}

export const ItemWebSite = ({ fontSize = 16, fontWeight = 700, color = '#FFFFFF', fontFamily = 'SF Pro Display, sans-serif', subtract = '', description, height = '134px', onClick, ...props }: Props) => {
  return (
    <Container height={height}>
      <ContainerRow>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <ContainerLogo>{props.logo}</ContainerLogo>
          {props.title &&
            <Typography fontSize={fontSize} color={color} fontWeight={fontWeight} fontFamily={fontFamily} letterSpacing={props.letterSpacing} lineHeight={props.lineHeight}>{props.title}</Typography>
          }
          {subtract && <ContainerSubtract>{subtract}</ContainerSubtract>}
        </div>
        <div>  <CustomButton label='Visit Website' onClick={onClick} style={{
          width: '137px',
          height: '34px',
          padding: '8px 24px',
        }} styleText={{
          color: '#31424E'
        }}/></div>      </ContainerRow>
      <ContainerTextDescription>
        <TypographyDescription sx={{
        }}>{description}</TypographyDescription>
      </ContainerTextDescription>
    </Container>
  );
};

const Container = styled.div<{ height?: string }>(({ height }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  background: '#FFFFFF',
  border: '1px solid #D2D4EF',
  borderRadius: '6px',
  padding: '16px 24px',
  width: '497px',
  height,
}));

const ContainerRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});
const ContainerLogo = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginRight: '16px',
});

const ContainerTextDescription = styled.div({
  display: 'flex',
  marginTop: '16px',
  wordWrap: 'break-word',
  whiteSpace: 'initial'
});

const ContainerSubtract = styled.div<{ background?: string, padding?: string }>((props) => ({
  background: props.background || 'none',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '6px',
  padding: props.padding || 0,
}));
const TypographyDescription = styled(Typography)({
  fontFamily: 'FT Base, sans serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#231536'
});

export default ItemWebSite;
