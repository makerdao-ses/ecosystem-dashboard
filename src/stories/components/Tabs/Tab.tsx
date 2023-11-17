import styled from '@emotion/styled';
import { BASE_URL } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TabProps extends React.PropsWithChildren {
  id?: string;
  href?: string;
  tabQuery?: string;
  active: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const Tab: React.FC<TabProps> = ({ children, id, href, tabQuery, active = false, onClick, className }) => {
  const { isLight } = useThemeContext();
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
    <StyledTab isLight={isLight} active={active} onClick={onClick} className={className}>
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

const StyledTab = styled.a<WithIsLight & { active: boolean }>(({ active, isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  color: active ? (isLight ? '#1AAB9B' : '#2DC1B1') : isLight ? '#7E7E88' : '#708390',
  fontSize: '14px',
  lineHeight: '22px',
  fontWeight: 400,
  paddingBottom: '12px',
  borderBottom: `2px solid ${isLight ? (active ? '#1AAB9B' : 'transparent') : active ? '#1AAB9B' : 'transparent'}`,
  cursor: 'pointer',
  transition: 'all .3s ease',
  whiteSpace: 'nowrap',
  '@media (min-width: 834px)': {
    fontSize: '16px',
    lineHeight: '18px',
  },
}));
