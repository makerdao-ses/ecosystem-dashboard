import styled from '@emotion/styled';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface SectionTitleProps {
  title: string;
  tooltip?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, tooltip }) => {
  const { isLight } = useThemeContext();

  return (
    <Wrapper>
      <Title isLight={isLight}>{title}</Title>
      {!!tooltip && (
        <SESTooltip content={tooltip} placement="bottom-start">
          <InfoWrapper>
            <Information />
          </InfoWrapper>
        </SESTooltip>
      )}
    </Wrapper>
  );
};

export default SectionTitle;

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 8,
    alignItems: 'flex-end',
  },
});

const Title = styled.h2<WithIsLight>(({ isLight }) => ({
  margin: 0,
  color: isLight ? '#231536' : 'red',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: 0.4,
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
