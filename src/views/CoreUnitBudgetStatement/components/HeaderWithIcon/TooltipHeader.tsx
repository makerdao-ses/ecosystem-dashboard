import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { getMipTitle } from '@ses/core/utils/string';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { CSSProperties } from 'react';

interface Props {
  description: string;

  link: string;
  name: string;
  style?: CSSProperties;
}

const HeaderToolTip: React.FC<Props> = ({ description, link, style, name }) => {
  const { isLight } = useThemeContext();
  const pieces = getMipTitle(name);
  return (
    <Container style={style}>
      <Description isLight={isLight}>{description}</Description>
      <Source isLight={isLight}>Source</Source>
      <ContainerLinkWithMip isLight={isLight}>
        <MipNumber>{pieces[0]}</MipNumber>
        <ContainerLink>
          <StyledCustomLink
            withArrow
            marginLeft="7px"
            href={link}
            iconWidth={10}
            fontWeight={400}
            iconHeight={10}
            fontSize={12}
            lineHeight="15px"
          >
            {name}
          </StyledCustomLink>
        </ContainerLink>
      </ContainerLinkWithMip>
    </Container>
  );
};

export default HeaderToolTip;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: 305,

  padding: 6,
});
const Description = styled.div<WithIsLight>(({ isLight }) => ({
  marginBottom: 16,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#231536' : '#ADAFD4',
}));
const Source = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 11,
  lineHeight: '13px',
  color: isLight ? '#231536' : '#ADAFD4',
  marginBottom: 4,
}));

const ContainerLinkWithMip = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: isLight ? '#EDEFFF' : '#25273D',
  borderRadius: 6,
  padding: 6,
}));

const ContainerLink = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const MipNumber = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: '#708390',
  marginBottom: 2,
  marginTop: 2,
  marginLeft: 1,
});

const StyledCustomLink = styled(CustomLink)({
  letterSpacing: '0px',
  marginLeft: 0,
  paddingRight: 0,
  whiteSpace: 'pre-line',
  overflowWrap: 'break-word',
});
