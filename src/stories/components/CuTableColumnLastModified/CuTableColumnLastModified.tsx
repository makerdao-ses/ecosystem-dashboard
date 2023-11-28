import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { SUBMIT_EXPENSES_URL } from '../../../config/externalUrls';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { capitalizeSentence } from '../../../core/utils/string';
import { buildQueryString } from '../../../core/utils/urls';
import { CustomLink } from '../CustomLink/CustomLink';
import { CuTableColumnLastModifiedSkeleton } from './CuTableColumnLastModifiedSkeleton';

interface Props {
  date?: DateTime;
  isLoading?: boolean;
  code?: string;
  now?: DateTime;
}

export const CuTableColumnLastModified = ({ date, isLoading, code, now = DateTime.now() }: Props) => {
  const { isLight } = useThemeContext();
  const router = useRouter();
  const queryStrings = useMemo(() => buildQueryString(router.query), [router.query]);
  return !isLoading ? (
    <Link href={`/core-unit/${code}/activity-feed${queryStrings}`} passHref legacyBehavior>
      <Wrapper>
        <Container>
          <DateLabel isLight={isLight}>{date?.toFormat('dd-MMM-yyyy')?.toUpperCase() ?? 'No Data'}</DateLabel>
          {date ? (
            <DifferenceLabel isLight={isLight}>
              {capitalizeSentence(
                date?.toRelative({
                  base: now,
                  unit: 'days',
                }) ?? ''
              )}
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
  textDecoration: 'none',
  '@media (min-width: 834px) and (max-width: 1194px)': {
    margin: 0,
  },
  '@media (min-width: 1440px)': {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '4px',
    paddingLeft: 8,
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
