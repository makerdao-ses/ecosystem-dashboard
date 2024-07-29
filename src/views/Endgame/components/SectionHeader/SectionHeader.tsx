import { styled } from '@mui/material';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import React, { useMemo } from 'react';
import type { SelectItem } from '@ses/components/SingleItemSelect/SingleItemSelect';

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
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
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

const TextContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginRight: 'auto',

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
}));

const Title = styled('h2')(({ theme }) => ({
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : '#D2D4EF',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: 0.4,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
    lineHeight: '29px',
  },
}));

const Subtitle = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  fontSize: 14,
  lineHeight: '22px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const YearSelect = styled(SingleItemSelect)(() => ({
  padding: '7.2px 15.58px',
}));
