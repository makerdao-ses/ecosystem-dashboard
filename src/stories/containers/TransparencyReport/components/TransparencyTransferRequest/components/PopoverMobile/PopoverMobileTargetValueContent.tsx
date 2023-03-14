import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { TargetBalanceTooltipInformation, WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  description?: string;
  mipNumber?: string;
  link?: string;

  name: string;
  longCode: string;

  toolTipData: Pick<TargetBalanceTooltipInformation, 'description' | 'mipNumber' | 'link'>;
}

const PopoverMobileTargetValueContent: React.FC<Props> = ({ toolTipData, name, longCode }) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <Description isLight={isLight}>{toolTipData.description}</Description>
      <Source isLight={isLight}>Source</Source>
      <ContainerLinkWithMip isLight={isLight}>
        <MipNumber>{toolTipData.mipNumber}</MipNumber>
        <ContainerLink>
          <CustomLink
            children={`Modify Core Unit Budget - ${name} (${longCode})`}
            withArrow
            styleIcon={{
              marginLeft: '7px',
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

export default PopoverMobileTargetValueContent;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
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
