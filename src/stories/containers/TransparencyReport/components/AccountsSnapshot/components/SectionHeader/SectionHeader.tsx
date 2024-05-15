import styled from '@emotion/styled';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import Information from '@/components/icons/information';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface SectionHeaderProps {
  title: string;
  subtitle: React.ReactNode;
  tooltip?: React.ReactNode;
  isSubsection?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, tooltip, isSubsection = false }) => {
  const { isLight } = useThemeContext();

  return (
    <Header>
      <TitleWrapper>
        <Title isLight={isLight} isSubsection={isSubsection} as={isSubsection ? 'h2' : 'h3'}>
          {title}
        </Title>
        {tooltip && (
          <TooltipWrapper>
            <SESTooltip content={tooltip} placement="bottom-start" enterTouchDelay={0} leaveTouchDelay={15000}>
              <IconWrapper>
                <Information />
              </IconWrapper>
            </SESTooltip>
          </TooltipWrapper>
        )}
      </TitleWrapper>
      <Subtitle isLight={isLight}>{subtitle}</Subtitle>
    </Header>
  );
};

export default SectionHeader;

const Header = styled.div({
  [lightTheme.breakpoints.down('table_834')]: {
    width: '100%',
  },
});

const TitleWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 8,
});

const Title = styled.h2<WithIsLight & { isSubsection: boolean }>(({ isLight, isSubsection }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontWeight: isSubsection ? 700 : 600,
  fontSize: isSubsection ? 16 : 20,
  lineHeight: isSubsection ? '19px' : '24px',
  letterSpacing: isSubsection ? 0 : 0.4,
  margin: 0,
}));

const TooltipWrapper = styled.div({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 4,
});

const IconWrapper = styled.div({
  width: 'fit-content',
  height: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 8,
});

const Subtitle = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 14,
  lineHeight: '22px',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
  },
}));
