import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { getMipTitle } from '@ses/core/utils/string';
import React from 'react';
import type { TargetBalanceTooltipInformation, WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  name: string;
  toolTipData: Pick<TargetBalanceTooltipInformation, 'description' | 'mipNumber' | 'link'>;
}

const ModalSheetValueContent: React.FC<Props> = ({ toolTipData, name }) => {
  const { isLight } = useThemeContext();
  const pieces = getMipTitle(name);
  return (
    <Container isLight={isLight}>
      <Description isLight={isLight}>{toolTipData.description}</Description>
      <Source isLight={isLight}>Source</Source>
      <ContainerLinkWithMip isLight={isLight}>
        <MipNumber>{pieces[0]}</MipNumber>
        <ContainerLink>
          <CustomLink
            children={name}
            withArrow
            iconWidth={10}
            iconHeight={10}
            styleIcon={{
              marginLeft: '0px',
            }}
            fontSize={12}
            lineHeight="15px"
            href={toolTipData.link}
            style={{
              whiteSpace: 'normal',
              letterSpacing: '0px',
              marginLeft: '0px',
            }}
          />
        </ContainerLink>
      </ContainerLinkWithMip>
    </Container>
  );
};

export default ModalSheetValueContent;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  background: isLight ? 'white' : '#000A13',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #231536',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '22px 22px 0px 0px',
  padding: 16,
}));
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
  padding: 8,
  marginBottom: 16,
}));
const ContainerLink = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
});
const MipNumber = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#708390',
  marginBottom: 2,
});
