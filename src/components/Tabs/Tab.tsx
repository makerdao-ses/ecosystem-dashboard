import { styled } from '@mui/material';
import { BASE_URL } from '@ses/config/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

interface TabProps extends React.PropsWithChildren {
  id?: string;
  href?: string;
  tabQuery?: string;
  active: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const Tab: React.FC<TabProps> = ({ children, id, href, tabQuery, active = false, onClick, className }) => {
  const router = useRouter();
  const url = useMemo(() => {
    if (href) return href;

    const currentUrl = new URL(router.asPath, BASE_URL);
    const currentQueryParams = new URLSearchParams(currentUrl.search);
    currentQueryParams.set(tabQuery || 'tab', id || '');

    const updatedUrl = `${currentUrl.pathname}?${currentQueryParams.toString()}${currentUrl.hash}`;

    return updatedUrl;
  }, [href, id, router.asPath, tabQuery]);

  const content = (
    <StyledTab active={active} onClick={onClick} className={className}>
      {children}
    </StyledTab>
  );

  if (!id && !href) return content;

  return (
    <Link href={url} passHref shallow={true} legacyBehavior>
      {content}
    </Link>
  );
};

export default Tab;

const StyledTab = styled('a')<{ active: boolean }>(({ theme, active }) => ({
  fontFamily: 'Inter, sans-serif',
  color: theme.palette.isLight
    ? active
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.slate[100]
    : active
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.gray[600],
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 600,
  paddingBottom: 8,
  borderBottom: `2px solid ${
    theme.palette.isLight
      ? active
        ? theme.palette.colors.gray[900]
        : 'transparent'
      : active
      ? theme.palette.colors.gray[50]
      : 'transparent'
  }`,
  cursor: 'pointer',
  transition: 'all .3s ease',
  whiteSpace: 'nowrap',

  '&:hover': {
    color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));
