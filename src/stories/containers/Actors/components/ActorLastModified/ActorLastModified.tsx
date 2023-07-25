import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { SUBMIT_EXPENSES_URL } from '@ses/config/externalUrls';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { capitalizeSentence } from '@ses/core/utils/string';
import { buildQueryString } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  date?: DateTime;
  isLoading?: boolean;
  code?: string;
  now?: DateTime;
  href: string;
}

export const ActorLastModified = ({ date, code, now = DateTime.now(), href }: Props) => {
  const { isLight } = useThemeContext();
  const router = useRouter();
  const isDesk = useMediaQuery(lightTheme.breakpoints.up('desktop_1194'));
  const textDescription = !date
    ? !isDesk
      ? 'Last Modified'
      : 'No data'
    : isDesk
    ? date?.toFormat('dd-MMM-yyyy')?.toUpperCase()
    : 'Last Modified';

  const queryStrings = useMemo(() => buildQueryString(router.query), [router.query]);
  return (
    <>
      {date ? (
        <Link href={`${href}/${code}${queryStrings}`} passHref>
          <a>
            <ContainerNoData isLight={isLight}>
              <LastModifiedText isLight={isLight}>{textDescription}</LastModifiedText>
              <DifferenceLabel isLight={isLight}>
                {capitalizeSentence(
                  date?.toRelative({
                    base: now,
                    unit: 'days',
                  }) ?? ''
                )}
              </DifferenceLabel>
            </ContainerNoData>
          </a>
        </Link>
      ) : (
        <ContainerNoData isLight={isLight}>
          <LastModifiedText isLight={isLight}>{textDescription}</LastModifiedText>
          <ContainerLink>
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
          </ContainerLink>
        </ContainerNoData>
      )}
    </>
  );
};

export default ActorLastModified;

const DifferenceLabel = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: 'normal',
  color: isLight ? '#231536' : '#EDEFFF',
}));

const ContainerNoData = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '7px 16px 8px 16px',
  borderRadius: 6,
  backgroundColor: isLight ? '#F5F6FB' : '#9FAFB9',
  [lightTheme.breakpoints.up('table_834')]: {
    padding: '4px 16px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: 'revert',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'revert',
  },
}));

const LastModifiedText = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: isLight ? '#708390' : '#9FAFB9',
  alignItems: 'center',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontWeight: 'normal',
    letterSpacing: 'revert',
  },
}));

const ContainerLink = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});
