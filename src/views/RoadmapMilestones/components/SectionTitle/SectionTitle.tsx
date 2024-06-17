import { styled } from '@mui/material';
import React from 'react';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import Information from '@/components/icons/information';

interface SectionTitleProps {
  title: string;
  tooltip?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, tooltip }) => (
  <Wrapper>
    <Title>{title}</Title>
    {!!tooltip && (
      <SESTooltip content={tooltip} placement="bottom-start">
        <InfoWrapper>
          <Information />
        </InfoWrapper>
      </SESTooltip>
    )}
  </Wrapper>
);

export default SectionTitle;

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
    alignItems: 'flex-end',
  },
}));

const Title = styled('h2')(({ theme }) => ({
  margin: 0,
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: 0.4,
  },
}));

const InfoWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  cursor: 'pointer',
});
