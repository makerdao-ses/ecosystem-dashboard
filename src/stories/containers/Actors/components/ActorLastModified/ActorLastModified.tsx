import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { SUBMIT_EXPENSES_URL } from '@ses/config/externalUrls';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { capitalizeSentence } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import { DateTime } from 'luxon';
import Link from 'next/link';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  date?: DateTime;
  isLoading?: boolean;
  code?: string;
  now?: DateTime;
  href: string;
  className?: string;
}

export const ActorLastModified = ({ date, now = DateTime.now(), href, className }: Props) => {
  const { isLight } = useThemeContext();

  const isDesk = useMediaQuery(lightTheme.breakpoints.up('desktop_1194'));
  const textDescription = !date
    ? !isDesk
      ? 'Last Modified'
      : 'No Data'
    : isDesk
    ? date?.toFormat('dd-MMM-yyyy')?.toUpperCase()
    : 'Last Modified';

  return (
    <>
      {date ? (
        <Link href={href} passHref legacyBehavior>
          <a>
            <ContainerNoData isLight={isLight} className={className}>
              <LastModifiedText isLight={isLight} hasUppercase={!isDesk}>
                {textDescription}
              </LastModifiedText>
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
        <ContainerNoData isLight={isLight} className={className}>
          <LastModifiedTextNoData isLight={isLight} hasUppercase={!isDesk}>
            {textDescription}
          </LastModifiedTextNoData>
          <ContainerLink>
            <CustomLink
              style={{
                fontWeight: 500,
                marginLeft: 0,
                lineHeight: '18px',
                padding: 0,
                letterSpacing: '0px',
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
  color: isLight ? '#231536' : '#D2D4EF',
}));

const ContainerNoData = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '7px 16px 8px 16px',
  borderRadius: 6,
  backgroundColor: isLight ? '#F5F6FB' : '#25273D',
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

const LastModifiedText = styled.div<WithIsLight & { hasUppercase?: boolean }>(({ isLight, hasUppercase }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '14.52px',
  letterSpacing: '1px',
  textTransform: hasUppercase ? 'uppercase' : 'none',
  color: isLight ? '#434358' : '#708390',
  alignItems: 'center',
  marginTop: 2,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontWeight: 'normal',
    fontSize: 11,
    letterSpacing: 'revert',
    marginTop: 0,
  },
}));

const LastModifiedTextNoData = styled(LastModifiedText)({
  marginTop: 3,
});

const ContainerLink = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 4,
});
