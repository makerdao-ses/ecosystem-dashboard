import styled from '@emotion/styled';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { toKebabCase } from '@ses/core/utils/string';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  tooltip?: string;
  isSubsection?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, tooltip, isSubsection = false }) => {
  const { isLight } = useThemeContext();

  return (
    <Header>
      <TitleWrapper>
        <Title isLight={isLight} isSubsection={isSubsection}>
          {title}
        </Title>
        {tooltip && (
          <CustomPopover id={toKebabCase(title)} title={tooltip}>
            <IconWrapper>
              <Information />
            </IconWrapper>
          </CustomPopover>
        )}
      </TitleWrapper>
      <Subtitle isLight={isLight}>{subtitle}</Subtitle>
    </Header>
  );
};

export default SectionHeader;

const Header = styled.header({});

const TitleWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 8,
});

const Title = styled.h2<WithIsLight & { isSubsection: boolean }>(({ isLight, isSubsection }) => ({
  color: isLight ? '#231536' : 'red',
  fontWeight: isSubsection ? 700 : 600,
  fontSize: isSubsection ? 16 : 20,
  lineHeight: isSubsection ? '19px' : '24px',
  letterSpacing: isSubsection ? 0 : 0.4,
  margin: 0,
}));

const IconWrapper = styled.div({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 12.5,
});

const Subtitle = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 16,
  lineHeight: '22px',
}));
