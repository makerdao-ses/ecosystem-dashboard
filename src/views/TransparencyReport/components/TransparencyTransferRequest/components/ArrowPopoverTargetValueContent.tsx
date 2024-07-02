import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import React from 'react';

interface Props {
  description?: string;
  mipNumber?: string;
  link?: string;
  name: string;
  longCode: string;
  isMobileDevice?: boolean;
}

const ArrowPopoverTargetValueContent: React.FC<Props> = ({
  description,
  link,
  name,
  mipNumber,
  longCode,
  isMobileDevice = false,
}) => (
  <Container>
    <Description>{description}</Description>
    <Source>Source</Source>
    <ContainerLinkWithMip isMobileDevice={isMobileDevice}>
      <MipNumber>{mipNumber}</MipNumber>
      <ContainerLink>
        <CustomLink
          children={`Modify Core Unit Budget - ${name} (${longCode})`}
          withArrow
          styleIcon={{
            marginLeft: '7px',
          }}
          fontSize={12}
          lineHeight="15px"
          href={link}
          style={{
            whiteSpace: 'normal',
            lineHeight: '15px',
            fontSize: '12px',
            letterSpacing: '1px',
            marginLeft: 0,
            paddingRight: 0,
          }}
        />
      </ContainerLink>
    </ContainerLinkWithMip>
  </Container>
);

export default ArrowPopoverTargetValueContent;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});
const Description = styled.div({
  marginBottom: 16,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '17px',
  color: '#231536',
});
const Source = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 11,
  lineHeight: '13px',
  color: '#231536',
  marginBottom: 4,
});
const ContainerLinkWithMip = styled.div<{ isMobileDevice: boolean }>(({ isMobileDevice }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: '#EDEFFF',
  borderRadius: 6,
  padding: 8,
  marginBottom: isMobileDevice ? 16 : undefined,
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
