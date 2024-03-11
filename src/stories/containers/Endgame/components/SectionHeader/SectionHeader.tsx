import { styled } from '@mui/material';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React, { useMemo } from 'react';
import type { SelectItem } from '@ses/components/SingleItemSelect/SingleItemSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface SectionHeaderProps {
  title: string;
  subtitle: string;

  yearsRange?: string[];
  selectedYear?: string;
  handleYearChange?: (year: string) => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  yearsRange,
  selectedYear,
  handleYearChange,
}) => {
  const { isLight } = useThemeContext();
  const years: SelectItem<string>[] = useMemo(
    () =>
      (yearsRange ?? [])?.map((year) => ({
        label: year,
        value: year,
      })),
    [yearsRange]
  );

  return (
    <Header>
      <TextContainer>
        <Title isLight={isLight}>{title}</Title>
        <Subtitle isLight={isLight}>{subtitle}</Subtitle>
      </TextContainer>
      {yearsRange && (
        <YearSelect
          isMobile={false}
          useSelectedAsLabel
          selected={selectedYear}
          onChange={handleYearChange}
          items={years}
          PopperProps={{
            placement: 'bottom-end',
          }}
        />
      )}
    </Header>
  );
};

export default SectionHeader;

const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  alignItems: 'flex-end',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
}));

const TextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginRight: 'auto',
});

const Title = styled('h2')<WithIsLight>(({ isLight }) => ({
  margin: 0,
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
  },
}));

const Subtitle = styled('p')<WithIsLight>(({ isLight }) => ({
  margin: 0,
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 14,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const YearSelect = styled(SingleItemSelect)(() => ({
  padding: '7.2px 15.58px',
}));
