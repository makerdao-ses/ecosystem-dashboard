import styled from '@emotion/styled';
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
  // [
  //   {
  //     label: '2024',
  //     value: '2024',
  //   },
  //   {
  //     label: '2023',
  //     value: '2023',
  //   },
  //   {
  //     label: '2022',
  //     value: '2022',
  //   },
  //   {
  //     label: '2021',
  //     value: '2021',
  //   },
  // ];

  return (
    <Header>
      <Title isLight={isLight}>{title}</Title>
      <Subtitle isLight={isLight}>{subtitle}</Subtitle>
      {yearsRange && (
        <SingleItemSelect
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

const Header = styled.header({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const Title = styled.h2<WithIsLight>(({ isLight }) => ({
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

const Subtitle = styled.p<WithIsLight>(({ isLight }) => ({
  margin: 0,
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 14,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));
