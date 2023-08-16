import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import CardNavigationGeneric from '../CardNavigationGeneric';
import ReadMore from '../ReadMore';

interface Props {
  svgImage: JSX.Element;
  title: string;
  description: React.ReactNode;
  href: string;
}

const CardNavigationFinance: React.FC<Props> = ({ svgImage, title, description, href }) => (
  <StyleCardNavigationGeneric>
    <ContainerImage>{svgImage}</ContainerImage>
    <CardInformation>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardInformation>
    <ReadMore href={href} />
  </StyleCardNavigationGeneric>
);
export default CardNavigationFinance;
const StyleCardNavigationGeneric = styled(CardNavigationGeneric)({
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 416,
  },
});

const ContainerImage = styled.div({
  marginBottom: 8,
});
const Title = styled.div({
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
  marginBottom: 8,
});

const Description = styled.div({
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  width: 236,
  margin: '0px auto 24px',
});

const CardInformation = styled.div({
  width: 300,
  textAlign: 'center',
  marginBottom: -1,
});
