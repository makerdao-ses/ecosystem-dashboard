import styled from '@emotion/styled';
import { buildQueryString } from '@ses/core/utils/url.utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { SUBMIT_EXPENSES_URL } from '../../../config/external-urls';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { capitalizeSentence } from '../../../core/utils/string.utils';
import { CustomLink } from '../custom-link/custom-link';
import { CuTableColumnLastModifiedSkeleton } from './cu-table-column-last-modified.skeleton';
import type { DateTime } from 'luxon';

interface Props {
  date?: DateTime;
  isLoading?: boolean;
  code?: string;
}

export const CuTableColumnLastModified = ({ date, isLoading, code }: Props) => {
  const { isLight } = useThemeContext();
  const router = useRouter();
  const queryStrings = useMemo(() => buildQueryString(router.query), [router.query]);

  return !isLoading ? (
    <Link href={`/core-unit/${code}/activity-feed${queryStrings}`} passHref>
      <Wrapper>
        <Container>
          <DateLabel isLight={isLight}>{date?.toFormat('dd-MMM-yyyy')?.toUpperCase() ?? 'No Data'}</DateLabel>
          {date ? (
            <DifferenceLabel isLight={isLight}>
              {capitalizeSentence(date?.toRelative({ unit: 'days' }) ?? '')}
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
    </Link>
  ) : (
    <CuTableColumnLastModifiedSkeleton />
  );
};

const Wrapper = styled.a({
  display: 'flex',
  alignItems: 'flex-start',
  margin: 'auto 0',
  height: '50px',
  textDecoration: 'none',
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
