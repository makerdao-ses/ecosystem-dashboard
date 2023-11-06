import styled from '@emotion/styled';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface SectionTitleProps {
  title: string;
  tooltip: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, tooltip }) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <Title isLight={isLight}>{title}</Title>

      <SESTooltip content={tooltip} placement="bottom-start">
        <InfoWrapper>
          <Information />
        </InfoWrapper>
      </SESTooltip>
    </Container>
  );
};

export default SectionTitle;

const Container = styled.div({
  display: 'inline-flex',
  gap: 8,
  alignItems: 'flex-end',
});

const Title = styled.span<WithIsLight>(({ isLight }) => ({
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.75,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    letterSpacing: 0.4,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: 24,
  },
}));

const InfoWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  cursor: 'pointer',
});
