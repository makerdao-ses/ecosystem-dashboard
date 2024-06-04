import { styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SUBMIT_EXPENSES_URL } from '@ses/config/externalUrls';
import { capitalizeSentence } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
import { DateTime } from 'luxon';
import Link from 'next/link';
import ExternalLink from '@/stories/components/ExternalLink/ExternalLink';
import type { Theme } from '@mui/material';

interface Props {
  date?: DateTime;
  isLoading?: boolean;
  code?: string;
  now?: DateTime;
  href: string;
  className?: string;
}

export const LastModifiedActorCoreUnit = ({ date, now = DateTime.now(), href, className }: Props) => {
  const isDesk = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1024'));
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
            <ContainerNoData className={className}>
              <LastModifiedText>{textDescription}</LastModifiedText>
              <DifferenceLabel>
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
        <ContainerNoData className={className}>
          <LastModifiedTextNoData>{textDescription}</LastModifiedTextNoData>
          <ContainerLink>
            <ExternalLinkStyled href={SUBMIT_EXPENSES_URL}>Submit Now</ExternalLinkStyled>
          </ContainerLink>
        </ContainerNoData>
      )}
    </>
  );
};

export default LastModifiedActorCoreUnit;

const DifferenceLabel = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '14.52px',
  color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[300],
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  },
}));

const ContainerNoData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '4px 8px 4px 8px',
  borderRadius: '0px 0px 12px 12px',
  borderTop: `1px solid ${theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.slate[500]}`,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(55, 62, 77, 0.2)',
  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '4px 16px',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: 'revert',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'revert',
    borderTop: 'revert',
  },
}));

const LastModifiedText = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '18px',

  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300],
  alignItems: 'center',
  marginTop: 2,
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: '22px',
    color: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.slate[300],
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 12,
    lineHeight: '18px',
    color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[300],
  },
}));

const LastModifiedTextNoData = styled(LastModifiedText)({
  marginTop: 3,
});

const ContainerLink = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 4,
});

const ExternalLinkStyled = styled(ExternalLink)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 12,
  color: theme.palette.isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900],
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900],
  },
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
}));
