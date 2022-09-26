import styled from '@emotion/styled';
import React from 'react';
import { DateTime } from 'luxon';
import { capitalizeSentence } from '../../../core/utils/string.utils';
import { CustomLink } from '../custom-link/custom-link';
import { CuTableColumnLastModifiedSkeleton } from './cu-table-column-last-modified.skeleton';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface Props {
  date?: DateTime;
  isLoading?: boolean;
  isCard?: boolean;
}

export const CuTableColumnLastModified = (props: Props) => {
  const isLight = useThemeContext().themeMode === 'light';

  return !props.isLoading ? (
    <Container isCard={!!props.isCard}>
      <DateLabel isLight={isLight}>{props.date?.toFormat('dd-MMM-yyyy')?.toUpperCase() ?? 'No Data'}</DateLabel>
      {props.date ? (
        <DifferenceLabel isLight={isLight}>
          {capitalizeSentence(props.date?.toRelative({ unit: 'days' }) ?? '')}
        </DifferenceLabel>
      ) : (
        <CustomLink
          style={{
            fontWeight: 500,
            marginLeft: 0,
            lineHeight: '16px',
            padding: 0,
          }}
          iconHeight={10}
          iconWidth={10}
          fontSize={16}
          href="https://www.notion.so/makerdao-ses/MakerDAO-Budget-Reporting-Tool-Setup-Guide-for-Data-Providers-v2-a8d59cc9a5aa4d73a4f677ddcef7d4a7"
        >
          Submit Now
        </CustomLink>
      )}
    </Container>
  ) : (
    <CuTableColumnLastModifiedSkeleton />
  );
};

const Container = styled.div<{ isCard: boolean }>(({ isCard }) => ({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  '@media (min-width: 834px)': {
    alignItems: isCard ? 'flex-end' : 'flex-start',
  },
}));

const DateLabel = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: isLight ? '#434358' : '#9FAFB9',
  marginBottom: '8px',
}));

const DifferenceLabel = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#EDEFFF',
}));
