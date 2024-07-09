import { styled } from '@mui/material';
import { getMipTitle } from '@ses/core/utils/string';
import React from 'react';
import ExternalLink from '@/stories/components/ExternalLink/ExternalLink';
import type { CSSProperties } from 'react';

interface Props {
  description: string;
  link: string;
  name: string;
  style?: CSSProperties;
}

const HeaderToolTip: React.FC<Props> = ({ description, link, style, name }) => {
  const pieces = getMipTitle(name);
  return (
    <Container style={style}>
      <Description>{description}</Description>
      <ContainerLinkWithMip>
        <Source>Source</Source>
        <ContainerLink>
          <MipNumber>{pieces[0]}</MipNumber>
          <ExternalLinkStyled showArrow href={link}>
            {pieces[1]}
          </ExternalLinkStyled>
        </ContainerLink>
      </ContainerLinkWithMip>
    </Container>
  );
};

export default HeaderToolTip;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',

  padding: '8px 16px',
  gap: 16,
});
const Description = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : '#ADAFD4',
}));
const Source = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : '#ADAFD4',
}));

const ContainerLinkWithMip = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '4px 8px 8px 8px',
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'red',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : 'red'}`,
  borderRadius: 12,
}));

const ContainerLink = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const MipNumber = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  textTransform: 'uppercase',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
}));

const ExternalLinkStyled = styled(ExternalLink)({
  fontSize: 14,

  display: 'flex',
  gap: 8,
});
