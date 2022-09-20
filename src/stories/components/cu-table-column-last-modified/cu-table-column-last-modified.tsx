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
}

export const CuTableColumnLastModified = (props: Props) => {
  const isLight = useThemeContext().themeMode === 'light';

  return !props.isLoading ? (
    <Container>
      <DateLabel isLight={isLight}>{props.date?.toFormat('dd-MMM-yyyy')?.toUpperCase() ?? 'No Data'}</DateLabel>
      {props.date ? (
        <DifferenceLabel>{capitalizeSentence(props.date?.toRelative() ?? '')}</DifferenceLabel>
      ) : (
        <CustomLink
          style={{
            fontWeight: 500,
            marginLeft: 0,
            lineHeight: '16px',
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

const Container = styled.div({
  display: 'block',
  fontFamily: 'Inter, sans-serif',
});

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
