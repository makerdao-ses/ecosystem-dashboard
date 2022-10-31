import styled from '@emotion/styled';
import React from 'react';
import { DateTime } from 'luxon';
import { capitalizeSentence } from '../../../core/utils/string.utils';
import { CustomLink } from '../custom-link/custom-link';
import { CuTableColumnLastModifiedSkeleton } from './cu-table-column-last-modified.skeleton';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SUBMIT_EXPENSES_URL } from '../../../config/external-urls';

interface Props {
  date?: DateTime;
  isLoading?: boolean;
}

export const CuTableColumnLastModified = (props: Props) => {
  const isLight = useThemeContext().themeMode === 'light';

  return !props.isLoading ? (
    <Wrapper>
      <Container>
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
            href={SUBMIT_EXPENSES_URL}
          >
            Submit Now
          </CustomLink>
        )}
      </Container>
    </Wrapper>
  ) : (
    <CuTableColumnLastModifiedSkeleton />
  );
};

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  margin: 'auto 0',
  height: '50px',
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  cursor: 'pointer',
  '@media (min-width: 375px)': {
    alignItems: 'flex-end',
  },
  '@media (min-width: 685px) and (max-width: 833px)': {
    alignItems: 'flex-start',
  },
  '@media (min-width: 1194px)': {
    alignItems: 'flex-start',
  },
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
