import { styled } from '@mui/material';
import CopyIcon from '@ses/components/CopyIcon/CopyIcon';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import Information from '@ses/components/svg/information';
import lightTheme from '@ses/styles/theme/light';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

interface SectionTitleProps {
  title: string;
  tooltip: string;
  hash?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, tooltip, hash }) => {
  const router = useRouter();
  const slugTitle = useMemo(() => {
    // Convert to lowercase
    let slug = title.toLowerCase();

    // Remove special characters, spaces, and replace with dashes
    slug = slug.replace(/[^\w\s-]/g, ''); // Remove non-word characters except spaces and dashes
    slug = slug.replace(/\s+/g, '-'); // Replace spaces with dashes

    return slug;
  }, [title]);

  const href = useMemo(() => {
    if (typeof window === 'undefined') return '';

    const url = new URL(window.location.href);
    url.hash = hash ?? slugTitle;
    return url.toString();
    // router is used as dependency to update the href when the query changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, slugTitle, router]);

  return (
    <Container id={hash ?? slugTitle}>
      <Title href={`#${hash ?? slugTitle}`} target="_blank">
        {title}
      </Title>
      <Tooltip>
        <SESTooltip content={tooltip} placement="bottom-start" enterTouchDelay={0} leaveTouchDelay={15000}>
          <IconWrapper>
            <Information height={18} width={18} />
          </IconWrapper>
        </SESTooltip>
      </Tooltip>
      <CopyWrapper>
        <CopyIcon defaultTooltip="Copy link" text={href} width={22} height={22} />
      </CopyWrapper>
    </Container>
  );
};

export default SectionTitle;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 6,
  },
  scrollMarginTop: 150,
});

const Title = styled(Link)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.75,

  '&:hover': {
    textDecoration: 'underline',
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    letterSpacing: 0.4,
  },
}));

const Tooltip = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const IconWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  width: 24,
  height: 24,
  paddingLeft: 2,
  marginTop: 2,
  alignItems: 'flex-start',
  cursor: 'pointer',

  [lightTheme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 4,
  },
});

const CopyWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  width: 22,
  height: 22,
  marginBottom: 2,
  cursor: 'pointer',

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: -3,
    marginLeft: 2,
    alignItems: 'baseline',
  },
});
